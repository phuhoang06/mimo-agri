interface VideoCategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function VideoCategoryFilter({ selectedCategory, onCategoryChange }: VideoCategoryFilterProps) {
  const categories = [
    {
      id: 'all',
      label: 'Tất cả',
      icon: '🎥',
      count: 0 // Will be calculated dynamically
    },
    {
      id: 'huong-dan',
      label: 'Hướng dẫn',
      icon: '📖',
      count: 0
    },
    {
      id: 'san-pham',
      label: 'Sản phẩm',
      icon: '🛍️',
      count: 0
    },
    {
      id: 'tips',
      label: 'Tips & Tricks',
      icon: '💡',
      count: 0
    },
    {
      id: 'cong-nghe',
      label: 'Công nghệ',
      icon: '⚙️',
      count: 0
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Danh mục video</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
            {category.count > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

