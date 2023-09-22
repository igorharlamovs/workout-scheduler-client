<template>
  <div class="q-pda-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-page-container>
        <div class="q-pa-md">
          <div class="q-gutter-x-lg">
            <q-btn
              :loading="loading"
              label="Get Tasks"
              type="submit"
              color="primary"
              @click="onSubmit"
            />
            <q-btn
              label="Create Task"
              type="button"
              color="primary"
              @click="createTask = true"
            />
          </div>
        </div>

        <div class="q-pa-md row items-start">
          <div class="col-6 q-gutter-md">
            <q-card
              v-for="task in taskList"
              v-bind:key="task.id"
              clickable
              v-ripple
              class="my-card text-white"
              style="
                background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
              "
            >
              <q-card-section>
                <div class="text-h6">Title: {{ task.name }}</div>
                <div class="text-subtitle2">User: {{ task.user.name }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Description: {{ task.description }}
              </q-card-section>

              <q-card-section class="q-pt-none">
                Priority: {{ task.priority }}
              </q-card-section>
              <q-card-section class="q-gutter-x-lg">
                <q-btn
                  :loading="loading"
                  label="Update Task"
                  type="submit"
                  color="positive"
                  @click="getTaskDetails(task)"
                />
                <q-btn
                  :loading="loading"
                  label="Delete Task"
                  type="submit"
                  color="red"
                  @click="deleteTask(task)"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Priority Filtered List -->
        <div class="row">
          <div class="col-6">

            <q-list>
              <q-item
                clickable
                v-ripple
                v-for="task in lowPriorityList"
                :key="task.id"
              >
                <q-item-section>{{ task.name }}</q-item-section>
                <q-item-label caption>{{ task.priority }}</q-item-label>
              </q-item>
            </q-list>
          </div>
        </div>

        <q-dialog v-model="createTask">
          <q-card>
            <q-card-section>
              <div class="text-h6">Create Task</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input
                  filled
                  v-model="taskName"
                  label="Task Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-input
                  filled
                  v-model="taskPriority"
                  label="Task Priority"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-input
                  filled
                  type="textarea"
                  v-model="taskDescription"
                  label="Task Description"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-form>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                :loading="loading"
                label="Create Task"
                type="submit"
                color="primary"
                @click="createNewTask"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Update Task Modal -->
        <q-dialog v-model="showUpdateTaskModal">
          <q-card>
            <q-card-section>
              <div class="text-h6">Update Task</div>
            </q-card-section>

            <q-card-section class="q-pt-none" style="width: 500px">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input
                  filled
                  v-model="selectedTask.name"
                  :model-value="selectedTask.name"
                  label="Task Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-input
                  filled
                  v-model="selectedTask.priority"
                  :model-value="selectedTask.priority"
                  label="Task Priority"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-input
                  filled
                  type="textarea"
                  v-model="selectedTask.description"
                  :model-value="selectedTask.description"
                  label="Task Description"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-form>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                :loading="loading"
                label="Update Task"
                type="submit"
                color="primary"
                @click="updateTask"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const $q = useQuasar();

    const taskList = ref([]);
    const createTask = ref(false);
    const showUpdateTaskModal = ref(false);
    let taskName = ref("");
    let taskDescription = ref("");
    let taskPriority = ref("");
    let loading = ref(false);
    let selectedTask = ref({});
    const lowPriorityList = computed(() => {
      return taskList.value.filter((task) => task.priority == "low");
    });

    async function fetchData() {
      try {
        loading.value = true;
        const response = await api.get("/tasks");
        taskList.value = response.data.data;

        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Success",
        });
        loading.value = false;
      } catch (error) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: error.message,
        });
      }
    }

    async function createNewTask() {
      try {
        loading.value = true;
        let formData = {
          name: taskName.value,
          description: taskDescription.value,
          priority: taskPriority.value,
        };

        const response = await api.post("/tasks", formData);
        taskList.value.push(response.data.data);

        createTask.value = false;
        loading.value = false;
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Success",
        });
      } catch (error) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: error.message,
        });
        loading.value = false;
      }
    }

    function getTaskDetails(task) {
      showUpdateTaskModal.value = true;
      selectedTask.value = { ...task };
    }

    //Update Task
    async function updateTask() {
      try {
        loading.value = true;

        const response = await api.patch(
          `/tasks/${selectedTask.value.id}`,
          selectedTask.value
        );

        // Use .map to create a new array with the updated task
        const updatedTaskList = taskList.value.map((task) =>
          task.id === selectedTask.value.id ? response.data.data : task
        );

        // Update the taskList with the new array containing the updated task
        taskList.value = updatedTaskList;

        showUpdateTaskModal.value = false;
        loading.value = false;
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Success",
        });
      } catch (error) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: error.message,
        });
        loading.value = false;
      }
    }

    async function deleteTask(task) {
      try {
        loading.value = true;

        const response = await api.delete(`/tasks/${task.id}`, task);

        await fetchData();

        showUpdateTaskModal.value = false;
        loading.value = false;
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Success",
        });
      } catch (error) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: error.message,
        });
        loading.value = false;
      }
    }

    return {
      taskList,
      onSubmit: fetchData,
      createTask,
      showUpdateTaskModal,
      taskName,
      taskDescription,
      taskPriority,
      createNewTask,
      loading,
      lowPriorityList,
      getTaskDetails,
      selectedTask,
      updateTask,
      deleteTask,
    };
  },
};
</script>
