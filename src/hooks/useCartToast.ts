'use client'

import { useEffect, useRef } from 'react'
import { useToast } from '@/contexts/ToastContext'

export const useCartToast = (shouldShowToast: boolean, message: string) => {
  const { success } = useToast()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (shouldShowToast && !hasShownToast.current) {
      success(message)
      hasShownToast.current = true
      
      // Reset after a short delay
      setTimeout(() => {
        hasShownToast.current = false
      }, 100)
    }
  }, [shouldShowToast, message, success])
}
