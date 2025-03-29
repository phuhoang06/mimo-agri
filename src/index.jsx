import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles.css';

// Mobile detection function
const detectMobile = () => {
  const MOBILE_BREAKPOINT = 768;
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  
  if (isMobile) {
    document.documentElement.classList.add('mobile-detected', 'mobile-device');
  } else {
    document.documentElement.classList.remove('mobile-detected', 'mobile-device');
  }
};

// Initial detection
detectMobile();

// Add resize listener
window.addEventListener('resize', detectMobile);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();