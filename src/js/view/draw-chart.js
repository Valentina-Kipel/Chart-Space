import Chart from 'chart.js/auto';
import {
  ChartTypeBarChart,
  ChartTypePieChart,
  ChartTypeHistogramChart
} from '../services/consts/charts';

// Draw Bar Chart
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

// Draw Pie Chart
export function drawPieChart(data) {
  const preparedData = data.filter((x) => x.Profit && x.Loss);
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        'Profit',
        'Loss'
      ],
      datasets: [{
        label: 'Profit',
        data: [preparedData.map((x) => x.Profit), preparedData.map((x) => x.Loss)],
        backgroundColor: [
          'rgb(255,255,0)',
          'rgb(255, 99, 132)'  
        ],
        hoverOffset: 4
      }]
    }
  });
}

export function drawHistogramChart(data) {
  const preparedData = data.filter((x) => x.Year);
  const preparedDataRevenue = data.filter((x) => x.Revenue);
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: preparedData.map((x) => x.Year),
      datasets: [{
        label: 'Revenue per year',
        data: preparedDataRevenue.map((x) => x.Revenue),
        fill: true,
        borderColor: 'blue', //
        borderWidth: 5, // 
        tension: 0, 
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          showLine: true
        }
      }
    }
  });
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
