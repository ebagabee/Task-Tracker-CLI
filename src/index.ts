import readline from "readline";
import fs from "fs/promises";
import path from "path";

const fileDatabase = path.join(__dirname, "database/database.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum questionEnumInput {
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
  MARK_PROGRESS = "mark-in-progress",
  MARK_DONE = "mark-done",
  LIST = "list",
  DONE = "done",
  TODO = "todo",
  IN_PROGRESS = "in-progress",
}

let choice: string;

async function add(currentChoice: string) {
  try {
    const data = await fs.readFile(fileDatabase, "utf-8");

    const tasks = JSON.parse(data);

    const newTask = {
      id: tasks.length + 1,
      description: currentChoice,
      status: "todo",
      createdAt: new Date(),
      updateAt: new Date(),
    };

    tasks.push(newTask);

    await fs.writeFile(fileDatabase, JSON.stringify(tasks, null, 2));

    console.log("New task added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

rl.question("What do you want to do?: ", (current) => {
  choice = current;

  switch (choice) {
    case questionEnumInput.ADD:
      add(choice);
      break;
    case questionEnumInput.UPDATE:
      console.log("Updating...");
      break;
    case questionEnumInput.DELETE:
      console.log("Deleting...");
      break;
    case questionEnumInput.MARK_PROGRESS:
      console.log("Mark progress");
      break;
    case questionEnumInput.MARK_DONE:
      console.log("Making done...");
      break;
    case questionEnumInput.LIST:
      console.log("Listing...");
      break;
    case questionEnumInput.DONE:
      console.log("Doning");
      break;
    case questionEnumInput.TODO:
      console.log("Todo task");
      break;
    case questionEnumInput.IN_PROGRESS:
      console.log("In progress task");
      break;
    default:
      console.log("That's impossible");
      break;
  }
});
