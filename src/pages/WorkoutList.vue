<template>
  <q-page>
    <div align="right">
      <q-btn
        color="teal"
        class="q-mt-md q-mr-xl"
        @click="showCreateWorkoutDialog = true"
        text-color="white"
        unelevated
        icon="add"
        label="Create Workout"/>
    </div>
    <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 800px; max-width: 100%;">
      <div class="row">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="workout in workoutStore.workouts"
          :key="workout"
        >
          <q-card class="my-card q-ma-xl bg-dark text-white" flat bordered>
            <q-card-section class="dark50">
              <div class="text-h6 q-ml-md">{{ workout.workoutName }}</div>
            </q-card-section>

            <q-list class="text-body1 q-my-sm q-ml-md" horizontal>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="primary" name="fitness_center" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Weight</q-item-label>
                  <q-item-label class="text-orange">{{ workout.weight }} KG</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="red" name="timer" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Duration</q-item-label>
                   <q-item-label class="text-orange">{{ workout.duration }} Mins</q-item-label>
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

            <q-card-actions class="dark50" align="around">
              <q-btn square color="teal-8" size="12px" icon="add" label="Add to Plan"/>
              <q-btn square color="red-8" size="12px" icon="delete" @click="workoutStore.deleteWorkout(workout.id)" label="Delete"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
    
    <q-dialog v-model="showCreateWorkoutDialog">
      <q-card class="my-card bg-dark" style="width: 80%">
        <q-section>
          <div class="col bg-teal row justify-center items-center" style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px;">
            <div class="text-h4"><q-icon name="create" /> Create New Workout</div>
          </div>
        </q-section>

        <q-form
          @submit="workoutStore.createWorkout"
          @reset="onReset"
          class="q-gutter-y-xl q-mx-md q-pa-md"
        >
          <q-input 
            v-model="workoutStore.formData.workout.workoutName" 
            style="box-shadow: 0 1px 0 0 teal;"
            input-style="color: white"
            label-color="orange" 
            color="teal" 
            label="Workout Name *"
            class="q-pt-md"
            filled
          />

          <q-input 
            v-model="workoutStore.formData.workout.repetitions"
            type="number"
            style="box-shadow: 0 1px 0 0 teal;" 
            label-color="orange" 
            input-style="color: white"
            color="teal" 
            label="Repetitions *"
            filled
          />

          <q-input 
            v-model="workoutStore.formData.workout.sets"
            type="number"
            style="box-shadow: 0 1px 0 0 teal;" 
            label-color="orange" 
            input-style="color: white"
            color="teal" 
            label="Sets *"
            filled
          />

          <q-input 
            v-model="workoutStore.formData.workout.weight"
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
            v-model="workoutStore.formData.workout.duration"
            prefix="(Secs): "
            type="number"
            style="box-shadow: 0 1px 0 0 teal;" 
            label-color="orange" 
            input-style="color: white"
            color="teal" 
            label="Duration"
            filled
          />

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
</template>

<script>
  import { useQuasar } from "quasar";
  import { ref } from "vue";
  import { useWorkoutStore } from "stores/workoutStore.js"

  export default {
    setup() {
      const $q = useQuasar();
      const workoutStore = useWorkoutStore();
      workoutStore.getWorkouts();
      let showCreateWorkoutDialog = ref(false);
      let hoveredCard = ref();

      return {
        workoutStore,
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
        showCreateWorkoutDialog,
        hoveredCard,
      };
    },
  };
</script>
