<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
        />
        <q-chat-message
          :name="firstName"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
        />
      </div>
      <div>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  setup() {
    const firstName = "Igors";
    const tabs = [
      {
        id: 1,
        icon: "map",
        to: "/your/route",
        replace: true,
        label: "One tab",
      },

      {
        id: 2,
        icon: "assignment",
        to: "/some/other/route",
        replace: true,
        label: "Other tab",
      },
    ];

    return {
      firstName,
      tabs,
    };
  },
};
</script>
