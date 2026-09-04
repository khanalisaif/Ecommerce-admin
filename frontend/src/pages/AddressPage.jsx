import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { User, MapPin, Home, Briefcase, MoreHorizontal, Edit, Trash2, Plus, Phone } from 'lucide-react'

const emptyForm = {
  fullName: '',
  mobile: '',
  pincode: '',
  flatHouse: '',
  areaStreet: '',
  landmark: '',
  city: '',
  state: 'Haryana',
  addressType: 'home',
  setAsDefault: false,
}

export default function AddressPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [confirmPrimaryId, setConfirmPrimaryId] = useState(null)
  const nameInputRef = useRef(null)

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: 'PRIMARY',
      name: 'Priya Sharma',
      address: 'A-12, Green Park Society\nGreen Park Society, Sector 45\nNear Central Park Entrance\nGurgaon, Haryana - 122003',
      phone: '+91 98765 43210',
      raw: {
        fullName: 'Priya Sharma', mobile: '+91 98765 43210', pincode: '122003',
        flatHouse: 'A-12, Green Park Society', areaStreet: 'Green Park Society, Sector 45',
        landmark: 'Near Central Park Entrance', city: 'Gurgaon', state: 'Haryana',
        addressType: 'home', setAsDefault: true,
      },
    },
    {
      id: 2,
      type: 'WORK',
      name: 'Priya Sharma',
      address: 'Office - 501, Block B\nSpaze iTech Park, Sector 49\nSohna Road\nGurgaon, Haryana - 122018',
      phone: '+91 98765 43210',
      raw: {
        fullName: 'Priya Sharma', mobile: '+91 98765 43210', pincode: '122018',
        flatHouse: 'Office - 501, Block B', areaStreet: 'Spaze iTech Park, Sector 49',
        landmark: 'Sohna Road', city: 'Gurgaon', state: 'Haryana',
        addressType: 'work', setAsDefault: false,
      },
    },
    {
      id: 3,
      type: 'OTHER',
      name: 'Priya Sharma',
      address: 'C-45, First Floor\nDLF Phase 2\nGurgaon, Haryana - 122002',
      phone: '+91 98765 43210',
      raw: {
        fullName: 'Priya Sharma', mobile: '+91 98765 43210', pincode: '122002',
        flatHouse: 'C-45, First Floor', areaStreet: 'DLF Phase 2',
        landmark: '', city: 'Gurgaon', state: 'Haryana',
        addressType: 'other', setAsDefault: false,
      },
    },
  ])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    if (nameInputRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => nameInputRef.current.focus(), 300)
    }
  }

  const handleEdit = (addr) => {
    setFormData(addr.raw)
    setEditingId(addr.id)
    if (nameInputRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => nameInputRef.current.focus(), 300)
    }
  }

  const handleDelete = (id) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id))
    if (editingId === id) resetForm()
  }

  const setAsPrimary = (id) => {
    setConfirmPrimaryId(id)
  }

  const confirmSetAsPrimary = () => {
    if (confirmPrimaryId !== null) {
      setSavedAddresses(prev => prev.map(a => ({
        ...a,
        type: a.id === confirmPrimaryId ? 'PRIMARY' : (a.type === 'PRIMARY' ? a.raw.addressType.toUpperCase() : a.type)
      })))
      setConfirmPrimaryId(null)
    }
  }

  const handleSave = () => {
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.flatHouse.trim() || !formData.city.trim()) {
      alert('Please fill in the required fields (Name, Mobile, Address, City).')
      return
    }

    const typeLabel = formData.setAsDefault ? 'PRIMARY' : formData.addressType.toUpperCase()
    const addressText = [
      formData.flatHouse,
      formData.areaStreet,
      formData.landmark,
      `${formData.city}, ${formData.state} - ${formData.pincode}`,
    ].filter(Boolean).join('\n')

    setSavedAddresses(prev => {
      let next = prev
      if (formData.setAsDefault) {
        next = next.map(a => ({ ...a, type: a.type === 'PRIMARY' ? formData.addressType.toUpperCase() : a.type }))
      }
      if (editingId) {
        return next.map(a => a.id === editingId
          ? { ...a, type: typeLabel, name: formData.fullName, address: addressText, phone: formData.mobile, raw: formData }
          : a)
      }
      return [
        ...next,
        {
          id: Date.now(),
          type: typeLabel,
          name: formData.fullName,
          address: addressText,
          phone: formData.mobile,
          raw: formData,
        },
      ]
    })

    resetForm()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add / Edit Address</h1>
        <p className="text-gray-500 text-sm mb-6">Enter the address details below for smooth delivery</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-6">
              {/* Contact Details */}
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={18} />
                  Contact Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Full Name*</label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Mobile Number*</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Pincode*</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                      />
                      <button className="px-4 py-2.5 bg-purple-50 text-purple-600 font-bold text-sm rounded-lg hover:bg-purple-100 whitespace-nowrap">
                        Check Pincode
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={18} />
                  Address Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Flat, House No., Building, Company, Apartment*</label>
                    <input
                      type="text"
                      name="flatHouse"
                      value={formData.flatHouse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Area, Street, Sector, Village*</label>
                    <input
                      type="text"
                      name="areaStreet"
                      value={formData.areaStreet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">City / Town*</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">State*</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                      >
                        <option>Haryana</option>
                        <option>Delhi</option>
                        <option>Punjab</option>
                        <option>Uttar Pradesh</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">Address Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, addressType: 'home' }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${
                      formData.addressType === 'home'
                        ? 'border-purple-600 text-purple-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Home size={16} />
                    Home
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, addressType: 'work' }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${
                      formData.addressType === 'work'
                        ? 'border-purple-600 text-purple-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Briefcase size={16} />
                    Work
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, addressType: 'other' }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${
                      formData.addressType === 'other'
                        ? 'border-purple-600 text-purple-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <MoreHorizontal size={16} />
                    Other
                  </button>
                </div>
              </div>

              {/* Set as Default */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Set as Default Address</p>
                  <p className="text-xs text-gray-500">This address will be used by default for all orders</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, setAsDefault: !prev.setAsDefault }))}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    formData.setAsDefault ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.setAsDefault ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700"
                >
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </div>
          </div>

          {/* Saved Addresses Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
              <h2 className="text-base font-bold text-gray-900 mb-4">Saved Addresses</h2>
              <div className="space-y-4">
                {savedAddresses.map((addr, idx) => (
                  <div key={addr.id} className={`border rounded-lg p-4 bg-white ${addr.type === 'PRIMARY' ? 'border-purple-600' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setAsPrimary(addr.id)} className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 focus:outline-none transition-colors ${addr.type === 'PRIMARY' ? 'border-purple-600' : 'border-gray-300 hover:border-purple-400'}`}>
                          {addr.type === 'PRIMARY' && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                        </button>
                        <h3 className="font-bold text-gray-900 text-sm">{addr.name}</h3>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${addr.type === 'PRIMARY' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 whitespace-pre-line leading-relaxed">{addr.address}</p>
                    <p className="text-xs text-gray-500 mb-3">{addr.phone}</p>
                    <div className="border-t border-gray-100 pt-3 flex gap-4">
                      <button onClick={() => handleEdit(addr)} className="text-purple-600 font-bold text-xs flex items-center gap-1 hover:text-purple-700">
                        <Edit size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(addr.id)} className="text-red-500 font-bold text-xs flex items-center gap-1 hover:text-red-700">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={resetForm}
                  className="w-full border-2 border-dashed border-purple-600 rounded-lg p-4 text-center text-purple-600 font-bold text-sm flex items-center justify-center gap-1 hover:bg-purple-50"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Need Help Bar */}
      <div className="bg-gray-50 border-t border-gray-100 py-4 mt-8">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-center gap-2 text-sm text-gray-600 flex-wrap">
          <Phone size={16} className="text-gray-700" />
          <span className="font-bold text-gray-900">Need Help?</span>
          <span>Call us at +91 98765 43210 or Email us at <a href="mailto:support@heandshe.com" className="text-purple-600 hover:underline">support@heandshe.com</a></span>
        </div>
      </div>

      <Footer />

      {/* Confirmation Modal */}
      {confirmPrimaryId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Change Primary Address?</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to set this as your primary default address?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmPrimaryId(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSetAsPrimary}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
