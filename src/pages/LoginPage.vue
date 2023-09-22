<template>
  <div class="q-pda-md">
    <q-layout
      view="lHh lpr lFf"
      class="shadow-2 rounded-borders"
    >
      <q-page-container>
        <div class="q-pa-md" style="max-width: 400px">
          <!-- <q-field filled :dense="dense">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{user.name}}</div>
            </template>
          </q-field> -->
      
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
import { ref, watch } from "vue";
import { api } from "boot/axios";
import { Cookies } from "quasar";
import { useUserStore } from "src/stores/user_store";

const userStore = useUserStore();

export default {
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,

      async onSubmit() {
        await userStore.login(email.value, password.value);
      },

      onReset() {
        // user.value = userStore.getUser();
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
