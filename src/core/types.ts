export type AvailabilityStatus = "available" | "late" | "unavailable";

export interface RepoRef {
  owner: string;
  repo: string;
}

export interface DailyActivityResult {
  date: string;
  commitCount: number;
  status: AvailabilityStatus;
  label: string;
}

export interface GitHubFetchOptions {
  username: string;
  repos: RepoRef[];
  token?: string;
  date?: string; // YYYY-MM-DD
}