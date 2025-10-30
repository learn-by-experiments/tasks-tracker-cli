const { TASK_STATUS } = require("./constants");
const { readFileSync, existsSync, writeFileSync } = require("fs");

class TasksRepository {
  filePath = __dirname + "/tasks.json";

  saveTofile(tasks) {
    writeFileSync(this.filePath, JSON.stringify(tasks));
  }

  getTasks() {
    const tasks = JSON.parse(readFileSync(this.filePath));
    return tasks;
  }
  getTaskById(id) {
    const tasks = this.getTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if(task) return task;
    throw new Error("Task not foudn")
  }

  createTask(description) {
    let tasks = this.getTasks();
    let timestamp = new Date();
    let taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
      id: taskId,
      description,
      status: TASK_STATUS.TODO,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    tasks.push(newTask);
    this.saveTofile(tasks);
    return taskId;
  }

  updateTask(id, keyValue) {
    const taskToUpdate = this.getTaskById(id);
    const updatedAt= new Date()

    if('description' in keyValue){
        taskToUpdate.description = keyValue.description
        taskToUpdate.updatedAt = updatedAt;
    }

    if('status' in keyValue){
        taskToUpdate.status = keyValue.status
        taskToUpdate.updatedAt = updatedAt;
    }

    const updatedTasks = tasks.map((task)=>{
        if(task.id === id)return taskToUpdate;
        return task;
    })

    this.saveTofile(updatedTasks)
  }

  deleteTask() {}
}

module.exports = {
    TasksRepository
}