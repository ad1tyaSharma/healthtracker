import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-semibold py-2 px-6 rounded-full transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}