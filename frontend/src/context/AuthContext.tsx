import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import type { User } from '../types';

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  login: () => void
  logout: () => void
 
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // fetch current user from backend
      authService.getCurrentUser().then((u: any) => {
        if (u) {
        ;
          
          setUser(u)
          setIsAuthenticated(true)
          //setCurrentPage('dashboard')
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      }).catch(() => {
        setIsAuthenticated(false)
        setUser(null)
      })
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    // populate user after login
    authService.getCurrentUser().then((u: any) => {
      if (u) setUser(u)
    }).catch(() => {})
  }
  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
  user,
  setUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}