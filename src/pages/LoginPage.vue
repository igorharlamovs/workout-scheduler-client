<template>
  <div class="q-pda-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 800px"
      class="shadow-2 rounded-borders"
    >
      <q-page-container>
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Email required']"
            />

            <q-input
              filled
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Password required']"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import { Cookies } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,

      async onSubmit() {
        try {
          let response = await api.post("/login", {
            email: email.value,
            password: password.value,
          });

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Success",
          });

          window.location.href = "/";

          Cookies.set("accessToken", response.data.token);

          //   let responseLogout = await api.post("/logout");
          //   console.log(responseLogout);
          //   Cookies.remove("accessToken");
        } catch (error) {
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Fail",
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
  mounted() {
    api.get("/sanctum/csrf-cookie").then((response) => {
      Cookies.set("csrfToken", response.data);
    });
  },
};
</script>
