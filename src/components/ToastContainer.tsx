'use client'

import { useToast } from '@/contexts/ToastContext'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-red-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      case 'info':
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getTitleColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'warning':
        return 'text-yellow-800'
      case 'info':
        return 'text-blue-800'
      default:
        return 'text-blue-800'
    }
  }

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-700'
      case 'error':
        return 'text-red-700'
      case 'warning':
        return 'text-yellow-700'
      case 'info':
        return 'text-blue-700'
      default:
        return 'text-blue-700'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full ${getBackgroundColor(toast.type)} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out animate-slide-in`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(toast.type)}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className={`text-sm font-medium ${getTitleColor(toast.type)}`}>
                {toast.title}
              </p>
              {toast.message && (
                <p className={`mt-1 text-sm ${getMessageColor(toast.type)}`}>
                  {toast.message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`inline-flex ${getTitleColor(toast.type)} hover:opacity-75 transition-opacity`}
                onClick={() => removeToast(toast.id)}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
