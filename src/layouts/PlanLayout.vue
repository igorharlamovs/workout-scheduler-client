<template>
  <!-- Header -->
  <q-header elevated class="bg-grey-10" height-hint="56">
    <q-toolbar class="q-gutter-sm q-py-sm">
      <q-btn
        color="teal"
        class="q-mr-md"
        @click="showCreatePlanDialog = true"
        text-color="white"
        unelevated
        icon="add"
        label="Create Plan"
      />

      <q-space />

      <!-- Search Input -->
      <q-input
        v-model="planStore.searchPlanName"
        dense
        standout
        dark
        placeholder="Search plans"
        :style="$q.screen.gt.sm ? 'width: 30%' : 'width: 80%'"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>
  </q-header>

  <!-- Page Content -->
  <q-page class="fit row no-wrap" style="height: 100%">
    <q-scroll-area class="col fit" :bar-style="barStyle" :thumb-style="thumbStyle" style="height: 350px">
      <div class="row q-pa-sm">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-xs" v-for="plan in planStore.searchedPlans" :key="plan.id">
          <q-card flat bordered class="bg-dark text-white">
            <q-card-section>
              <div class="text-h6">{{ plan.planName }}</div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn color="teal-8" icon="edit" square dense @click="handleEditPlan(plan)">
                <q-tooltip class="bg-teal">Edit Plan</q-tooltip>
              </q-btn>
              <q-btn color="red-8" icon="delete" square dense @click="deletePlan(plan.id)">
                <q-tooltip class="bg-red">Delete Plan</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
  </q-page>

  <!-- Create/Edit Plan Dialog -->
  <q-dialog v-model="showCreatePlanDialog" :maximized="$q.screen.lt.md">
    <PlanForm v-model="editPlan" :isEdit="isEditMode" @submit="submitPlan" />
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlanStore } from 'src/stores/planStore.js'
import { useQuasar } from 'quasar'

// Components
import PlanForm from 'src/components/PlanForm.vue'

const $q = useQuasar()
const planStore = usePlanStore()

// State
const showCreatePlanDialog = ref(false)
const editPlan = ref({ planName: '', workouts: [] })
const isEditMode = ref(false)

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

// Methods
const handleEditPlan = (plan) => {
  editPlan.value = { ...plan } // make a copy
  isEditMode.value = true
  showCreatePlanDialog.value = true
}

const submitPlan = async (planData) => {
  if (isEditMode.value) {
    await planStore.editPlan(planData)
  } else {
    await planStore.createPlan(planData)
  }
  showCreatePlanDialog.value = false
  isEditMode.value = false
  editPlan.value = { planName: '', workouts: [] }
}

// Initial fetch
if (!planStore.plans.length) {
  planStore.getPlans()
}

const deletePlan = async (id) => {
  await planStore.deletePlan(id)
}
</script>
