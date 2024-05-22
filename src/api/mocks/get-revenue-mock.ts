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

      // Simulate revenue with seasonal effect
      const baseRevenue = 300 // average base revenue
      const seasonalMultiplier = 170 // amplitude of seasonal variation
      const value = baseRevenue + seasonalMultiplier * seasonalEffect + Math.random() * 100

      return {
        date,
        value,
      }
    })

    return HttpResponse.json(revenueHistory)
  },
)
