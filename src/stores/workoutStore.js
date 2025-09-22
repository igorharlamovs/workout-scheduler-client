import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Loading, Notify, Dialog } from 'quasar'

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

        const payload = {
          ...this.formData.workout,
          weightMetricId: this.formData.workout.weightMetric?.id ?? null,
        }

        const response = await api.post('/workouts', payload)

        this.workouts.push(response.data.data)

        Loading.hide()

        Notify.create({
          type: 'positive',
          message: 'Workout created successfully',
          position: 'top',
        })

        this.resetFormData()

        return true
      } catch (error) {
        Loading.hide()

        Dialog.create({
          title: 'Error',
          message: 'Failed to create workout. Please try again.',
          ok: true,
          color: 'orange',
          dark: true,
        })

        return false
      }
    },

    async editWorkout(editWorkout) {
      try {
        Loading.show({ message: 'Editing Workout...' })

        //Double check that the edited workout still exists
        const originalWorkout = this.workouts.find((w) => w.id === editWorkout.id)
        if (!originalWorkout) throw new Error('Workout not found')

        if (editWorkout.weightMetric) {
          editWorkout.weightMetricId = editWorkout.weightMetric.id
        }

        await api.patch(`/workouts/${editWorkout.id}`, editWorkout)
        await this.getWorkouts()

        Loading.hide()

        Notify.create({
          type: 'positive',
          message: 'Workout updated successfully',
          position: 'top',
        })

        return true
      } catch (error) {
        Loading.hide()

        Dialog.create({
          title: 'Error',
          message: 'Failed to edit workout. Please try again.',
          ok: true,
          color: 'orange',
          dark: true,
        })

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

        Dialog.create({
          title: 'Error',
          message: 'Failed to load workouts. Please refresh.',
          ok: true,
          color: 'orange',
          dark: true,
        })
      }
    },

    async deleteWorkout(workoutId) {
      Dialog.create({
        title: 'Delete workout?',
        message: 'Are you sure you would like to delete the workout?',
        cancel: true,
        persistent: false,
        dark: true,
      }).onOk(async () => {
        try {
          Loading.show({ message: 'Deleting Workout...' })
          await api.delete(`/workouts/${workoutId}`)
          this.workouts = this.workouts.filter((w) => w.id !== workoutId)
          Loading.hide()

          Notify.create({
            type: 'positive',
            message: 'Workout deleted successfully',
            position: 'top',
          })
        } catch (error) {
          Loading.hide()

          Dialog.create({
            title: 'Error',
            message: 'Failed to delete workout. Please try again.',
            ok: true,
            color: 'negative',
          })
        }
      })
    },

    resetFormData() {
      Object.keys(this.formData.workout).forEach((key) => {
        this.formData.workout[key] = null
      })
    },
  },
})
