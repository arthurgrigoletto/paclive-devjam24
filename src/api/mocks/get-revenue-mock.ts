import { http, HttpResponse } from 'msw'

import { GetRevenueResponse } from '../get-revenue'

export const getRevenueMock = http.get<never, never, Array<GetRevenueResponse>>(
  '/revenue',
  async () => {
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 3)

    const revenueHistory: Array<GetRevenueResponse> = Array.from({
      length: 365 * 3,
    }).map((_, index) => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + index)

      // Create a seasonal pattern with a sine wave
      const daysInYear = 365
      const radiansPerDay = (2 * Math.PI) / daysInYear
      const seasonalEffect = Math.sin(
        ((date.getTime() / (1000 * 60 * 60 * 24)) % daysInYear) * radiansPerDay,
      )

      // Create a noise component that varies over time
      const noise = Math.sin(index / 30) * 50 + Math.random() * 100

      // Simulate revenue with seasonal effect and noise
      const baseRevenue = 250 // average base revenue
      const seasonalMultiplier = 170 // amplitude of seasonal variation
      const value = baseRevenue + seasonalMultiplier * seasonalEffect + noise

      return {
        date,
        value,
      }
    })

    return HttpResponse.json(revenueHistory)
  },
)
