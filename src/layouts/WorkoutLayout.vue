<template>
  <q-header elevated class="bg-grey-10" height-hint="56">
    <q-toolbar class="q-gutter-sm q-py-sm">
      <!-- Create Workout Button -->
      <q-btn
        class="q-mr-sm"
        color="teal"
        @click="showCreateWorkoutDialog = true"
        text-color="white"
        unelevated
        icon="add"
        :label="$q.screen.gt.sm ? 'Create Workout' : ''"
      >
        <q-tooltip v-if="!$q.screen.gt.sm" class="bg-teal">Create Workout</q-tooltip>
      </q-btn>

      <q-space />

      <!-- Search Input -->
      <q-input
        v-model="workoutStore.searchWorkoutName"
        dense
        standout
        dark
        placeholder="Search workouts"
        :style="$q.screen.gt.sm ? 'width: 30%' : 'width: 80%'"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>
  </q-header>

  <q-page class="row no-wrap" style="height: 100%">
    <q-scroll-area class="col" style="flex: 1" :bar-style="barStyle" :thumb-style="thumbStyle">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="workout in workoutStore.searchedWorkouts" :key="workout.id">
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
                  <q-item-label class="text-orange" id="weightMetricAbbr">
                    {{ workout.weight }} {{ workout.weightMetric.abbreviation }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="red" name="timer" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Duration</q-item-label>
                  <q-item-label class="text-orange">
                    {{ secondsToDuration(workout.duration) }}
                  </q-item-label>
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

    <!-- Create Workout -->
    <q-dialog v-model="showCreateWorkoutDialog" :maximized="$q.screen.lt.md">
      <WorkoutForm v-model="workoutStore.formData.workout" :isEdit="false" @submit="createWorkout" />
    </q-dialog>

    <!-- Edit Workout -->
    <q-dialog v-model="showEditWorkoutDialog" :maximized="$q.screen.lt.md">
      <WorkoutForm v-model="editWorkout" :isEdit="true" @submit="submitEditWorkout" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useWorkoutStore } from 'src/stores/workoutStore.js'
import { secondsToDuration } from '../helpers/time.js'

// Components
import WorkoutForm from 'src/components/WorkoutForm.vue'

// Imports
const $q = useQuasar()
const workoutStore = useWorkoutStore()

// State
const showCreateWorkoutDialog = ref(false)
const showEditWorkoutDialog = ref(false)
const editWorkout = ref(null)

// Methods
const createWorkout = async (workout) => {
  await workoutStore.createWorkout(workout)
  showCreateWorkoutDialog.value = false
}

const submitEditWorkout = async (workout) => {
  // Patch only the changed fields
  const response = await workoutStore.editWorkout(workout)
  if (response) showEditWorkoutDialog.value = false
}

const handleEditWorkout = (workout) => {
  editWorkout.value = { ...workout }
  showEditWorkoutDialog.value = true
}

// Initial fetch
if (!workoutStore.workouts.length) {
  workoutStore.getWorkouts()
}

// Scroll styles
const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: 'teal',
  width: '9px',
  opacity: 0.1,
}

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: 'teal',
  width: '5px',
  opacity: 1,
}
</script>
