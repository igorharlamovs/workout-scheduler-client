<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="mainHeader">
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

                  <q-item clickable @click="tab = 'createPlan'">
                    <q-item-section>Create Plan</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              
              <q-route-tab name="contacts" label="Contacts" to="/contacts" exact />
              <q-route-tab name="workouts" label="Workouts" to="/workouts" exact />
          </q-tabs>
        </div>

        <div class="col-2" v-if="isMounted">
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
    <router-view/>
  </q-layout>
</template>

<script>
  import { defineComponent, ref, computed } from "vue";
  import { useUserStore } from "src/stores/user_store";
  import { LocalStorage } from "quasar";


  const userStore = useUserStore();
  const isMounted = ref(false);
  const userName = computed(() => userStore.user.name);

  export default defineComponent({
    name: "MainLayout",

    setup() {
      const selectedTab = ref("Tab 1");
      const items = ref(["Item 1", "Item 2", "Item 3"]);

      return {
        selectedTab,
        items,
        isMounted,
        userName
      };
    },
    
    async mounted() {
      if(LocalStorage.getItem("accessToken")) {
        await userStore.getUser();
      }
      isMounted.value = true;
    }
  });
</script>
