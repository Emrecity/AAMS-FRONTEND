import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ToastProvider from './provider/ToastProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ToastProvider>
    <React.StrictMode>
         <App />
    </React.StrictMode>,
  </ToastProvider>
  </BrowserRouter>

)
