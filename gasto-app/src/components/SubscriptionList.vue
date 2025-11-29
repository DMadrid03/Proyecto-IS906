<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSubscriptions } from '@/composables/useSubscription'
import SubscriptionCard from './SubscriptionCard.vue'
import SubscriptionForm from './SubscriptionForm.vue'
import type { Subscription } from '@/types/Subscription'

const {
  subscriptions,
  totalMonthly,
  fetchSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = useSubscriptions()

const showModal = ref(false)
const editing = ref<Subscription | null>(null)

function openCreate() {
  editing.value = null
  showModal.value = true
}

function openEdit(sub: Subscription) {
  editing.value = { ...sub }
  showModal.value = true
}

async function handleSave(data: Subscription) {
  if (editing.value) {
    await updateSubscription(data.id!, data)
  } else {
    await createSubscription(data)
  }

  showModal.value = false
  await fetchSubscriptions()
}

async function handleDelete(id: number) {
  await deleteSubscription(id)
  await fetchSubscriptions()
}

onMounted(fetchSubscriptions)
</script>

<template>
  <section class="max-w-3xl mx-auto p-4">
    <header class="mb-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Mis Suscripciones</h1>
        <p class="text-gray-600">
          Gasto mensual estimado:
          <span class="font-semibold">{{ totalMonthly.toFixed(2) }}</span> Lps
        </p>
      </div>

      <button
        @click="openCreate"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Agregar
      </button>
    </header>

    <p v-if="subscriptions.length === 0" class="text-gray-500">
      No hay suscripciones registradas.
    </p>

    <div class="grid gap-4 mt-4">
      <SubscriptionCard
        v-for="item in subscriptions"
        :key="item.id"
        :subscription="item"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded shadow-lg w-full max-w-lg p-4 relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
          @click="showModal = false"
        >
          ✕
        </button>

        <SubscriptionForm
          :model-value="editing"
          @save="handleSave"
          @cancel="showModal = false"
        />
      </div>
    </div>
  </section>
</template>
