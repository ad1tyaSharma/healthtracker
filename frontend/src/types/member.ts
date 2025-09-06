export interface Vitals {
  bp: string
  weight: string
  bmi: string
  sugar: string
  cholesterol: string
}

export interface Member {
  id?: string
  email: string
  name?: string
  relationshipAlias: string
  avatar?: string
  vitals: Vitals
  userId?: string
}