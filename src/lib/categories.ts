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
      .from('tb_product_category')
      .select('id, category_name, category_type')
      .order('category_name')

    if (error) {
      console.warn('⚠️ Cannot fetch categories:', error.message)
      return []
    }

    return data?.map(category => ({
      id: category.id,
      name: category.category_name,
      subcategories: generateSubcategories(category.category_name)
    })) || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch categories with product count
export const fetchCategoriesWithCount = async (): Promise<Category[]> => {
  try {
    // Fetch all category assignments
    const { data: categoryAssignments, error: categoriesError } = await supabase
      .from('tb_product_category')
      .select('category_name, product_id')
      .order('category_name')

    if (categoriesError) {
      console.warn('⚠️ Cannot fetch categories:', categoriesError.message)
      return []
    }

    if (!categoryAssignments || categoryAssignments.length === 0) {
      return []
    }

    // Group by category_name and count unique products
    const categoryMap = new Map<string, Set<string>>()

    for (const assignment of categoryAssignments) {
      if (!categoryMap.has(assignment.category_name)) {
        categoryMap.set(assignment.category_name, new Set())
      }
      categoryMap.get(assignment.category_name)!.add(assignment.product_id)
    }

    // Convert to Category array with counts
    const categoriesWithCount: Category[] = Array.from(categoryMap.entries()).map(
      ([name, productIds]) => ({
        id: name, // Use name as ID for filtering
        name,
        count: productIds.size
      })
    )

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
