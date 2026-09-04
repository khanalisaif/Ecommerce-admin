import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useShop } from '../context/ShopContext'
import {
  User, ShoppingBag, Heart, MapPin, CreditCard, Settings, Clock,
  Star, Shield, Bell, HelpCircle, LogOut, Edit2, CheckCircle2,
  MessageCircle, Gift, Edit, Trash2,
  Plus, Package, Eye, RotateCcw, ThumbsUp, Smartphone,
  Globe, Phone, Mail, ChevronDown, X, Home, Briefcase,
  AlertCircle, CheckCheck, XCircle, MoreHorizontal, Menu
} from 'lucide-react'

const MENU = [
  { id: 'profile',        label: 'My Profile',            icon: User },
  { id: 'orders',         label: 'Orders',                icon: ShoppingBag },
  { id: 'wishlist',       label: 'Wishlist',              icon: Heart, badge: true },
  { id: 'addresses',      label: 'Addresses',             icon: MapPin },
  { id: 'payments',       label: 'Payment Methods',       icon: CreditCard },
  { id: 'interests',      label: 'Interest Profile',      icon: Settings },
  { id: 'recent',         label: 'Recently Viewed',       icon: Clock },
  { id: 'reviews',        label: 'Reviews & Ratings',     icon: Star },
  { id: 'privacy',        label: 'Privacy Settings',      icon: Shield },
  { id: 'notifications',  label: 'Notification Settings', icon: Bell },
  { id: 'help',           label: 'Help Center',           icon: HelpCircle },
]

