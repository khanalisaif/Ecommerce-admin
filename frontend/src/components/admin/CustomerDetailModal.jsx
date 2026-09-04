import { X, Mail, Phone, Calendar, ShoppingBag, IndianRupee } from 'lucide-react'
import { useShop } from '../../context/ShopContext'

const orderStatusStyles = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
  Pending: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-600',
}

export default function CustomerDetailModal({ customer, onClose }) {
  const { orders } = useShop()
  const customerOrders = orders.filter((o) => o.customerEmail === customer.email)

  const initials = customer.name.split(' ').map((n) => n[0]).join('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-gray-900 text-lg">Customer Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
            >
              {initials}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{customer.name}</p>
              <span
                className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {customer.status}
              </span>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm">
              <Mail size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-700">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-700">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-700">Customer since {customer.joined}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <ShoppingBag size={15} />
                <span className="text-xs font-semibold">Total Orders</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{customer.orders}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-pink-600 mb-1">
                <IndianRupee size={15} />
                <span className="text-xs font-semibold">Total Spent</span>
              </div>
              <p className="text-xl font-bold text-gray-900">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Order history */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Order History</h4>
            {customerOrders.length ? (
              <div className="space-y-2">
                {customerOrders.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5">
                    <img src={o.image} alt="" className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{o.product}</p>
                      <p className="text-gray-500 text-sm">{o.id} · {o.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-800">₹{o.amount.toLocaleString('en-IN')}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${orderStatusStyles[o.status]}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No orders found for this customer</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
