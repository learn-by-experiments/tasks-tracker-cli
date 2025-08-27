#! /usr/bin/env node
const { readFileSync, existsSync, writeFileSync } = require("fs");
console.log("Task Tracker using command line");

const CLI_COMMANDS = {
  ADD: "add",
};

const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

const filePath = __dirname + "/tasks.json";

if (!existsSync(filePath)) {
  writeFileSync(filePath, "[]");
}

// add task
const [executor, taskCli, action, ...rest] = process.argv;

try {
  // task creation 
  if (action === CLI_COMMANDS.ADD) {
    const [description] = rest;

    if (!description) {
      throw new Error("provide the task description");
    }

    const tasks = JSON.parse(readFileSync(filePath));
    let taskId = tasks.length ? tasks[tasks.length - 1] + 1 : 1;
    let timestamp = new Date();
    const newTask = {
      id: taskId,
      description,
      status: TASK_STATUS.TODO,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    tasks.push(newTask);
    writeFileSync(filePath,JSON.stringify(tasks))
    console.log("Task added")
  }
} catch (error) {
  console.log("Error : " + error?.message);
}
