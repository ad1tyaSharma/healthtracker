import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Router from './Router'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App