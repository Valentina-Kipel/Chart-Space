import { getApplicationAuth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { isLoginPage } from '../view/auth';

export function setAuthChecker() {
  const auth = getApplicationAuth();
  onAuthStateChanged(auth, (authUser) => {
    if (!authUser && !isLoginPage()) {
      window.location.href = '/sign-in.html';
    } else if (authUser) {
      if (!localStorage.getItem('appUserId')) {
        localStorage.setItem('appUserId', authUser.uid)
      }
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