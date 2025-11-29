<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Subscription, Currency, Frequency } from '@/types/Subscription'

// Props
const props = defineProps<{
  modelValue?: Subscription | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'save', value: Subscription): void
  (e: 'cancel'): void
}>()


const currencyOptions: Currency[] = ['HNL', 'USD']
const frequencyOptions: Frequency[] = ['MONTHLY', 'ANNUAL']

// Estado del formulario
const form = reactive<Subscription>({
  id: props.modelValue?.id,
  name: props.modelValue?.name ?? '',
  price: props.modelValue?.price ?? 0,
  currency: props.modelValue?.currency ?? 'HNL',
  frequency: props.modelValue?.frequency ?? 'MONTHLY',
  fechaPago: props.modelValue?.fechaPago ?? 1
})

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      form.id = value.id
      form.name = value.name
      form.price = value.price
      form.currency = value.currency
      form.frequency = value.frequency
      form.fechaPago = value.fechaPago
    } else {
      // Reset para creación
      form.id = undefined
      form.name = ''
      form.price = 0
      form.currency = 'HNL'
      form.frequency = 'MONTHLY'
      form.fechaPago = 1
    }
  }
)


const isEdit = computed(() => form.id != null)


// Enviar datos al padre
function onSubmit() {
  
  const data = { ...form }
  console.log("ENVIANDO...",data)

  // Si es creación → eliminar id
  if (!isEdit.value) {
    delete data.id
  }

  emit('save', data)
}

</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4 p-4 bg-white shadow rounded">

    <h2 class="text-xl font-semibold mb-2">
      {{ isEdit ? 'Editar Suscripción' : 'Nueva Suscripción' }}
    </h2>

    <!-- Nombre -->
    <div>
      <label class="block text-sm font-medium">Nombre del servicio</label>
      <input
        v-model="form.name"
        type="text"
        required
        class="w-full p-2 border rounded"
        placeholder="Netflix, Spotify…"
      />
    </div>

    <!-- Precio -->
    <div>
      <label class="block text-sm font-medium">Precio</label>
      <input
        v-model.number="form.price"
        type="number"
        min="0"
        required
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- Moneda -->
    <div>
      <label class="block text-sm font-medium">Moneda</label>
      <select v-model="form.currency" class="w-full p-2 border rounded">
        <option v-for="c in currencyOptions" :key="c" :value="c">
          {{ c }}
        </option>
      </select>
    </div>

    <!-- Frecuencia -->
    <div>
      <label class="block text-sm font-medium">Frecuencia</label>
      <select v-model="form.frequency" class="w-full p-2 border rounded">
        <option v-for="f in frequencyOptions" :key="f" :value="f">
          {{ f }}
        </option>
      </select>
    </div>

    <!-- Día de pago -->
    <div>
      <label class="block text-sm font-medium">Día de pago</label>
      <input
        v-model.number="form.fechaPago"
        type="number"
        min="1"
        max="31"
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- Botones -->
    <div class="flex justify-end gap-2">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Cancelar
      </button>

      <button
        type="submit"
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {{ isEdit ? 'Guardar Cambios' : 'Agregar' }}
      </button>
    </div>

  </form>
</template>
