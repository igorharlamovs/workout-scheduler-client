import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Loading } from 'quasar'
import { Dialog } from 'quasar'

export const useWorkoutStore = defineStore('workout', {
  state: () => ({
    formData: {
      workout: {
        id: null,
        workoutName: null,
        repetitions: null,
        sets: null,
        weight: null,
        duration: null,
        weightMetricId: null,
      },
    },
    workouts: [],
    searchWorkoutName: null,
  }),

  getters: {
    searchedWorkouts: (state) => {
      if (!state.searchWorkoutName) return state.workouts ?? []

      return (state.workouts ?? []).filter((workout) =>
        workout.workoutName.toLowerCase().includes(state.searchWorkoutName.toLowerCase())
      )
    },
  },

  actions: {
    async createWorkout() {
      try {
        Loading.show({ message: 'Creating Workout...' })
        const response = await api.post('/workouts', this.formData.workout)

        this.workouts.push(response.data.data)

        this.formData.workout.workoutName = null
        this.formData.workout.repetitions = null
        this.formData.workout.sets = null
        this.formData.workout.weight = null
        this.formData.workout.duration = null
        this.formData.workout.weightMetricId = null

        Loading.hide()

        return true
      } catch (error) {
        console.log(error)
        Loading.hide()
        return false
      }
    },

    async getWorkouts() {
      try {
        Loading.show({ message: 'Loading Workouts...' })
        const response = await api.get('/workouts')

        this.workouts = response.data.data

        Loading.hide()
      } catch (error) {
        Loading.hide()
        console.log(error)
      }
    },

    async deleteWorkout(workoutId) {
      Dialog.create({
        title: 'Delete workout?',
        message: 'Are you sure you would like to delete the workout?',
        cancel: true,
        persistent: false,
        dark: true,
      })
        .onOk(async () => {
          try {
            Loading.show({ message: 'Deleting Workout...' })
            await api.delete(`/workouts/${workoutId}`)
            this.workouts = this.workouts.filter((workout) => workout.id !== workoutId)
            Loading.hide()
          } catch (error) {
            console.log('failed to delete')
            Loading.hide()
          }
        })
        .onCancel(() => {
          return
        })
        .onDismiss(() => {
          return
        })
    },

    async editWorkout(editWorkout) {
      try {
        Loading.show({ message: 'Editing Workout...' })

        let updatedWorkout = await api.patch(`/workouts/${editWorkout.id}`, editWorkout)

        this.workouts = this.workouts.map((workout) => {
          if (workout.id == updatedWorkout.data.data.id) {
            return updatedWorkout.data.data
          }

          // Keep other workouts unchanged
          return workout
        })

        Loading.hide()
      } catch (error) {
        console.log('failed to edit')
        Loading.hide()
        return false
      }
    },
  },
})
