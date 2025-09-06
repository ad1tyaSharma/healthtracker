export interface User {
  id: string
  name: string
  email: string
  height?: number
  weight?: number
  dateOfBirth?: string
  gender?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}