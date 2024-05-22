import { api } from '@/lib/axios'

import { RevenueRecord } from './get-revenue'

export interface PredictResponse {
  date: Date
  value: number
}

export interface ForecastItem {
  date: Date
  value: number
}

export async function predict(
  history: Array<RevenueRecord>,
  forecast: Array<ForecastItem>,
) {
  const response = await api.post<Array<PredictResponse>>(
    'http://127.0.0.1:5000/predict',
    {
      history,
      forecast,
    },
  )

  return response.data
}
