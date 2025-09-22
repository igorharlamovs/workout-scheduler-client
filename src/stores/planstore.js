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
        name: null,
        workouts: [],
        days: [
          { day: 'monday', selected: false },
          { day: 'tuesday', selected: false },
          { day: 'wednesday', selected: false },
          { day: 'thursday', selected: false },
          { day: 'friday', selected: false },
          { day: 'saturday', selected: false },
          { day: 'sunday', selected: false },
        ],
      },
    },
    plans: [],
  }),

  getters: {},

  actions: {
    async createPlan() {
      try {
        Loading.show({ message: 'Creating Plan...' })

        //Plan name, selected days and workouts
        const payload = {
          name: this.formData.plan.name,
          days: this.formData.plan.days.filter((day) => day.selected).map((day) => day.day), // only selected day names
          workouts: this.formData.plan.workouts.map((workout) => workout.id), // only workout IDs
        }

        const response = await api.post('/plans', payload)

        Loading.hide()

        Notify.create({
          type: 'positive',
          message: 'Plan created successfully',
          position: 'top',
        })

        return true
      } catch (error) {
        Loading.hide()

        Dialog.create({
          title: 'Error',
          message: 'Failed to create workout plan. Please try again.',
          ok: true,
          color: 'orange',
          dark: true,
        })

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
  },
})
