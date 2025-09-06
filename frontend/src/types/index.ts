export * from './member'
export * from './auth'
export * from './ui'

export interface ApiResponse<T> {
  data?: T
  error?: string
  status?: number
}

export type Nullable<T> = T | null