import { apiService } from './apiService'

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authService = {
  async login(email: string, password: string) {
  const response = await apiService.post<AuthResponse>('/auth/login', { email, password })
  return response
  },

  async register(name: string, email: string, password: string, gender: string, dateOfBirth: string) {
  const response = await apiService.post<AuthResponse>('/auth/signup', { name, email, password,gender,dateOfBirth })
  return response
  },

  async forgotPassword(email: string) {
    return await apiService.post('/auth/forgot-password', { email })
  },
  async resetPassword(token: string, newPassword: string) {
    return await apiService.post('/auth/reset-password', { token, newPassword })
  },
  logout() {
  // clear server cookie
  apiService.post('/auth/logout', {})
  },

  getCurrentUser() {
    return apiService.get('/auth/me').then(res => {
      return (res.data as any) || null
    }).catch(() => null)
  },
}