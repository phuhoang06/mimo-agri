import { Product, ProductVariant } from './supabase'

/**
 * Calculate min and max price from product variants
 */
export function calculatePriceRange(variants: ProductVariant[]): { min: number; max: number } {
    if (!variants || variants.length === 0) {
        return { min: 0, max: 0 }
    }

    const prices = variants.map(v => v.price)
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    }
}

/**
 * Get the primary/main image for a product
 */
export function getPrimaryImage(product: Product): string {
    if (product.main_image_url) {
        return sanitizeImageUrl(product.main_image_url)
    }

    if (product.image_urls && product.image_urls.length > 0) {
        return sanitizeImageUrl(product.image_urls[0])
    }

    return '/images/placeholder.jpg'
}

/**
 * Get all images for a product (main + additional)
 */
export function getAllImages(product: Product): string[] {
    const images: string[] = []

    // Add main image first
    if (product.main_image_url) {
        images.push(product.main_image_url)
    }

    // Process image_urls
    if (product.image_urls) {
        let additionalImages: string[] = []

        if (Array.isArray(product.image_urls)) {
            additionalImages = product.image_urls
        } else if (typeof product.image_urls === 'string') {
            try {
                // Try to parse if it's a JSON string
                const parsed = JSON.parse(product.image_urls)
                if (Array.isArray(parsed)) {
                    additionalImages = parsed
                } else {
                    // If not an array after parsing, or just a plain string URL
                    additionalImages = [product.image_urls]
                }
            } catch {
                // If parsing fails, treat as single URL string
                additionalImages = [product.image_urls]
            }
        }

        if (additionalImages.length > 0) {
            images.push(...additionalImages)
        }
    }

    // Return placeholder if no images
    if (images.length === 0) {
        return ['/images/placeholder.jpg']
    }

    // Deduplicate and sanitize
    return Array.from(new Set(images)).map(sanitizeImageUrl)
}

/**
 * Sanitize image URL to ensure it starts with / or http
 */
export function sanitizeImageUrl(url: string): string {
    if (!url) return '/images/placeholder.jpg'
    if (url.startsWith('/') || url.startsWith('http')) return url
    return `/${url}`
}

/**
 * Format price range for display
 */
export function formatPriceRange(min?: number, max?: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    if (!min && !max) return 'Liên hệ'
    if (!max || min === max) return formatter.format(min || 0)
    return `${formatter.format(min)} - ${formatter.format(max)}`
}

/**
 * Format single price for display
 */
export function formatPrice(price: number | undefined): string {
    if (!price && price !== 0) return 'Liên hệ'
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price)
}
