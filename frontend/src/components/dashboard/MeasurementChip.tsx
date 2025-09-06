import { motion } from 'framer-motion'

export default function MeasurementChip({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full"
    >
      <div className="text-gray-500 dark:text-gray-400">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</span>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</span>
      </div>
    </motion.div>
  )
}