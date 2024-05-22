import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // necessary for chart.js to work properly
import { getRevenue } from '@/api/get-revenue';
import { predict } from '@/api/predict';

export const Route = createFileRoute('/_auth/predictive-analysis')({
  component: PredictiveAnalysisPage,
});

function PredictiveAnalysisPage() {
  const { data: revenue, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['revenue'],
    queryFn: getRevenue,
  });

  const startDate = new Date();
  const forecastPeriods = [];

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    forecastPeriods.push({ date: date.toISOString().split('T')[0], value: 0 });
  }

  const { data: forecast, isLoading: isLoadingForecast } = useQuery({
    queryKey: ['predict', revenue],
    queryFn: () => predict(revenue, forecastPeriods),
    enabled: !!revenue, // ensures the query only runs if revenue is available
  });

  if (isLoadingRevenue || isLoadingForecast) {
    return <div>Loading...</div>;
  }

  if (!revenue || !forecast) {
    return <div>Error loading data</div>;
  }

  const allDates = new Set([...revenue.map(entry => entry.date), ...forecast.map(entry => entry.date)]);
  const chartLabels = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

  const revenueData = chartLabels.map(date => {
    const entry = revenue.find(entry => entry.date === date);
    return entry ? entry.value : null;
  });

  const forecastData = chartLabels.map(date => {
    const entry = forecast.find(entry => entry.date === date);
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
      <Line data={chartData} />
    </div>
  );
}
