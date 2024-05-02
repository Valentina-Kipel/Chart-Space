import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  initSignInPage,
  initSignOutButton,
  initSignUpPage,
  setAuthChecker
} from './auth';
import '../scss/styles.scss';

function initMainPage() {
  initSignOutButton();
}

function initApplication() {
  setAuthChecker();

  if (/sign-in\.html$/.test(window.location.href)) {
    initSignInPage();
  } else if (/sign-up\.html$/.test(window.location.href)) {
    initSignUpPage();
  } else {
    initMainPage();
  }
}

initApplication();