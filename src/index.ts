import readline from "readline";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

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
  status: statusQuestionEnum;
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
}

enum statusQuestionEnum {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

async function add(): Promise<void> {
  try {
    const description = await askQuestion("Description: ");

    const data = await fs.readFile(fileDatabase, "utf-8");
    const tasks: Task[] = JSON.parse(data);

    const newTask: Task = {
      id: randomUUID(),
      description,
      status: statusQuestionEnum.TODO,
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

async function main(){

  try {
    const choice = await askQuestion("What is the current task?");

    switch (choice) {
      case questionEnumInput.ADD:
        await add();
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
      case statusQuestionEnum.DONE:
        console.log("Done");
        break;
      case statusQuestionEnum.TODO:
        console.log("Todo task");
        break;
      case statusQuestionEnum.IN_PROGRESS:
        console.log("In progress task");
        break;
      default:
        console.log("That's impossible");
        break;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();