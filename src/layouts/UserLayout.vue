<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> {{ headerText }} </q-toolbar-title>
      </q-toolbar>

      <q-tabs v-model="tab">
        <template v-for="tab in tabs" :key="tab.id">
          <q-route-tab
            :name="tab.name"
            :icon="tab.icon"
            :to="tab.to"
            :replace="tab.replace"
            :label="tab.label"
          />
        </template>
      </q-tabs>
    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer>
      <q-tabs switch-indicator>
        <q-route-tab icon="map" to="/your/route" replace label="One Tab" />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs>

      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Footer </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const firstName = "Igors";
    const headerText = "User Chat";
    const tabs = [
      {
        id: 1,
        name: "tab1",
        icon: "map",
        to: "/your/route",
        replace: true,
        label: "One tab",
      },

      {
        id: 2,
        name: "tab2",
        icon: "assignment",
        to: "/some/other/route",
        replace: true,
        label: "Other tab",
      },

      {
        id: 3,
        name: "tab3",
        icon: "assignment",
        to: "/some/other/route",
        replace: true,
        label: "3 tab",
      },
    ];
    const tab = ref("tab3");

    return {
      headerText,
      firstName,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      tabs,
      tab,
    };
  },
};
</script>
