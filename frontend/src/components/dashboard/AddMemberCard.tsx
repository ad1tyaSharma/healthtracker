import { motion } from 'framer-motion'
import { BiPlus } from 'react-icons/bi'

export default function AddMemberCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border-dashed border-2 border-gray-300 dark:border-gray-700"
    >
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 border-4 border-gray-300/50 dark:border-gray-700/50 text-gray-400 dark:text-gray-500">
        <BiPlus size={48} />
      </div>
      <h3 className="font-semibold text-xl text-gray-600 dark:text-gray-300">Add New Member</h3>
    </motion.div>
  )
}