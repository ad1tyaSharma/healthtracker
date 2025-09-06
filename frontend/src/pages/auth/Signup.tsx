
import AuthForm from '../../components/auth/AuthForm'
import AuthLayout from '../../components/auth/AuthLayout'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import {validateEmail,validatePassword,validateName,validateDob,validateGender} from '../../utils/validation'
export default function Signup() {
  const navigate = useNavigate();
  const showToast = useToast()

  const handleSignup = (credentials: { name?: string; email: string; password?: string; gender?:string; dateOfBirth?: string }) => {
    if(!validateName(credentials.name as string)){
      showToast('Name must be at least 2 characters.', 'error')
      return
    }
    if(!validateEmail(credentials.email as string)){
      showToast('Please enter a valid email address.', 'error')
      return
    }
    if(!validatePassword(credentials.password as string)){
      showToast('Password must be at least 8 characters.', 'error')
      return
    }
    if(!validateDob(credentials.dateOfBirth as string)){
      showToast('Please enter a valid date of birth.', 'error')
      return
    }
    if(!validateGender(credentials.gender as string)){
      showToast('Please select correct gender.', 'error')
      return
    }
    authService.register(credentials.name as string, credentials.email, credentials.password as string, credentials.gender as string, credentials.dateOfBirth as string).then(res => {
      // network or client error
      if ((res as any).error) {
        const msg = (res as any).error
     
        showToast(msg, 'error')
        console.error('Signup failed', res)
        return
      }

      // success responses come back with data and status
      const status = (res as any).status
      const data = (res as any).data

      if (status === 200) {
        const successMsg = data?.message || 'Account created — verification sent'
        showToast(successMsg, 'success')
        // navigate to verification step (existing UX)
        navigate('/verify-account');
        return
      }

      // fallback: unknown failure
      const msg = (res as any).error || 'Signup failed'
  
      showToast(msg, 'error')
      console.error('Signup failed', res)
    })
  }

  return (
    <AuthLayout>
      <AuthForm 
        title="Create Account" 
        buttonText="Sign Up" 
        isLogin={false} 
        onSubmit={handleSignup} 
        onSwitch={() => navigate('/login')} 
        hasName={true} 
        hasPassword={true} 
        hasForgotPassword={null} 
        isSignup={true}
      />
    </AuthLayout>
  )
}