import AuthForm from '../../components/auth/AuthForm'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'
import { useNavigate,Navigate } from 'react-router-dom'
import {validateEmail,validatePassword} from '../../utils/validation'
export default function Login() {
  const { login,isAuthenticated } = useAuth()
  const naivgate = useNavigate();
  const showToast = useToast()

  const handleLogin = (credentials: { name?: string; email: string; password?: string }) => {
    if(!validateEmail(credentials.email)){
      showToast('Please enter a valid email address.', 'error')
      return
    }
    if(!validatePassword(credentials.password as string)){
      showToast('Password must be at least 6 characters.', 'error')
      return
    }
    authService.login(credentials.email, credentials.password as string).then(res => {
   
      if ((res.data && (res.data as any).token) || res.status === 200) {
        login()
        showToast('Logged in', 'success')
        
        naivgate('/');
      } else {
        const msg = res.error || 'Login failed'
        showToast(msg, 'error')
        console.error('Login failed', res)
      }
    })
  }

  return isAuthenticated ? <Navigate to={'/'}/> : (
    <AuthLayout>
      <AuthForm 
        title="Login" 
        buttonText="Log In" 
        isLogin={true} 
        onSubmit={handleLogin} 
        onSwitch={() => naivgate('/signup')} 
        hasName={false} 
        hasPassword={true} 
        hasForgotPassword={() => naivgate('/forgot-password')} 
      />
    </AuthLayout>
  )
}