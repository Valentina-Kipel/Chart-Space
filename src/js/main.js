import 'bootstrap/dist/js/bootstrap.bundle.min';
import { setAuthChecker } from './services/auth';
import {
  initSignInPage,
  initSignOutButton,
  initSignUpPage
} from './view/auth';
import { initAddChartPage, initChartPage, initChartsPage } from './view/charts';
import '../scss/styles.scss';

function initMainPage() {
  initSignOutButton();
}

function isSignInPage() {
  return /sign-in\.html/.test(window.location.href);
}

function isSignUpPage() {
  return /sign-up\.html/.test(window.location.href);
}

function isChartsPage() {
  return /charts\.html/.test(window.location.href);
}

function isAddChartPage() {
  return /add-chart\.html/.test(window.location.href);
}

function isChartPage() {
  return /chart\.html/.test(window.location.href) && !isAddChartPage();
}

function isNotFoundPage() {
  return /404\.html/.test(window.location.href);
}

async function initApplication() {
  setAuthChecker();
  if (isSignInPage()) {
    initSignInPage();
  } else if (isSignUpPage()) {
    initSignUpPage();
  } else if (isChartsPage()) {
    await initChartsPage();
  } else if (isChartPage()) {
    await initChartPage()
  } else if (isAddChartPage()) {
    await initAddChartPage();
  } else if (isNotFoundPage()) {
    // dummy actions
  } else {
    initMainPage();
  }
}

initApplication().then(() => {});