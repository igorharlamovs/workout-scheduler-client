<template>
  <div class="q-pda-md">
    <q-layout
      view="lHh lpr lFf"
      class="background shadow-2 rounded-borders"
      background="icons/workout-scheduler-logo.png"
    >
      <q-page-container>
        <div class="" style="max-width: 400px">
      
          <q-form @submit="createWorkout" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              color="dark"
              bg-color="white"
              v-model="workoutName"
              label="Workout name *"
            />

            <q-input
              filled
              v-model="repetitions"
              color="dark"
              bg-color="white"
              type="number"
              label="Repetitions"
            />

            <q-input
              filled
              v-model="sets"
              color="dark"
              bg-color="white"
              type="number"
              label="Sets"
            />

            <q-input
              filled
              v-model="weight"
              color="dark"
              bg-color="white"
              type="number"
              label="Weight (KG)"
            />

            <q-input
              filled
              v-model="duration"
              color="dark"
              bg-color="white"
              type="number"
              label="Duration (Min)"
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
import { Cookies } from "quasar";
import { useUserStore } from "src/stores/user_store";

const userStore = useUserStore();

export default {
  setup() {
    const $q = useQuasar();

    const workoutName = ref(null);
    const repetitions = ref(null);
    const sets        = ref(null);
    const weight      = ref(null);
    const duration    = ref(null);
    let   loading     = ref(false);
    const workoutList = ref([]);

    return {
      workoutName,
      repetitions,
      sets,
      weight,
      duration,
      loading,
      workoutList,

      async createWorkout() {
        try {
          loading.value = true;
          let formData = {
            workout_name: workoutName.value,
            repetitions : repetitions.value,
            sets        : sets.value,
            weight      : weight.value,
            duration    : duration.value,
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
      }
    };
  },
  mounted() {
    api.get("/sanctum/csrf-cookie").then((response) => {
      Cookies.set("csrfToken", response.data);
    });
  },
};
</script>
