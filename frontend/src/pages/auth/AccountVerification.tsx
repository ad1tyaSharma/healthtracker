import { motion } from 'framer-motion'
import { apiService } from '../../services/apiService'
import { useEffect } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'
export default function AccountVerification() {
  const navigate = useNavigate();
  const showToast = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      apiService.get(`/auth/verify?token=${token}`).then(res => {
        if (res.data) {
          showToast('Account verified. You can log in now.', 'success')
        } else {
          showToast('Verification failed.', 'error')
        }
        navigate('/login');
      })
    }
  }, [])

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-none p-8 md:p-10 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
        </p>
       
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <button
            onClick={() => {
              showToast('Returning to login', 'info')
              navigate('/login');
            }}
            className="text-blue-600 font-semibold hover:underline focus:outline-none"
          >
            Back to Login
          </button>
        </p>
      </motion.div>
    </AuthLayout>
  )
}