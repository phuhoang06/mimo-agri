interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  maxQuantity?: number
  disabled?: boolean
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  maxQuantity = 99,
  disabled = false
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= maxQuantity && !disabled) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900">Số lượng:</h3>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1 || disabled}
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={maxQuantity}
          disabled={disabled}
          className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <button
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity || disabled}
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {maxQuantity < 99 && (
        <p className="text-sm text-gray-500">
          Chỉ còn {maxQuantity} sản phẩm
        </p>
      )}
    </div>
  )
}
