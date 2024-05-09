import { getApplicationFirestore } from '../config/firebase';
import { collection, doc, query, orderBy, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidV4 } from 'uuid';

export function getDates(x) {
  return {
    createdAt: x.createdAt.toDate(),
    updatedAt: x.updatedAt.toDate()
  }
}

export function getUserCollection() {
  const firestoreInstance = getApplicationFirestore();
  return collection(firestoreInstance, 'users');
}

export function getCurrentUserRef() {
  const userCollection = getUserCollection();
  return doc(userCollection, localStorage.getItem('appUserId') ?? '');
}

export function getChartDocsCollection() {
  const userRef = getCurrentUserRef()
  return collection(
    userRef,
    'chart-documents'
  );
}

export function getChartDocRef(id) {
  const chartDocsCollection = getChartDocsCollection();
  return doc(chartDocsCollection, id);
}

export async function getCharts() {
  const charDocsCollection = getChartDocsCollection();
  const q = query(
    charDocsCollection,
    orderBy('createdAt'),
  );
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach((v) => {
    const o = v.data();
    result.push({
      ...o,
      ...getDates(o),
    });
  });

  return result;
}

export async function getChart(id) {
  const chartDocRef = getChartDocRef(id);
  const docSnapshot = await getDoc(chartDocRef);
  const o = docSnapshot.data();
  if (!o) {
    return o;
  }

  return {
    ...o,
    ...getDates(o),
  };
}

export async function createChart(
  chartName,
  chartType,
  chartDescription,
  fileName
) {
  const id = uuidV4();
  const newChartRef = getChartDocRef(id);
  const newChart = {
    id,
    chartName,
    chartType,
    chartDescription,
    fileName,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(newChartRef, newChart);

  return newChart;
}

export async function deleteChart(id) {
  const chartRef = getChartDocRef(id);

  await deleteDoc(chartRef)
}

