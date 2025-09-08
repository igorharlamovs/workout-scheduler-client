<template>
  <q-layout view="lHh Lpr lFf" class="background">
    <q-footer bordered class="bg-grey-10 text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-orange" v-model="tab">
        <q-route-tab name="home" label="Home" icon="house" to="/" exact />
        <q-route-tab name="plans" label="Plans" icon="event_note" to="/planlist" exact />
        <q-route-tab name="workouts" label="Workouts" icon="fitness_center" to="/workouts" exact />
        <q-route-tab v-if="userStore.user" name="profile" label="Profile" icon="account_circle" to="/profile" exact />
        <q-route-tab v-if="!userStore.user" name="login" label="Login" to="/login" exact />
        <q-route-tab v-if="!userStore.user" name="register" label="Register" to="/register" exact />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from 'src/stores/userstore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()
const route = useRoute()

const tab = ref(route.name) // initialize with current route

watch(
  () => route.name,
  (newName) => {
    tab.value = newName
  }
)
</script>
