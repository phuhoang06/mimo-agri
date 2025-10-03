# Category Sync Guide - Đồng Bộ Danh Mục Sản Phẩm

## 🎯 **Mục Tiêu**
Đồng bộ danh mục sản phẩm giữa homepage và trang products để đảm bảo tính nhất quán.

## ✅ **Những Gì Đã Thực Hiện**

### **1. Tạo Shared Category Data**
```typescript
// src/data/categories.ts
export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

export interface CategoryData {
  id: string
  name: string
  icon: string
  subcategories: string[]
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: '1',
    name: 'Bẫy Ruồi Vàng',
    icon: '🪰',
    subcategories: ['Bẫy dính vàng', 'Keo xịt', 'Tấm bẫy', 'Dung cụ bẫy']
  },
  // ... 6 categories khác
]
```

### **2. Cập Nhật CategorySidebar (Homepage)**
```typescript
// src/components/CategorySidebar.tsx
import { CATEGORIES_DATA } from '@/data/categories'

export default function CategorySidebar() {
  // Sử dụng CATEGORIES_DATA thay vì hardcode
  return (
    <div>
      {CATEGORIES_DATA.map((category) => (
        // Render categories
      ))}
    </div>
  )
}
```

### **3. Cập Nhật CategoryFilter (Products Page)**
```typescript
// src/components/CategoryFilter.tsx
import { Category } from '@/data/categories'

interface CategoryFilterProps {
  categories: Category[]  // Sử dụng shared interface
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}
```

### **4. Cập Nhật Products Page**
```typescript
// src/app/products/page.tsx
import { CATEGORIES_DATA, Category } from '@/data/categories'

// Generate categories từ products data
const categoriesList: Category[] = CATEGORIES_DATA.map(categoryData => ({
  id: categoryData.id,
  name: categoryData.name,
  icon: categoryData.icon,
  count: categoryMap.get(categoryData.id) || 0
}))
```

## 🔄 **Data Flow**

### **Before (Trước Khi Đồng Bộ)**
```
Homepage CategorySidebar
├── Hardcoded categories
├── Different IDs ('bat-ruoi-vang')
├── Different icons ('🐛')
└── No count data

Products Page CategoryFilter
├── Generated categories
├── Different IDs ('1', '2', '3')
├── Different icons ('🪰', '🌱', '🍂')
└── Has count data
```

### **After (Sau Khi Đồng Bộ)**
```
Shared Data (src/data/categories.ts)
├── Single source of truth
├── Consistent IDs ('1', '2', '3')
├── Consistent icons ('🪰', '🌱', '🍂')
└── Consistent names

Homepage CategorySidebar
├── Uses shared data
├── Same IDs as products
├── Same icons as products
└── Links to products with correct category

Products Page CategoryFilter
├── Uses shared data
├── Same IDs as homepage
├── Same icons as homepage
└── Shows count from products
```

## 📊 **Category Mapping**

### **Unified Category Structure**
```typescript
const CATEGORIES_DATA = [
  {
    id: '1',                    // ✅ Consistent ID
    name: 'Bẫy Ruồi Vàng',      // ✅ Consistent name
    icon: '🪰',                 // ✅ Consistent icon
    subcategories: [...]        // ✅ Homepage subcategories
  },
  {
    id: '2',
    name: 'Hạt Giống Mùa Hè',
    icon: '🌱',
    subcategories: [...]
  },
  // ... 5 more categories
]
```

### **Category IDs Mapping**
| Category | ID | Icon | Homepage Link | Products Filter |
|----------|----|----- |---------------|-----------------|
| Bẫy Ruồi Vàng | `1` | 🪰 | `/products?category=1` | ✅ |
| Hạt Giống Mùa Hè | `2` | 🌱 | `/products?category=2` | ✅ |
| Hạt Giống Mùa Thu | `3` | 🍂 | `/products?category=3` | ✅ |
| Hạt Giống Mùa Đông | `4` | ❄️ | `/products?category=4` | ✅ |
| Dụng Cụ Làm Vườn | `5` | 🛠️ | `/products?category=5` | ✅ |
| Vòi Tưới Cây | `6` | 💧 | `/products?category=6` | ✅ |
| Phân Bón - Thuốc | `7` | 🌿 | `/products?category=7` | ✅ |

## 🔧 **Technical Implementation**

### **1. Shared Data Structure**
```typescript
// src/data/categories.ts
export interface CategoryData {
  id: string           // '1', '2', '3', etc.
  name: string         // 'Bẫy Ruồi Vàng', etc.
  icon: string         // '🪰', '🌱', etc.
  subcategories: string[] // ['Bẫy dính vàng', ...]
}

export interface Category {
  id: string           // Same as CategoryData
  name: string         // Same as CategoryData
  icon: string         // Same as CategoryData
  count: number        // Added for products page
}
```

