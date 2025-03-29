/**
 * Feature Flags Configuration
 * 
 * Quản lý các tính năng có thể bật/tắt trong ứng dụng
 */

// Danh sách các feature flags
const FEATURES = {
  SHOPPING_CART: {
    enabled: false, // Set false để ẩn tính năng giỏ hàng
    description: 'Tính năng giỏ hàng và đặt hàng'
  }
};

/**
 * Kiểm tra xem một tính năng có được bật hay không
 * @param {string} featureName Tên của tính năng cần kiểm tra
 * @returns {boolean} true nếu tính năng được bật, false nếu không
 */
export const isFeatureEnabled = (featureName) => {
  if (!FEATURES[featureName]) {
    console.warn(`Feature '${featureName}' không tồn tại trong cấu hình.`);
    return false;
  }
  
  return FEATURES[featureName].enabled;
};

/**
 * Lấy danh sách tất cả các tính năng và trạng thái của chúng
 * @returns {Object} Danh sách các tính năng
 */
export const getAllFeatures = () => {
  return { ...FEATURES };
};

/**
 * Feature flag names as constants to avoid typos
 */
export const FEATURE_NAMES = {
  SHOPPING_CART: 'SHOPPING_CART'
}; 