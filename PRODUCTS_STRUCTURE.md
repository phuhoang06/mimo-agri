# Cấu Trúc Trang Products

## Layout Tổng Quan

```
┌─────────────────────────────────────────────────────────────┐
│                        Header                               │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │   Breadcrumb    │  │        View Toggle              │   │
│  │   Trang chủ >   │  │    [Grid] [List] [Filter]      │   │
│  │   Sản phẩm      │  │                                 │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Main Content Area                        │
│  ┌─────────────┐  ┌─────────────────────────────────────┐   │
│  │   Sidebar   │  │           Products Grid             │   │
│  │             │  │                                     │   │
│  │ ┌─────────┐ │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │   │
│  │ │Category │ │  │  │ P1  │ │ P2  │ │ P3  │ │ P4  │   │   │
│  │ │Sidebar  │ │  │  └─────┘ └─────┘ └─────┘ └─────┘   │   │
│  │ └─────────┘ │  │                                     │   │
│  │             │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │   │
│  │ ┌─────────┐ │  │  │ P5  │ │ P6  │ │ P7  │ │ P8  │   │   │
│  │ │Filters  │ │  │  └─────┘ └─────┘ └─────┘ └─────┘   │   │
│  │ │- Search │ │  │                                     │   │
│  │ │- Price  │ │  │                                     │   │
│  │ │- Sort   │ │  │                                     │   │
│  │ └─────────┘ │  │                                     │   │
│  └─────────────┘  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Pagination                               │
│              [Trước] [1] [2] [3] [Sau]                     │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
ProductsPage
├── Breadcrumb
├── Header
│   ├── Title & Count
│   └── Controls
│       ├── ViewToggle
│       └── MobileFilterButton
├── Main Layout
│   ├── Sidebar (Desktop)
│   │   ├── CategorySidebar
│   │   └── Filters
│   │       ├── Search Input
│   │       ├── Price Range
│   │       ├── Sort Dropdown
│   │       └── Clear Filters
│   ├── Mobile Filters (Conditional)
│   └── Content Area
│       ├── Loading State
│       │   └── ProductSkeleton
│       ├── Error State
│       ├── Products Grid/List
│       │   ├── ProductCard (Grid View)
│       │   └── ProductCardList (List View)
│       └── Pagination
```

## State Management

```typescript
interface FilterState {
  category: string      // Danh mục sản phẩm
  minPrice: number      // Giá tối thiểu
  maxPrice: number      // Giá tối đa
  search: string        // Từ khóa tìm kiếm
  sortBy: 'name' | 'price_asc' | 'price_desc' | 'newest'
}

interface PageState {
  products: Product[]           // Tất cả sản phẩm
  filteredProducts: Product[]   // Sản phẩm sau khi lọc
  loading: boolean             // Trạng thái loading
  error: string | null         // Lỗi nếu có
  currentPage: number          // Trang hiện tại
  viewMode: 'grid' | 'list'    // Chế độ hiển thị
  showMobileFilters: boolean   // Hiển thị filter mobile
}
```

## Responsive Breakpoints

- **Mobile (< 640px)**: 1 cột, sidebar ẩn
- **Tablet (640px - 1024px)**: 2-3 cột, sidebar ẩn
- **Desktop (> 1024px)**: 4 cột, sidebar hiển thị

## Data Flow

1. **Initial Load**: Fetch tất cả sản phẩm từ Supabase
2. **Filter Change**: Apply filters và update filteredProducts
3. **Pagination**: Slice filteredProducts cho trang hiện tại
4. **View Toggle**: Switch giữa ProductCard và ProductCardList
5. **Search**: Real-time filter khi user nhập

## Performance Optimizations

- **Lazy Loading**: Images load khi cần thiết
- **Skeleton Loading**: Smooth loading experience
- **Pagination**: Chỉ render 12 sản phẩm mỗi trang
- **Memoization**: Filter results được cache
- **Responsive Images**: Next.js Image component với optimization
