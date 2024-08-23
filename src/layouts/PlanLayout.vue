<template>
  <q-layout>
    <q-header class="bg-dark">
      <q-toolbar class="justify-end">
        <q-btn
          color="teal"
          class="q-mr-md"
          @click="showCreatePlanDialog = true"
          text-color="white"
          unelevated
          icon="add"
          label="Create Plan"
        />
        <q-input style="width: 20%" dark dense standout v-model="searchWorkoutText">
          <template v-slot:append>
            <q-icon v-if="searchWorkoutText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchWorkoutText = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <!-- Plan List -->
        <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 800px; max-width: 100%;">
          <div class="row">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
              v-for="workout in workoutStore.workouts"
              :key="workout"
            >
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-overline text-orange-9">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn flat color="primary" label="Share" />
                <q-btn flat color="secondary" label="Book" />

                <q-space />

                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded = !expanded"
                />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="expanded">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    {{ lorem }}
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
            </div>
          </div>
        </q-scroll-area>
        
        <!-- Create Plan Modal -->
        <q-dialog v-model="showCreatePlanDialog">
          <q-card class="my-card bg-dark" style="width: 80%">
            <div class="col bg-teal row justify-center items-center" style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px;">
              <div class="text-h4">Create New Plan</div>
            </div>

            <q-form
              @submit="createWorkout()"
              class="q-gutter-y-xl q-mx-md q-pa-sm"
            >
          
              <q-input 
                v-model="workoutStore.formData.workout.workoutName" 
                class="q-pt-md primary-shadow"
                input-style="color: white"
                label-color="orange" 
                color="teal" 
                label="Workout Name *"
                filled
              />

              <div class="row">
                <div class="col-8">
                  <q-input 
                    v-model.number="workoutStore.formData.workout.weight"
                    class="q-mr-md primary-shadow"
                    type="number"
                    label-color="orange" 
                    input-style="color: white"
                    color="teal" 
                    label="Weight"
                    filled
                  >
                    <template v-slot:prepend>
                      <q-icon name="fitness_center" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-4">
                  <q-select
                    filled
                    class="primary-shadow"
                    input-style="color: white"
                    label-color="orange"
                    dark
                    bg-color="dark"
                    color="teal"
                    v-model="workoutStore.formData.workout.weightMetricId"
                    :options="initStore.weightMetrics"
                    option-label="metricName"
                    option-value="id"
                    emit-value
                    map-options
                    label="Weight Metric"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-8">
                  <q-input 
                    v-model="workoutStore.formData.workout.duration"
                    type="number"
                    class="q-mr-md primary-shadow"
                    label-color="orange" 
                    input-style="color: white"
                    color="teal" 
                    label="Duration"
                    filled
                  >
                    <template v-slot:prepend>
                      <q-icon name="timer" color="red" />
                    </template>
                  </q-input>
                </div>
                <div class="col-4">
                  <q-select
                    filled
                    class="primary-shadow"
                    input-style="color: white"
                    label-color="orange"
                    dark
                    bg-color="dark"
                    color="teal"
                    v-model="workoutStore.formData.workout.timeMetricId"
                    :options="initStore.timeMetrics"
                    option-label="metricName"
                    option-value="id"
                    emit-value
                    map-options
                    label="Unit of Time"
                  />
                </div>
              </div>

              <q-input 
                v-model="workoutStore.formData.workout.sets"
                type="number"
                class="primary-shadow"
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Sets *"
                filled
              >
                <template v-slot:prepend>
                  <q-icon name="format_list_numbered" color="green" />
                </template>
              </q-input>

              <q-input 
                v-model="workoutStore.formData.workout.repetitions"
                type="number"
                class="primary-shadow"
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Repetitions *"
                filled
              >
                <template v-slot:prepend>
                  <q-icon name="repeat" color="blue" />
                </template>
              </q-input>

              <q-card-actions class="column items-center">
                <div class="q-mt-md">
                    <div class="row">
                      <q-btn label="Submit" type="submit" color="teal"/>
                      <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                    </div>
                  </div>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- Edit Plan Modal -->
        <q-dialog v-model="showEditWorkoutDialog">
          <q-card class="my-card bg-dark" style="width: 80%">
            <div class="col bg-teal row justify-center items-center" style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px;">
              <div class="text-h4">Edit Workout</div>
            </div>

            <q-form
              @submit="submitEditWorkout(editWorkout)"
              class="q-gutter-y-xl q-mx-md q-pa-md"
            >
              <q-input 
                v-model="editWorkout.workoutName"
                input-style="color: white"
                label-color="orange" 
                color="teal" 
                label="Workout Name *"
                class="q-pt-md primary-shadow"
                filled
              />

              <div class="row">
                <div class="col-8">
                  <q-input 
                    v-model.number="editWorkout.weight"
                    class="q-mr-md primary-shadow"
                    type="number"
                    label-color="orange" 
                    input-style="color: white"
                    color="teal" 
                    label="Weight"
                    filled
                  >
                    <template v-slot:prepend>
                      <q-icon name="fitness_center" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-4">
                  <q-select
                    filled
                    class="primary-shadow"
                    input-style="color: white"
                    label-color="orange"
                    dark
                    bg-color="dark"
                    color="teal"
                    v-model="editWorkout.weightMetricId"
                    :options="initStore.weightMetrics"
                    option-label="metricName"
                    option-value="id"
                    emit-value
                    map-options
                    label="Weight Metric"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-8">
                  <q-input 
                    v-model="editWorkout.duration"
                    type="number"
                    class="q-mr-md primary-shadow"
                    label-color="orange" 
                    input-style="color: white"
                    color="teal" 
                    label="Duration"
                    filled
                  >
                    <template v-slot:prepend>
                      <q-icon name="timer" color="red" />
                    </template>
                  </q-input>
                </div>
                <div class="col-4">
                  <q-select
                    filled
                    class="primary-shadow"
                    input-style="color: white"
                    label-color="orange"
                    dark
                    bg-color="dark"
                    color="teal"
                    v-model="editWorkout.timeMetricId"
                    :options="initStore.timeMetrics"
                    option-label="metricName"
                    option-value="id"
                    emit-value
                    map-options
                    label="Unit of Time"
                  />
                </div>
              </div>

              <q-input 
                v-model="editWorkout.sets"
                type="number"
                class="primary-shadow"
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Sets *"
                filled
              >
                <template v-slot:prepend>
                  <q-icon name="format_list_numbered" color="green" />
                </template>
              </q-input>

              <q-input 
                v-model="editWorkout.repetitions"
                type="number"
                class="primary-shadow"
                label-color="orange" 
                input-style="color: white"
                color="teal" 
                label="Repetitions *"
                filled
              >
                <template v-slot:prepend>
                  <q-icon name="repeat" color="blue" />
                </template>
              </q-input>

              <q-card-actions class="column items-center">
                <div class="q-mt-md">
                  <div class="row">
                    <q-btn label="Submit" type="submit" color="teal"/>
                    <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                  </div>
                </div>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
  
