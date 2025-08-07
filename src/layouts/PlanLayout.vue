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
        <q-input style="width: 20%" dark dense standout>
          <template v-slot:append>
            <q-icon name="search" />
            <!-- <q-icon v-else name="clear" class="cursor-pointer" @click="searchWorkoutText = ''" /> -->
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <!-- Plan List -->
        <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 800px; max-width: 100%">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="workout in workoutStore.workouts" :key="workout"></div>
          </div>
        </q-scroll-area>

        <!-- Create Plan Modal -->
        <q-dialog class="q-mx-md" v-model="showCreatePlanDialog">
          <q-card class="my-card bg-dark" style="width: 80%">
            <div class="col row justify-center items-center q-mb-md" style="box-shadow: 0 1px 5px 0 teal; min-height: 80px">
              <div class="text-h4 text-teal">Create Plan</div>
            </div>

            <q-form @submit="createPlan()" class="q-pa-md">
              <q-input
                v-model="planStore.formData.plan.planName"
                class="q-pt-md primary-shadow"
                input-style="color: white"
                label-color="orange"
                color="teal"
                label="Plan Name *"
                filled
              />

              <q-list>
                <q-separator spaced />
                <q-item-label class="text-orange" header>Week Days</q-item-label>

                <q-item v-for="day in planStore.weekDays" :key="day.day" tag="label" v-ripple class="q-mb">
                  <q-item-section side middle>
                    <q-checkbox v-model="day.selected" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-capitalize text-teal">{{ day.day }}</q-item-label>

                    <q-input
                      class="primary-shadow q-pb-none"
                      filled
                      v-model="day.start_time"
                      mask="time"
                      :rules="['time']"
                      :disable="!day.selected"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" color="orange" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="day.start_time">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-scroll-area
                class="woodbg"
                :bar-style="barStyle"
                :thumb-style="thumbStyle"
                style="height: 400px; max-width: 100%"
              >
                <div class="row">
                  <div class="col-xs-12" v-for="workout in workoutStore.workouts" :key="workout">
                    <q-card class="my-card q-my-xs q-mx-md bg-dark text-white" flat bordered>
                      <q-expansion-item expand-separator :label="workout.workoutName">
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
                                {{ workout.duration }} {{ workout.timeMetric.abbreviation }}
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
                        </q-card-actions>
                      </q-expansion-item>
                    </q-card>
                  </div>
                </div>
              </q-scroll-area>

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
import { usePlanStore } from 'src/stores/planStore'
import { useInitStore } from 'initStore'
import { useUserStore } from 'src/stores/userstore.js'

export default {
  setup() {
    //Imports
    const $q = useQuasar()
    const workoutStore = useWorkoutStore()
    const planStore = usePlanStore()
    const initStore = useInitStore()
    const userStore = useUserStore()

    let showCreatePlanDialog = ref(false)
    let showEditWorkoutDialog = ref(false)
    let editWorkout = ref(null)
    const weightMetric = ref(null)

    if (!workoutStore.workouts.length) {
      workoutStore.getWorkouts()
    }

    return {
      workoutStore,
      planStore,
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

      showCreatePlanDialog,
      showEditWorkoutDialog,
      editWorkout,
      weightMetric,

      async createPlan() {
        await planStore.createPlan()
        this.showCreatePlanDialog = false
      },

      handleEditWorkout(workout) {
        this.editWorkout = workout
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
