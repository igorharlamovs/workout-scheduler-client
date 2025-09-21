import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { LocalStorage, Loading, Notify } from 'quasar'
import { useInitStore } from './initStore'

export const useUserStore = defineStore('user', {
  state: () => ({
    initStore: useInitStore(),

    user: {
      id: api.user ? api.user.id : null,
      name: api.user ? api.user.name : null,
      email: api.user ? api.user.email : null,
      password: api.user ? api.user.password : null,
      userSettings: api.userSettings ? api.userSettings : null,
    },

    formData: {
      email: null,
      password: null,
    },
  }),

  getters: {},

  actions: {
    async login() {
      try {
        let response = await api.post('/login', this.formData)

        console.log('success login')

        LocalStorage.set('access_token', response.data.token)
        LocalStorage.set('user', response.data.user)
        LocalStorage.set('userSettings', response.data.userSettings)

        await this.initStore.getWeightMetrics()
        await this.initStore.getTimeMetrics()

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

    async updateUser() {
      try {
        Loading.show({ message: 'Updating User...' })

        const response = await api.patch(`/user/${this.user.id}`, this.user)

        LocalStorage.set('user', response.data.user)
        LocalStorage.set('userSettings', response.data.userSettings)

        Notify.create({
          type: 'positive',
          color: 'teal',
          position: 'top-right',
          message: 'User updated successfully!',
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Failed to update user. Please try again.',
        })
      } finally {
        Loading.hide()
      }
    },
  },
})
