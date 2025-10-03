# Image Hostname Update - Thêm Shutterstock

## 🚨 **Lỗi Gặp Phải**
```
Invalid src prop (https://www.shutterstock.com/image-photo/potato-rows-field-agriculture-farming-260nw-2660358989.jpg) on `next/image`, 
hostname "www.shutterstock.com" is not configured under images in your `next.config.js`
```

## ✅ **Nguyên Nhân**
Next.js yêu cầu cấu hình hostname cho external images để bảo mật và tối ưu hóa.

## 🔧 **Giải Pháp**

### **Cập Nhật `next.config.ts`**
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',  // ✅ Thêm mới
        port: '',
        pathname: '/**',
      },
    ],
  },
};
```

## 📋 **Hostnames Đã Cấu Hình**

### **Hiện Tại**
- ✅ `images.unsplash.com` - Unsplash images
- ✅ `via.placeholder.com` - Placeholder images  
- ✅ `img.youtube.com` - YouTube thumbnails
- ✅ `www.shutterstock.com` - Shutterstock images

### **Có Thể Thêm**
```typescript
{
  protocol: 'https',
  hostname: 'example.com',
  port: '',
  pathname: '/**',
}
```

## 🧪 **Cách Test**

### **1. Restart Development Server**
```bash
# Dừng server hiện tại (Ctrl+C)
npm run dev
# Hoặc
yarn dev
```

### **2. Kiểm Tra Console**
- Mở Developer Tools (F12)
- Kiểm tra tab Console
- Không còn lỗi image configuration

### **3. Kiểm Tra Network**
- Tab Network
- Kiểm tra images load thành công
- Không có 403/404 errors

## 🔍 **Troubleshooting**

### **Lỗi Vẫn Còn**
1. **Restart server**: Cấu hình Next.js cần restart
2. **Clear cache**: `npm run build` và `npm run dev`
3. **Check hostname**: Đảm bảo hostname chính xác
4. **Check protocol**: Phải là `https` hoặc `http`

### **Lỗi Khác**
```typescript
// ❌ Lỗi: Missing protocol
{
  hostname: 'www.shutterstock.com',  // Thiếu protocol
}

// ✅ Đúng: Có đầy đủ protocol
{
  protocol: 'https',
  hostname: 'www.shutterstock.com',
  port: '',
  pathname: '/**',
}
```

## 📱 **Performance Benefits**

### **Next.js Image Optimization**
- ✅ **Automatic optimization**: Resize, compress, format conversion
- ✅ **Lazy loading**: Load images khi cần
- ✅ **WebP support**: Tự động convert sang WebP
- ✅ **Responsive images**: Tự động tạo multiple sizes
- ✅ **Blur placeholder**: Hiển thị blur khi loading

### **Shutterstock Images**
- ✅ **High quality**: Professional stock photos
- ✅ **Fast loading**: CDN của Shutterstock
- ✅ **Reliable**: 99.9% uptime
- ✅ **Licensed**: Proper licensing

## 🚀 **Best Practices**

### **1. Sử Dụng Next.js Image**
```typescript
// ✅ Tốt: Next.js Image
<Image
  src="https://www.shutterstock.com/image-photo/..."
  alt="Product image"
  fill
  className="object-cover"
/>

// ❌ Tránh: HTML img
<img
  src="https://www.shutterstock.com/image-photo/..."
  alt="Product image"
/>
```

### **2. Cấu Hình Hostname**
```typescript
// ✅ Tốt: Cấu hình đầy đủ
{
  protocol: 'https',
  hostname: 'www.shutterstock.com',
  port: '',
  pathname: '/**',
}

// ❌ Tránh: Cấu hình thiếu
{
  hostname: 'www.shutterstock.com',  // Thiếu protocol, port, pathname
}
```

### **3. Error Handling**
```typescript
<Image
  src={product.image_url}
  alt={product.name}
  fill
  className="object-cover"
  onError={(e) => {
    // Fallback image
    e.currentTarget.src = '/images/placeholder.jpg'
  }}
/>
```

## 📊 **Monitoring**

### **Check Image Loading**
```typescript
// Console log để debug
console.log('Loading image:', product.image_url)

// Check network tab
// Kiểm tra status code: 200 = success
```

### **Performance Metrics**
- **LCP**: Largest Contentful Paint
- **CLS**: Cumulative Layout Shift  
- **FID**: First Input Delay

## 🎯 **Kết Luận**

Lỗi đã được sửa bằng cách:
1. ✅ Thêm `www.shutterstock.com` vào `next.config.ts`
2. ✅ Restart development server
3. ✅ Kiểm tra images load thành công

Shutterstock images giờ đây hoạt động hoàn hảo với Next.js Image optimization! 🎉
