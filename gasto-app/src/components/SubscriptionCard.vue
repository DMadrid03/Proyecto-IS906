<script setup lang="ts">
import type { Subscription } from '@/types/Subscription'

// Props
const props = defineProps<{
  subscription: Subscription
}>()

// Emits
const emit = defineEmits<{
  (e: 'edit', value: Subscription): void
  (e: 'delete', id: number): void
}>()

const handleEdit = () => {
  emit('edit', props.subscription)
}

const handleDelete = () => {
  if (props.subscription.id) {
    emit('delete', props.subscription.id)
  }
}
</script>

<template>
  <div
    class="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
  >
    <div>
      <h3 class="text-lg font-semibold">{{ subscription.name }}</h3>

      <p class="text-gray-600 text-sm">
        Precio:
        <span class="font-medium">
          {{ subscription.price }}
          {{ subscription.currency }}
        </span>
      </p>

      <p class="text-gray-600 text-sm">
        Frecuencia:
        <span class="font-medium">
          {{ subscription.frequency === 'MONTHLY' ? 'Mensual' : 'Anual' }}
        </span>
      </p>

      <p class="text-gray-600 text-sm">
        Día de pago:
        <span class="font-medium">
           {{ subscription.fechaPago ?? '—' }} de cada mes
        </span>
      </p>
    </div>

    <div class="flex gap-2">
      <button
        class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleEdit"
      >
        Editar
      </button>

      <button
        class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        @click="handleDelete"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
