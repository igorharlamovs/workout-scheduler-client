import { defineStore } from 'pinia';
import { api } from "boot/axios";
import { LocalStorage, Loading, Notify } from "quasar";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: api.user ? api.user.id : null,
      name: api.user ? api.user.name : null,
      email: api.user ? api.user.email : null,
      password: api.user ? api.user.password : null,
      userSettings: api.userSettings ? api.userSettings : null,
      /**
       * Settings
       * - weightMetric
       */
    },
  }),

  getters: {
  },

  actions: {
    async updateUser() {
      try {
        Loading.show({ message: 'Updating User...' });

        const response = await api.patch(`/user/${this.user.id}`, this.user);

        if (!response) {
          throw new Error('No response received');
        }

        LocalStorage.set('user', response.data.user);
        LocalStorage.set('userSettings', response.data.userSettings);

        Notify.create({
          type: 'positive',
          color: 'teal',
          position: 'top-right',
          message: 'User updated successfully!',
        });

      } catch (error) {
        console.error("Failed to update user:", error);
        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Failed to update user. Please try again.',
        });
      } finally {
        Loading.hide();
      }
    },
  },
});
