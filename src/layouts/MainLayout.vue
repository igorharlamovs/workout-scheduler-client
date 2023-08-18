<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Workout Scheduler </q-toolbar-title>
        <div>
          <q-tabs v-model="tab" inline-label class="bg-primary">
            <q-btn-dropdown auto-close stretch flat label="plans">
              <q-list>
                <q-item clickable @click="tab = 'contacts'">
                  <q-item-section>View Plans</q-item-section>
                </q-item>

                <q-item clickable @click="tab = 'profile'">
                  <q-item-section>Create Plan</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-route-tab
              name="calendar"
              label="Calendar"
              to="/calendar"
              exact
            />
            <q-route-tab
              name="contacts"
              label="Contacts"
              to="/contacts"
              exact
            />
            <q-route-tab name="profile" label="Profile" to="/profile" exact />
            <q-route-tab name="login" label="Login" to="/login" exact />
            <q-route-tab
              name="register"
              label="Register"
              to="/register"
              exact
            />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },

  data() {
    return {
      selectedTab: "Tab 1",
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
});
</script>
