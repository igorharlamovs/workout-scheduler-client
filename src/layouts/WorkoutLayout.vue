<template>
  <q-layout>
    <q-header>
      <q-toolbar class="text-white">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-space />
        <q-input dark dense standout v-model="text" input-class="text-right" class="q-ml-md">
            <template v-slot:append>
                <q-icon v-if="text === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
            </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="500"
      class="bg-dark text-white"
    >
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.href">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
  </q-layout>
</template>
  
  <script>
  import { useQuasar } from "quasar";
  import { ref } from "vue";
  import { api } from "boot/axios";
  import { Cookies } from "quasar";
  
  export default {
    setup() {
      const $q = useQuasar();
  
      const workoutName             = ref(null);
      const repetitions             = ref(null);
      const sets                    = ref(null);
      const weight                  = ref(null);
      const duration                = ref(null);
      let   loading                 = ref(false);
      const workoutList             = ref([]);
      let   drawer                  = ref(false);

      const menuList = [
        { icon: 'list', label: 'Workouts', href: "workoutlist"}
     ];
  
      return {
        workoutName,
        repetitions,
        sets,
        weight,
        duration,
        loading,
        workoutList,
        drawer,
        menuList,
  
        async createWorkout() {
          try {
            loading.value = true;
            let formData = {
              workoutName: workoutName.value,
              repetitions: repetitions.value,
              sets       : sets.value,
              weight     : weight.value,
              duration   : duration.value,
            };
  
            const response = await api.post("/workouts", formData);
            workoutList.value.push(response.data.data);
  
            loading.value = false;
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Success",
            });
          } catch (error) {
            $q.notify({
              color: "red-4",
              textColor: "white",
              icon: "cloud_done",
              message: error.message,
            });
            loading.value = false;
          }
        },
      };
    },
  };
  </script>
  