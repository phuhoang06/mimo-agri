interface ProductVariant {
  id: string
  name: string
  type: 'color' | 'size' | 'style'
  options: {
    value: string
    label: string
    price_adjustment?: number
    stock?: number
    image?: string
  }[]
}

interface ProductVariantSelectorProps {
  variant: ProductVariant
  selectedValue: string
  onValueChange: (value: string) => void
}

export default function ProductVariantSelector({
  variant,
  selectedValue,
  onValueChange
}: ProductVariantSelectorProps) {
  const isColorVariant = variant.type === 'color'
  const isSizeVariant = variant.type === 'size'

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{variant.name}:</h3>
        {selectedValue && (
          <span className="text-sm text-gray-600">
            {variant.options.find(opt => opt.value === selectedValue)?.label}
          </span>
        )}
      </div>

      <div className={`flex flex-wrap gap-2 ${
        isColorVariant ? 'space-x-2' : 'space-x-3'
      }`}>
        {variant.options.map((option) => {
          const isSelected = selectedValue === option.value
          const isOutOfStock = option.stock === 0

          if (isColorVariant) {
            return (
              <button
                key={option.value}
                onClick={() => !isOutOfStock && onValueChange(option.value)}
                disabled={isOutOfStock}
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  isSelected
                    ? 'border-green-500 ring-2 ring-green-200'
                    : 'border-gray-300 hover:border-gray-400'
                } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  backgroundColor: option.value === 'red' ? '#ff0000' :
                                  option.value === 'blue' ? '#0000ff' :
                                  option.value === 'green' ? '#00ff00' :
                                  option.value === 'black' ? '#000000' : '#f3f4f6'
                }}
                title={`${option.label}${option.price_adjustment ? ` (+${option.price_adjustment.toLocaleString()}₫)` : ''}`}
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">×</span>
                  </div>
                )}
              </button>
            )
          }

          return (
            <button
              key={option.value}
              onClick={() => !isOutOfStock && onValueChange(option.value)}
              disabled={isOutOfStock}
              className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                isSelected
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex flex-col items-center">
                <span>{option.label}</span>
                {option.price_adjustment && option.price_adjustment > 0 && (
                  <span className="text-xs text-gray-500">
                    +{option.price_adjustment.toLocaleString()}₫
                  </span>
                )}
                {option.stock !== undefined && (
                  <span className="text-xs text-gray-400">
                    ({option.stock})
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Price adjustment info */}
      {selectedValue && variant.options.find(opt => opt.value === selectedValue)?.price_adjustment && (
        <div className="text-sm text-gray-600">
          <span className="text-green-600">
            +{variant.options.find(opt => opt.value === selectedValue)?.price_adjustment?.toLocaleString()}₫
          </span>
          <span className="ml-1">cho {variant.name.toLowerCase()}</span>
        </div>
      )}
    </div>
  )
}
