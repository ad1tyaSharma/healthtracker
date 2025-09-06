import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import AccountForm from '../components/account/AccountForm'
import ThemeToggle from '../components/ui/ThemeToggle'
import { apiService } from '../services/apiService'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import {validateDob,validateName,validateGender} from '../utils/validation'
export default function AccountPage() {
  const { logout,user,setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState(user)
  const navigate = useNavigate();
  const toast = useToast()
  const handleEdit = () => {
    //setOriginalDetails(userDetails)
    setIsEditing(true)
  }

  const handleSave = () => {
    if(!validateName(userDetails?.name as string)){
      toast('Name must be at least 2 characters.', 'error')
      return
    }
    if(!validateDob(userDetails?.dateOfBirth as string)){
      toast('Please enter a valid date of birth.', 'error')
      return
    }
    if(!validateGender(userDetails?.gender as string)){
      toast('Please select correct gender.', 'error')
      return
    }
    apiService.put('/auth/update', userDetails).then(res => {
      if (res.data) {
        setUserDetails(userDetails)
        setIsEditing(false)
        setUser(userDetails)
        // Optionally update originalDetails if you want to keep track of last saved state
        // setOriginalDetails(res.data)
        toast('Profile updated successfully', 'success')
      } else {
        console.error('Failed to save user details', res)
        toast(res.error || 'Failed to update profile', 'error')
      } 
    }).catch(err => {
      console.error('Error saving user details', err)
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setUserDetails(user)
    setIsEditing(false)
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
     setUserDetails(prevDetails =>
    prevDetails ? { ...prevDetails, [name]: value } : prevDetails
  );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="container mx-auto p-4 md:p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
        >
          &larr; Back to Dashboard
        </motion.button>
        <div className="flex gap-4">
          <ThemeToggle />
          <motion.button
            onClick={() => {
              logout();
              toast('Logged out', 'info')
              navigate('/login');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-6 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
          >
            Log Out
          </motion.button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none p-6 min-h-[400px]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
          Your Profile
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Manage your personal information and account settings.
        </p>
        
        <div className="flex justify-end gap-2 mb-4">
          {isEditing ? (
            <>
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full"
              >
                Save Changes
              </motion.button>
              <motion.button
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-full"
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full"
            >
              Edit Details
            </motion.button>
          )}
        </div>
        
        <AccountForm
          details={userDetails || {}}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
      </div>
    </motion.div>
  )
}