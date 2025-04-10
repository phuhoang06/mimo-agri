import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import './styles/index.css';
import './styles/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Mobile detection
function detectMobile() {
  if (window.innerWidth <= 768) {
    document.documentElement.classList.add('mobile-detected');
    document.documentElement.classList.add('mobile-device');
  } else {
    document.documentElement.classList.remove('mobile-detected');
    document.documentElement.classList.remove('mobile-device');
  }
}

// Run on page load
detectMobile();

// Add resize listener
window.addEventListener('resize', detectMobile);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);