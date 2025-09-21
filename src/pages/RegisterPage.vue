<template>
  <q-page class="flex column items-center" :class="$q.screen.lt.md ? 'justify-start' : 'justify-center'">
    <q-card
      class="bg-dark"
      :class="$q.screen.lt.md ? 'q-pa-lg full-width full-height no-radius' : 'q-pa-xl'"
      :style="$q.screen.lt.md ? '' : 'width: 600px; box-shadow: 0 2px 12px rgba(0,0,0,0.8)'"
    >
      <!-- Header -->
      <div class="col row justify-center items-center" style="min-height: 100px">
        <div class="text-h4 text-teal"><q-icon name="person_add" /> Register Account</div>
      </div>

      <!-- Registration Form -->
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
        <q-input
          filled
          v-model="name"
          label="Name *"
          input-style="color: white"
          label-color="orange"
          color="teal"
          class="primary-shadow"
          :rules="[rules.required, rules.max255]"
        />

        <q-input
          filled
          v-model="email"
          type="email"
          label="Email *"
          input-style="color: white"
          label-color="orange"
          color="teal"
          class="primary-shadow"
          :rules="[rules.required, rules.max255]"
        />

        <q-input
          filled
          v-model="password"
          type="password"
          label="Password *"
          input-style="color: white"
          label-color="orange"
          color="teal"
          class="primary-shadow"
          :rules="[rules.required, rules.max255]"
        />

        <q-input
          filled
          v-model="passwordConfirm"
          type="password"
          label="Confirm Password *"
          input-style="color: white"
          label-color="orange"
          color="teal"
          class="primary-shadow"
          :rules="[rules.required, rules.max255]"
        />

        <!-- Actions -->
        <div class="row q-mt-lg justify-end">
          <q-btn label="Register" type="submit" color="teal" class="q-px-md" />
          <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm q-px-md" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { validationRules as rules } from 'src/validation/genericRules.js'

const $q = useQuasar()

// Form fields
const name = ref(null)
const email = ref(null)
const password = ref(null)
const passwordConfirm = ref(null)

async function onSubmit() {
  try {
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    })

    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Registration successful!',
    })
  } catch (error) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Registration failed. Please try again.',
    })
  }
}

function onReset() {
  name.value = null
  email.value = null
  password.value = null
  passwordConfirm.value = null
}
</script>
