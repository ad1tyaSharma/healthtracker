export interface Theme {
  isDarkMode: boolean
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
  }
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}