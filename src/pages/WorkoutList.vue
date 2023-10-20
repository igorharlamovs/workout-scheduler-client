<template>
  <q-page>
    <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 800px; max-width: 1600px;">
      <div class="row">
        <div class="col-4" v-for="i in 7" :key="i">
          <q-card class="my-card q-ma-xl bg-dark text-white" flat bordered>
            <q-card-section class="bg-teal text-white">
              <div class="text-h6">Biceps</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>

            <q-list class="text-body1 q-my-sm">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="primary" name="fitness_center" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Weight</q-item-label>
                  <q-item-label>5 KG</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="red" name="timer" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Duration</q-item-label>
                  <q-item-label>5 Mins</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="green" name="format_list_numbered" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Sets</q-item-label>
                  <q-item-label>3</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            
            <q-separator class="q-my-sm q-mx-sm" color="teal"/>

            <q-card-actions align="around">
              <q-btn color="orange" padding="xs md"><q-icon name="edit" class="q-mr-sm" size="xs"/>Edit</q-btn>
              <q-btn color="green" flat>Add to Plan</q-btn>
              <q-btn color="red" flat>Delete</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
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
    let drawer = ref(false);

    return {
      workoutName,
      repetitions,
      sets,
      weight,
      duration,
      loading,
      workoutList,
      drawer,
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: 'teal',
        width: '9px',
        opacity: 0.1
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '5px',
        opacity: 1
      },

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
      },

      async fetchData() {
        try {
          loading.value = true;
          const response = await api.get("/workouts");
          workoutList.value = response.data.data;

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Success",
          });
          loading.value = false;
        } catch (error) {
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: error.message,
          });
        }
      }
    };
  },
};
</script>
