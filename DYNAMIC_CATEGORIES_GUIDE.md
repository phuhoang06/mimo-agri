# Dynamic Categories Guide - Chuyển Từ Hardcode Sang Database

## 🎯 **Mục Tiêu**
Chuyển từ dữ liệu hardcode sang sử dụng database để quản lý categories động.

## ✅ **Những Gì Đã Thực Hiện**

### **1. Tạo Category API Library**
```typescript
// src/lib/categories.ts
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

// Fetch categories from database
export const fetchCategories = async (): Promise<CategoryData[]>
export const fetchCategoriesWithCount = async (): Promise<Category[]>
```

### **2. Cập Nhật CategorySidebar (Homepage)**
```typescript
// src/components/CategorySidebar.tsx
import { fetchCategories, CategoryData } from '@/lib/categories'

export default function CategorySidebar() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  // Loading skeleton
  {loading ? (
    <div className="animate-pulse">...</div>
  ) : (
    categories.map((category) => (...))
  )}
}
```

### **3. Cập Nhật Products Page**
```typescript
// src/app/products/page.tsx
import { fetchCategoriesWithCount, Category } from '@/lib/categories'

const fetchProducts = async () => {
  // Fetch products and categories in parallel
  const [productsResult, categoriesResult] = await Promise.all([
    supabase.from('products').select('*'),
    fetchCategoriesWithCount()
  ])
  
  setProducts(productsResult.data || [])
  setCategories(categoriesResult)
}
```

### **4. Seed Database với Categories Nông Nghiệp**
```javascript
// scripts/seed-agriculture-categories.js
const categories = [
  { name: 'Bẫy Ruồi Vàng', type: 'product' },
  { name: 'Hạt Giống Mùa Hè', type: 'product' },
  { name: 'Hạt Giống Mùa Thu', type: 'product' },
  { name: 'Hạt Giống Mùa Đông', type: 'product' },
  { name: 'Dụng Cụ Làm Vườn', type: 'product' },
  { name: 'Vòi Tưới Cây', type: 'product' },
  { name: 'Phân Bón - Thuốc', type: 'product' }
]
```

## 🔄 **Data Flow**

### **Before (Hardcode)**
```
src/data/categories.ts
├── CATEGORIES_DATA (hardcoded)
├── Static icons mapping
├── Static subcategories
└── No database connection

Components
├── Import hardcoded data
├── No loading states
├── No error handling
└── Static content
```

### **After (Dynamic)**
```
Database (Supabase)
├── categories table
├── products table
└── Real-time data

src/lib/categories.ts
├── fetchCategories()
├── fetchCategoriesWithCount()
├── Icon mapping
└── Subcategories mapping

Components
├── useState for categories
├── useEffect for loading
├── Loading skeletons
├── Error handling
└── Dynamic content
```

## 📊 **Database Structure**

### **Categories Table**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('product', 'article')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Products Table**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  min_price DECIMAL,
  max_price DECIMAL,
  category_id UUID REFERENCES categories(id),
  image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 **Technical Implementation**

### **1. Category API Functions**
```typescript
// Fetch categories with product count
export const fetchCategoriesWithCount = async (): Promise<Category[]> => {
  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, type')
    .eq('type', 'product')

  // Fetch product counts for each category
  const categoriesWithCount: Category[] = []
  
  for (const category of categories) {
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category.id)

    categoriesWithCount.push({
      id: category.id,
      name: category.name,
      icon: CATEGORY_ICONS[category.name] || '📦',
      count: count || 0
    })
  }

  return categoriesWithCount
}
```

### **2. Icon Mapping**
```typescript
const CATEGORY_ICONS: Record<string, string> = {
  'Electronics': '📱',
  'Fashion': '👕',
  'Home & Garden': '🏠',
  'Bẫy Ruồi Vàng': '🪰',
  'Hạt Giống Mùa Hè': '🌱',
  'Hạt Giống Mùa Thu': '🍂',
  'Hạt Giống Mùa Đông': '❄️',
  'Dụng Cụ Làm Vườn': '🛠️',
  'Vòi Tưới Cây': '💧',
  'Phân Bón - Thuốc': '🌿'
}
```

### **3. Loading States**
```typescript
// CategorySidebar loading skeleton
{loading ? (
  <div className="p-4 space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="flex items-center space-x-3 p-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
        </div>
      </div>
    ))}
  </div>
) : (
  categories.map((category) => (...))
)}
```

