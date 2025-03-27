import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import './styles.css';

// Add mobile detection
const detectMobile = () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.documentElement.classList.add('mobile-detected');
    document.documentElement.classList.add('mobile-device');
  } else {
    document.documentElement.classList.remove('mobile-detected');
    document.documentElement.classList.remove('mobile-device');
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