#! /usr/bin/env node
const {  existsSync, writeFileSync } = require("fs");
const { CLI_COMMANDS, TASK_STATUS } = require("./constants");
const { TasksRepository } = require("./tasks.repository");
console.log("Task Tracker using command line");

const filePath = __dirname + "/tasks.json";

if (!existsSync(filePath)) {
  writeFileSync(filePath, "[]");
}

const [executor, taskCli, action, ...rest] = process.argv;

try {
  const tasksRepository = new TasksRepository();
  // create task
  if (action === CLI_COMMANDS.ADD) {
    const [description] = rest;

    if (!description) {
      throw new Error("provide the task description");
    }

    let taskId = tasksRepository.createTask(description);
    console.log(`Task added successfully (ID: ${taskId})`);
  }
  // update task
  else if (action === CLI_COMMANDS.UPDATE) {
    const [taskId, description] = rest;

    if (!description) {
      throw new Error("provide the task description");
    }

    tasksRepository.updateTask(taskId, { description });
    console.log(`Task updated successfully (ID: ${taskId})`);
  }
  // delete task
  else if (action === CLI_COMMANDS.DELETE) {
    const [taskId] = rest;

    const deletedTask = tasksRepository.deleteTask(taskId);
    console.log(
      `Task "${deletedTask.description}" deleted successfully (ID: ${deletedTask.id})`
    );
  }
  // update task status as done
  else if (action === CLI_COMMANDS.MARK_DONE) {
    const [taskId] = rest;

    tasksRepository.updateTask(taskId, {
      status: TASK_STATUS.DONE,
    });
    console.log(`Task status updated successfully (ID: ${taskId})`);
  }
  // update task status as in progress
  else if (action === CLI_COMMANDS.MARK_IN_PROGRESS) {
    const [taskId] = rest;

    tasksRepository.updateTask(taskId, {
      status: TASK_STATUS.IN_PROGRESS,
    });
    console.log(`Task status updated successfully (ID: ${taskId})`);
  } 
  // list all the tasks
  else if (action === CLI_COMMANDS.LIST) {
    const [status] = rest;
    let tasks = tasksRepository.getTasks({ status });
    console.log(tasks);
  }
} catch (error) {
  console.error('\x1b[31m' + "Error : " + error?.message);
}
