import { motion } from 'framer-motion'
import { BiUser } from 'react-icons/bi'
import ThemeToggle from '../ui/ThemeToggle'
import { useNavigate } from 'react-router-dom'
export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-2">
          Welcome back!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's a quick look at your family's health snapshots.
        </p>
      </div>
      <div className="flex gap-4">
        <motion.button
          onClick={() => navigate('/account')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg dark:shadow-none hover:shadow-xl transition-all"
        >
          <BiUser size={24} className="text-gray-600 dark:text-gray-300" />
        </motion.button>
        <ThemeToggle />
      </div>
    </div>
  )
}