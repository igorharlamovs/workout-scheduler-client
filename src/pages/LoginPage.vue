<template>
  <div class="fit column justify-center content-center">
    <div class="q-mt-xl bg-dark" style="box-shadow: 2px 2px 10px 2px rgb(0, 0, 0); overflow: auto; min-width: 600px">
      <div class="row">
        <div class="col">
          <div
            class="col row justify-center items-center"
            style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px"
          >
            <div class="text-h4 text-teal"><q-icon name="person" /> Login</div>
          </div>

          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md q-mx-xl q-pa-md">
            <q-input
              v-model="email"
              label="Email *"
              input-style="color: white"
              label-color="orange"
              color="teal"
              class="q-pt-md primary-shadow"
              filled
            />

            <q-input
              v-model="password"
              input-style="color: white"
              label-color="orange"
              color="teal"
              label="Password *"
              class="q-pt-md primary-shadow"
              filled
            />

            <div>
              <div class="row q-mt-xl">
                <div class="col-12">
                  <div class="row">
                    <div class="col-8" align="right">
                      <q-btn label="Submit" type="submit" color="teal" />
                      <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useInitStore } from 'src/stores/initstore.js'

const initStore = useInitStore()

export default {
  setup() {
    const $q = useQuasar()

    const email = ref(null)
    const password = ref(null)

    return {
      email,
      password,

      async onSubmit() {
        await initStore.login(email.value, password.value)
      },
    }
  },
}
</script>