<script>
  import { useQuasar  } from "quasar";
  import { ref } from "vue";
  import { useWorkoutStore } from "stores/workoutStore.js";
  import { useInitStore } from "stores/initStore.js";
  import { useUserStore } from "stores/userStore.js";

  export default {
    setup() {
      //Imports
      const $q           = useQuasar();
      const workoutStore = useWorkoutStore();
      const initStore    = useInitStore();
      const userStore    = useUserStore();

      let   showCreatePlanDialog  = ref(false);
      let   showEditWorkoutDialog = ref(false);
      let   editWorkout           = ref(null);
      const weightMetric          = ref(null);

      if(!workoutStore.workouts.length) {
        workoutStore.getWorkouts();
      }

      return {
        workoutStore,
        initStore,
        userStore,
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

        showCreatePlanDialog,
        showEditWorkoutDialog,
        editWorkout,
        weightMetric,

        async createWorkout() {
          await workoutStore.createWorkout();
          this.showCreatePlanDialog = false;
        },

        handleEditWorkout(workout) {
          this.editWorkout = { ...workout };
          this.showEditWorkoutDialog = true;
        },

        async submitEditWorkout(editWorkout) {
          let response = await workoutStore.editWorkout(editWorkout);
          this.showEditWorkoutDialog = response ? true : false;
        },
      };
    },
  };
</script>
  