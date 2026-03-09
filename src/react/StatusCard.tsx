import React, { useEffect, useState } from "react";
import { getDailyGitHubStatus } from "../core/github";
import type { RepoRef, DailyActivityResult } from "../core/types";

type Props = {
  username: string;
  repos: string[];
  token?: string;
  date?: string;
  className?: string;
};

function normalizeRepos(repos: string[]): RepoRef[] {
  return repos.map((item) => {
    const [owner, repo] = item.split("/");
    if (!owner || !repo) {
      throw new Error(`Invalid repo format: ${item}. Use "owner/repo".`);
    }
    return { owner, repo };
  });
}

function dotClass(status?: string) {
  if (status === "available") return "ghsc-dot ghsc-dot--green";
  if (status === "late") return "ghsc-dot ghsc-dot--amber";
  return "ghsc-dot ghsc-dot--red";
}

export function StatusCard({
  username,
  repos,
  token,
  date,
  className = "",
}: Props) {
  const [data, setData] = useState<DailyActivityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const result = await getDailyGitHubStatus({
          username,
          repos: normalizeRepos(repos),
          token,
          date,
        });

        if (active) setData(result);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [username, repos.join(","), token, date]);

  if (loading) {
    return <div className={`ghsc-card ${className}`}>Checking status...</div>;
  }

  if (error) {
    return <div className={`ghsc-card ${className}`}>Error: {error}</div>;
  }

  return (
    <div className={`ghsc-card ${className}`}>
      <div className="ghsc-header">
        <div className={dotClass(data?.status)} />
        <div>
          <div className="ghsc-title">@{username}</div>
          <div className="ghsc-subtitle">{data?.label}</div>
        </div>
      </div>

      <div className="ghsc-body">
        <div>Commits today: <strong>{data?.commitCount}</strong></div>
        <div>Date: {data?.date}</div>
      </div>
    </div>
  );
}