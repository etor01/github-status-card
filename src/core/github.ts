import { getUtcDayRange } from "./utils";
import { getStatusFromCommitCount } from "./status";
import type { GitHubFetchOptions, DailyActivityResult } from "./types";

async function fetchRepoCommitsForDay(
  owner: string,
  repo: string,
  author: string,
  startIso: string,
  endIso: string,
  token?: string
): Promise<number> {
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/commits`);
  url.searchParams.set("author", author);
  url.searchParams.set("since", startIso);
  url.searchParams.set("until", endIso);
  url.searchParams.set("per_page", "100");

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} for ${owner}/${repo}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

export async function getDailyGitHubStatus(
  options: GitHubFetchOptions
): Promise<DailyActivityResult> {
  const { username, repos, token, date } = options;
  const { startIso, endIso, date: day } = getUtcDayRange(date);

  let commitCount = 0;

  for (const ref of repos) {
    const count = await fetchRepoCommitsForDay(
      ref.owner,
      ref.repo,
      username,
      startIso,
      endIso,
      token
    );
    commitCount += count;
  }

  const { status, label } = getStatusFromCommitCount(commitCount);

  return {
    date: day,
    commitCount,
    status,
    label,
  };
}