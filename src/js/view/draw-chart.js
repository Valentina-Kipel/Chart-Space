import Chart from 'chart.js/auto';
import {
  ChartTypeBarChart,
  ChartTypePieChart,
  ChartTypeHistogramChart
} from '../services/consts/charts';

export function drawBarChart(data) {
  const preparedData = data.filter((x) => x.Year && x.Month);
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: preparedData.map((x) => `${x.Year}-${x.Month}`),
      datasets: [
        {
          label: 'Loss',
          data: preparedData.map((x) => x.Loss),
          borderWidth: 1
        },
        {
          label: 'Profit',
          data: preparedData.map((x) => x.Profit),
          borderWidth: 1
        },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

export function drawPieChart(data) {

}

export function drawHistogramChart(data) {

}

export function drawChart(type, data) {
  switch (type) {
    case ChartTypeBarChart:
      drawBarChart(data);
      break;
    case ChartTypePieChart:
      drawPieChart(data);
      break;
    case ChartTypeHistogramChart:
      drawHistogramChart(data);
      break;
    default:
      break;
  }
}
