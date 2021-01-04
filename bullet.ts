import { todo } from "./todo.ts";
import { show } from "./show.ts";

run(Deno.args);

function run([command, ...params]: string[]) {
  switch (command) {
    case "show":
      show(params);
      break;
    case "todo":
      todo(params);
      break;
  }
}
