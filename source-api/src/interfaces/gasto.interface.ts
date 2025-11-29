export interface Gasto {
  id: number
  descripcion: string
  monto: number
  fechaPago: number
  frecuencia: 'MONTHLY' | 'ANNUAL'
}

export interface GastoUpdate {
  descripcion?: string
  monto?: number
  fechaPago?: number
  frecuencia?: 'MONTHLY' | 'ANNUAL'
}
