import { red, blue } from "./deps.ts";
import { isEmptyObj, getFormattedDate } from "./util.ts";
import { load } from "./file.ts";
import { printTodo } from "./todo.ts";

export function show([dateStr]: string[]) {
  const date = dateStr || getFormattedDate();

  load(date, (data: any) => {
    if (isEmptyObj(data)) {
      console.log(red(`No entry for ${date}`));
      return;
    }

    const { todo } = data;
    printTodo(date, todo);
  });
}
