// src/services/dateService.ts

/**
 * Formats a Date object into a readable string.
 * Example output: "6 Oct, 2025"
 * @param date - The Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  if (!date || !(date instanceof Date)) return '';

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

/**
 * Converts a date string like "6 Oct, 2025" into ISO format.
 * Example output: "2025-10-06T00:00:00.000Z"
 * @param dateStr - Date string in format "D MMM, YYYY"
 * @returns ISO date string or null if invalid
 */
export const parseDateToISO = (dateStr: string): string | null => {
  if (!dateStr) return null;

  const clean = dateStr.replace(',', '').trim(); // Remove comma
  const [day, monthStr, year] = clean.split(' ');

  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const month = months[monthStr];

  if (month === undefined) return null;

  const date = new Date(Date.UTC(Number(year), month, Number(day)));
  return date.toISOString();
};
