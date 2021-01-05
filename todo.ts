import { load, save } from "./file.ts";
import { getFormattedDate, getDateFromStr } from "./util.ts";
import { green, blue, red } from "./deps.ts";

interface Todo {
  checked: boolean;
  text: string;
}

export function todo([command, input]: string[]) {
  if (!command) {
    return;
  }
  processTodoCommand(command, input);
}

export function processTodoCommand(command: string, input: string) {
  switch (command) {
    case "check":
      checkTodo(input, true);
      break;
    case "uncheck":
      checkTodo(input, false);
      break;
    case "create":
      createTodo(input);
      break;
    case "list":
      listTodo(input);
      break;
    default:
      createTodo(command);
  }
}

export function checkTodo(todoNumber: string, isChecked: boolean) {
  const index = parseInt(todoNumber, 10);
  const dateStr = getFormattedDate();
  load(dateStr, (data: any) => {
    if (data.todo && data.todo.length >= index) {
      data.todo[index - 1].checked = isChecked;
    }
    save(dateStr, data);
    printTodo(dateStr, data.todo);
  });
}

export function createTodo(text: string) {
  const item = {
    text,
    done: false,
  };
  const dateStr = getFormattedDate();
  load(dateStr, (data: any) => {
    const todo = data.todo ? [...data.todo, item] : [item];
    save(dateStr, {
      ...data,
      todo,
    });
    printTodo(dateStr, todo);
  });
}

export function printTodo(date: string, todo: Todo[]) {
  if (todo) {
    console.log(blue(date));
    todo.forEach(printTodoItem);
  }
}

export function listTodo(userDate: string) {
  const dateStr = getFormattedDate(getDateFromStr(userDate));
  load(dateStr, (data: any) => {
    if (data.todo) {
      printTodo(dateStr, data.todo);
    } else {
      console.log(red(`No entry for ${dateStr}`));
    }
  });
}

export function printTodoItem(todo: Todo, index: number) {
  console.log(getTodoText(todo, index + 1));
}

export function getTodoText({ checked, text }: Todo, index: number) {
  return checked
    ? `${index}: [${green("v")}] ${text}`
    : `${index}: [ ] ${text}`;
}
