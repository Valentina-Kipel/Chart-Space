import { createChart, getCharts } from './services/firestore';

export async function initGetChartsPage() {
  const tableBody = document.getElementById('chartListBody');
  const docs = await getCharts();
  docs.forEach((doc) => {
    // create a table row element ('tr')
    let tr = document.createElement('tr');

    // create each cell in the row ('th' and 'td')
    let th = document.createElement('th');
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('aria-label', 'Checkbox');
    th.setAttribute('scope', 'row');
    th.appendChild(checkBox);

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
    let i = document.createElement('i');
    i.className = "fas fa-trash-alt tm-trash-icon";
    td5.appendChild(i);

    // append all td's to the tr
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    // append the 'tr' to the table body
    tableBody.appendChild(tr);
  });
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
