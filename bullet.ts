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

function padZero(num: number): string {
  return num > 9 ? "" + num : "0" + num;
}

function getFormattedDate(dateParam?: Date): string {
  const date = dateParam || new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}-${padZero(month)}-${padZero(day)}`;
}
function isEmptyObj(obj: any) {
  if (obj && typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }

  return true;
}

function show([dateStr]: string[]) {
  load(dateStr, (data: any) => {
    if (isEmptyObj(data)) {
      console.log(`No entry for ${dateStr}`);
      return;
    }

    const { todo } = data;
    if (todo) {
      console.log("Todo");
      todo.forEach((item: string) => console.log(`- ${item}`));
    }
  });
}

function load(dateStr: string, fn: Function) {
  if (dateStr && Number.isNaN(Date.parse(dateStr))) {
    console.log("Sorry. Invalid date format");
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

function save(dateStr: string, data: any) {
  if (dateStr && Number.isNaN(Date.parse(dateStr))) {
    console.log("Sorry. Invalid date format");
    return;
  }

  const date = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = getFormattedDate(date);
  Deno.writeTextFile(`./${formattedDate}.json`, JSON.stringify(data));
}

function todo([text]: string[]) {
  const dateStr = getFormattedDate();
  load(dateStr, (data: any) => {
    const todo = data.todo ? [...data.todo, text] : [text];
    save(dateStr, {
      ...data,
      todo,
    });
  });
}
