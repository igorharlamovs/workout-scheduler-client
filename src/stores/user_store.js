import { defineStore } from 'pinia';
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: null,
      email: null,
    },
  }),

  getters: {
  },

  actions: {
    async getToken() {
      await api.get("/sanctum/csrf-token");
    },

    async login (email, password) {
      try {
        let response = await api.post("/login", {email, password});

        console.log("success login");

        LocalStorage.set("accessToken", response.data.token);

        this.getUser();

        window.location.href = "/";

      } catch (error) {
        if(error) throw error;
      }
    },

    async logout () {
      LocalStorage.clear();
    },

    async getUser () {
      try {
        const response = await api.get("/user");
        this.user = response.data.data;

      } catch (error) {
        console.log("failed to fetch user");
      }
    },
  },
});
