import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useShop } from '../../../context/ShopContext'
import Pagination from '../Pagination'
import OrderDetailModal from '../OrderDetailModal'

const statusStyles = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
  Pending: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-600',
}

const filters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const PER_PAGE = 8

export default function OrdersTab() {
  const { orders } = useShop()
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filtered =
    activeFilter === 'All' ? orders : orders.filter((o) => o.status === activeFilter)

  useEffect(() => { setCurrentPage(1) }, [activeFilter])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  // Keep the open modal's order data fresh after a status change
  const liveSelectedOrder = selectedOrder ? orders.find((o) => o.id === selectedOrder.id) : null

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Orders <span className="text-gray-400 font-medium">({filtered.length})</span></h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeFilter === f
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                style={activeFilter === f ? { background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide">
                <th className="px-5 sm:px-6 py-3 font-semibold">Order ID</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Customer</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Product</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Date</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Amount</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Status</th>
                <th className="px-5 sm:px-6 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className="border-t border-gray-50 hover:bg-purple-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 sm:px-6 py-3 font-semibold text-gray-700">{o.id}</td>
                  <td className="px-5 sm:px-6 py-3">
                    <p className="text-gray-700 font-medium">{o.customerName}</p>
                    <p className="text-gray-500 text-sm">{o.customerEmail}</p>
                  </td>
                  <td className="px-5 sm:px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={o.image} alt="" className="w-9 h-9 rounded-lg object-cover bg-gray-100" />
                      <span className="text-gray-600 max-w-[160px] truncate">{o.product}</span>
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-3 text-gray-500">{o.date}</td>
                  <td className="px-5 sm:px-6 py-3 font-semibold text-gray-800">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 sm:px-6 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 sm:px-6 py-3 text-right">
                    <ChevronRight size={16} className="text-gray-300" />
                  </td>
                </tr>
              ))}
              {!paginated.length && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {liveSelectedOrder && (
        <OrderDetailModal order={liveSelectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  )
}
