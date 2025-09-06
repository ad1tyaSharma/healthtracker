import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { useToast } from '../context/ToastContext'
import { memberService } from '../services/memberService'
export default function Invitations() {
    const navigate = useNavigate();
    const showToast = useToast();
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const handleAccept = async ()=>{
        if (token) {
            // Here you would typically call an API to accept the invitation using the token
            memberService.acceptInvite(token).then(res => {
                if (res.data) {
                    showToast('Invitation accepted. You can log in now.', 'success')
                    navigate('/');
                }
                else {
                    const msg = res.error || 'Invitation acceptance failed'
                    showToast(msg, 'error')
                    console.error('Invitation acceptance failed', res)
                }
            })
        } else {
            showToast('Invalid or missing token', 'error')
        }
    }
    const handleReject = async ()=>{
        if (token) {
            // Here you would typically call an API to reject the invitation using the token
            memberService.rejectInvite(token).then(res => {
                if (res.data) {
            showToast('Invitation rejected.', 'info')
            navigate('/');
                } else {
                    const msg = res.error || 'Invitation rejection failed'
                    showToast(msg, 'error')
                    console.error('Invitation rejection failed', res)
                }
            })
        }
        else
            showToast('Invalid or missing token', 'error')

    }
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-none p-8 md:p-10 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Member Invite</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You have been invited to join a family account.
        </p>
       <div className='flex flex-col gap-2'>
        <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAccept}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold p-3 rounded-lg shadow-lg dark:shadow-none hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
      >
        Accept
      </motion.button>
      <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <button
            onClick={handleReject}
            className="text-blue-600 font-semibold hover:underline focus:outline-none"
          >
            Reject
          </button>
        </p>
       </div>
        
      </motion.div>
    </AuthLayout>
  )
}