import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Loading } from 'quasar'
import { Dialog } from 'quasar'
import { useInitStore } from './initStore.js'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    initStore: useInitStore(),

    formData: {
      plan: {
        planName: null,
        workouts: [],
      },
    },
    plans: [],
    weekDays: [
      { day: 'monday', selected: false, start_time: '' },
      { day: 'tuesday', selected: false, start_time: '' },
      { day: 'wednesday', selected: false, start_time: '' },
      { day: 'thursday', selected: false, start_time: '' },
      { day: 'friday', selected: false, start_time: '' },
      { day: 'saturday', selected: false, start_time: '' },
      { day: 'sunday', selected: false, start_time: '' },
    ],
  }),

  getters: {},

  actions: {
    async createPlan() {
      try {
        Loading.show({ message: 'Creating Plan...' })
        const response = await api.post('/plans', this.formData.plan)

        Loading.hide()

        return true
      } catch (error) {
        console.log(error)
        Loading.hide()
        return false
      }
    },

    async getPlans() {
      try {
        Loading.show({ message: 'Loading Planss...' })
        const response = await api.get('/plans')

        this.workouts = response.data.data

        Loading.hide()
      } catch (error) {
        Loading.hide()
        console.log(error)
      }
    },

    async deletePlan(planId) {
      Dialog.create({
        title: 'Delete Plan?',
        message: 'Are you sure you would like to delete the plan?',
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
