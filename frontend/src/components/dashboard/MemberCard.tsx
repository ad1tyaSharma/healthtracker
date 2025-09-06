import { motion } from 'framer-motion'
import { LucideHeartPulse, LucideDroplets, LucideWeight, LucideScale } from 'lucide-react'
import {type Member } from '../../types/member'
import MeasurementChip from './MeasurementChip'

export default function MemberCard({ member, onClick }: { member: Member; onClick: (member: Member) => void }) {
  // Guard against missing `vitals` (e.g. when member is newly created or incomplete)
  const initials = (member.name || '')
    .split(' ')
    .filter(Boolean)
    .map(n => n[0].toUpperCase())
    .slice(0, 2)
    .join('')

  const vitalData = [
    { label: 'BP', value: member.vitals?.bp ?? '—', icon: <LucideHeartPulse size={16} /> },
    { label: 'Weight', value: member.vitals?.weight ?? '—', icon: <LucideWeight size={16} /> },
    { label: 'Sugar', value: member.vitals?.sugar ?? '—', icon: <LucideDroplets size={16} /> },
    { label: 'BMI', value: member.vitals?.bmi ?? '—', icon: <LucideScale size={16} /> },
    { label: 'Cholesterol', value: member.vitals?.cholesterol ?? '—', icon: <LucideHeartPulse size={16} /> },
  ]

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 relative"
      onClick={() => onClick(member)}
    >
      <div className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500/50 flex items-center justify-center overflow-hidden">
        {member.avatar ? (
          <img src={member.avatar} alt={member.name ?? 'avatar'} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 dark:bg-blue-400">
            <span className="text-2xl font-semibold text-white">{initials || 'U'}</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">{member.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{member.relationshipAlias}</p>
      
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {vitalData.map((vital, index) => (
          <MeasurementChip key={index} label={vital.label} value={vital.value} icon={vital.icon} />
        ))}
      </div>
    </motion.div>
  )
}