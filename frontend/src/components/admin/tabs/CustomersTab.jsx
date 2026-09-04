import { useEffect, useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import { adminCustomers } from '../../../data/adminData'
import Pagination from '../Pagination'
import CustomerDetailModal from '../CustomerDetailModal'

const PER_PAGE = 8

export default function CustomersTab() {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const filtered = adminCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query)
  )

  useEffect(() => { setCurrentPage(1) }, [query])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages)
  }, [totalPages, currentPage])

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">
            Customers <span className="text-gray-400 font-medium">({filtered.length})</span>
          </h3>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide">
                <th className="px-5 sm:px-6 py-3 font-semibold">Customer</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Phone</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Orders</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Total Spent</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Joined</th>
                <th className="px-5 sm:px-6 py-3 font-semibold">Status</th>
                <th className="px-5 sm:px-6 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="border-t border-gray-50 hover:bg-purple-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 sm:px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                      >
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{c.name}</p>
                        <p className="text-gray-500 text-sm">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-3 text-gray-600">{c.phone}</td>
                  <td className="px-5 sm:px-6 py-3 text-gray-700 font-semibold">{c.orders}</td>
                  <td className="px-5 sm:px-6 py-3 text-gray-800 font-semibold">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="px-5 sm:px-6 py-3 text-gray-500">{c.joined}</td>
                  <td className="px-5 sm:px-6 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 sm:px-6 py-3 text-right">
                    <ChevronRight size={16} className="text-gray-300" />
                  </td>
                </tr>
              ))}
              {!paginated.length && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {selectedCustomer && (
        <CustomerDetailModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}
    </>
  )
}
