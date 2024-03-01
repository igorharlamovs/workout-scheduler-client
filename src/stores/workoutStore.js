import { defineStore } from 'pinia';
import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import { Loading } from "quasar";
import { Dialog } from "quasar";

export const useWorkoutStore = defineStore('workout', {
  state: () => ({
    formData: {
      workout: {
        workoutName: null,
        repetitions: null,
        sets: null,
        weight: null,
        duration: null,
      }
    },
    workouts: [],
  }),

  getters: {
  },

  actions: {
    async createWorkout() {
      try {
        const response = await api.post("/workouts", this.formData.workout);
        this.workouts.push(response.data.data);

        this.formData.workout.workoutName = null;
        this.formData.workout.repetitions = null;
        this.formData.workout.sets = null;
        this.formData.workout.weight = null;
        this.formData.workout.duration = null;

      } catch (error) {
        console.log("Failed to create workout");
      }
    },

    async getWorkouts () {
      try {
        Loading.show({message: 'Loading Workouts...'})
        const response = await api.get("/workouts");
        this.workouts = response.data.data;
        Loading.hide()
        
      } catch (error) {
        Loading.hide()
        console.log("failed to fetch workouts");
      }
    },

    async deleteWorkout (workoutIndex) {
      Dialog.create({
        title: 'Delete workout?',
        message: 'Are you sure you would like to delete the workout?',
        cancel: true,
        persistent: true,
        dark: true,
      })
        .onOk(async () => {
          try {
            await api.delete(`/workouts/${workoutIndex}`);
            this.getWorkouts();
          } catch (error) {
            console.log("failed to delete");
          }
        })
        .onCancel(() => {
          return;
        })
        .onDismiss(() => {
          return;
        })
    },
  },
});
