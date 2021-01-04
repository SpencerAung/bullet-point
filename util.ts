export function padZero(num: number): string {
  return num > 9 ? "" + num : "0" + num;
}

export function getFormattedDate(dateParam?: Date): string {
  const date = dateParam || new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}-${padZero(month)}-${padZero(day)}`;
}

export function isEmptyObj(obj: any) {
  if (obj && typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }

  return true;
}
