<template>
  <q-card class="my-card bg-dark" :style="$q.screen.lt.md ? 'height: 100%' : 'width: 700px; max-height: 90vh;'">
    <!-- Header -->
    <q-bar class="bg-teal text-white q-mb-md">
      <div class="text-h6">{{ isEdit ? 'Edit Plan' : 'Create New Plan' }}</div>
      <q-space />
      <q-btn flat dense round icon="close" v-close-popup>
        <q-tooltip class="bg-red">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <!-- Form -->
    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-lg q-mx-md q-ma-lg">
      <!-- Plan Name -->
      <q-input v-model="form.planName" label="Plan Name *" label-color="orange" filled :rules="[rules.required, rules.max255]" />

      <!-- Week Days -->
      <q-list>
        <q-separator spaced />
        <q-item-label class="text-orange" header>Week Days</q-item-label>

        <q-item v-for="day in form.weekDays" :key="day.day" tag="label" v-ripple class="q-mb">
          <q-item-section side middle>
            <q-checkbox v-model="day.selected" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize text-teal">{{ day.day }}</q-item-label>

            <q-input filled class="primary-shadow q-pb-none" v-model="day.start_time" mask="time" :disable="!day.selected">
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

      <!-- Workouts in Plan -->
      <q-scroll-area
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
        style="height: 300px; max-width: 100%"
        class="woodbg q-pa-sm"
      >
        <div class="row">
          <div class="col-xs-12" v-for="workout in form.workouts" :key="workout.id">
            <q-card flat bordered class="bg-dark text-white q-my-xs">
              <q-expansion-item expand-separator :label="workout.workoutName">
                <q-list class="text-body1 q-my-sm" horizontal>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fitness_center" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Weight</q-item-label>
                      <q-item-label class="text-orange">
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
                      <q-item-label class="text-orange">{{ workout.duration }}</q-item-label>
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
              </q-expansion-item>
            </q-card>
          </div>
        </div>
      </q-scroll-area>

      <!-- Actions -->
      <q-card-actions align="right" class="q-pt-md">
        <q-btn
          label="Dismiss"
          color="orange"
          text-color="white"
          unelevated
          class="q-px-xl no-border-radius"
          style="min-width: 100px"
          v-close-popup
        />
        <q-btn
          label="Submit"
          type="submit"
          color="teal"
          text-color="white"
          unelevated
          class="q-px-lg q-py-sm no-border-radius q-ml-sm"
          style="min-width: 140px"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { validationRules as rules } from 'src/validation/genericRules.js'

// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
  isEdit: { type: Boolean, default: false },
})

// Emit
const emits = defineEmits(['update:modelValue', 'submit'])

// Reactive local form
const form = reactive(JSON.parse(JSON.stringify(props.modelValue)))

// Keep form synced with parent
watch(
  () => props.modelValue,
  (val) => Object.assign(form, val),
  { deep: true }
)
watch(form, (val) => emits('update:modelValue', val), { deep: true })

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

// Submit handler
function handleSubmit() {
  emits('submit', { ...form })
}
</script>
