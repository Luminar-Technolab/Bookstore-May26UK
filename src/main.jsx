import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> 
    <GoogleOAuthProvider clientId='795699598605-qv588i2anoj3vs1912875crrrm4ukfc9.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
