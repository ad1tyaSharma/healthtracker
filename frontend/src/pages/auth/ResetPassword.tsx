import AuthLayout from '../../components/auth/AuthLayout'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {useState} from "react";
import {MdLockOutline} from "react-icons/md";
import {validatePassword} from '../../utils/validation'
export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const showToast = useToast()
    const handleSubmit = async ()=>{
        if(password !== confirmPassword){
            showToast('Passwords do not match', 'error')
            return;
        }
        if(!validatePassword(password)){
            showToast('Password must be at least 8 characters.', 'error')
            return
        }
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (token) {
            const res = await authService.resetPassword(token, password);
            if (res.data) {
                showToast('Password reset successful. You can log in now.', 'success')
                navigate('/login');
            } else {
                const msg = res.error || 'Password reset failed'
                showToast(msg, 'error')
                console.error('Password reset failed', res)
            }
        } else {
            showToast('Invalid or missing token', 'error')
        }
    }
    return (
       <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-none p-8 md:p-10 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Reset your Password</h2>
        <div className="flex flex-col gap-4 mb-6">
<div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  </div>
        <div className="relative">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  </div>
                  <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold p-3 rounded-lg shadow-lg dark:shadow-none hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
      >
        Reset Password
      </motion.button>
        </div>
         
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