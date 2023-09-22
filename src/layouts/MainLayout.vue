<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="row no-wrap shadow-1">
        <div class="col-2">
          <q-toolbar class="bg-secondary justify-center">
            <q-btn flat label="Workout Scheduler" to="/" />
          </q-toolbar>
        </div>
        <div class="col-8">
          <q-tabs
            v-model="tab"
            inline-label
            class="bg-primary"
            align="left">
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
          </q-tabs>
        </div>

        <div class="col-2" v-if="isMounted">
          <q-tabs v-if="userStore.user.name" v-model="tab" inline-label>
            <q-route-tab name="profile" :label="userStore.user.name" to="/profile" exact/>
          </q-tabs>
          <q-tabs v-else v-model="tab" inline-label>
            <q-route-tab name="login" label="Login" to="/login" exact />
            <q-route-tab name="register" label="Register" to="/register" exact/>
          </q-tabs>
        </div>
    </div>
    
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "src/stores/user_store";

const userStore = useUserStore();
const isMounted = ref(false);

export default defineComponent({
  name: "MainLayout",

  setup() {
    const selectedTab = ref("Tab 1");
    const items = ref(["Item 1", "Item 2", "Item 3"]);

    onMounted(() => {
      userStore.getUser();
      isMounted.value = true;
      
      console.log("User Name: " + userStore.user.name);
      console.log(isMounted.value);
    });

    return {
      selectedTab,
      items,
      isMounted
    };
  },
  
  
});
</script>
