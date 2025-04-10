// Các hàm sắp xếp sản phẩm
export const sortProducts = (products, sortType) => {
  const productsCopy = [...products];
  
  switch (sortType) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case 'newest':
      return productsCopy.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    case 'top-selling':
      return productsCopy.sort((a, b) => (a.isTopSelling === b.isTopSelling) ? 0 : a.isTopSelling ? -1 : 1);
    default:
      return productsCopy;
  }
};

export default {
  sortProducts
}; 