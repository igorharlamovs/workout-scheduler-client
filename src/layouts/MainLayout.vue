<template>
  <q-layout
    view="lHh Lpr lFf"
    class="background"
    background="icons/workout-scheduler-logo.png"
  >
    <q-header elevated class="main-header">
      <div class="row no-wrap shadow-1">
        <div class="col-2">
          <q-toolbar class="bg-none justify-center">
            <q-btn to="/">
              <q-avatar size="md" :square="true">
                <img src="icons/workout-scheduler-logo.png">
              </q-avatar>
            </q-btn>
          </q-toolbar>
        </div>
        <div class="column col-8 items-start">
          <q-tabs
            v-model="tab"
            inline-label
            class="bg-none"
          >
              <q-route-tab name="plans" label="Plans" to="/planlist" exact /> 
              <q-route-tab name="workouts" label="Workouts" to="/workouts" exact />
          </q-tabs>
        </div>

        <div class="col-2" v-if="userStore.user">
          <q-tabs v-if="userName" v-model="tab" inline-label>
            <q-route-tab name="profile" :label="userName" to="/profile" exact/>
          </q-tabs>
          <q-tabs v-else v-model="tab" inline-label>
            <q-route-tab name="login" label="Login" to="/login" exact />
            <q-route-tab name="register" label="Register" to="/register" exact/>
          </q-tabs>
        </div>
    </div>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, ref, computed } from "vue";
  import { useUserStore } from "src/stores/userStore";
  import { LocalStorage, useQuasar } from "quasar";


  const userStore = useUserStore();
  const userName = computed(() => userStore.user.name);

  export default defineComponent({
    name: "MainLayout",

    setup() {
      const $q = useQuasar();
      // $q.dark.set(true);
      const tab = ref("Tab 1");
      const items = ref(["Item 1", "Item 2", "Item 3"]);

      return {
        tab,
        items,
        userName,
        userStore
      };
    },
  });
</script>
