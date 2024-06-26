import { getApplicationAuth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { isLoginPage } from '../view/auth';

export function getCurrentUserId() {
  return localStorage.getItem('appUserId');
}

function isNotFoundPage() {
  return /404\.html/.test(window.location.href);
}

export function setAuthChecker() {
  const auth = getApplicationAuth();
  onAuthStateChanged(auth, (authUser) => {
    if (!authUser && !isLoginPage() && !isNotFoundPage()) {
      window.location.href = '/sign-in.html';
    } else if (authUser) {
      localStorage.setItem('appUserId', authUser.uid);
    }
  });
}

export async function signUp(email, password, cleanError, addError) {
  try {
    cleanError();
    const auth = getApplicationAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = '/index.html';
  } catch (e) {
    addError(e.message);
  }
}

export async function signIn(email, password, cleanError, addError) {
  try {
    cleanError();
    const auth = getApplicationAuth();
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/index.html';
  } catch (e) {
    addError(e.message);
  }
}