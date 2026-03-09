export function getUtcDayRange(date?: string) {
  const base = date ? new Date(`${date}T00:00:00.000Z`) : new Date();

  const start = new Date(Date.UTC(
    base.getUTCFullYear(),
    base.getUTCMonth(),
    base.getUTCDate(),
    0, 0, 0, 0
  ));

  const end = new Date(Date.UTC(
    base.getUTCFullYear(),
    base.getUTCMonth(),
    base.getUTCDate(),
    23, 59, 59, 999
  ));

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    date: start.toISOString().slice(0, 10),
  };
}