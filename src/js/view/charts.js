import {createChart, deleteChart, getChart, getCharts} from '../services/firestore';
import {downloadCsv, uploadCsv} from "../services/storage";
import { getCurrentUserId } from '../services/auth';

export async function loadCharts() {
  const tableBody = document.getElementById('chartListBody');
  const docs = await getCharts();
  docs.forEach((doc) => {
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.className = "tm-product-name";
    td1.textContent = doc.chartName;

    let td2 = document.createElement('td');
    td2.className = "text-center";
    td2.textContent = doc.chartType;

    let td3 = document.createElement('td');
    td3.className = "text-center";
    let chartLink = document.createElement('a');
    chartLink.setAttribute('href', `chart.html?id=${doc.id}`);
    chartLink.setAttribute('class', "btn btn-small btn-primary");
    let textNode = document.createTextNode("View Chart");
    chartLink.appendChild(textNode);
    td3.appendChild(chartLink);

    let td4 = document.createElement('td');
    td4.textContent = doc.createdAt.toISOString();

    let td5 = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteChart(doc.id);
      tableBody.innerHTML = '';
      await loadCharts();
    });
    td5.appendChild(deleteButton);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tableBody.appendChild(tr);
  });
}

export async function loadChart() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const chartId = urlParams.get('id');
  if (!chartId) {
    window.location.href = '/404.html';
    return;
  }

  const chartDoc = await getChart(chartId);
  if (!chartDoc) {
    window.location.href = '/404.html';
    return;
  }

  const chartCsv = await downloadCsv(getCurrentUserId(), chartDoc.fileName);
  if (!chartCsv) {
    window.location.href = '/404.html';
    return;
  }
}

export async function initChartsPage() {
  await loadCharts();
}

export async function initChartPage() {
  await loadChart();
}

export function initAddChartPage() {
  const form = document.getElementById('addChartForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const chartName = document.getElementById('chartName').value;
    const chartDescription = document.getElementById('chartDescription').value;
    const chartType = document.getElementById('chartType').value;
    const csvFileInput = document.getElementById('csvFile');
    const csvFile = csvFileInput.files[0];

    if (!chartName || !chartDescription || !chartType || !csvFile) {
      alert('Please fill chartName, chartDescription, chartType and file.');
      return;
    }

    const fileName = await uploadCsv(getCurrentUserId(), csvFile);
    await createChart(
      chartName,
      chartType,
      chartDescription,
      fileName
    );

    window.location.href = '/charts.html';
  });
}
