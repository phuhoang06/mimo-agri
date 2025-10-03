interface QuickFilter {
  id: string
  label: string
  value: string
  count?: number
}

interface QuickFiltersProps {
  filters: QuickFilter[]
  activeFilter: string
  onFilterChange: (value: string) => void
}

export default function QuickFilters({ filters, activeFilter, onFilterChange }: QuickFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Bộ lọc nhanh</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeFilter === ''
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả
        </button>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.value
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            {filter.count && (
              <span className="ml-1 text-xs opacity-75">({filter.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
