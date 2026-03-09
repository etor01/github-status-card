import type { AvailabilityStatus } from "./types";

export function getStatusFromCommitCount(count: number): {
  status: AvailabilityStatus;
  label: string;
} {
  if (count <= 5) {
    return { status: "available", label: "Available" };
  }

  if (count < 20) {
    return { status: "late", label: "Late to reply" };
  }

  return { status: "unavailable", label: "Not available" };
}