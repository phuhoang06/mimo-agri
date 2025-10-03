# Trang Chi Tiết Sản Phẩm - Hướng Dẫn Sử Dụng

## Tổng Quan
Trang chi tiết sản phẩm được thiết kế giống Shopee với đầy đủ tính năng mua hàng, cung cấp trải nghiệm người dùng tối ưu.

## URL Structure
```
/products/[id] - Trang chi tiết sản phẩm
```

## Tính Năng Chính

### 1. **Product Gallery**
- **Hình ảnh chính**: Hiển thị hình ảnh sản phẩm với zoom
- **Thumbnails**: Danh sách hình ảnh nhỏ bên dưới
- **Zoom**: Hover để zoom, click để xem fullscreen
- **Navigation**: Mũi tên điều hướng giữa các hình
- **Keyboard support**: ESC để đóng, mũi tên để chuyển hình

### 2. **Product Information**
- **Tên sản phẩm**: Tiêu đề lớn, dễ đọc
- **Thương hiệu**: Hiển thị brand nếu có
- **Rating & Reviews**: Sao đánh giá và số lượng review
- **Giá**: Hiển thị giá gốc, giá khuyến mãi, % giảm giá
- **Tình trạng**: Còn hàng/hết hàng với số lượng

### 3. **Variant Selection**
- **Màu sắc**: Chọn màu với preview hình ảnh
- **Kích thước**: Chọn size với điều chỉnh giá
- **Style**: Các biến thể khác (nếu có)
- **Stock status**: Hiển thị số lượng còn lại cho từng variant

### 4. **Quantity & Actions**
- **Quantity selector**: Tăng/giảm số lượng
- **Add to Cart**: Thêm vào giỏ hàng
- **Buy Now**: Mua ngay
- **Wishlist**: Yêu thích sản phẩm
- **Share**: Chia sẻ sản phẩm

### 5. **Product Tabs**
- **Mô tả**: Chi tiết sản phẩm với HTML rich text
- **Thông số kỹ thuật**: Bảng thông số đầy đủ
- **Đánh giá**: Danh sách review với filter và sort
- **Vận chuyển & Đổi trả**: Chính sách giao hàng

### 6. **Related Products**
- **Sản phẩm liên quan**: Cùng danh mục hoặc tương tự
- **Grid layout**: Hiển thị dạng lưới
- **Quick actions**: Thêm vào giỏ, xem chi tiết

## Component Architecture

```
/products/[id]/
├── page.tsx (Main page)
└── components/
    ├── ProductGallery.tsx (Image gallery with zoom)
    ├── ProductInfo.tsx (Product details & actions)
    ├── ProductVariantSelector.tsx (Color/Size selection)
    ├── QuantitySelector.tsx (Quantity controls)
    ├── ProductRating.tsx (Star rating display)
    ├── ProductTabs.tsx (Tab navigation)
    ├── ProductSpecifications.tsx (Tech specs)
    ├── ProductReviews.tsx (Reviews & ratings)
    └── RelatedProducts.tsx (Related items)
```

## Data Structure

### Product Interface
```typescript
interface Product {
  id: string
  name: string
  description: string
  long_description?: string
  category_id?: string
  image_url?: string
  images?: string[]
  min_price?: number
  max_price?: number
  original_price?: number
  discount_percent?: number
  stock?: number
  rating?: number
  review_count?: number
  sold_count?: number
  weight?: number
  dimensions?: string
  material?: string
  brand?: string
  warranty?: string
}
```

### Variant Interface
```typescript
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
```

## Responsive Design

### Desktop (> 1024px)
- 2 cột: Gallery bên trái, Info bên phải
- Gallery sticky khi scroll
- Full feature set

### Tablet (768px - 1024px)
- 2 cột responsive
- Gallery vẫn sticky
- Compact layout

### Mobile (< 768px)
- 1 cột: Gallery trên, Info dưới
- Touch-friendly controls
- Simplified navigation

## User Experience Features

### 1. **Loading States**
- Skeleton loading cho gallery
- Skeleton loading cho product info
- Smooth transitions

### 2. **Error Handling**
- 404 cho sản phẩm không tồn tại
- Retry mechanism
- Fallback images

### 3. **Accessibility**
- Keyboard navigation
- Screen reader support
- High contrast colors
- Focus indicators

### 4. **Performance**
- Lazy loading images
- Optimized image sizes
- Efficient re-renders

## Integration Points

### 1. **Shopping Cart**
- Add to cart functionality
- Quantity management
- Variant selection

### 2. **Wishlist**
- Add/remove from wishlist
- Persistent storage
- User authentication

### 3. **Reviews System**
- Display existing reviews
- Rating aggregation
- Review filtering

### 4. **Search & Navigation**
- Breadcrumb navigation
- Related products
- Category linking

## Future Enhancements

### 1. **Advanced Features**
- AR/VR product preview
- Video product demos
- 360° product view
- Size guide integration

### 2. **Social Features**
- Social sharing
- User-generated content
- Product comparisons
- Recently viewed

### 3. **Personalization**
- Recommended products
- Personalized pricing
- Dynamic content
- User preferences

### 4. **Analytics**
- Product view tracking
- Conversion optimization
- A/B testing
- User behavior analysis

## Best Practices

### 1. **Performance**
- Optimize images (WebP, lazy loading)
- Minimize bundle size
- Use CDN for assets
- Implement caching

### 2. **SEO**
- Structured data markup
- Meta tags optimization
- Image alt texts
- URL structure

### 3. **Security**
- Input validation
- XSS prevention
- CSRF protection
- Secure API calls

### 4. **Monitoring**
- Error tracking
- Performance monitoring
- User analytics
- Conversion tracking
