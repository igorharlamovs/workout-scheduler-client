import { defineStore } from "pinia";

export const homePageStore = defineStore({
  id: "homepage",
  state: () => ({
    tasks: [],
  }),

  actions: {
    setTasks(tasks) {
      this.tasks = tasks;
    },

    addTask(task) {
      this.tasks.push(task);
    },

    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },

  getters: {
    getTasks: (state) => state.tasks,
    getTaskById: (state) => (id) => state.tasks.find((task) => task.id === id),
  },
});
