<template>
  <q-card class="my-card bg-dark" :style="$q.screen.lt.md ? 'height: 100%' : 'width: 700px; max-height: 90vh;'">
    <!-- Header bar with dynamic title (Edit/Create) and close button -->
    <q-bar class="bg-teal text-white q-mb-md">
      <div class="text-h6">{{ isEdit ? 'Edit Workout' : 'Create New Workout' }}</div>
      <q-space />
      <q-btn flat dense round icon="close" v-close-popup>
        <q-tooltip class="bg-red">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <!-- Workout form -->
    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-lg q-mx-md q-ma-lg">
      <!-- Workout name -->
      <q-input
        v-model="form.workoutName"
        label-color="orange"
        label="Workout Name *"
        filled
        :rules="[rules.required, rules.max255]"
      />

      <!-- Weight + Weight Metric fields -->
      <div class="row">
        <!-- Numeric weight -->
        <div class="col-8">
          <q-input
            v-model.number="form.weight"
            class="q-mr-md"
            type="number"
            label-color="orange"
            label="Weight"
            filled
            :rules="[rules.numericOrEmpty, rules.min0]"
          >
            <template v-slot:prepend>
              <q-icon name="fitness_center" color="primary" />
            </template>
          </q-input>
        </div>

        <!-- Weight metric dropdown-->
        <div class="col-4">
          <q-select
            auto-width
            class="primary-shadow"
            label-color="orange"
            dark
            bg-color="dark"
            v-model="form.weightMetric"
            :options="initStore.weightMetrics"
            option-label="abbreviation"
            :emit-value="false"
            map-options
            label="Weight Metric"
            :behavior="$q.screen.lt.md ? 'dialog' : 'menu'"
            popup-content-class="teal-dropdown"
            filled
            :rules="[rules.required]"
          />
        </div>
      </div>

      <!-- Duration field (formats to seconds on v-model) -->
      <q-input
        class="primary-shadow q-pb-none"
        label-color="orange"
        v-model="durationFormatted"
        mask="##:##:##"
        placeholder="Hours:Minutes:Seconds"
        label="Duration"
        filled
        :rules="[rules.duration]"
      >
        <template v-slot:prepend>
          <q-icon name="access_time" color="red" />
        </template>
      </q-input>

      <!-- Sets -->
      <q-input
        v-model.number="form.sets"
        type="number"
        class="primary-shadow"
        label-color="orange"
        label="Sets *"
        filled
        :rules="[rules.required, rules.integer, rules.min0]"
      >
        <template v-slot:prepend>
          <q-icon name="format_list_numbered" color="green" />
        </template>
      </q-input>

      <!-- Repetitions -->
      <q-input
        v-model.number="form.repetitions"
        type="number"
        class="primary-shadow"
        label-color="orange"
        label="Repetitions *"
        filled
        :rules="[rules.required, rules.integer, rules.min0]"
      >
        <template v-slot:prepend>
          <q-icon name="repeat" color="blue" />
        </template>
      </q-input>

      <!-- Action buttons -->
      <q-card-actions align="right" class="q-pt-md">
        <!-- Dismiss just closes the dialog -->
        <q-btn
          label="Dismiss"
          color="orange"
          text-color="white"
          unelevated
          class="q-px-xl no-border-radius"
          style="min-width: 100px"
          v-close-popup
        />
        <!-- Submit triggers form validation + emit -->
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
import { reactive, watch, computed } from 'vue'
import { useInitStore } from 'src/stores/initStore.js'
import { secondsToDuration, durationToSeconds } from 'src/helpers/time.js'
import { validationRules as rules } from 'src/validation/genericRules.js'

// Props: parent provides modelValue and edit mode flag
const props = defineProps({
  modelValue: { type: Object, required: true },
  isEdit: { type: Boolean, default: false },
})

// Events: update parent modelValue (v-model) and submit final payload
const emits = defineEmits(['update:modelValue', 'submit'])

// Global store for dropdown options
const initStore = useInitStore()

// Local reactive copy of form data (decouples child from parent)
const form = reactive(JSON.parse(JSON.stringify(props.modelValue)))

/**
 * Keep form synced with parent prop (two-way binding)
 * - Vue 3.3 seems to have an easier way to do this using new defineModel approach
 * - maybe i'll update this in the future :)
 */
watch(
  () => props.modelValue,
  (val) => Object.assign(form, val),
  { deep: true }
)
watch(form, (val) => emits('update:modelValue', val), { deep: true })

// Computed bridge for duration: user sees HH:MM:SS, model stores seconds
const durationFormatted = computed({
  get: () => secondsToDuration(form.duration, { clockStyle: true }),
  set: (val) => {
    form.duration = durationToSeconds(val)
  },
})

// Submit handler: validate via Quasar, then emit full form payload
function handleSubmit() {
  emits('submit', { ...form })
}
</script>
