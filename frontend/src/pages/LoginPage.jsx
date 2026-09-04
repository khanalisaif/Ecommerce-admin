import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Check, Loader2 } from 'lucide-react'
import AuthTopBar from '../components/AuthTopBar'
import Footer from '../components/Footer'
import AuthFeaturesBar from '../components/AuthFeaturesBar'
import { useShop } from '../context/ShopContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { showToast, siteAssets } = useShop()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMode, setLoginMode] = useState('password') // 'password', 'otp_request', 'otp_verify', 'forgot_password'
  const [otp, setOtp] = useState('')
  const [showResetModal, setShowResetModal] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    if (loginMode === 'password') {
      if (!email || !password) {
        showToast('Please enter both email and password', 'error')
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        showToast('Logged in successfully!', 'success')
        navigate('/')
      }, 1500)
    } else if (loginMode === 'otp_request') {
      if (!email) {
        showToast('Please enter email or phone number', 'error')
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        showToast('OTP sent to your registered email/mobile!', 'success')
        setLoginMode('otp_verify')
      }, 1000)
    } else if (loginMode === 'otp_verify') {
      if (!otp || otp.length !== 6) {
        showToast('Please enter a valid 6-digit OTP', 'error')
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        showToast('Logged in successfully with OTP!', 'success')
        navigate('/')
      }, 1500)
    } else if (loginMode === 'forgot_password') {
      if (!email) {
        showToast('Please enter your registered email address', 'error')
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResetModal(true)
      }, 1500)
    }
  }

  const handleSocialLogin = (provider) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      showToast(`Successfully logged in with ${provider}!`, 'success')
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthTopBar />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left side - image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src={siteAssets.loginImageUrl}
            alt="Welcome to Hashtelicom Mobile"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-[620px] px-5 sm:px-8 py-8">

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Login to your account</h1>
              <p className="text-gray-500 text-sm">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              {loginMode !== 'otp_verify' && (
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-1.5">
                    Email Address / Phone Number
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email or phone number"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {loginMode === 'password' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-gray-800 font-semibold text-sm">Password</label>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setLoginMode('forgot_password') }}
                      className="text-purple-600 text-sm font-semibold hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Input */}
              {loginMode === 'otp_verify' && (
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-1.5">
                    Enter 6-digit OTP
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter OTP"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400 text-center tracking-[0.5em] font-bold"
                      required
                    />
                  </div>
                  <div className="text-right mt-1.5">
                    <button type="button" onClick={() => showToast('OTP resent successfully!', 'success')} className="text-purple-600 text-xs font-semibold hover:underline">
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Remember me + Login with OTP */}
              <div className="flex items-center justify-between">
                {loginMode === 'password' ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors cursor-pointer ${rememberMe ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'
                        }`}
                    >
                      {rememberMe && <Check size={10} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-gray-700 text-sm">Remember me</span>
                  </label>
                ) : (
                  <div></div>
                )}
                
                {loginMode === 'password' ? (
                  <button 
                    type="button" 
                    onClick={() => setLoginMode('otp_request')}
                    className="text-purple-600 text-sm font-semibold hover:underline"
                  >
                    Login with OTP
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => {
                      setLoginMode('password')
                      setOtp('')
                    }}
                    className="text-purple-600 text-sm font-semibold hover:underline"
                  >
                    Back to Login
                  </button>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 
                 loginMode === 'otp_request' ? 'Continue' : 
                 loginMode === 'otp_verify' ? 'Verify & Login' : 
                 loginMode === 'forgot_password' ? 'Send Reset Link' :
                 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 tracking-widest font-medium">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6 29.3 4 24 4c-7.5 0-14 4.1-17.7 10.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.9 39.8 16.4 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C40.5 36.4 44 30.9 44 24c0-1.3-.1-2.3-.4-3.5z" />
                </svg>
                Google
              </button>
              {/* Apple */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
              >
                <svg width="14" height="16" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 189.8 0 289.1c0 29.2 5.4 59.4 16.1 90.6 14.3 41.7 66 143.9 120 142.2 28.3-.7 48.3-20.1 85.1-20.1 35.7 0 54.3 20.1 85.8 20.1 54.4-.8 101.2-93.9 114.9-135.7-73.1-34.5-103.2-101.7-103.2-117.5zM256.4 89.4c30.2-35.9 27.5-68.6 26.6-80.4-26.7 1.5-57.6 18.3-75.4 39.3-19.6 22.5-31 50.2-28.6 79.6 27.9 2.2 53.5-12.4 77.4-38.5z" />
                </svg>
                Apple
              </button>
              {/* Facebook */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center mt-6 text-gray-500 text-sm">
              New to He &amp; She?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-purple-600 font-bold hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>

      <AuthFeaturesBar />
      <Footer showFeatures={false} />

      {/* Password Reset Success Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              We have sent password reset instructions to your email address.
            </p>
            <button
              onClick={() => {
                setShowResetModal(false)
                setLoginMode('password')
                setEmail('')
              }}
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
