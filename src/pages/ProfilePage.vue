<template>
  <div class="q-pda-md">
    <q-layout
      view="lHh lpr lFf"
      background="icons/workout-scheduler-logo.png"
      class="background shadow-2 rounded-borders"
    >
      <q-page-container align="center" class="q-pt-xl">
        <div style="max-width: 400px" >
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-if="user"
              filled
              v-model="email"
              :label="user.name"
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
              <q-btn
                label="Logout"
                type="button"
                color="secondary"
                @click="logout"
              />
            </div>
          </q-form>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
  
  <script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useUserStore } from "src/stores/user_store";
import { LocalStorage } from "quasar";
  
  export default {

    setup() {
      const userStore = useUserStore();
  
      return {
        userStore,

        async logout() {
          await userStore.logout();
          console.log(LocalStorage);
        }
      };
    },
  };
  </script>
  