### **2. Helper Functions**
```typescript
export const getCategoryById = (id: string): CategoryData | undefined => {
  return CATEGORIES_DATA.find(category => category.id === id)
}

export const getCategoryName = (id: string): string => {
  const category = getCategoryById(id)
  return category?.name || 'Danh mục khác'
}

export const getCategoryIcon = (id: string): string => {
  const category = getCategoryById(id)
  return category?.icon || '📦'
}
```

### **3. Homepage Integration**
```typescript
// src/components/CategorySidebar.tsx
import { CATEGORIES_DATA } from '@/data/categories'

// Sử dụng shared data
{CATEGORIES_DATA.map((category) => (
  <Link href={`/products?category=${category.id}`}>
    {/* Render category */}
  </Link>
))}
```

### **4. Products Page Integration**
```typescript
// src/app/products/page.tsx
import { CATEGORIES_DATA, Category } from '@/data/categories'

// Generate categories với count từ products
const categoriesList: Category[] = CATEGORIES_DATA.map(categoryData => ({
  id: categoryData.id,
  name: categoryData.name,
  icon: categoryData.icon,
  count: categoryMap.get(categoryData.id) || 0
}))
```

## 🎯 **Benefits**

### **1. Consistency**
- ✅ **Same IDs**: Homepage và products sử dụng cùng category IDs
- ✅ **Same Names**: Tên danh mục nhất quán
- ✅ **Same Icons**: Icons giống nhau ở mọi nơi
- ✅ **Same Links**: Links từ homepage đến products chính xác

### **2. Maintainability**
- ✅ **Single Source**: Chỉ cần sửa ở một nơi
- ✅ **Type Safety**: TypeScript interfaces đảm bảo type safety
- ✅ **Reusability**: Có thể dùng ở nhiều component khác
- ✅ **Scalability**: Dễ thêm category mới

### **3. User Experience**
- ✅ **Seamless Navigation**: Click category ở homepage → đúng products
- ✅ **Visual Consistency**: Icons và names giống nhau
- ✅ **Accurate Counts**: Số lượng sản phẩm chính xác
- ✅ **Better UX**: Không bị confusion về category

## 🧪 **Testing**

### **1. Navigation Test**
```typescript
// Test: Click category ở homepage → đúng products
1. Vào homepage
2. Click "Bẫy Ruồi Vàng" 🪰
3. Kiểm tra URL: /products?category=1
4. Kiểm tra products được filter đúng
```

### **2. Visual Test**
```typescript
// Test: Icons và names nhất quán
1. So sánh icon ở homepage: 🪰
2. So sánh icon ở products: 🪰
3. So sánh name: "Bẫy Ruồi Vàng"
4. Đảm bảo giống nhau
```

### **3. Count Test**
```typescript
// Test: Count chính xác
1. Đếm products có category_id = '1'
2. So sánh với count hiển thị ở CategoryFilter
3. Đảm bảo số liệu chính xác
```

## 🚀 **Future Enhancements**

### **1. Dynamic Categories**
```typescript
// Có thể fetch categories từ API
const fetchCategories = async () => {
  const { data } = await supabase.from('categories').select('*')
  return data
}
```

### **2. Category Hierarchy**
```typescript
// Hỗ trợ subcategories
interface CategoryData {
  id: string
  name: string
  parent_id?: string  // For subcategories
  level: number       // 0 = main, 1 = sub
}
```

### **3. Category Analytics**
```typescript
// Track category usage
const trackCategoryClick = (categoryId: string) => {
  analytics.track('category_clicked', { categoryId })
}
```

## 🎉 **Kết Quả**

### **Trước Khi Đồng Bộ**
- ❌ **Inconsistent IDs**: Homepage dùng 'bat-ruoi-vang', products dùng '1'
- ❌ **Different Icons**: Homepage 🐛, products 🪰
- ❌ **Broken Links**: Click category không filter đúng products
- ❌ **Maintenance Hell**: Phải sửa ở nhiều nơi

### **Sau Khi Đồng Bộ**
- ✅ **Consistent IDs**: Cùng sử dụng '1', '2', '3', etc.
- ✅ **Same Icons**: Cùng sử dụng 🪰, 🌱, 🍂, etc.
- ✅ **Working Links**: Click category → filter đúng products
- ✅ **Easy Maintenance**: Chỉ sửa ở src/data/categories.ts

Danh mục sản phẩm đã được đồng bộ hoàn hảo giữa homepage và trang products! 🎯✨
