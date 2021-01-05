import { DAY, formatDate, parseDate } from "./deps.ts";
export const DATE_FORMAT = "yyyy-MM-dd";

export function padZero(num: number): string {
  return num > 9 ? "" + num : "0" + num;
}

export function getFormattedDate(dateParam?: Date): string {
  const date = dateParam || new Date();
  return formatDate(date, DATE_FORMAT);
}

export function isEmptyObj(obj: any) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }

  return true;
}

export function getDateFromStr(dateStr: string): Date {
  if (!dateStr) {
    return new Date();
  }
  const lDateStr = dateStr.toLowerCase();
  const today = new Date().getTime();
  switch (lDateStr) {
    case "ytr":
    case "yesterday":
      return new Date(today - DAY);
    case "tmr":
    case "tomorrow":
      return new Date(today + DAY);
    case "today":
      return new Date();
    default:
      return parseDate(lDateStr, DATE_FORMAT);
  }
}
