#! /usr/bin/env node
const { readFileSync, existsSync, writeFileSync } = require("fs");
const {CLI_COMMANDS,TASK_STATUS} = require('./constants')
const {TasksRepository} = require('./tasks.repository')
console.log("Task Tracker using command line");

const filePath = __dirname + "/tasks.json";

if (!existsSync(filePath)) {
  writeFileSync(filePath, "[]");
}

const [executor, taskCli, action, ...rest] = process.argv;

try {
  const taskRepository = new TasksRepository();
  // task creation
  if (action === CLI_COMMANDS.ADD) {
    const [description] = rest;

    if (!description) {
      throw new Error("provide the task description");
    }

    let taskId = taskRepository.createTask(description)
    console.log(`Task added successfully (ID: ${taskId})`);
  } else if (action === CLI_COMMANDS.UPDATE) {
    const [taskId, description] = rest;
    const tasks = JSON.parse(readFileSync(filePath));

    const taskIndex = tasks.findIndex((task) => {
      return task.id === parseInt(taskId);
    });

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    tasks[taskIndex].description = description;
    writeFileSync(filePath, JSON.stringify(tasks));
    console.log(`Task updated successfully (ID: ${taskId})`);
  } else if (action === CLI_COMMANDS.DELETE) {
    const [taskId] = rest;

    let tasks = JSON.parse(readFileSync(filePath));

    const taskIndex = tasks.findIndex((task) => {
      return task.id === parseInt(taskId);
    });

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    writeFileSync(filePath, JSON.stringify(tasks));
    console.log(
      `Task "${deletedTask.description}" deleted successfully (ID: ${deletedTask.id})`
    );
  } else if (action === CLI_COMMANDS.MARK_DONE) {
    const [taskId] = rest;
    let tasks = JSON.parse(readFileSync(filePath));
    const taskIndex = tasks.findIndex((task) => {
      return task.id === parseInt(taskId);
    });

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    tasks[taskIndex].status = TASK_STATUS.DONE;

    writeFileSync(filePath, JSON.stringify(tasks));
    console.log(`Task status updated successfully (ID: ${taskId})`);
  } else if (action === CLI_COMMANDS.MARK_IN_PROGRESS) {
    const [taskId] = rest;
    let tasks = JSON.parse(readFileSync(filePath));
    const taskIndex = tasks.findIndex((task) => {
      return task.id === parseInt(taskId);
    });

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    tasks[taskIndex].status = TASK_STATUS.IN_PROGRESS;

    writeFileSync(filePath, JSON.stringify(tasks));
    console.log(`Task status updated successfully (ID: ${taskId})`);
  } else if (action === CLI_COMMANDS.LIST) {
    const [status] = rest;
    let tasks = JSON.parse(readFileSync(filePath));
    if (status) {
      let filteredTasks = tasks.filter((task) => task.status === status);
      console.log(filteredTasks);
    } else {
      console.log(tasks);
    }
  }
} catch (error) {
  console.log("Error : " + error?.message);
}
