import * as readline from "node:readline";
import fs from "fs/promises";
import path from "path";

const fileDatabase = path.join(__dirname, "database/database.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

enum statusQuestionEnum {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

interface Task {
  id: number;
  description: string;
  status: statusQuestionEnum;
  createdAt: Date;
  updatedAt: Date;
}

async function getDatabase() {
  const data = await fs.readFile(fileDatabase, "utf8");
  const tasks: Task[] = JSON.parse(data);
  return tasks;
}

async function saveDatabase(tasks: Task[]) {
  await fs.writeFile(fileDatabase, JSON.stringify(tasks, null, 2), "utf8");
}

async function addTask(args: string[]) {
  const description = args.join(" ").replace(/^"|"$/g, "");

  if (!description) {
    console.log("Task description is required.");
    return;
  }

  try {
    const tasks = await getDatabase();
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    const newTask: Task = {
      id: newId,
      description,
      status: statusQuestionEnum.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    await saveDatabase(tasks);

    console.log(`Task added successfully (ID: ${newTask.id})`);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function updateTask(args: string[]) {
  const tasks = await getDatabase();
  const id = args[0];
  const newDescription = args[1].replace(/^"|"$/g, "");;

  const findTask = tasks.find((task) => task.id === +id);

  if (!findTask) {
    console.log("Task not found");
    return;
  }

  findTask.description = newDescription;

  await saveDatabase(tasks);
}

const commandDispatcher: Record<string, (args: string[]) => Promise<void>> = {
  add: addTask,
  update: updateTask,
};

async function processComand(input: string) {
  const [command, ...args] = input.split(/\s+/);

  const commandFunction = commandDispatcher[command];

  if (commandFunction) {
    await commandFunction(args);
  } else {
    console.log(
      "Unknown command. Available commands are: add, update, delete..."
    );
  }
}

async function run() {
  const userInput = await askQuestion("Enter your command: ");
  await processComand(userInput);
  rl.close();
}

run();
