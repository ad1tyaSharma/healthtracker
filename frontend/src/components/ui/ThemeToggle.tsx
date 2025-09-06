import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { LucideSun, LucideMoon } from 'lucide-react'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 p-2 rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </motion.button>
  )
}