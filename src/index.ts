export const version = "0.1.0";
export { getDailyGitHubStatus } from "./core/github";
export { getStatusFromCommitCount } from "./core/status";
export { StatusCard } from "./react/StatusCard";
export type * from "./core/types";
import "./styles.css";