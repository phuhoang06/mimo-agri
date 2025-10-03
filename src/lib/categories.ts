import { supabase } from './supabase'

export interface Category {
  id: string
  name: string
  count: number
}

export interface CategoryData {
  id: string
  name: string
  subcategories: string[]
}

// Dynamic subcategories generation based on category name
const generateSubcategories = (name: string): string[] => {
  const subcategoryMap: Record<string, string[]> = {
    'bẫy ruồi vàng': ['Bẫy dính vàng', 'Keo xịt', 'Tấm bẫy', 'Dung cụ bẫy'],
    'hạt giống mùa hè': ['Rau củ quả', 'Hoa kiểng', 'Cây ăn trái', 'Hạt giống nhập khẩu'],
    'hạt giống mùa thu': ['Rau mùa thu', 'Củ quả mùa thu', 'Hoa mùa thu'],
    'hạt giống mùa đông': ['Rau mùa đông', 'Cây chịu lạnh', 'Hoa mùa đông'],
    'dụng cụ làm vườn': ['Cuốc, xẻng', 'Vòi tưới', 'Đất trồng', 'Chậu cây'],
    'vòi tưới cây': ['Vòi sen', 'Ống nước', 'Béc tưới', 'Hệ thống tưới'],
    'phân bón': ['Phân hữu cơ', 'Phân vô cơ', 'Thuốc trừ sâu', 'Thuốc diệt cỏ'],
    'thuốc': ['Phân hữu cơ', 'Phân vô cơ', 'Thuốc trừ sâu', 'Thuốc diệt cỏ'],
    'electronics': ['Smartphones', 'Laptops', 'Accessories', 'Audio'],
    'fashion': ['Clothing', 'Shoes', 'Accessories', 'Jewelry'],
    'home': ['Furniture', 'Decor', 'Garden Tools', 'Appliances'],
    'tech': ['Latest News', 'Reviews', 'Tutorials', 'Industry Updates'],
    'review': ['Electronics', 'Home & Garden', 'Fashion', 'General']
  }
  
  const lowerName = name.toLowerCase()
  for (const [key, subcategories] of Object.entries(subcategoryMap)) {
    if (lowerName.includes(key)) {
      return subcategories
    }
  }
  
  return ['Sản phẩm chung'] // Default subcategories
}

// Fetch categories from database
export const fetchCategories = async (): Promise<CategoryData[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, type')
      .eq('type', 'product')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data?.map(category => ({
      id: category.id,
      name: category.name,
      subcategories: generateSubcategories(category.name)
    })) || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch categories with product count
export const fetchCategoriesWithCount = async (): Promise<Category[]> => {
  try {
    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, type')
      .eq('type', 'product')
      .order('name')

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return []
    }

    if (!categories || categories.length === 0) {
      return []
    }

    // Fetch product counts for each category
    const categoriesWithCount: Category[] = []
    
    for (const category of categories) {
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)

      if (countError) {
        console.error(`Error fetching count for category ${category.name}:`, countError)
        continue
      }

      categoriesWithCount.push({
        id: category.id,
        name: category.name,
        count: count || 0
      })
    }

    return categoriesWithCount
  } catch (error) {
    console.error('Error fetching categories with count:', error)
    return []
  }
}

// Helper functions
export const getCategorySubcategories = (name: string): string[] => {
  return generateSubcategories(name)
}
