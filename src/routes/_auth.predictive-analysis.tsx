import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // necessary for chart.js to work properly
import { getRevenue } from '@/api/get-revenue';
import { predict } from '@/api/predict';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/predictive-analysis')({
  component: PredictiveAnalysisPage,
});

function PredictiveAnalysisPage() {
  const [consolidated, setConsolidated] = useState(false);

  // Set default forecast end date to 90 days from now
  const defaultForecastEnd = new Date();
  defaultForecastEnd.setDate(defaultForecastEnd.getDate() + 90);

  const [forecastEnd, setForecastEnd] = useState(defaultForecastEnd);

  const { data: revenue, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['revenue'],
    queryFn: getRevenue,
  });

  const handleDateChange = (event) => {
    setForecastEnd(new Date(event.target.value));
  };

  const calculateForecastPeriods = (startDate, endDate) => {
    const periods = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      periods.push({ date: currentDate.toISOString().split('T')[0], value: 0 });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return periods;
  };

  const startDate = new Date();
  const forecastPeriods = calculateForecastPeriods(startDate, forecastEnd);

  const { data: forecast, isLoading: isLoadingForecast } = useQuery({
    queryKey: ['predict', revenue, forecastEnd],
    queryFn: () => predict(revenue, forecastPeriods),
    enabled: !!revenue, // ensures the query only runs if revenue is available
  });

  if (isLoadingRevenue || isLoadingForecast) {
    return <div>Loading...</div>;
  }

  if (!revenue || !forecast) {
    return <div>Error loading data</div>;
  }

  const consolidateDataPerMonth = (data) => {
    const consolidatedData = {};

    data.forEach(({ date, value }) => {
      const [year, month] = date.split('-');
      const key = `${year}-${month}`;

      if (!consolidatedData[key]) {
        consolidatedData[key] = { date: key, value: 0 };
      }

      consolidatedData[key].value += value;
    });

    return Object.values(consolidatedData);
  };

  const handleConsolidate = () => {
    setConsolidated(!consolidated);
  };

  const displayedRevenue = consolidated ? consolidateDataPerMonth(revenue) : revenue;
  const displayedForecast = consolidated ? consolidateDataPerMonth(forecast) : forecast;

  if (displayedRevenue[displayedRevenue.length-1].date === displayedForecast[0].date) {
    displayedForecast[0].value += displayedRevenue[displayedRevenue.length-1].value
  }

  const allDates = new Set([...displayedRevenue.map(entry => entry.date), ...displayedForecast.map(entry => entry.date)]);
  const chartLabels = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

  const revenueData = chartLabels.map(date => {
    const entry = displayedRevenue.find(entry => entry.date === date);
    return entry ? entry.value : null;
  });

  const forecastData = chartLabels.map(date => {
    const entry = displayedForecast.find(entry => entry.date === date);
    return entry ? entry.value : null;
  });

  const chartData = {
    labels: chartLabels.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        fill: false,
        borderColor: 'rgba(91,155,213,1)',
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0.2,
      },
      {
        label: 'Forecast',
        data: forecastData,
        fill: false,
        borderColor: 'rgba(236,125,50,1)',
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [5, 5],
        lineTension: 0.2,
      },
    ],
  };

  return (
    <div>
      <button onClick={handleConsolidate}>
        {consolidated ? 'Show Daily Data' : 'Consolidate Monthly Data'}
      </button>
      <div>
        <label htmlFor="forecast-end">Forecast End Date: </label>
        <input
          type="date"
          id="forecast-end"
          value={forecastEnd.toISOString().split('T')[0]}
          onChange={handleDateChange}
        />
      </div>
      <Line data={chartData} />
    </div>
  );
}
