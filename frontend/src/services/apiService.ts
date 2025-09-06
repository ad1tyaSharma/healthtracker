const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

interface ApiResponse<T> {
  data?: T
  error?: string
  status?: number
}

async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Use cookie-based auth; include credentials so browser sends HttpOnly cookie

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    })

    let text = await response.text()
    const data = text ? JSON.parse(text) : null
    if (!response.ok) {
      // backend may return { message: '...' } or { error: '...' }
      return { error: data?.message || data?.error || 'Request failed', status: response.status }
    }
    return { data, status: response.status }
  } catch (error) {
    console.error('API request failed:', error)
    return { error: 'Network error occurred' }
  }
}

export const apiService = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, 'POST', body),
  put: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, 'PUT', body),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
}