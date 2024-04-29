import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../scss/styles.scss';
import './auth';
import { initLoginPage, setAuthChecker } from './auth';

export function initApplication() {
  setAuthChecker();
  if (/login\.html$/.test(window.location.href)) {
    initLoginPage();
  }
}

initApplication();