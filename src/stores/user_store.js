import { defineStore } from 'pinia';
import { api } from "boot/axios";
import { Cookies } from "quasar";

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    name: null,
    email: null,
    password: null,
    token: null,
  }),

  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    getToken: (state) => state.token,
  },

  actions: {

    async login (email, password) {
      try {
        let response = await api.post("/login", {email, password});

        console.log("success login");

        Cookies.set("accessToken", response.data.token);

        window.location.href = "/";

        //   let responseLogout = await api.post("/logout");
        //   console.log(responseLogout);
        //   Cookies.remove("accessToken");
      } catch (error) {
        if(error) throw error;
      }
    },

    setUser (payload) {
      if(payload.id) this.id = payload.id;
      if(payload.name) this.name = payload.name;
      if(payload.email) this.email = payload.email;
      if(payload.password) this.id = payload.password;
      if(payload.token) this.id = payload.token;
    },

    clearUser () {
      this.id = null;
      this.name = null;
      this.email = null;
      this.password = null;
      this.token = null;
    },

    async fetchUser () {
      try {
        return await api.get("/user", {
          email: email.value,
          password: password.value,
        });
      } catch (error) {
        console.log("failed to fetch user");
      }
    },
  },
});
