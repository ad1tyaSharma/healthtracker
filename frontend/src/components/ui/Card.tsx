import { motion } from 'framer-motion'
import {type ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}