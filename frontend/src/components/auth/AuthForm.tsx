import { motion } from 'framer-motion'
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { MdEvent } from 'react-icons/md'
import { FcGoogle } from "react-icons/fc";

export default function AuthForm({
  title,
  buttonText,
  isLogin,
  isSignup,
  onSubmit,
  onSwitch,
  hasName,
  hasPassword,
  hasForgotPassword,
}: {
  title: string
  buttonText: string
  isLogin: boolean | null
  isSignup?: boolean
  onSubmit: (credentials: { name?: string; email: string; password?: string; gender?:string; dateOfBirth?: string}) => void
  onSwitch: () => void
  hasName: boolean
  hasPassword: boolean
  hasForgotPassword: (() => void) | null
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, password,gender,dateOfBirth })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-none p-8 md:p-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        {isLogin ? "Welcome back!" : "Join us today!"}
      </p>
      <div className="flex flex-col gap-4 mb-6">
        {hasName && (
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          </div>
        )}
        <div className="relative">
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-3 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
        </div>
        {isSignup &&
          (<>
          <div className="flex flex-col">
                  <label htmlFor="dob" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth
                  </label>
                  <div>
                    
                      <div className="relative">
                        <input
                          type="date"
                          id="dob"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className={`w-full p-3 pl-12 rounded-lg border-2 ${
                            'border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                          } transition duration-200`}
                        />
                        <MdEvent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                      </div>
                    
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    
                    className={`p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                    transition duration-200`}
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
          </>)
        }
        {hasPassword && (
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
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold p-3 rounded-lg shadow-lg dark:shadow-none hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
      >
        {buttonText}
      </motion.button>
      {hasForgotPassword && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <button
            onClick={hasForgotPassword}
            className="text-blue-600 font-semibold hover:underline focus:outline-none"
          >
            Forgot password?
          </button>
        </p>
      )}
      {isLogin !== null && (
        <>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080'
              window.location.href = `${API_BASE}/oauth2/authorization/google`
            }}
            className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
          >
           <FcGoogle />
            <span className="ml-2">{isLogin ? "Sign in with Google" : "Sign up with Google"}</span>
          </motion.button>
        </>
      )}
      <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={onSwitch}
          className="text-blue-600 font-semibold ml-2 hover:underline focus:outline-none"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </motion.div>
  )
}