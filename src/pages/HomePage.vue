<template>
  <q-page class="background" background="icons/workout-scheduler-logo.png">
    <div class="q-pa-md row items-start">
      <div class="col-6 q-gutter-md"></div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { api } from 'boot/axios'

export default {
  setup() {
    const $q = useQuasar()

    return {}
  },
}
</script>
