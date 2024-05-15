import { signOut } from 'firebase/auth';
import { getApplicationAuth } from '../config/firebase';
import { signUp, signIn } from '../services/auth';

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

    await signUp(userEmail, userPassword, cleanError, addError);
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

    await signIn(userEmail, userPassword, cleanError, addError);
  });
}

export function initSignOutButton() {
  const signOutButton = document.getElementById('signOutButton');
  signOutButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const auth = getApplicationAuth();
    localStorage.delete('appUserId');
    await signOut(auth);
  });
}
