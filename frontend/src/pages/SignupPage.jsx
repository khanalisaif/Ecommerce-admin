import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Phone, Loader2 } from 'lucide-react'
import AuthTopBar from '../components/AuthTopBar'
import Footer from '../components/Footer'
import AuthFeaturesBar from '../components/AuthFeaturesBar'
import { useShop } from '../context/ShopContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { showToast, siteAssets } = useShop()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male',
    email: '',
    mobileNumber: '',
    password: '',
    agreeTerms: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      showToast('Please agree to the Terms & Conditions', 'error')
      return
    }
    if (!formData.fullName || !formData.email || !formData.password || !formData.mobileNumber) {
      showToast('Please fill in all required fields', 'error')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      showToast('Account created successfully!', 'success')
      navigate('/')
    }, 1500)
  }

  const genders = [
    { value: 'male', label: 'Male', icon: '♂' },
    { value: 'female', label: 'Female', icon: '♀' },
    { value: 'other', label: 'Other', icon: '○' },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthTopBar />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left side - image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src={siteAssets.signupImageUrl}
            alt="Create your Hashtelicom account"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-[620px] px-5 sm:px-8 py-8">

            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign up</h1>
              <p className="text-gray-500 text-sm">Create your account to get started</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-gray-800 font-semibold text-sm mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-800 font-semibold text-sm mb-1.5">Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  {genders.map((g) => (
                    <label
                      key={g.value}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium select-none ${formData.gender === g.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g.value}
                        checked={formData.gender === g.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="text-base">{g.icon}</span>
                      <span>{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-800 font-semibold text-sm mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-800 font-semibold text-sm mb-1.5">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-2.5 bg-white">
                    <Phone size={14} className="text-gray-400" />
                    <select
                      className="text-sm text-gray-700 font-medium bg-transparent focus:outline-none"
                      defaultValue="+91"
                    >
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-800 font-semibold text-sm mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
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

              {/* Terms & Conditions */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${formData.agreeTerms ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'
                      }`}
                  >
                    {formData.agreeTerms && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-600 text-sm leading-relaxed" onClick={(e) => e.preventDefault()}>
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 font-semibold hover:underline">Terms &amp; Conditions</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-600 font-semibold hover:underline">Privacy Policy</a>
                </span>
              </label>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-5 text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-600 font-bold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      <AuthFeaturesBar />
      <Footer showFeatures={false} />
    </div>
  )
}
