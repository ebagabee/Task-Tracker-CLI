# Task Manager CLI

This is a Command Line Interface (CLI) application for task management. You can add, update, delete, and mark tasks as "in progress." The app uses a simple command system to manipulate a list of tasks stored locally.

- **Data Storage**: This explicitly states that all tasks are stored in the `database/database.json` file.

## Requirements

- Node.js (v18 or higher)

## Installation

- Clone this repository to your local environment:

   ```bash
   git clone https://github.com/yourusername/task-manager-cli.git
   cd Task-Tracker-CLI
   npm install
   npm run dev
   ```
# Usage

Once the installation is complete, you can start using the task manager via command line.

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

