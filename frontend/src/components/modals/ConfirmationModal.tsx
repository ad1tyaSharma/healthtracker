import { motion } from 'framer-motion'

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}) {
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
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
            type="button"
            onClick={onConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-full"
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}