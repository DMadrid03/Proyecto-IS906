import { ref, computed } from 'vue'
import type { Subscription } from '@/types/Subscription'
import { gastoApi } from '@/api/gastoApi'

/**
 * Tasa fija 
 * 1 dolar = 26 Lps
 */
const USD_TO_HNL = 26

export function useSubscriptions() {
  const subscriptions = ref<Subscription[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Obtener todas las suscripciones ---
  const fetchSubscriptions = async () => {
    try {
      loading.value = true
      error.value = null

      const { data } = await gastoApi.get('/gastos')

      subscriptions.value = data.map((g: any) => ({
        id: g.id,
        name: g.descripcion,
        price: Number(g.monto),
        fechaPago: g.fechaPago,
        frequency: g.frecuencia ?? 'MONTHLY',
        currency: 'HNL'
      }))

    } catch (err: any) {
      error.value = err.message || 'Error al cargar suscripciones'
    } finally {
      loading.value = false
    }
  }

  // --- Crear una suscripción ---
  const createSubscription = async (payload: Subscription) => {

    // Convertir USD → HNL si es necesario
    const montoEnLps = payload.currency === 'USD'
      ? payload.price * USD_TO_HNL
      : payload.price

    // Body que se enviará al backend (sin currency)
    const body = {
      descripcion: payload.name,
      monto: montoEnLps,
      fechaPago: payload.fechaPago,
      frecuencia: payload.frequency
    }

    // Petición al backend
    const { data } = await gastoApi.post('/gastos', body)

    // Refrescar estado local
    subscriptions.value.push({
      id: data.id,
      name: data.descripcion,
      price: Number(data.monto),
      fechaPago: data.fechaPago,
      frequency: data.frecuencia,
      currency: 'HNL' // Siempre HNL en la interfaz
    })
  }



  // --- Actualizar una suscripción ---
  const updateSubscription = async (id: number, payload: Subscription) => {
    const { data } = await gastoApi.put(`/gastos/${id}`, payload)

    const index = subscriptions.value.findIndex(item => item.id === id)
    if (index !== -1) subscriptions.value[index] = data
  }

  // --- Eliminar una suscripción ---
  const deleteSubscription = async (id: number) => {
    await gastoApi.delete(`/gastos/${id}`)
    subscriptions.value = subscriptions.value.filter(item => item.id !== id)
  }

  /**
   * Normalizar precio mensual:
   * - Mensual: precio normal
   * - Anual: precio / 12
   * - USD: convertir a HNL
   */
  const normalizePrice = (item: Subscription): number => {
    let monthly = item.price

    // Frecuencia
    if (item.frequency === 'ANNUAL') {
      monthly = monthly / 12
    }

    // Conversión de moneda
    if (item.currency === 'USD') {
      monthly = monthly * USD_TO_HNL
    }

    return monthly
  }

  // funcion para calcular el total mensual de todas las suscripciones
  const totalMonthly = computed(() =>
    subscriptions.value.reduce((sum, item) => sum + normalizePrice(item), 0)
  );


  return {
    // State
    subscriptions,
    loading,
    error,

    // Computed
    totalMonthly,

    // Methods
    fetchSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription
  }
}
