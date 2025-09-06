import { useState } from 'react'
import { motion } from 'framer-motion'
import {type Member } from '../../types/member'
import { MdOutlineEmail } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { LucideUserPlus } from 'lucide-react'
export default function AddMemberModal({
  isOpen,
  onClose,
  onAddMember,
}: {
  isOpen: boolean
  onClose: () => void
  onAddMember: (member: Member) => void
}) {
  const [email, setEmail] = useState('')
  const [relationshipAlias, setRelationshipAlias] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember: Member = {
      email,
      relationshipAlias,
      vitals: {
        bp: '0/0',
        weight: '0kg',
        bmi: '0',
        sugar: '0',
        cholesterol: '0',
      },
    }
    onAddMember(newMember)
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 dark:bg-gray-900 dark:bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <LucideUserPlus size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Add a New Family Member
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Member's Email Address"
              className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
            <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          </div>
          <div className="relative">
            <input
              type="text"
              value={relationshipAlias}
              onChange={e => setRelationshipAlias(e.target.value)}
              placeholder="Relationship (e.g., Mom, Dad, Son)"
              className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
            <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-full"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full"
            >
              Add Member
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}