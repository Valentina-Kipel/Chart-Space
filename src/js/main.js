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

async function initApplication() {
  setAuthChecker();
  if (/sign-in\.html/.test(window.location.href)) {
    initSignInPage();
  } else if (/sign-up\.html/.test(window.location.href)) {
    initSignUpPage();
  } else if (/charts\.html/.test(window.location.href)) {
    await initChartsPage();
  } else if (/chart\.html/.test(window.location.href)) {
    await initChartPage()
  } else if (/add-chart\.html/.test(window.location.href)) {
    await initAddChartPage();
  } else if (/404\.html/.test(window.location.href)) {
    // dummy actions
  }  else {
    initMainPage();
  }
}

initApplication().then(() => {});