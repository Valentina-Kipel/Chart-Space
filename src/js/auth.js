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

export function addError(message) {
  document.getElementById('errorContainer').innerHTML = `
  <div class="alert alert-danger" role="alert">
    ${message}
  </div>
`;
}

export function cleanError() {
  document.getElementById('errorContainer').innerHTML = '';
}

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

export async function signUp(email, password) {
  try {
    cleanError();
    const auth = getApplicationAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = '/index.html';
  } catch (e) {
    addError(e.message);
  }
}

export async function signIn(email, password) {
  try {
    cleanError();
    const auth = getApplicationAuth();
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/index.html';
  } catch (e) {
    addError(e.message);
  }
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
  });
}

export function initSignOutButton() {
  const signOutButton = document.getElementById('signOutButton');
  signOutButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const auth = getApplicationAuth();
    await signOut(auth);
    localStorage.delete('appUserId');
  });
}
