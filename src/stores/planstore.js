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
    searchPlanName: null,
  }),

  getters: {
    searchedPlans: (state) => {
      if (!state.searchPlanName) return state.plans ?? []

      return (state.plans ?? []).filter((plan) => plan.planName.toLowerCase().includes(state.searchPlanName.toLowerCase()))
    },
  },

  actions: {
    async createPlan() {
      try {
        Loading.show({ message: 'Creating Plan...' })

        //Plan name, selected days and workouts
        const payload = {
          name: this.formData.plan.name,
          // only selected day var names
          days: this.formData.plan.days.filter((day) => day.selected).map((day) => day.day),
          // only workout IDs
          workouts: this.formData.plan.workouts.map((workout) => workout.id),
        }

        let response = await api.post('/plans', payload)

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
        Loading.show({ message: 'Loading Plans...' })

        const response = await api.get('/plans')

        this.plans = response.data.data
        Loading.hide()
      } catch (error) {
        Loading.hide()

        Dialog.create({
          title: 'Error',
          message: 'Failed to load plans. Please refresh.',
          ok: true,
          color: 'orange',
          dark: true,
        })
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
