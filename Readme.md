# Task Tracker
- [Project Reference](https://roadmap.sh/projects/task-tracker)
  
# Description
The Task tracker application is designed to help users manage their tasks efficiently. The application allows users to create, read, update and delete tasks.

# How to use
- Clone the repository
- Run `npm link` to link the CLI tool globally
- Use the following commands:
    - `task-cli add <task_description>`: Add a new task with the given description
    - `task-cli update <task_id> <new_description>`: Update the description of the task with the given ID
    - `task-cli list [status]`: List all tasks, optionally filtered by status (todo, in-progress, done)
    - `task-cli delete <task_id>`: Delete the task with the given ID
    - `task-cli mark-in-progress <task_id>`: Mark the task with the given ID as in-progress
    - `task-cli mark-done <task_id>`: Mark the task with the given ID as done