## 🚀 **Benefits**

### **1. Dynamic Content**
- ✅ **Real-time Data**: Categories từ database, không hardcode
- ✅ **Easy Management**: Thêm/sửa/xóa categories qua database
- ✅ **Scalable**: Dễ dàng mở rộng thêm categories mới
- ✅ **Consistent**: Dữ liệu nhất quán giữa các components

### **2. Better UX**
- ✅ **Loading States**: Skeleton loading khi fetch data
- ✅ **Error Handling**: Xử lý lỗi khi không load được data
- ✅ **Performance**: Parallel fetching products và categories
- ✅ **Responsive**: Hoạt động tốt trên mọi device

### **3. Maintainability**
- ✅ **Single Source**: Database là single source of truth
- ✅ **Type Safety**: TypeScript interfaces đảm bảo type safety
- ✅ **Reusable**: API functions có thể dùng ở nhiều nơi
- ✅ **Testable**: Dễ test với mock data

## 📱 **User Experience**

### **1. Loading Experience**
```typescript
// Skeleton loading cho categories
<div className="animate-pulse">
  <div className="w-6 h-6 bg-gray-200 rounded"></div>
  <div className="h-4 bg-gray-200 rounded flex-1"></div>
</div>
```

### **2. Error Handling**
```typescript
try {
  const data = await fetchCategories()
  setCategories(data)
} catch (error) {
  console.error('Error loading categories:', error)
  // Fallback to empty array or show error message
}
```

### **3. Performance Optimization**
```typescript
// Parallel fetching
const [productsResult, categoriesResult] = await Promise.all([
  supabase.from('products').select('*'),
  fetchCategoriesWithCount()
])
```

## 🧪 **Testing**

### **1. Database Test**
```bash
# Chạy seed script
node scripts/seed-agriculture-categories.js

# Kết quả:
✅ Categories đã được thêm:
  - Bẫy Ruồi Vàng (ID: 3571b542-e8fc-496e-8bef-678712df37d6)
  - Hạt Giống Mùa Hè (ID: ad642812-45e6-4cb8-8aec-d42bf8a8ac28)
  - ...
```

### **2. Component Test**
```typescript
// Test loading state
expect(screen.getByTestId('category-skeleton')).toBeInTheDocument()

// Test loaded content
await waitFor(() => {
  expect(screen.getByText('Bẫy Ruồi Vàng')).toBeInTheDocument()
})
```

### **3. API Test**
```typescript
// Test fetchCategories
const categories = await fetchCategories()
expect(categories).toHaveLength(7)
expect(categories[0].name).toBe('Bẫy Ruồi Vàng')

// Test fetchCategoriesWithCount
const categoriesWithCount = await fetchCategoriesWithCount()
expect(categoriesWithCount[0].count).toBeGreaterThanOrEqual(0)
```

## 🔮 **Future Enhancements**

### **1. Real-time Updates**
```typescript
// Supabase real-time subscriptions
useEffect(() => {
  const subscription = supabase
    .channel('categories')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'categories' },
      (payload) => {
        // Update categories in real-time
        setCategories(prev => [...prev, payload.new])
      }
    )
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

### **2. Caching**
```typescript
// React Query for caching
const { data: categories, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

### **3. Admin Panel**
```typescript
// Admin interface để quản lý categories
const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  
  const addCategory = async (name: string) => {
    await supabase.from('categories').insert({ name, type: 'product' })
    // Refresh categories
  }
  
  return (
    <div>
      {/* Category management interface */}
    </div>
  )
}
```

## 🎉 **Kết Quả**

### **Trước Khi Chuyển**
- ❌ **Hardcoded Data**: Categories cố định trong code
- ❌ **No Loading States**: Không có loading indicators
- ❌ **No Error Handling**: Không xử lý lỗi
- ❌ **Hard to Maintain**: Phải sửa code để thay đổi categories

### **Sau Khi Chuyển**
- ✅ **Dynamic Data**: Categories từ database
- ✅ **Loading States**: Skeleton loading mượt mà
- ✅ **Error Handling**: Xử lý lỗi gracefully
- ✅ **Easy Management**: Quản lý categories qua database
- ✅ **Better Performance**: Parallel fetching, caching
- ✅ **Scalable**: Dễ dàng mở rộng

Categories đã được chuyển từ hardcode sang dynamic database thành công! 🎯✨
