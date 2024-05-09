import {createChart, deleteChart, getCharts} from '../services/firestore';

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
    td3.textContent = "Link to view";

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

export async function initGetChartsPage() {
  await loadCharts();
}

export function initAddChartPage() {
  const form = document.getElementById('addChartForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const chartName = document.getElementById('chartName').value;
    const chartDescription = document.getElementById('chartDescription').value;
    const chartType = document.getElementById('chartType').value;
    const fakeFileName = 'test.txt';
    const fakeFileLink = 'path/to/test.txt';

    if (!chartName || !chartDescription || !chartType || !fakeFileName || !fakeFileLink) {
      alert('Please fill chartName, chartDescription, chartType and file.');
      return;
    }

    await createChart(
      chartName,
      chartType,
      chartDescription,
      fakeFileName,
      fakeFileLink
    );

    window.location.href = '/charts.html';
  });
}
