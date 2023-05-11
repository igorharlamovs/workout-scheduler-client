<template>
  <q-page class="flex">
    <div>
      <q-btn
        color="white"
        text-color="black"
        label="Load Users"
        @click="loadUsers()"
      />

      <q-btn
        color="white"
        text-color="black"
        label="Clear Users"
        @click="clearUsers()"
      />
    </div>

    <div v-if="!users.length">
      <q-banner rounded class="bg-purple-8 text-white">
        <p>No users loaded</p>
      </q-banner>
    </div>
    <div v-else class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator>
        <template v-for="user in users" :key="user.id">
          <q-item clickable v-ripple>
            <q-item-section>{{ user.name }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const $q = useQuasar();
    const users = ref([]);
    const test = ref(null);

    function loadUsers() {
      api
        .get("/users")
        .then((response) => {
          users.value = response.data;

          $q.notify({
            color: "positive",
            position: "top-right",
            message: "Successfully retrieved users",
            icon: "done",
          });
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top-right",
            message: "Error retrieving users",
            icon: "report_problem",
          });
        });
    }

    function clearUsers() {
      users.value = [];
    }

    return { users, loadUsers, test, clearUsers };
  },
});
</script>
