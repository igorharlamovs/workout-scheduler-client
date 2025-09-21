import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Loading } from 'quasar'

export const useInitStore = defineStore('init', {
  state: () => ({
    weightMetrics: api.weightMetrics ? api.weightMetrics : [],
    timeMetrics: api.timeMetrics ? api.timeMetrics : [],
  }),

  getters: {},

  actions: {
    async getWeightMetrics() {
      try {
        Loading.show({ message: 'Loading Weight Metrics...' })
        const response = await api.get('/weightMetrics')
        this.weightMetrics = response.data.data
        LocalStorage.set('weightMetrics', this.weightMetrics)
        Loading.hide()
      } catch (error) {
        Loading.hide()
        console.log('failed to fetch weight metrics')
      }
    },

    async getTimeMetrics() {
      try {
        const response = await api.get('/timeMetrics')
        this.timeMetrics = response.data.data
        LocalStorage.set('timeMetrics', this.timeMetrics)
      } catch (error) {
        console.log('Failed to fetch weight metrics')
      }
    },
  },
})
