import Papa from 'papaparse';
import { createChart, deleteChart, getChart, getCharts } from '../services/firestore';
import { downloadCsv, uploadCsv } from '../services/storage';
import { getCurrentUserId } from '../services/auth';
import { drawChart } from './draw-chart';
import {initSignOutButton} from "./auth";

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

export function parseCsvFromArrayBuffer(arrayBuffer) {
  const textDecoder = new TextDecoder('utf-8');
  const csvString = textDecoder.decode(arrayBuffer);

  const parsedData = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true
  });

  return parsedData.data;
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

  const csvData = parseCsvFromArrayBuffer(chartCsv);

  const chartName = document.getElementById('chartName');
  chartName.innerHTML = chartDoc.chartName;

  const chartContent = document.getElementById('chartContent');
  chartContent.innerHTML = `
<b>Name</b>: ${chartDoc.chartDescription}<br />
<b>Description</b>: ${chartDoc.chartDescription}<br />
<b>Created At</b>: ${chartDoc.createdAt.toISOString()}<br />
<b>CSV File Name</b>: ${chartDoc.fileName}<br />
`
  drawChart(chartDoc.chartType, csvData);
}

export async function initChartsPage() {
  initSignOutButton();
  await loadCharts();
}

export async function initChartPage() {
  initSignOutButton();
  await loadChart();
}

export function initAddChartPage() {
  initSignOutButton();
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
