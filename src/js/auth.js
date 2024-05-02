import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { getApplicationAuth } from './config/firebase';

export function setAuthChecker() {
  const auth = getApplicationAuth();
  onAuthStateChanged(auth, (authUser) => {
    if (!authUser && !/login\.html$/.test(window.location.href)) {
      window.location.href = '/login.html';
    }
  });
}

export async function signUp(email, password) {
  const auth = getApplicationAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email, password) {
  const auth = getApplicationAuth();
  return await signInWithEmailAndPassword(auth, email, password);
}

export function initLoginPage() {
  const form = document.getElementById('signUpForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    if (!userEmail || !userPassword) {
      alert('Please fill in both email and password.');
      return;
    }

    await signUp(userEmail, userPassword);
  });
}
  export function initMainPage() {
    const form = document.getElementById('signInForm');
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const userEmail = document.getElementById('userEmail').value;
      const userPassword = document.getElementById('userPassword').value;
  
      if (!userEmail || !userPassword) {
        alert('Please fill in both email and password.');
        return;
      }
  
      await signIn(userEmail, userPassword);
    });
  }

