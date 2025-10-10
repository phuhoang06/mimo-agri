# 🌾 MiMo Agriculture E-commerce Platform

Ứng dụng thương mại điện tử chuyên về nông nghiệp được xây dựng với Next.js 15, React 19, và Supabase.

## ✨ Tính năng chính

- 🛒 **Hệ thống đặt hàng hoàn chỉnh** - Đặt hàng, thanh toán, theo dõi đơn hàng
- 🏷️ **Quản lý sản phẩm** - Hệ thống phân loại và biến thể sản phẩm linh hoạt
- 🎥 **Video hướng dẫn** - Tích hợp YouTube cho hướng dẫn kỹ thuật
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **UI/UX hiện đại** - Giao diện đẹp với Tailwind CSS
- 🔍 **Tìm kiếm thông minh** - Tìm kiếm sản phẩm nhanh chóng
- 📊 **Theo dõi đơn hàng** - Kiểm tra trạng thái đơn hàng real-time

## 🚀 Quick Start

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn
- Tài khoản Supabase

### 1. Clone và cài đặt

```bash
git clone <repository-url>
cd mimo-agriculture-ecommerce
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Thiết lập database

Chạy SQL script trong Supabase SQL Editor:

```sql
-- Xem DEPLOYMENT_GUIDE.md để biết chi tiết
```

### 4. Chạy ứng dụng

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 🏗️ Cấu trúc dự án

```
mimo-agriculture-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/buyer/orders/   # API đặt hàng
│   │   ├── products/           # Trang sản phẩm
│   │   ├── orders/             # Theo dõi đơn hàng
│   │   ├── track-order/        # Kiểm tra đơn hàng
│   │   ├── video/              # Video hướng dẫn
│   │   └── policy/             # Chính sách bán hàng
│   ├── components/             # React components
│   │   ├── CartModal.tsx       # Giỏ hàng
│   │   ├── CheckoutModal.tsx   # Thanh toán
│   │   ├── ProductInfo.tsx     # Thông tin sản phẩm
│   │   └── ...
│   ├── contexts/               # React contexts
│   │   ├── CartContext.tsx     # Quản lý giỏ hàng
│   │   └── ToastContext.tsx    # Thông báo
│   └── lib/                    # Utilities
│       ├── supabase.ts         # Supabase config
│       └── categories.ts       # Danh mục sản phẩm
├── public/                     # Static files
├── DEPLOYMENT_GUIDE.md         # Hướng dẫn deploy
└── ...
```

## 📦 Scripts có sẵn

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting
- `npm run lint:fix` - Auto-fix linting issues
- `npm run type-check` - TypeScript type checking

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Icons**: Heroicons
- **State Management**: React Context

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Docker
```bash
docker build -t mimo-agri-app .
docker run -p 3000:3000 mimo-agri-app
```

### Manual
```bash
npm run build
npm start
```

Xem `DEPLOYMENT_GUIDE.md` để biết chi tiết.

## 📱 Tính năng đặt hàng

- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Thanh toán với thông tin giao hàng
- ✅ Lưu mã đơn hàng tự động
- ✅ Theo dõi trạng thái đơn hàng
- ✅ Lịch sử đơn hàng theo số điện thoại

## 🎯 Tính năng sản phẩm

- ✅ Hiển thị sản phẩm với gallery ảnh
- ✅ Hệ thống biến thể sản phẩm
- ✅ Tìm kiếm và lọc sản phẩm
- ✅ Video hướng dẫn kỹ thuật
- ✅ Responsive design

## 🔒 Bảo mật

- ✅ Input validation đầy đủ
- ✅ Security headers
- ✅ HTTPS enforcement
- ✅ SQL injection protection (Supabase)

## 📊 Performance

- ✅ Image optimization tự động
- ✅ Code splitting
- ✅ Static generation
- ✅ WebP/AVIF support
- ✅ SEO optimized

## 🆘 Hỗ trợ

- **Email**: mimoagriculture@gmail.com
- **Hotline**: 0853.991.995
- **Documentation**: DEPLOYMENT_GUIDE.md

## 📄 License

MIT License - Xem file LICENSE để biết chi tiết.

---

**MiMo Agriculture** - Nông nghiệp thông minh, giao hàng tận nơi 🌾