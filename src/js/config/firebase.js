import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let firebaseApp = undefined;

export function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: 'AIzaSyCK6AosQTnc6bGd5dEnXrZj19YW61x4n2c',
    authDomain: 'chart-space.firebaseapp.com',
    projectId: 'chart-space',
    storageBucket: 'chart-space.appspot.com',
    messagingSenderId: '863466589936',
    appId: '1:863466589936:web:126fa89229fa47c35afc35',
    measurementId: 'G-722TTXLXPW'
  };

  firebaseApp = initializeApp(firebaseConfig);

  return firebaseApp;
}

export function getApplicationAuth() {
  const firebaseApp = getFirebaseApp();

  return getAuth(firebaseApp);
}