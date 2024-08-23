<template>
<q-page>
    <div class="fit column justify-center content-center">
      <div class="q-mt-xl bg-dark" style="box-shadow: 2px 2px 10px 2px rgb(0, 0, 0); overflow: auto; min-width: 600px;">
        <div class="row">
          <div class="col">

            <div class="col row justify-center items-center" style="box-shadow: 0 1px 10px 0 teal; overflow: auto; min-height: 100px;">
              <div class="text-h4 text-teal"><q-icon name="person" /> Update Profile</div>
            </div>

            <q-form
              @submit="userStore.updateUser"
              class="q-gutter-y-md q-mx-xl q-pa-md"
            >
              <q-input 
                v-model="userStore.user.name"
                input-style="color: white"
                label-color="orange" 
                color="teal" 
                label="User Name"
                class="q-pt-md primary-shadow"
                filled
              />

              <q-input 
                v-model="userStore.user.email"
                input-style="color: white"
                label-color="orange" 
                color="teal" 
                label="Email"
                class="q-pt-md primary-shadow"
                filled
              />

              <q-select
                filled
                class="q-pt-md primary-shadow"
                input-style="color: white"
                label-color="orange"
                dark
                bg-color="dark"
                color="teal"
                v-model="userStore.user.userSettings.weightMetric"
                :options="initStore.weightMetrics"
                option-label="metricName"
                option-value="id"
                emit-value
                map-options
                label="Weight Metric"
              />

              <div>
                <div class="row q-mt-xl">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-8" align="right">
                        <q-btn label="Update" type="submit" color="teal"/>
                        <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                      </div>
                      <div class="col-4" align="right">
                        <q-btn label="Logout" @click="initStore.logout" type="logout" color="orange" flat class="q-ml-sm q-ml-xl"/>
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
  </q-page>
</template>
  
<script>
  import { useUserStore } from "stores/userStore.js";
  import { useInitStore } from "stores/initStore.js";
  import { LocalStorage } from "quasar";
    
  export default {

    setup() {
      const userStore = useUserStore();
      const initStore = useInitStore();

      console.log(LocalStorage.getItem("userSettings"));

      return {
        userStore,
        initStore,
      };
    },
  };
</script>
  