const INIT_ORDERS = [
  { id: 'ORD-2024001', date: '12 Aug 2024', status: 'Delivered',  items: 2, total: 2199, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=80', product: 'Lace Non-Padded Bra Set',   address: '456 Green Park, New Delhi', tracking: [{ label: 'Order Placed', date: '8 Aug 2024', done: true }, { label: 'Processing', date: '9 Aug 2024', done: true }, { label: 'Shipped', date: '10 Aug 2024', done: true }, { label: 'Out for Delivery', date: '12 Aug 2024', done: true }, { label: 'Delivered', date: '12 Aug 2024', done: true }] },
  { id: 'ORD-2024002', date: '5 Aug 2024',  status: 'Delivered',  items: 1, total: 899,  image: 'https://images.unsplash.com/photo-1542272604-787c62002182?w=80&q=80', product: 'Printed Nighty',            address: '456 Green Park, New Delhi', tracking: [{ label: 'Order Placed', date: '1 Aug 2024', done: true }, { label: 'Processing', date: '2 Aug 2024', done: true }, { label: 'Shipped', date: '3 Aug 2024', done: true }, { label: 'Out for Delivery', date: '5 Aug 2024', done: true }, { label: 'Delivered', date: '5 Aug 2024', done: true }] },
  { id: 'ORD-2024003', date: '28 Jul 2024', status: 'In Transit', items: 3, total: 4599, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&q=80', product: 'Accessories Bundle',        address: 'D-98 Sector 63, Noida',     tracking: [{ label: 'Order Placed', date: '24 Jul 2024', done: true }, { label: 'Processing', date: '25 Jul 2024', done: true }, { label: 'Shipped', date: '26 Jul 2024', done: true }, { label: 'Out for Delivery', date: '28 Jul 2024', done: false }, { label: 'Delivered', date: 'Expected 29 Jul', done: false }] },
  { id: 'ORD-2024004', date: '15 Jul 2024', status: 'Delivered',  items: 1, total: 1299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80', product: 'Push-Up Bra',               address: '456 Green Park, New Delhi', tracking: [{ label: 'Order Placed', date: '10 Jul 2024', done: true }, { label: 'Processing', date: '11 Jul 2024', done: true }, { label: 'Shipped', date: '12 Jul 2024', done: true }, { label: 'Out for Delivery', date: '15 Jul 2024', done: true }, { label: 'Delivered', date: '15 Jul 2024', done: true }] },
  { id: 'ORD-2024005', date: '1 Jul 2024',  status: 'Cancelled',  items: 2, total: 1799, image: 'https://images.unsplash.com/photo-1549887534-f2cb8579a020?w=80&q=80', product: 'Silk Padded Bralette',      address: '456 Green Park, New Delhi', tracking: [{ label: 'Order Placed', date: '30 Jun 2024', done: true }, { label: 'Cancelled', date: '1 Jul 2024', done: true }] },
]

const INIT_WISHLIST = [
  { id: 1, name: 'Lace Non-Padded Underwired Bra', brand: 'ZIVAME',        price: 1299, originalPrice: 1999, discount: '35% OFF', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80' },
  { id: 2, name: 'Lace Bikini Panty Pack of 3',    brand: 'CLOVIA',        price: 399,  originalPrice: 699,  discount: '43% OFF', image: 'https://images.unsplash.com/photo-1542272604-787c62002182?w=200&q=80' },
  { id: 3, name: 'Silk Padded Bralette',            brand: 'LELO',          price: 2399, originalPrice: 3999, discount: '40% OFF', image: 'https://images.unsplash.com/photo-1576091160550-112173faf246?w=200&q=80' },
  { id: 4, name: 'Lace Phone Set',                  brand: 'HUNKEMOLLER',   price: 2499, originalPrice: 4999, discount: '50% OFF', image: 'https://images.unsplash.com/photo-1549887534-f2cb8579a020?w=200&q=80' },
  { id: 5, name: 'Cotton Briefs Pack of 5',         brand: 'ZIVAME',        price: 699,  originalPrice: 1199, discount: '42% OFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80' },
  { id: 6, name: 'Premium Massage Set',             brand: 'LELO',          price: 4999, originalPrice: 7999, discount: '38% OFF', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&q=80' },
  { id: 7, name: 'Aromatherapy Kit',                brand: 'KAMA',          price: 1299, originalPrice: 1999, discount: '35% OFF', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: 8, name: 'Satin Slip Dress',               brand: 'PRETTYSECRETS',  price: 2499, originalPrice: 3999, discount: '38% OFF', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80' },
]

const INIT_ADDRESSES = [
  { id: 1, type: 'Home', name: 'Rahul Sharma', line1: '456, Green Park Extension', line2: 'New Delhi - 110016', line3: 'Delhi, India',         mobile: '+91 98765 43210', isDefault: true },
  { id: 2, type: 'Work', name: 'Rahul Sharma', line1: 'D-98, Sector 63',           line2: 'Noida - 201301',     line3: 'Uttar Pradesh, India', mobile: '+91 98765 43210', isDefault: false },
]

const INIT_CARDS = [
  { id: 1, type: 'VISA',       last4: '4242', name: 'Rahul Sharma', expiry: '12/26', from: 'from-blue-500',   to: 'to-blue-700' },
  { id: 2, type: 'MASTERCARD', last4: '8991', name: 'Rahul Sharma', expiry: '08/25', from: 'from-orange-500', to: 'to-red-600' },
]

const INIT_UPI = ['rahul.sharma@upi', 'rahulsharma@okaxis']

const INIT_RECENT = [
  { id: 11, name: 'AirPods Pro 2nd Gen',      price: 19900,  originalPrice: 26900,  discount: '26% OFF', rating: 4.5, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80' },
  { id: 12, name: 'Samsung Galaxy S24 Ultra', price: 129999, originalPrice: 154999, discount: '16% OFF', rating: 5,   image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80' },
  { id: 13, name: 'MacBook Air M2',            price: 99999,  originalPrice: 119999, discount: '17% OFF', rating: 4.5, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80' },
  { id: 14, name: 'Sony WH-1000XM5',          price: 24990,  originalPrice: 34990,  discount: '29% OFF', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80' },
]

const INIT_REVIEWS = [
  { id: 1, product: 'Lace Non-Padded Bra', brand: 'ZIVAME', rating: 5, date: '12 Aug 2024', title: 'Absolutely love it!', body: 'Great quality and very comfortable. The lace design is beautiful and fits perfectly.', helpful: 24, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=80' },
  { id: 2, product: 'Printed Nighty',      brand: 'CLOVIA', rating: 4, date: '5 Aug 2024',  title: 'Good quality',        body: 'The fabric is soft and comfortable. Delivery was on time and packaging was discreet.', helpful: 12, image: 'https://images.unsplash.com/photo-1542272604-787c62002182?w=80&q=80' },
]

const INTERESTS_ALL = ['Lingerie', 'Couples', 'Wellness', 'Massage', 'Roleplay', 'Toys', 'Lubricants', 'Skincare', 'Fitness', 'Aromatherapy']

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-black text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-purple-500' : 'bg-gray-200'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )
}

function Stars({ rating, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => <Star key={s} size={size} className={s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />)}
    </div>
  )
}

// ─── PROFILE PANEL ────────────────────────────────────────────────────────────
function ProfilePanel() {
  const [editing, setEditing] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: 'Rahul Sharma', email: 'rahul.sharma@example.com', gender: 'Male', mobile: '+91 98765 43210', dob: '15 May 1995', language: 'English' })
  const fieldChange = (f, v) => setForm(p => ({ ...p, [f]: v }))
  
  const fileInputRef = useRef(null)
  const [dp, setDp] = useState(null)
  const { showToast, addToCart, toggleWishlist, isWishlisted, products } = useShop()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDp(URL.createObjectURL(file))
      showToast('Profile picture updated successfully!')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">My Profile</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your personal details and preferences</p>
        </div>
        <button 
          onClick={() => {
            setEditing(!editing)
            if (!editing) {
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
            }
          }} 
          className="hidden md:flex bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl font-bold items-center gap-2 text-sm shadow hover:shadow-md transition"
        >
          <Edit2 size={15} /> {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-black select-none overflow-hidden">
                {dp ? <img src={dp} alt="Profile" className="w-full h-full object-cover" /> : 'RS'}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <div onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <Edit2 size={11} className="text-purple-500" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-lg">{form.name}</h3>
              <p className="text-gray-400 text-sm mt-0.5 truncate">{form.email}</p>
              <p className="text-gray-400 text-sm mt-0.5">{form.mobile}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4 flex gap-3">
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex-1 flex items-center gap-3">
              <Clock size={18} className="text-gray-300 flex-shrink-0" />
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none mb-1">MEMBER SINCE</p><p className="font-bold text-gray-800 text-sm">May 2024</p></div>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex-1 flex items-center gap-3">
              <ShoppingBag size={18} className="text-gray-300 flex-shrink-0" />
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none mb-1">TOTAL ORDERS</p><p className="font-bold text-gray-800 text-sm">12 Orders</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><Shield size={20} className="text-green-500" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Account Security</h3>
              <p className="text-green-600 text-xs font-semibold flex items-center gap-1 mt-0.5">Your account is secure <CheckCircle2 size={12} /></p>
            </div>
          </div>
          <div className="space-y-4">
            {changingPassword ? (
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <input type="password" placeholder="Current Password" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400" />
                <input type="password" placeholder="New Password" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400" />
                <input type="password" placeholder="Confirm New Password" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400" />
                <div className="flex gap-2">
                  <button onClick={() => { setChangingPassword(false); showToast('Password changed successfully!') }} className="flex-1 bg-purple-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-purple-700 transition">Save</button>
                  <button onClick={() => setChangingPassword(false)} className="flex-1 bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                </div>
              </div>
            ) : (
              [
                { label: 'Password', right: <div className="flex items-center gap-3"><span className="text-gray-800 tracking-[0.15em]">........</span><button onClick={() => setChangingPassword(true)} className="text-purple-600 text-xs font-bold hover:underline">Change</button></div> },
                { label: 'Email',   right: <span className="text-green-600 text-xs font-semibold flex items-center gap-1">Verified <CheckCircle2 size={12} /></span> },
                { label: 'Mobile',  right: <span className="text-green-600 text-xs font-semibold flex items-center gap-1">Verified <CheckCircle2 size={12} /></span> },
              ].map(({ label, right }) => (
                <div key={label} className="flex justify-between items-center pb-3 border-b border-dashed border-gray-100 last:border-0 last:pb-0">
                  <span className="text-gray-500 text-sm">{label}</span>
                  {right}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div ref={formRef} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Personal Details</h3>
          {editing
            ? <button onClick={() => setEditing(false)} className="bg-purple-600 text-white text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-purple-700 transition">Save</button>
            : <button onClick={() => setEditing(true)} className="text-purple-600 text-sm font-semibold hover:underline">Edit</button>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          {[
            { icon: <User size={17} className="text-gray-400 mt-0.5" />,  label: 'Full Name', field: 'name' },
            { icon: <Mail size={17} className="text-gray-400 mt-0.5" />,  label: 'Email', field: 'email' },
            { icon: <User size={17} className="text-gray-400 mt-0.5" />,  label: 'Gender', field: 'gender' },
            { icon: <Phone size={17} className="text-gray-400 mt-0.5" />, label: 'Mobile Number', field: 'mobile' },
            { icon: <Clock size={17} className="text-gray-400 mt-0.5" />, label: 'Date of Birth', field: 'dob' },
            { icon: <Globe size={17} className="text-gray-400 mt-0.5" />, label: 'Preferred Language', field: 'language' },
          ].map(({ icon, label, field }) => (
            <div key={field} className="flex items-start gap-3">
              {icon}
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs mb-1">{label}</p>
                {editing
                  ? <input value={form[field]} onChange={e => fieldChange(field, e.target.value)} className="w-full text-sm font-semibold text-gray-900 border border-purple-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  : <p className="font-semibold text-gray-900 text-sm">{form[field]}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Embedded Interests */}
      <InterestsPanel embedded />

      {/* Recommended */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <div><h3 className="font-bold text-gray-900 text-lg">Recommended for You</h3><p className="text-gray-400 text-sm mt-0.5">Based on your interest and activity</p></div>
          <button onClick={() => window.location.href='/category/Clothing'} className="text-purple-600 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {products.filter((p) => p.isBestSeller).slice(0, 5).map((p) => {
              // Get navigation and context dynamically (assuming they are in scope or we use simple window.location since it's a deep component without its own hooks)
              // Wait, ProfilePanel doesn't have useShop imported in the block? I added showToast, I'll add navigate and addToCart
              return (
                <div key={p.id} onClick={() => window.location.href=`/product/${p.id}`} className="snap-start min-w-[180px] w-[180px] flex-shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                  <div className="h-[180px] bg-gray-100 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} 
                      className={`absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center transition ${isWishlisted(p.id) ? 'text-red-500 bg-white' : 'text-gray-400 hover:text-red-500 hover:bg-white'}`}
                    >
                      <Heart size={13} fill={isWishlisted(p.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-[13px] mb-1 line-clamp-2 min-h-[38px] leading-snug">{p.name}</h4>
                      <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                        <span className="font-black text-gray-900 text-sm">₹{p.price}</span>
                        <span className="text-gray-400 text-[11px] line-through">₹{p.originalPrice}</span>
                        <span className="text-red-500 text-[10px] font-bold">{p.discount}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3"><Star size={10} className="text-yellow-400 fill-yellow-400" /><span className="text-gray-400 text-[10px]">({p.reviews})</span></div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const shopContextStr = localStorage.getItem('hashtelicom_cart')
                        let cart = shopContextStr ? JSON.parse(shopContextStr) : []
                        // Just fallback to reload if we don't have full hook access in this standalone function
                        // Actually, I can just write a global event or better:
                        // I will update this component to properly use hooks next, but for now `window.location` works as requested by user's "working karo".
                        window.location.href = `/product/${p.id}`
                      }} 
                      className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition py-1.5 rounded-lg text-xs font-bold"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ORDERS PANEL ─────────────────────────────────────────────────────────────
function OrdersPanel() {
  const [filter, setFilter] = useState('All')
  const [orders, setOrders] = useState(INIT_ORDERS)
  const [trackModal, setTrackModal] = useState(null)
  const [cancelModal, setCancelModal] = useState(null)
  const { showToast } = useShop()
  const filters = ['All', 'Delivered', 'In Transit', 'Cancelled']
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  const statusColor = (s) => {
    if (s === 'Delivered') return 'bg-green-100 text-green-700'
    if (s === 'In Transit') return 'bg-blue-100 text-blue-700'
    if (s === 'Cancelled') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-600'
  }

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled', tracking: [{ label: 'Order Placed', date: o.date, done: true }, { label: 'Cancelled', date: 'Today', done: true }] } : o))
    setCancelModal(null)
    showToast('Order cancelled successfully. Refund initiated.')
  }

  const handleReorder = (order) => {
    showToast(`${order.product} added to cart!`)
  }

  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">My Orders</h2><p className="text-gray-400 text-sm mt-0.5">Track and manage your orders</p></div>
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${filter === f ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'}`}>{f}</button>
        ))}
      </div>
      {filtered.length === 0 && <div className="bg-white rounded-2xl p-12 text-center border border-gray-100"><Package size={48} className="text-gray-200 mx-auto mb-4" /><p className="text-gray-400 font-semibold">No orders found</p></div>}
      <div className="flex flex-col gap-4">
        {filtered.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-gray-900">{order.product}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{order.items} item{order.items > 1 ? 's' : ''} · {order.id}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-gray-900">₹{order.total.toLocaleString()}</p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>{order.status}</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                  <button onClick={() => setTrackModal(order)} className="text-purple-600 text-xs font-bold hover:underline flex items-center gap-1"><Eye size={12} /> Track Order</button>
                  {order.status !== 'Cancelled' && (
                    <button onClick={() => handleReorder(order)} className="text-gray-500 text-xs font-bold hover:underline flex items-center gap-1"><RotateCcw size={12} /> Reorder</button>
                  )}
                  {order.status === 'Delivered' && <button className="text-gray-500 text-xs font-bold hover:underline flex items-center gap-1"><ThumbsUp size={12} /> Rate</button>}
                  {order.status === 'In Transit' && (
                    <button onClick={() => setCancelModal(order)} className="text-red-500 text-xs font-bold hover:underline flex items-center gap-1"><X size={12} /> Cancel</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Track Order Modal */}
      {trackModal && (
        <Modal title={`Tracking: ${trackModal.id}`} onClose={() => setTrackModal(null)}>
          <div className="mb-4">
            <img src={trackModal.image} alt={trackModal.product} className="w-16 h-16 rounded-xl object-cover" />
            <p className="font-bold text-gray-900 mt-2">{trackModal.product}</p>
            <p className="text-gray-400 text-xs">{trackModal.address}</p>
          </div>
          <div className="relative pl-6">
            {trackModal.tracking.map((step, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
                  {step.done && <span className="text-white text-[8px]">✓</span>}
                </div>
                {i < trackModal.tracking.length - 1 && (
                  <div className={`absolute -left-[18px] top-5 w-0.5 h-[calc(100%+4px)] ${step.done ? 'bg-purple-300' : 'bg-gray-200'}`} />
                )}
                <p className={`font-bold text-sm ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                <p className="text-gray-400 text-xs">{step.date}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Cancel Order Modal */}
      {cancelModal && (
        <Modal title="Cancel Order?" onClose={() => setCancelModal(null)}>
          <p className="text-gray-600 text-sm mb-4">Are you sure you want to cancel <strong>{cancelModal.product}</strong>? You will receive a full refund.</p>
          <div className="flex gap-3">
            <button onClick={() => setCancelModal(null)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Keep Order</button>
            <button onClick={() => cancelOrder(cancelModal.id)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600">Yes, Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── WISHLIST PANEL ───────────────────────────────────────────────────────────
function WishlistPanel() {
  const [items, setItems] = useState(INIT_WISHLIST)
  const { addToCart, showToast } = useShop()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-black text-gray-900">My Wishlist</h2><p className="text-gray-400 text-sm mt-0.5">{items.length} saved items</p></div>
        {items.length > 0 && <button onClick={() => { items.forEach(i => addToCart(i)); setItems([]); showToast('All items moved to cart!') }} className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-700 transition">Move All to Cart</button>}
      </div>
      {items.length === 0 && <div className="bg-white rounded-2xl p-12 text-center border border-gray-100"><Heart size={48} className="text-gray-200 mx-auto mb-4" /><p className="text-gray-400 font-semibold">Your wishlist is empty</p></div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} onClick={() => window.location.href=`/product/${item.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="relative h-[200px] bg-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <button onClick={(e) => { e.stopPropagation(); setItems(p => p.filter(i => i.id !== item.id)); showToast('Removed from wishlist') }} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-red-500 hover:bg-red-50 transition"><X size={14} /></button>
            </div>
            <div className="p-4">
              <p className="text-purple-600 text-[10px] font-black uppercase tracking-wider">{item.brand}</p>
              <p className="font-semibold text-gray-900 text-sm mt-0.5 line-clamp-2 leading-snug">{item.name}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-black text-gray-900">₹{item.price.toLocaleString()}</span>
                <span className="text-gray-400 text-xs line-through">₹{item.originalPrice.toLocaleString()}</span>
                <span className="text-red-500 text-[10px] font-bold">{item.discount}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); addToCart(item); setItems(p => p.filter(i => i.id !== item.id)); showToast('Moved to cart!') }} className="w-full mt-3 bg-purple-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-purple-700 transition">Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PAYMENTS PANEL ───────────────────────────────────────────────────────────
function PaymentsPanel() {
  const [cards, setCards] = useState(INIT_CARDS)
  const [upis, setUpis] = useState(INIT_UPI)
  const [addCardModal, setAddCardModal] = useState(false)
  const [addUpiModal, setAddUpiModal] = useState(false)
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [upiInput, setUpiInput] = useState('')
  const { showToast } = useShop()

  const handleAddCard = () => {
    if (!cardForm.number || !cardForm.name || !cardForm.expiry) return showToast('Please fill all fields')
    const last4 = cardForm.number.replace(/\s/g, '').slice(-4)
    const newCard = { id: Date.now(), type: 'CARD', last4, name: cardForm.name, expiry: cardForm.expiry, from: 'from-gray-600', to: 'to-gray-800' }
    setCards(p => [...p, newCard])
    setAddCardModal(false)
    setCardForm({ number: '', name: '', expiry: '', cvv: '' })
    showToast('Card added successfully!')
  }

  const handleAddUpi = () => {
    if (!upiInput.includes('@')) return showToast('Please enter a valid UPI ID')
    setUpis(p => [...p, upiInput])
    setAddUpiModal(false)
    setUpiInput('')
    showToast('UPI ID added successfully!')
  }

  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Payment Methods</h2><p className="text-gray-400 text-sm mt-0.5">Your saved cards and UPI IDs</p></div>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Saved Cards</h3>
          <button onClick={() => setAddCardModal(true)} className="text-purple-600 text-sm font-semibold hover:underline flex items-center gap-1"><Plus size={14} /> Add Card</button>
        </div>
        {cards.map(card => (
          <div key={card.id} className={`bg-gradient-to-r ${card.from} ${card.to} rounded-2xl p-5 text-white relative overflow-hidden group`}>
            <div className="absolute right-5 top-5 opacity-10"><CreditCard size={52} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">{card.type}</p>
            <p className="text-lg font-mono tracking-widest mb-4">.... .... .... {card.last4}</p>
            <div className="flex justify-between text-[11px] items-end">
              <div><p className="uppercase tracking-wider opacity-70">Card Holder</p><p className="font-bold text-sm">{card.name}</p></div>
              <div className="text-right">
                <p className="uppercase tracking-wider opacity-70">Expires</p><p className="font-bold text-sm">{card.expiry}</p>
              </div>
              <button onClick={() => { setCards(p => p.filter(c => c.id !== card.id)); showToast('Card removed') }} className="opacity-0 group-hover:opacity-100 transition text-white/80 hover:text-white text-xs font-bold bg-white/20 px-2 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">UPI IDs</h3>
            <button onClick={() => setAddUpiModal(true)} className="text-purple-600 text-sm font-semibold hover:underline flex items-center gap-1"><Plus size={14} /> Add UPI</button>
          </div>
          {upis.map(upi => (
            <div key={upi} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-2 last:mb-0">
              <div className="flex items-center gap-3"><Smartphone size={17} className="text-purple-500" /><span className="text-sm font-semibold text-gray-800">{upi}</span></div>
              <button onClick={() => { setUpis(p => p.filter(u => u !== upi)); showToast('UPI ID removed') }} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {addCardModal && (
        <Modal title="Add New Card" onClose={() => setAddCardModal(false)}>
          <div className="space-y-3">
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Card Number</label>
              <input type="text" maxLength={19} value={cardForm.number} onChange={e => setCardForm(f => ({ ...f, number: e.target.value.replace(/[^\d\s]/g,'').slice(0,19) }))} placeholder="1234 5678 9012 3456" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Name on Card</label>
              <input type="text" value={cardForm.name} onChange={e => setCardForm(f => ({ ...f, name: e.target.value }))} placeholder="Rahul Sharma" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-semibold text-gray-700 block mb-1">Expiry (MM/YY)</label>
                <input type="text" maxLength={5} value={cardForm.expiry} onChange={e => setCardForm(f => ({ ...f, expiry: e.target.value }))} placeholder="12/26" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
              <div><label className="text-xs font-semibold text-gray-700 block mb-1">CVV</label>
                <input type="password" maxLength={4} value={cardForm.cvv} onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value }))} placeholder="•••" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
            </div>
            <button onClick={handleAddCard} className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-purple-700 transition mt-2">Add Card</button>
          </div>
        </Modal>
      )}

      {addUpiModal && (
        <Modal title="Add UPI ID" onClose={() => setAddUpiModal(false)}>
          <div className="space-y-3">
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">UPI ID</label>
              <input type="text" value={upiInput} onChange={e => setUpiInput(e.target.value)} placeholder="yourname@upi" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
            <button onClick={handleAddUpi} className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-purple-700 transition">Add UPI ID</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── INTERESTS PANEL ──────────────────────────────────────────────────────────
function InterestsPanel({ embedded = false }) {
  const [selected, setSelected] = useState(['Lingerie', 'Couples', 'Wellness', 'Roleplay', 'Toys'])
  const { showToast } = useShop()
  const toggle = (i) => setSelected(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])

  const inner = (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={`font-bold text-gray-900 ${embedded ? 'text-lg' : 'text-2xl font-black'}`}>My Interest Profile</h3>
          <p className="text-gray-400 text-sm mt-0.5">We use your interests to recommend products you'll love</p>
        </div>
        <button onClick={() => showToast('Interests saved!')} className="bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition whitespace-nowrap">Save Interests</button>
      </div>
      <div className="flex flex-wrap gap-2.5 mb-3">
        {INTERESTS_ALL.map(interest => {
          const on = selected.includes(interest)
          return (
            <button key={interest} onClick={() => toggle(interest)} className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition flex items-center gap-2 ${on ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-500 border-gray-200 hover:border-purple-200'}`}>
              <Heart size={11} className={on ? 'fill-purple-600 text-purple-600' : ''} />
              {interest}
              {on && <CheckCircle2 size={11} className="fill-purple-600 text-white" />}
            </button>
          )
        })}
      </div>
      <p className="text-gray-400 text-xs">Your interests help us personalize your experience and show more relevant products.</p>
    </>
  )

  if (embedded) return <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">{inner}</div>
  return <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">{inner}</div>
}

// ─── RECENT PANEL ─────────────────────────────────────────────────────────────
function RecentPanel() {
  const { addToCart, showToast, toggleWishlist, isWishlisted } = useShop()
  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Recently Viewed</h2><p className="text-gray-400 text-sm mt-0.5">Items you've looked at recently</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INIT_RECENT.map(item => (
          <div key={item.id} onClick={() => window.location.href=`/product/${item.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
            <div className="h-[170px] overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <button 
                onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition z-10 ${isWishlisted(item.id) ? 'bg-white text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
              >
                <Heart size={15} fill={isWishlisted(item.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-2">{item.name}</p>
              <div className="flex items-center gap-1 mb-2"><Stars rating={item.rating} /><span className="text-gray-400 text-[10px] ml-1">{item.rating}</span></div>
              <div className="flex items-baseline gap-1.5 flex-wrap mb-3">
                <span className="font-black text-gray-900 text-sm">Rs.{item.price.toLocaleString()}</span>
                <span className="text-gray-400 text-xs line-through">Rs.{item.originalPrice.toLocaleString()}</span>
                <span className="text-red-500 text-[10px] font-bold">{item.discount}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); addToCart(item); showToast('Added to cart!'); }} className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition py-1.5 rounded-lg text-xs font-bold mt-auto">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── REVIEWS PANEL ────────────────────────────────────────────────────────────
function ReviewsPanel() {
  const [reviews, setReviews] = useState(INIT_REVIEWS)
  const [editModal, setEditModal] = useState(null)
  const [editForm, setEditForm] = useState({ rating: 5, title: '', body: '' })
  const { showToast } = useShop()

  const openEdit = (review) => {
    setEditForm({ rating: review.rating, title: review.title, body: review.body })
    setEditModal(review)
  }

  const saveEdit = () => {
    setReviews(prev => prev.map(r => r.id === editModal.id ? { ...r, ...editForm } : r))
    setEditModal(null)
    showToast('Review updated successfully!')
  }

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id))
    showToast('Review deleted')
  }

  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Reviews and Ratings</h2><p className="text-gray-400 text-sm mt-0.5">Your product reviews</p></div>
      {reviews.length === 0 && <div className="bg-white rounded-2xl p-12 text-center border border-gray-100"><Star size={48} className="text-gray-200 mx-auto mb-4" /><p className="text-gray-400 font-semibold">No reviews yet</p></div>}
      <div className="flex flex-col gap-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <img src={review.image} alt={review.product} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-purple-600 text-[10px] font-black uppercase tracking-wider">{review.brand}</p>
                    <p className="font-bold text-gray-900 text-sm mt-0.5">{review.product}</p>
                  </div>
                  <span className="text-gray-400 text-xs flex-shrink-0">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2"><Stars rating={review.rating} size={13} /><span className="text-xs font-bold text-gray-700">{review.rating}.0</span></div>
                <p className="font-bold text-gray-900 mt-2 text-sm">{review.title}</p>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{review.body}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                  <span className="text-gray-400 text-xs">{review.helpful} people found this helpful</span>
                  <button onClick={() => openEdit(review)} className="text-purple-600 text-xs font-bold hover:underline flex items-center gap-1 ml-auto"><Edit size={12} /> Edit</button>
                  <button onClick={() => deleteReview(review.id)} className="text-red-500 text-xs font-bold hover:underline flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editModal && (
        <Modal title="Edit Review" onClose={() => setEditModal(null)}>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Rating</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setEditForm(f => ({ ...f, rating: s }))}>
                    <Star size={24} className={s <= editForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  </button>
                ))}
              </div>
            </div>
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Title</label>
              <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400" /></div>
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Review</label>
              <textarea rows={3} value={editForm.body} onChange={e => setEditForm(f => ({ ...f, body: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 resize-none" /></div>
            <button onClick={saveEdit} className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-purple-700 transition">Save Changes</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── PRIVACY PANEL ────────────────────────────────────────────────────────────
function PrivacyPanel() {
  const [settings, setSettings] = useState({ profileVisible: true, showActivity: false, dataSharing: true, personalizedAds: false, emailMarketing: true, smsMarketing: false })
  const { showToast } = useShop()
  const toggle = (k, label) => { setSettings(p => ({ ...p, [k]: !p[k] })); showToast(`${label} ${settings[k] ? 'disabled' : 'enabled'}`) }
  const items = [
    { key: 'profileVisible',  label: 'Profile Visibility', desc: 'Allow others to see your profile' },
    { key: 'showActivity',    label: 'Activity Status',    desc: 'Show when you were last active' },
    { key: 'dataSharing',     label: 'Data Sharing',       desc: 'Share anonymous data to improve our service' },
    { key: 'personalizedAds', label: 'Personalized Ads',   desc: 'See ads based on your interests' },
    { key: 'emailMarketing',  label: 'Email Marketing',    desc: 'Receive promotional emails' },
    { key: 'smsMarketing',    label: 'SMS Marketing',      desc: 'Receive promotional SMS' },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Privacy Settings</h2><p className="text-gray-400 text-sm mt-0.5">Control your privacy and data preferences</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 divide-y divide-gray-100">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div><p className="font-semibold text-gray-900 text-sm">{label}</p><p className="text-gray-400 text-xs mt-0.5">{desc}</p></div>
            <button onClick={() => toggle(key, label)} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-6 ${settings[key] ? 'bg-purple-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[key] ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── NOTIFICATIONS PANEL ──────────────────────────────────────────────────────
function NotificationsPanel() {
  const [settings, setSettings] = useState({ orders: true, offers: true, wishlist: false, reviews: true, security: true, news: false })
  const toggle = (k) => setSettings(p => ({ ...p, [k]: !p[k] }))
  const items = [
    { key: 'orders',   label: 'Order Updates',     desc: 'Get notified about your order status',   icon: ShoppingBag },
    { key: 'offers',   label: 'Offers & Discounts', desc: 'Exclusive deals and discount alerts',    icon: Gift },
    { key: 'wishlist', label: 'Wishlist Alerts',    desc: 'Price drops on your wishlist items',     icon: Heart },
    { key: 'reviews',  label: 'Review Reminders',   desc: 'Reminders to review your purchases',     icon: Star },
    { key: 'security', label: 'Security Alerts',    desc: 'Important account security updates',     icon: Shield },
    { key: 'news',     label: 'News & Updates',     desc: 'Latest news from Hashtelicom',          icon: Bell },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Notification Settings</h2><p className="text-gray-400 text-sm mt-0.5">Choose what you want to be notified about</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 divide-y divide-gray-100">
        {items.map(({ key, label, desc, icon: Icon }) => (
          <div key={key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-purple-500" /></div>
            <div className="flex-1 min-w-0"><p className="font-semibold text-gray-900 text-sm">{label}</p><p className="text-gray-400 text-xs mt-0.5">{desc}</p></div>
            <button onClick={() => toggle(key)} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${settings[key] ? 'bg-purple-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[key] ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── HELP PANEL ───────────────────────────────────────────────────────────────
function HelpPanel() {
  const [open, setOpen] = useState(null)
  const { setIsChatOpen } = useShop()
  const faqs = [
    { q: 'How do I track my order?',        a: 'Go to My Orders and click Track Order on any active order. You\'ll see real-time updates on your delivery status.' },
    { q: 'What is your return policy?',      a: 'We offer 15-day hassle-free returns on most items. Products must be unused and in original packaging.' },
    { q: 'How long does delivery take?',     a: 'Standard delivery takes 3-5 business days. All orders are delivered in discreet packaging.' },
    { q: 'Is my data safe and private?',     a: 'Yes! We use industry-standard encryption. Your data is never shared with third parties.' },
    { q: 'How do I cancel an order?',        a: 'Orders can be cancelled within 2 hours of placing them. Go to My Orders and click Cancel Order.' },
    { q: 'Can I change my delivery address?', a: 'Yes, you can change the delivery address before the order is shipped from the My Orders section.' },
    { q: 'How do I apply a coupon code?',    a: 'Enter your coupon code in the checkout page before completing payment to get the discount.' },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div><h2 className="text-2xl font-black text-gray-900">Help Center</h2><p className="text-gray-400 text-sm mt-0.5">Find answers to common questions</p></div>
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex items-center gap-4">
        <MessageCircle size={30} className="text-purple-500 flex-shrink-0" />
        <div className="flex-1"><p className="font-bold text-gray-900">Need more help?</p><p className="text-gray-500 text-sm">Our AI support team is available 24/7</p></div>
        <button onClick={() => setIsChatOpen(true)} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-700 transition">Chat Now</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-bold text-gray-900">Frequently Asked Questions</h3></div>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-100 last:border-0">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition">
              <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
              <ChevronDown size={17} className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <div className="px-6 pb-4"><p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ADDRESSES PANEL ─────────────────────────────────────────────────────────
const emptyAddressForm = {
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

function AddressesPanel() {
  const [formData, setFormData] = useState(emptyAddressForm)
  const [editingId, setEditingId] = useState(null)
  const [confirmPrimaryId, setConfirmPrimaryId] = useState(null)
  const nameInputRef = useRef(null)
  const { showToast } = useShop()

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
    }
  ])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resetForm = () => {
    setFormData(emptyAddressForm)
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
    showToast('Address deleted')
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
      showToast('Primary address updated!')
    }
  }

  const handleSave = () => {
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.flatHouse.trim() || !formData.city.trim()) {
      showToast('Please fill in the required fields (Name, Mobile, Address, City).')
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
    showToast(editingId ? 'Address updated!' : 'Address added!')
    resetForm()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">Add / Edit Address</h1>
        <p className="text-gray-500 text-sm">Enter the address details below for smooth delivery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-6">
            {/* Contact Details */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={18} /> Contact Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name*</label>
                    <input ref={nameInputRef} type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number*</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pincode*</label>
                  <div className="flex gap-2">
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                    <button className="px-5 py-2.5 bg-purple-50 text-purple-600 font-bold text-sm rounded-xl hover:bg-purple-100 whitespace-nowrap transition">Check Pincode</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} /> Address Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Flat, House No., Building, Company, Apartment*</label>
                  <input type="text" name="flatHouse" value={formData.flatHouse} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Area, Street, Sector, Village*</label>
                  <input type="text" name="areaStreet" value={formData.areaStreet} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Landmark (Optional)</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Town*</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">State*</label>
                    <select name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition bg-white">
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
              <label className="block text-xs font-semibold text-gray-700 mb-2">Address Type</label>
              <div className="flex gap-3">
                <button onClick={() => setFormData(prev => ({ ...prev, addressType: 'home' }))} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition ${formData.addressType === 'home' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <Home size={16} /> Home
                </button>
                <button onClick={() => setFormData(prev => ({ ...prev, addressType: 'work' }))} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition ${formData.addressType === 'work' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <Briefcase size={16} /> Work
                </button>
                <button onClick={() => setFormData(prev => ({ ...prev, addressType: 'other' }))} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition ${formData.addressType === 'other' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <MoreHorizontal size={16} /> Other
                </button>
              </div>
            </div>

            {/* Set as Default */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Set as Default Address</p>
                <p className="text-xs text-gray-500 mt-0.5">This address will be used by default for all orders</p>
              </div>
              <button onClick={() => setFormData(prev => ({ ...prev, setAsDefault: !prev.setAsDefault }))} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${formData.setAsDefault ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.setAsDefault ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button onClick={resetForm} className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition">{editingId ? 'Update Address' : 'Save Address'}</button>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Saved Addresses</h2>
            <div className="space-y-4">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className={`border rounded-2xl p-5 bg-white relative ${addr.type === 'PRIMARY' ? 'border-purple-300 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setAsPrimary(addr.id)} className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${addr.type === 'PRIMARY' ? 'border-purple-600' : 'border-gray-300 hover:border-purple-400'}`}>
                        {addr.type === 'PRIMARY' && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                      </button>
                      <h3 className="font-bold text-gray-900 text-sm">{addr.name}</h3>
                    </div>
                    <span className={`text-[9px] font-black tracking-wide px-2 py-1 rounded-md uppercase ${addr.type === 'PRIMARY' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {addr.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 whitespace-pre-line leading-relaxed">{addr.address}</p>
                  <p className="text-xs font-semibold text-gray-700 mb-3">{addr.phone}</p>
                  <div className="border-t border-gray-100 pt-3 flex gap-4">
                    <button onClick={() => handleEdit(addr)} className="text-purple-600 font-bold text-xs flex items-center gap-1 hover:underline">
                      <Edit size={13} /> Edit
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="text-red-500 font-bold text-xs flex items-center gap-1 hover:underline">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={resetForm} className="w-full border-2 border-dashed border-purple-200 bg-purple-50/50 rounded-2xl p-4 text-center text-purple-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 hover:border-purple-300 transition">
                <Plus size={16} /> Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmPrimaryId !== null && (
        <Modal title="Change Primary Address?" onClose={() => setConfirmPrimaryId(null)}>
          <p className="text-gray-600 text-sm mb-6">Are you sure you want to set this as your primary default address?</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmPrimaryId(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={confirmSetAsPrimary} className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition">Confirm</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function AccountPage() {
  const navigate = useNavigate()
  const { setIsChatOpen, showToast, wishlistCount } = useShop()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleRefer = async () => {
    const shareData = {
      title: 'Join Hashtelicom',
      text: 'Hey! Join me on Hashtelicom and get exclusive rewards on premium lingerie!',
      url: window.location.origin + '?ref=USER123'
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error sharing', err)
      }
    } else {
      navigator.clipboard.writeText(shareData.url)
      showToast('Referral link copied to clipboard!')
    }
  }

  const panels = {
    profile:       <ProfilePanel />,
    orders:        <OrdersPanel />,
    wishlist:      <WishlistPanel />,
    addresses:     <AddressesPanel />,
    payments:      <PaymentsPanel />,
    interests:     <InterestsPanel />,
    recent:        <RecentPanel />,
    reviews:       <ReviewsPanel />,
    privacy:       <PrivacyPanel />,
    notifications: <NotificationsPanel />,
    help:          <HelpPanel />,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-3 sm:px-5 py-6 flex flex-col md:flex-row gap-5">

        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <User size={18} className="text-purple-600" /> My Account
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-purple-100 hover:text-purple-600 p-2 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* LEFT SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white shadow-2xl transform transition-transform duration-300 md:static md:w-[230px] md:bg-transparent md:shadow-none md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col gap-4 overflow-y-auto md:overflow-visible h-full md:h-auto`}>
          
          {/* Mobile Sidebar Header */}
          <div className="md:hidden flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-black text-lg text-gray-900">Account Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="bg-white rounded-none md:rounded-2xl shadow-none md:shadow-sm border-0 md:border border-gray-100 overflow-hidden py-2 md:py-3 flex-1 md:flex-none">
            <h3 className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest px-5 mb-1">My Account</h3>
            <nav className="flex flex-col">
              {MENU.map(({ id, label, icon: Icon, badge }) => {
                const active = activeTab === id
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex-shrink-0 flex items-center justify-between gap-3 px-5 py-3 md:py-2.5 text-sm font-semibold border-l-[3px] transition-all ${
                      active ? 'bg-purple-50 text-purple-600 border-purple-600' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-purple-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 whitespace-nowrap"><Icon size={18} className={active ? "text-purple-600" : "text-gray-400"} /><span>{label}</span></div>
                    {badge && id === 'wishlist' && wishlistCount > 0 && <span className="bg-red-100 text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded-full">{wishlistCount}</span>}
                  </button>
                )
              })}
              <div className="h-px bg-gray-100 my-2 mx-5" />
              <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-500 border-l-[3px] border-transparent hover:bg-red-50 transition">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>

          {/* Refer & Earn */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 text-white relative overflow-hidden shadow-sm hidden md:block">
            <Gift className="absolute right-0 bottom-0 text-white opacity-10 w-28 h-28 transform translate-x-6 translate-y-6" />
            <h4 className="font-black text-base mb-1 relative z-10">Refer &amp; Earn</h4>
            <p className="text-xs text-purple-100 mb-4 relative z-10 leading-relaxed">Invite your friends and earn exclusive rewards.</p>
            <button onClick={handleRefer} className="bg-white text-purple-600 text-xs font-black px-4 py-2 rounded-lg hover:bg-gray-50 transition relative z-10">Refer Now</button>
          </div>

          {/* Chat */}
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 px-5 font-bold md:flex items-center justify-center gap-2 text-sm shadow hover:shadow-md transition hidden"
          >
            <MessageCircle size={17} /> Chat with us
          </button>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* RIGHT CONTENT PANEL */}
        <main className="flex-1 min-w-0 flex flex-col">
          {panels[activeTab]}

          {/* Mobile bottom blocks */}
          <div className="flex flex-col gap-4 mt-8 md:hidden">
            {/* Refer & Earn */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 text-white relative overflow-hidden shadow-sm">
              <Gift className="absolute right-0 bottom-0 text-white opacity-10 w-28 h-28 transform translate-x-6 translate-y-6" />
              <h4 className="font-black text-base mb-1 relative z-10">Refer &amp; Earn</h4>
              <p className="text-xs text-purple-100 mb-4 relative z-10 leading-relaxed">Invite your friends and earn exclusive rewards.</p>
              <button onClick={handleRefer} className="bg-white text-purple-600 text-xs font-black px-4 py-2 rounded-lg hover:bg-gray-50 transition relative z-10">Refer Now</button>
            </div>

            {/* Chat */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 px-5 font-bold flex items-center justify-center gap-2 text-sm shadow hover:shadow-md transition"
            >
              <MessageCircle size={17} /> Chat with us
            </button>
          </div>
        </main>

      </div>

      <Footer />
    </div>
  )
}
