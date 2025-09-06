import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Callback from './pages/auth/Callback'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'

const root = createRoot(document.getElementById('root')!)

if (window.location.pathname.startsWith('/auth/callback')) {
  root.render(
    <StrictMode>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Callback />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
