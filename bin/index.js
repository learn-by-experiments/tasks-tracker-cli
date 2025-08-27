#! /usr/bin/env node
const { readFileSync, existsSync, writeFileSync } = require("fs");
console.log("Task Tracker using command line");

const CLI_COMMANDS = {
  ADD: "add",
  UPDATE: "update",
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

const [executor, taskCli, action, ...rest] = process.argv;

try {
  // task creation
  if (action === CLI_COMMANDS.ADD) {
    const [description] = rest;

    if (!description) {
      throw new Error("provide the task description");
    }

    const tasks = JSON.parse(readFileSync(filePath));
    let taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    let timestamp = new Date();
    const newTask = {
      id: taskId,
      description,
      status: TASK_STATUS.TODO,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    tasks.push(newTask);
    writeFileSync(filePath, JSON.stringify(tasks));
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
  }
} catch (error) {
  console.log("Error : " + error?.message);
}
