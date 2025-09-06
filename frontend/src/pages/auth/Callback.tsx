import { useEffect, useState } from 'react'
import { apiService } from '../../services/apiService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Callback() {
  const { login } = useAuth()
  const showToast = useToast()
  const [status, setStatus] = useState<string>('Processing authentication...')
  const [debug, setDebug] = useState<any>(null)
  const switchToDashboard = () => {
    window.location.href = '/'
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) {
      const msg = 'OAuth callback missing token'
      showToast(msg, 'error')
      setStatus(msg)
      return
    }

    setStatus('Sending token to backend...')

    // send token to backend to set HttpOnly cookie
    apiService.post('/auth/oauth/callback', { token }).then(res => {
  setDebug((prev: any) => ({ ...(prev || {}), postResponse: res }))
      if (res.data) {
        setStatus('Token accepted by backend, checking /api/auth/me...')
        // try to fetch current user to confirm cookie works
        apiService.get('/auth/me').then(meRes => {
          setDebug((prev: any) => ({ ...(prev || {}), meResponse: meRes }))
          if (meRes.data) {
            showToast('Logged in with Google', 'success')
            login()
            switchToDashboard()
            setStatus('Authentication successful. Redirecting...')
          } else {
            const err = meRes.error || `Status ${meRes.status}`
            showToast(`/me failed: ${err}`, 'error')
            setStatus(`/me failed: ${err}`)
          }
        }).catch(e => {
          setDebug((prev: any) => ({ ...(prev || {}), meError: String(e) }))
          showToast('Error calling /api/auth/me', 'error')
          setStatus('Error calling /api/auth/me')
        })
      } else {
        const msg = res.error || 'OAuth login failed'
        showToast(msg, 'error')
        setStatus(msg)
      }
    }).catch(e => {
  setDebug((prev: any) => ({ ...(prev || {}), postError: String(e) }))
      showToast('Error posting token to backend', 'error')
      setStatus('Error posting token to backend')
    })
  }, [])

  return (
    <div className="p-8 text-center">
      Redirecting...
      {status && <p className="mt-4">{status}</p>}
      {debug && <pre className="text-left mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded max-h-64 overflow-auto"><code>{JSON.stringify(debug, null, 2)}</code></pre>}
    </div>
  )
}
