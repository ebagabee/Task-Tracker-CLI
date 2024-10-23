import readline from "node:readline";
import fs from "fs/promises";
import path from "node:path";

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

const fileDatabase = path.join(__dirname, "database.json");
let choice;

rl.question("What do you want to do?: ", (current) => {
  choice = current;

  switch (choice) {
    case questionEnumInput.ADD:
      console.log("Adding new task");
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
      console.log("listing...");
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


