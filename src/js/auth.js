import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getApplicationAuth } from './config/firebase';

export function isLoginPage() {
  return /sign-in\.html$/.test(window.location.href)
    || /sign-up\.html$/.test(window.location.href);
}

export function setAuthChecker() {
  const auth = getApplicationAuth();
  onAuthStateChanged(auth, (authUser) => {
    if (!authUser && !isLoginPage()) {
      window.location.href = '/sign-in.html';
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

export function initSignUpPage() {
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

    window.location.href = '/index.html';
  });
}

export function initSignInPage() {
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

    window.location.href = '/index.html';
  });
}

export function initSignOutButton() {
  const signOutButton = document.getElementById('signOutButton');
  signOutButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const auth = getApplicationAuth();
    await signOut(auth);
  });
}
