export function getMonthDateRange(
  year: number,
  month: number,
): { start: Date; end: Date } {
  const start = new Date(year, month - 1, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(year, month, 1);
  end.setHours(0, 0, 0, 0);

  return { start, end };
}

export function getStartOfDay() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return startOfToday;
}

export function getEndOfDay() {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return endOfToday;
}
