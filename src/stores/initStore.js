import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Loading } from 'quasar'
import { useUserStore } from './userstore'

export const useInitStore = defineStore('init', {
  state: () => ({
    userStore: useUserStore(),

    weightMetrics: api.weightMetrics ? api.weightMetrics : [],
    timeMetrics: api.timeMetrics ? api.timeMetrics : [],
  }),

  getters: {},

  actions: {
    async login(email, password) {
      try {
        let response = await api.post('/login', { email, password })

        console.log('success login')

        LocalStorage.set('access_token', response.data.token)
        LocalStorage.set('user', response.data.user)
        LocalStorage.set('userSettings', response.data.userSettings)

        await this.getWeightMetrics()
        await this.getTimeMetrics()

        window.location.href = '/'
      } catch (error) {
        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Invalid Credentials',
        })
      }
    },

    async logout() {
      LocalStorage.clear()
      window.location.href = '/'
    },

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
