import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Hide splash screen once React is ready
const splash = document.getElementById('splash');
if (splash) {
  splash.classList.add('hide');
  setTimeout(() => splash.remove(), 500);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
