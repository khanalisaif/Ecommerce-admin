import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ShieldCheck, Loader2, ArrowLeft, KeyRound } from 'lucide-react'
import { setAdminSession, isAdminLoggedIn } from '../../components/admin/adminAuth'
import { useShop } from '../../context/ShopContext'

// NOTE: Ye project pure frontend hai (koi backend/email service connected nahi hai),
// isliye OTP yahin par generate hoke demo ke taur pe screen par dikhaya jata hai —
// bilkul us pattern jaisa jo already LoginPage.jsx mein OTP flow ke liye use hua hai.
// Jab real backend/email API jode, sirf generateOtp() aur verify step ko API call se replace karna.

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { siteAssets } = useShop()
  const [step, setStep] = useState('email') // 'email' | 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const inputsRef = useRef([])

  useEffect(() => {
    if (isAdminLoggedIn()) navigate('/page/admin/dashboard', { replace: true })
  }, [navigate])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const sendOtp = (e) => {
    e?.preventDefault()
    setError('')
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      const code = generateOtp()
      setGeneratedOtp(code)
      setIsLoading(false)
      setStep('otp')
      setResendTimer(30)
      // Demo-only: no email service is wired up, so the OTP is surfaced here.
      console.info('[Admin Demo OTP]', code)
    }, 900)
  }

  const handleOtpChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    setError('')
    const entered = otp.join('')
    if (entered.length !== 6) {
      setError('Please enter the full 6-digit OTP')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      if (entered === generatedOtp) {
        setAdminSession(email)
        setIsLoading(false)
        navigate('/page/admin/dashboard', { replace: true })
      } else {
        setIsLoading(false)
        setError('Incorrect OTP. Please try again.')
      }
    }, 700)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #581c87 0%, #7e22ce 45%, #ec4899 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-3 border border-white/20">
            <img src={siteAssets.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-white/70 text-xs tracking-[0.3em] font-semibold uppercase">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-8">
          {step === 'email' ? (
            <>
              <div className="text-center mb-7">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                >
                  <ShieldCheck size={26} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-gray-500 text-sm mt-1">Sign in with your admin email to continue</p>
              </div>

              <form onSubmit={sendOtp} className="space-y-5">
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs font-medium -mt-3">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send OTP'}
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={() => { setStep('email'); setOtp(['', '', '', '', '', '']); setError('') }}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-5"
              >
                <ArrowLeft size={15} /> Back
              </button>

              <div className="text-center mb-7">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                >
                  <KeyRound size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Verify OTP</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Enter the 6-digit code sent to <span className="font-semibold text-gray-700">{email}</span>
                </p>
                <p className="text-[11px] text-purple-500 mt-2 bg-purple-50 inline-block px-2.5 py-1 rounded-full">
                  Demo mode — OTP: <span className="font-bold tracking-wider">{generatedOtp}</span>
                </p>
              </div>

              <form onSubmit={verifyOtp} className="space-y-5">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  ))}
                </div>

                {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Login'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={() => sendOtp()}
                    className="text-purple-600 text-xs font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-white/50 text-xs mt-6">Restricted area — authorized personnel only</p>
      </div>
    </div>
  )
}
