import { red } from "./deps.ts";
import { getFormattedDate } from "./util.ts";

export function load(dateStr: string, fn: Function) {
  if (dateStr && Number.isNaN(Date.parse(dateStr))) {
    console.log(red("Sorry. Invalid date format"));
    return;
  }

  const date = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = getFormattedDate(date);
  const text = Deno.readTextFile(`./${formattedDate}.json`);

  text
    .then((response) => fn(JSON.parse(response)))
    .catch(() => {
      // Deno.writeTextFile(`./${date}.json`, "{}");
      fn({});
    });
}

export function save(dateStr: string, data: any) {
  if (dateStr && Number.isNaN(Date.parse(dateStr))) {
    console.log(red("Sorry. Invalid date format"));
    return;
  }

  const date = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = getFormattedDate(date);
  Deno.writeTextFile(`./${formattedDate}.json`, JSON.stringify(data));
}
