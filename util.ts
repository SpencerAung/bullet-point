import { DAY, formatDate, parseDate } from "./deps.ts";
export const DATE_FORMAT = "yyyy-MM-dd";

export function getFormattedDate(dateParam?: Date): string {
  const date = dateParam || new Date();
  return formatDate(date, DATE_FORMAT);
}

export function isObject(x: any): boolean {
  return !!(x && typeof x === "object" && !Array.isArray(x));
}

export function isEmptyObj(obj: any): boolean {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }

  return true;
}

export function isEmpty(x: any): boolean {
  if (typeof x === "string") {
    return x.length === 0;
  }

  if (isObject(x)) {
    return Object.keys(x).length === 0;
  }

  if (Array.isArray(x)) {
    return x.length === 0;
  }

  return false;
}

export function isValidDateStr(dateStr: string): boolean {
  if (isEmpty(dateStr) || typeof dateStr !== "string") {
    return false;
  }

  const validStrs = ["yesterday", "ytr", "tomorrow", "tmr", "tmrw", "today"];
  if (validStrs.includes(dateStr)) {
    return true;
  }

  const dateRegex = /[0-9]{4}-(0|1)[0-9]-(0|1)[0-9]/; // yyyy-MM-dd
  return dateRegex.test(dateStr);
}

export function getDateFromStr(dateStr: string): Date {
  if (!isValidDateStr(dateStr)) {
    return new Date();
  }
  const lDateStr = dateStr.toLowerCase();
  const today = new Date().getTime();
  switch (lDateStr) {
    case "ytr":
    case "yesterday":
      return new Date(today - DAY);
    case "tmr":
    case "tmrw":
    case "tomorrow":
      return new Date(today + DAY);
    case "today":
      return new Date();
    default:
      return parseDate(lDateStr, DATE_FORMAT);
  }
}
