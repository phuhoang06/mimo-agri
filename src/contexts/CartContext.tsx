'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string // product_id
  variantId: string // product_variant_id
  name: string
  variantName: string
  price: number
  quantity: number
  image: string
  description?: string
  category?: string
  sku?: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string, variantId: string) => boolean
  getItemQuantity: (productId: string, variantId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mimo-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        setItems([])
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('mimo-cart', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.variantId === product.variantId
      )
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id && item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // If item doesn't exist, add new item
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string, variantId: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.variantId === variantId))
    )
  }

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const isInCart = (productId: string, variantId: string) => {
    return items.some(item => item.id === productId && item.variantId === variantId)
  }

  const getItemQuantity = (productId: string, variantId: string) => {
    const item = items.find(item => item.id === productId && item.variantId === variantId)
    return item ? item.quantity : 0
  }

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
