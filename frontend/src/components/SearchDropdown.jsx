import { Search } from 'lucide-react'
import { popularSearches, topSearchCategories } from '../data/dummyData'

export default function SearchDropdown({ query = '', onPick, onViewAll }) {
  const trimmedQuery = query.trim()

  return (
    <div
      className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50"
      // Keep the input focused while clicking inside the dropdown
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Popular Searches */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-3">Popular Searches</h3>
          <div className="space-y-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => onPick(term)}
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 text-sm w-full text-left"
              >
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <span className="truncate">{term}</span>
              </button>
            ))}
          </div>
          {trimmedQuery && (
            <button
              onClick={onViewAll}
              className="text-purple-600 text-sm font-bold mt-3 hover:underline"
            >
              View all results for "{trimmedQuery}" →
            </button>
          )}
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-3">Top Categories</h3>
          <div className="space-y-2">
            {topSearchCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onPick(cat.name)}
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 text-sm w-full text-left"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-200"
                />
                <span className="truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
