import readline from "readline";
import fs from "fs/promises";
import path from "path";
import { randomUUID, UUID } from "crypto";

const fileDatabase = path.join(__dirname, "database/database.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

interface Task {
  id: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

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

async function add() {
  try {
    const description = await askQuestion("Description: ");
    const status = await askQuestion("Status (todo, in-progress, done): ");

    if (!["todo", "in-progress", "done"].includes(status)) {
      console.log(
        "Invalid status! Please use 'todo', 'in-progress', or 'done'."
      );
      rl.close();
      return;
    }

    const data = await fs.readFile(fileDatabase, "utf-8");
    const tasks: Task[] = JSON.parse(data);

    const newTask: Task = {
      id: randomUUID(),
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);

    await fs.writeFile(fileDatabase, JSON.stringify(tasks, null, 2));

    console.log("New task added successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
}

rl.question("What do you want to do?: ", (current) => {
  choice = current;

  switch (choice) {
    case questionEnumInput.ADD:
      add();
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
