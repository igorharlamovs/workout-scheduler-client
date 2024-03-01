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
        <div class="col-8">
          <q-tabs
            v-model="tab"
            inline-label
            class="bg-none"
            align="left"
          >
              <q-btn-dropdown auto-close stretch flat label="plans" class="q-ml-xl">
                <q-list>
                  <q-item clickable @click="tab = 'contacts'">
                    <q-item-section>View Plans</q-item-section>
                  </q-item>

                  <q-item clickable @click="tab = 'create_plan'">
                    <q-item-section>Create Plan</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              
              <q-route-tab name="contacts" label="Contacts" to="/contacts" exact />
              <q-route-tab name="workouts" label="Workouts" to="/workoutlist" exact />
          </q-tabs>
        </div>

        <div class="col-2" v-if="userStore.user">
          <q-tabs v-if="user_name" v-model="tab" inline-label>
            <q-route-tab name="profile" :label="user_name" to="/profile" exact/>
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
  import { LocalStorage } from "quasar";


  const userStore = useUserStore();
  const user_name = computed(() => userStore.user.name);

  export default defineComponent({
    name: "MainLayout",

    setup() {
      const selected_tab = ref("Tab 1");
      const items = ref(["Item 1", "Item 2", "Item 3"]);

      return {
        selected_tab,
        items,
        user_name,
        userStore
      };
    },
    
    async mounted() {
      if(LocalStorage.getItem("access_token")) {
        const user = LocalStorage.getItem("access_token");
        await userStore.getUser();
      }
    }
  });
</script>
