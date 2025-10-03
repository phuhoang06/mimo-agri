# Trang Sản Phẩm (/products) - Hướng Dẫn Sử Dụng

## Tổng Quan
Trang `/products` được thiết kế với trải nghiệm người dùng tối ưu, cung cấp đầy đủ tính năng để duyệt và tìm kiếm sản phẩm.

## Tính Năng Chính

### 1. **Breadcrumb Navigation**
- Hiển thị đường dẫn từ trang chủ đến trang hiện tại
- Giúp người dùng dễ dàng điều hướng

### 2. **Sidebar Lọc Sản Phẩm**
- **Danh mục sản phẩm**: Lọc theo các danh mục như hạt giống, dụng cụ làm vườn, v.v.
- **Tìm kiếm**: Tìm kiếm theo tên hoặc mô tả sản phẩm
- **Khoảng giá**: Lọc theo giá từ-thi đến
- **Sắp xếp**: Sắp xếp theo tên, giá, hoặc mới nhất

### 3. **View Toggle**
- **Grid View**: Hiển thị sản phẩm dạng lưới (mặc định)
- **List View**: Hiển thị sản phẩm dạng danh sách chi tiết

### 4. **Responsive Design**
- **Desktop**: Sidebar cố định bên trái
- **Mobile/Tablet**: Sidebar có thể ẩn/hiện bằng nút toggle

### 5. **Phân Trang**
- Hiển thị 12 sản phẩm mỗi trang
- Điều hướng trang với nút Trước/Sau
- Tự động scroll lên đầu trang khi chuyển trang

### 6. **Loading States**
- Skeleton loading cho trải nghiệm mượt mà
- Error handling với nút thử lại

## Cấu Trúc Component

```
/products/
├── page.tsx (Trang chính)
└── components/
    ├── Breadcrumb.tsx (Điều hướng breadcrumb)
    ├── ViewToggle.tsx (Chuyển đổi grid/list view)
    ├── ProductSkeleton.tsx (Loading skeleton)
    ├── QuickFilters.tsx (Bộ lọc nhanh)
    └── ProductCardList.tsx (Card sản phẩm dạng list)
```

## URL Parameters

Trang hỗ trợ các tham số URL:
- `?category=bat-ruoi-vang` - Lọc theo danh mục
- `?search=hat-giong` - Tìm kiếm sản phẩm
- `?sub=rau-cu-qua` - Lọc theo danh mục con

## Trải Nghiệm Người Dùng

### Desktop
1. Sidebar cố định bên trái với đầy đủ bộ lọc
2. Grid view hiển thị 4 sản phẩm/row
3. List view hiển thị chi tiết hơn

### Mobile
1. Nút "Bộ lọc" để mở/đóng sidebar
2. Grid view hiển thị 1-2 sản phẩm/row
3. List view tối ưu cho màn hình nhỏ

## Tích Hợp Database

- Sử dụng Supabase để lấy dữ liệu sản phẩm
- Hỗ trợ real-time updates
- Error handling và retry mechanism

## Performance

- Lazy loading cho hình ảnh
- Skeleton loading cho UX tốt hơn
- Pagination để tối ưu performance
- Responsive images với Next.js Image component

## Accessibility

- Keyboard navigation
- Screen reader friendly
- High contrast colors
- Focus indicators

## Tương Lai

Có thể mở rộng thêm:
- Wishlist functionality
- Compare products
- Advanced filters (brand, rating, etc.)
- Infinite scroll
- Product recommendations
