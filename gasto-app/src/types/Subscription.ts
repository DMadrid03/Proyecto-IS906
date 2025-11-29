export type Currency = 'HNL' | 'USD'

export type Frequency = 'MONTHLY' | 'ANNUAL'

export interface Subscription {
  id?: number
  name: string
  price: number
  currency: Currency
  frequency: Frequency
  fechaPago: number   // así como viene del backend
}

