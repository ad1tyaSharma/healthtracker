import AuthForm from '../../components/auth/AuthForm'
import AuthLayout from '../../components/auth/AuthLayout'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'
export default function ForgotPassword() {
  const navigate = useNavigate();
  const showToast = useToast();
  const handleReset = (credentials: { email: string }) => {
    authService.forgotPassword(credentials.email).then(() => {
      // show a message or redirect
      showToast('If that email is registered, a reset link has been sent.', 'info')
      navigate('/login');
    })
  }

  return (
    <AuthLayout>
      <AuthForm
        title="Forgot Password"
        buttonText="Send Reset Link"
        isLogin={null}
        onSubmit={handleReset}
        onSwitch={() => navigate('/login')}
        hasName={false}
        hasPassword={false}
        hasForgotPassword={null}
      />
    </AuthLayout>
  )
}