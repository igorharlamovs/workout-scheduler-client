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
              v-model="name"
              label="Name *"
              hint="Name and surname"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Name required']"
            />

            <q-input
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              type="email"
              :rules="[(val) => (val && val.length > 0) || 'Email required']"
            />

            <q-input
              filled
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Password required']"
            />

            <q-input
              filled
              v-model="passwordConfirm"
              label="Confirm Password *"
              lazy-rules
              :rules="[
                (val) => (val && val === password) || 'Passwords do not match',
              ]"
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

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const passwordConfirm = ref(null);

    return {
      name,
      email,
      password,
      passwordConfirm,

      onSubmit() {
        api
          .post("/register", {
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value,
          })
          .then(function (response) {
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Success",
            });
          })
          .catch(function (error) {
            $q.notify({
              color: "red-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Fail",
            });
          });
      },

      onReset() {
        name.value = null;
        email.value = null;
        password.value = null;
        passwordConfirm.value = null;
      },
    };
  },
};
</script>
