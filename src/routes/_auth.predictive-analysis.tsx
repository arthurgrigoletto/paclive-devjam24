import 'chart.js/auto' // necessary for chart.js to work properly

import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'

import { getRevenue } from '@/api/get-revenue'
import { predict } from '@/api/predict'
import { DatePicker } from 'antd'

export const Route = createFileRoute('/_auth/predictive-analysis')({
  component: CreatePredictiveAnalysisPage,
})

function CreatePredictiveAnalysisPage() {
  return (
    <section className="flex flex-col space-y-8 bg-[#F5F7FA]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Link className="inline-flex items-center gap-2" to="/">
            <ArrowLeft className="size-3" />
            <span className="text-sm font-normal text-[#181F25] underline">
              Back to All Events
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-[#181F25]">
            Revenue Forecast
          </h2>
        </div>
      </div>
      <div>{createRevenueWithForecastChart()}</div>
    </section>
  )
}

function createRevenueWithForecastChart() {
  const [consolidated, setConsolidated] = useState(true)

  // Set default forecast end date to 1 year from now
  const defaultForecastEnd = new Date()
  defaultForecastEnd.setDate(defaultForecastEnd.getDate() + 365)

  const [forecastEnd, setForecastEnd] = useState(defaultForecastEnd)

  const { data: revenue, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['revenue'],
    queryFn: getRevenue,
  })

  const handleDateChange = (event) => {
    setForecastEnd(new Date(event))
  }

  const calculateForecastPeriods = (startDate, endDate) => {
    const periods = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      periods.push({ date: currentDate.toISOString().split('T')[0], value: 0 })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return periods
  }

  const startDate = new Date()
  const forecastPeriods = calculateForecastPeriods(startDate, forecastEnd)

  const { data: forecast, isLoading: isLoadingForecast } = useQuery({
    queryKey: ['predict', revenue, forecastEnd],
    queryFn: () => predict(revenue, forecastPeriods),
    enabled: !!revenue, // ensures the query only runs if revenue is available
  })

  if (isLoadingRevenue || isLoadingForecast) {
    return <div>Loading...</div>
  }

  if (!revenue || !forecast) {
    return <div>Error loading data</div>
  }

  const consolidateDataPerMonth = (data) => {
    const consolidatedData = {}

    data.forEach(({ date, value }) => {
      const [year, month] = date.split('-')
      const key = `${year}-${month}`

      if (!consolidatedData[key]) {
        consolidatedData[key] = { date: key, value: 0 }
      }

      consolidatedData[key].value += value
    })

    return Object.values(consolidatedData)
  }

  const handleConsolidate = () => {
    setConsolidated(!consolidated)
  }

  const displayedRevenue = consolidated
    ? consolidateDataPerMonth(revenue)
    : revenue
  const displayedForecast = consolidated
    ? consolidateDataPerMonth(forecast)
    : forecast

  if (
    consolidated &&
    displayedRevenue[displayedRevenue.length - 1].date ===
    displayedForecast[0].date
  ) {
    displayedForecast[0].value +=
      displayedRevenue[displayedRevenue.length - 1].value
    displayedForecast.unshift(displayedRevenue[displayedRevenue.length - 2])
  } else if (!consolidated) {
    displayedForecast.unshift(displayedRevenue[displayedRevenue.length - 1])
  }

  const allDates = new Set([
    ...displayedRevenue.map((entry) => entry.date),
    ...displayedForecast.map((entry) => entry.date),
  ])
  const chartLabels = Array.from(allDates).sort(
    (a, b) => new Date(a) - new Date(b),
  )

  const revenueData = chartLabels.map((date) => {
    const entry = displayedRevenue.find((entry) => entry.date === date)
    return entry ? entry.value : null
  })

  const forecastData = chartLabels.map((date) => {
    const entry = displayedForecast.find((entry) => entry.date === date)
    return entry ? entry.value : null
  })

  const chartData = {
    labels: chartLabels.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        fill: true,
        borderColor: 'rgba(24,31,36,1)',
        backgroundColor: 'rgba(24,31,36,1)',
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0.1,
      },
      {
        label: 'Forecast',
        data: forecastData,
        fill: true,
        borderColor: 'rgba(181,8,43,1)',
        backgroundColor: 'rgba(181,8,43,1)',
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0.1,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="forecast-end"
          >
            Forecast End Date:{' '}
          </label>
          <DatePicker
                id={"forecast-end"}
                className="h-10"
                format={'MM/DD/YYYY'}
                value={dayjs(forecastEnd.toISOString().split('T')[0])}
                onChange={(value) => handleDateChange(value.toDate())}
              />
        </div>
        <button
          onClick={handleConsolidate}
          type="submit"
          className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border bg-[#B5082A] p-3 px-3 py-2 text-base font-bold text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
        >
          {consolidated ? 'Show Daily Data' : 'Consolidate Monthly Data'}
        </button>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}
