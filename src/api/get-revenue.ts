import { api } from '@/lib/axios'

export interface RevenueRecord {
  date: Date
  value: number
}

export async function getRevenue() {
  const response = await api.get<Array<RevenueRecord>>('/revenue')

  return response.data
}
