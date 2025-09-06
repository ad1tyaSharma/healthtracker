import type { Member } from '../types/member'

export const initialMembers: Member[] = [
  { 
    id: 'self', 
    name: 'You', 
    relationshipAlias: 'Self', 
    avatar: 'https://placehold.co/100x100/4F6681/AEC9F1?text=Me', 
    vitals: { 
      bp: '120/80', 
      weight: '75kg', 
      bmi: '22', 
      sugar: '105', 
      cholesterol: '180' 
    } 
  },
  { 
    id: '1', 
    name: 'John Doe', 
    relationshipAlias: 'Dad', 
    avatar: 'https://placehold.co/100x100/AEC9F1/4F6681?text=JD', 
    vitals: { 
      bp: '120/80', 
      weight: '75kg', 
      bmi: '22', 
      sugar: '105', 
      cholesterol: '180' 
    } 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    relationshipAlias: 'Mom', 
    avatar: 'https://placehold.co/100x100/F4C2C2/7F3E3E?text=JS', 
    vitals: { 
      bp: '115/75', 
      weight: '60kg', 
      bmi: '20', 
      sugar: '98', 
      cholesterol: '165' 
    } 
  },
  { 
    id: '3', 
    name: 'Milo', 
    relationshipAlias: 'Son', 
    avatar: 'https://placehold.co/100x100/C0E3C8/4E7658?text=M', 
    vitals: { 
      bp: '90/60', 
      weight: '25kg', 
      bmi: '18', 
      sugar: '85', 
      cholesterol: '130' 
    } 
  },
]

export const generateMockData = (key: string) => {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateString = `${date.getMonth() + 1}/${date.getDate()}`
    let value = 0
    
    if (key === 'bp_systolic') {
      value = 120 + Math.floor(Math.random() * 20 - 10)
    } else if (key === 'bp_diastolic') {
      value = 80 + Math.floor(Math.random() * 10 - 5)
    } else if (key === 'weight') {
      value = 75 + Math.random() * 5 - 2.5
    } else if (key === 'bmi') {
      value = 22 + Math.random() * 1.5 - 0.75
    } else if (key === 'sugar') {
      value = 100 + Math.random() * 20 - 10
    } else if (key === 'cholesterol') {
      value = 160 + Math.random() * 40 - 20
    }
    
    data.push({ date: dateString, value: parseFloat(value.toFixed(1)) })
  }
  return data
}

export const generateMockRecords = () => {
  const records = []
  const today = new Date()
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i * 3)
    
    records.push({
      date: date.toLocaleDateString(),
      bp: `${120 + Math.floor(Math.random() * 20 - 10)}/${80 + Math.floor(Math.random() * 10 - 5)}`,
      weight: (75 + Math.random() * 5 - 2.5).toFixed(1),
      bmi: (22 + Math.random() * 1.5 - 0.75).toFixed(1),
      sugar: (100 + Math.random() * 20 - 10).toFixed(0),
      cholesterol: (160 + Math.random() * 40 - 20).toFixed(0),
    })
  }
  
  return records
}
