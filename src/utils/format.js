/**
 * Định dạng số thành chuỗi tiền tệ
 * @param {number} amount - Số tiền cần định dạng
 * @param {string} currency - Đơn vị tiền tệ (mặc định là 'VND')
 * @returns {string} Chuỗi tiền tệ đã định dạng
 */
export const formatCurrency = (amount, currency = 'VND') => {
  if (amount === undefined || amount === null) return '';
  
  // Format số với dấu phân cách hàng nghìn
  const formattedNumber = amount.toLocaleString('vi-VN');
  
  // Thêm ký hiệu tiền tệ tùy theo loại
  if (currency === 'VND') {
    return `${formattedNumber}₫`;
  } else if (currency === 'USD') {
    return `$${formattedNumber}`;
  } else {
    return `${formattedNumber} ${currency}`;
  }
};

/**
 * Định dạng số thành chuỗi với đơn vị đo lường
 * @param {number} value - Giá trị cần định dạng
 * @param {string} unit - Đơn vị đo lường (mặc định là '')
 * @returns {string} Chuỗi đã định dạng
 */
export const formatWithUnit = (value, unit = '') => {
  if (value === undefined || value === null) return '';
  
  return `${value.toLocaleString('vi-VN')}${unit ? ` ${unit}` : ''}`;
};

/**
 * Rút gọn chuỗi dài với dấu chấm lửng
 * @param {string} text - Chuỗi cần rút gọn
 * @param {number} maxLength - Độ dài tối đa (mặc định là 100)
 * @returns {string} Chuỗi đã rút gọn
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substr(0, maxLength) + '...';
};

/**
 * Định dạng ngày tháng
 * @param {Date|string} date - Ngày cần định dạng
 * @param {string} format - Định dạng (mặc định là 'dd/MM/yyyy')
 * @returns {string} Chuỗi ngày tháng đã định dạng
 */
export const formatDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return '';
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year)
    .replace('HH', hours)
    .replace('mm', minutes);
}; 