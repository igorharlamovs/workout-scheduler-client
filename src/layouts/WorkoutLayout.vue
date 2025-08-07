<template>
  <q-layout>
    <q-header class="bg-dark">
      <q-toolbar class="justify-end">
        <q-btn
          color="teal"
          class="q-mr-md"
          @click="showCreateWorkoutDialog = true"
          text-color="white"
          unelevated
          icon="add"
          label="Create Workout"
        />
        <q-input style="width: 20%" dark dense standout v-model="workoutStore.searchWorkoutName">
          <template v-slot:append>
            <q-icon v-if="workoutStore.searchWorkoutName" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="workoutStore.searchWorkoutName = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <!-- Workout List -->
        <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 800px; max-width: 100%">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="workout in workoutStore.searchedWorkouts" :key="workout">
              <q-card class="my-card q-ma-xl bg-dark text-white" flat bordered>
                <q-card-section class="dark50">
                  <div class="text-h6">{{ workout.workoutName }}</div>
                </q-card-section>

                <q-list class="text-body1 q-my-sm" horizontal>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fitness_center" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Weight</q-item-label>
                      <q-item-label class="text-orange" id="weightMetricAbbr"
                        >{{ workout.weight }} {{ workout.weightMetric.abbreviation }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="red" name="timer" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Duration</q-item-label>
                      <q-item-label class="text-orange"
                        >{{ workout.duration }} {{ workout.timeMetric.abbreviation }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="green" name="format_list_numbered" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Sets</q-item-label>
                      <q-item-label class="text-orange">{{ workout.sets }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="blue" name="repeat" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Reps</q-item-label>
                      <q-item-label class="text-orange">{{ workout.repetitions }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-card-actions class="dark50" align="center">
                  <q-btn square color="teal-8" size="12px" icon="add">
                    <q-tooltip class="bg-teal">Add to plan</q-tooltip>
                  </q-btn>
                  <q-btn square color="teal-8" size="12px" icon="edit" @click="handleEditWorkout(workout)">
                    <q-tooltip class="bg-teal">Edit workout</q-tooltip>
                  </q-btn>
                  <q-btn square color="red-8" size="12px" icon="delete" @click="workoutStore.deleteWorkout(workout.id)">
                    <q-tooltip class="bg-red">Delete workout</q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-scroll-area>

        <!-- Create Workout Modal -->
        <q-dialog v-model="showCreateWorkoutDialog">
          <q-card class="my-card bg-dark" style="width: 80%">
            <div
              class="col bg-teal row justify-center items-center"
              style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px"
            >
              <div class="text-h4">Create New Workout</div>
            </div>

            <q-form @submit="createWorkout()" class="q-gutter-y-xl q-mx-md q-pa-sm">
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
                    <q-btn label="Submit" type="submit" color="teal" />
                    <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                  </div>
                </div>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- Edit Workout Modal -->
        <q-dialog v-model="showEditWorkoutDialog">
          <q-card class="my-card bg-dark" style="width: 80%">
            <div
              class="col bg-teal row justify-center items-center"
              style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px"
            >
              <div class="text-h4">Edit Workout</div>
            </div>

            <q-form @submit="submitEditWorkout(editWorkout)" class="q-gutter-y-xl q-mx-md q-pa-md">
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
                    <q-btn label="Submit" type="submit" color="teal" />
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
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useWorkoutStore } from 'src/stores/workoutstore.js'
import { useInitStore } from 'src/stores/initstore.js'
import { useUserStore } from 'src/stores/userstore.js'

export default {
  setup() {
    //Imports
    const $q = useQuasar()
    const workoutStore = useWorkoutStore()
    const initStore = useInitStore()
    const userStore = useUserStore()

    let showCreateWorkoutDialog = ref(false)
    let showEditWorkoutDialog = ref(false)
    let editWorkout = ref(null)
    const weightMetric = ref(null)

    if (!workoutStore.workouts.length) {
      workoutStore.getWorkouts()
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
        opacity: 0.1,
      },

      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '5px',
        opacity: 1,
      },

      showCreateWorkoutDialog,
      showEditWorkoutDialog,
      editWorkout,
      weightMetric,

      async createWorkout() {
        await workoutStore.createWorkout()
        this.showCreateWorkoutDialog = false
      },

      handleEditWorkout(workout) {
        this.editWorkout = { ...workout }
        this.showEditWorkoutDialog = true
      },

      async submitEditWorkout(editWorkout) {
        let response = await workoutStore.editWorkout(editWorkout)
        this.showEditWorkoutDialog = response ? true : false
      },
    }
  },
}
</script>
