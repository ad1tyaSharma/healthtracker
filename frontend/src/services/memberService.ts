import { apiService } from './apiService'
import type { Member } from '../types/member'

export const memberService = {
  async list() {
    return await apiService.get<Member[]>('/members')
  },

  async get(id: string) {
    return await apiService.get<Member>(`/members/${id}`)
  },

  async records(id: string) {
    return await apiService.get<any[]>(`/members/${id}/records`)
  },

  async create(member: Partial<Member>) {
    return await apiService.post('/members', member)
  },

  async remove(id: string) {
    return await apiService.delete<void>(`/members/${id}`)
  },
  async acceptInvite(token: string) {
    return await apiService.post('/members/accept-invite', { token })
  },
  async rejectInvite(token: string) {
    return await apiService.post('/members/reject-invite', { token })
  }
}
