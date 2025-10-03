# Mimo E-commerce App

Ứng dụng thương mại điện tử hiện đại được xây dựng với Next.js 15, React 19, và Supabase.

## Tính năng chính

- 🛒 **Giỏ hàng thông minh** - Quản lý sản phẩm và thanh toán
- 🏷️ **Danh mục động** - Hệ thống phân loại sản phẩm linh hoạt
- 🎥 **Tích hợp video** - Hỗ trợ video hướng dẫn và YouTube
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **UI/UX hiện đại** - Giao diện đẹp với Tailwind CSS
- 🔐 **Xác thực người dùng** - Bảo mật với Supabase Auth
- 📊 **Quản trị viên** - Dashboard quản lý sản phẩm và đơn hàng

## Yêu cầu hệ thống

- Node.js 18+ 
- npm hoặc yarn
- Tài khoản Supabase

## Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd ecommerce-app
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Thiết lập database

Chạy các script SQL trong thư mục `scripts/`:

```bash
# Chạy script seed dữ liệu mẫu
node scripts/seed.js
```

### 5. Chạy ứng dụng

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Cấu trúc dự án

```
ecommerce-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Trang quản trị
│   │   ├── products/       # Trang sản phẩm
│   │   ├── video/          # Trang video
│   │   └── ...
│   ├── components/         # React components
│   ├── lib/               # Utilities và config
│   └── contexts/          # React contexts
├── public/                # Static files
├── scripts/               # Database scripts
└── ...
```

## Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code quality

## Công nghệ sử dụng

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Language**: TypeScript
- **Icons**: Heroicons, Lucide React

## Tài liệu bổ sung

Xem các file `.md` trong thư mục gốc để biết thêm chi tiết:
- `PRODUCTS_PAGE_GUIDE.md` - Hướng dẫn trang sản phẩm
- `SHOPPING_CART_GUIDE.md` - Hướng dẫn giỏ hàng
- `VIDEO_PAGE_GUIDE.md` - Hướng dẫn trang video
- `UX_IMPROVEMENTS.md` - Cải tiến UX

## Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Node.js version (cần 18+)
2. Cấu hình Supabase
3. Cài đặt dependencies đầy đủ
4. Chạy script seed database

## License

MIT License