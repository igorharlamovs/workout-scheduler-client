<template>
  <q-page>
    <div class="fit column justify-center content-center">
      <div class="q-mt-xl bg-dark" style="box-shadow: 2px 2px 10px 2px rgb(0, 0, 0); overflow: auto; min-width: 600px;">
        <div class="row">
          <div class="col">

            <div class="col bg-teal row justify-center items-center" style="box-shadow: 0 3px 30px 0 teal; overflow: auto; min-height: 100px;">
              <div class="text-h4"><q-icon name="create" /> Create New Workout</div>
            </div>

            <q-form
              @submit="createWorkout"
              @reset="onReset"
              class="q-gutter-y-xl q-mx-xl q-pa-md"
            >
              
              <q-input 
                v-model="workoutName" 
                style="box-shadow: 0 1px 0 0 teal;"
                input-style="color: white"
                label-color="orange" 
                color="teal" 
                label="Workout Name *"
                class="q-pt-md"
                filled
              />

              <q-input 
                v-model="repetitions"
                type="number"
                style="box-shadow: 0 1px 0 0 teal;" 
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Repetitions *"
                filled
              />

              <q-input 
                v-model="sets"
                type="number"
                style="box-shadow: 0 1px 0 0 teal;" 
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Sets *"
                filled
              />

              <q-input 
                v-model="weight"
                prefix="(KG): "
                type="number"
                style="box-shadow: 0 1px 0 0 teal;" 
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Weight"
                filled
              />

              <q-input 
                v-model="duration"
                prefix="(Secs): "
                type="number"
                style="box-shadow: 0 1px 0 0 teal;" 
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Duration"
                filled
              />

              <div class="q-mt-xl column items-center">
                <div class="row">
                  <q-btn label="Submit" type="submit" color="teal"/>
                  <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                </div>
              </div>
            </q-form>

          </div>
        </div>
      </div>
    </div>
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
    let   drawer      = ref(false);

    return {
      workoutName,
      repetitions,
      sets,
      weight,
      duration,
      loading,
      workoutList,
      drawer,

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
};
</script>
