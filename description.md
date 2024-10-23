# Task-Tracker-CLI
Task tracker is a project used to track and manage your tasks.

# Requirements

The application should run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done 
- List all tasks that are in progress

Here are some constraints to guide the implementation:

- You can use any programming language to build this project
- Use positional arguments in command line to accept user inputs
- Use a JSON file to store the tasks in the current directory
- The JSON file should be created if it does not exist
- Use the native file system module of your programming language to interact with de JSON file
- Do not use any external libraries or frameworks to build this projects.
- Ensure to handle errors and edge cases gracefully

# Example

```bash
# Adding a new task
add "Buy groceries"
# Output: Task added succesfully (ID: 1)

# Updating and deleting tasks
update 1 "Buy groceries and cook dinner"
delete 1

# Marking a task as in progress or done
mark-in-progress 1
mark-done 1

# Listing all tasks
list

# Listing tasks by status
list done
list todo
list in-progress
```
# Task Properties

Each task should have the following properties:

- `id`: A unique identifier for the task
- `description`: A short description of the task
- `status`: The status of the task (todo, in-progress, done)
- `createdAt`: The date and time when the task was created
- `updatedAt`: The date and time when task was last updated

Make sure to add these properties to the JSON file when adding a new task and update them when updating a task

# Getting Started

Here are a few steps to help you get started with the Task Tracker CLI project:

## Set up your development environment

- Choose a programing language you are comfortable with (e.g, Python, JavaScript, etc)
- Ensure you have a code editor or IDE installed (e.g, VSCode, PyCharm)

## Project Initialization

- Create a new project directory for you Task Tracker CLI
- Initialize a version control system (git) to manage your project.

## Implementing Features

- Start by creating a basic CLI structure to handle user inputs
- Implement each feature one by one, ensuring to test thoroughly before moving to the next e.g. implement adding task functionality first, listing next, then updating, marking as in progress, etc.

## Testing and Debugging

- Test each feature individually to ensure they work as expected. Look at the JSON file to verify that the tasks are being stored correctly
- Debug any issues that arise during development

## Finalizing the project

- Ensure all features are implemented and testes
- Clean up your code and add comments where necessary
- Write a good readme file on how to use your Task Tracker CLI

By the end of this project, you will have developed a practical tool that can help you or others manage tasks efficiently. This project lays a solid foundation for more advanced programming projects and real-world applications.