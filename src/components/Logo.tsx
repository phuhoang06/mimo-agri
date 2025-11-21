import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  variant?: 'default' | 'white'
}

export default function Logo({ size = 'md', showText = true, className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const textClasses = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-4xl'
  }

  const textColor = variant === 'white' ? 'text-white' : 'text-green-600'
  const borderColor = variant === 'white' ? 'border-white/20' : 'border-green-100'

  return (
    <Link href="/" className={`flex items-center space-x-4 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/images/mimo-logo.jpg"
          alt="MiMo Agriculture Logo"
          fill
          className={`object-cover rounded-full border-2 ${borderColor}`}
          priority
        />
      </div>
      {showText && (
        <div className="flex items-center">
          <span className={`${textClasses[size]} font-bold ${textColor} tracking-wide`}>
            MiMo Agriculture
          </span>
        </div>
      )}
    </Link>
  )
}
