/**
 * Tạo className từ danh sách các class, loại bỏ các giá trị falsy
 * 
 * @param  {...any} classes - Danh sách các class, có thể là string, object, array
 * @returns {string} - Chuỗi className đã được xử lý
 * 
 * @example
 * // Sử dụng cơ bản với strings
 * classNames('btn', 'btn-primary') // => 'btn btn-primary'
 * 
 * // Loại bỏ giá trị falsy
 * classNames('btn', undefined, null, false, 'btn-large') // => 'btn btn-large'
 * 
 * // Hỗ trợ điều kiện
 * classNames('btn', isActive && 'btn-active') // => isActive ? 'btn btn-active' : 'btn'
 * 
 * // Hỗ trợ CSS modules với object
 * classNames(styles.button, { [styles.active]: isActive }) // => conditional class based on styles object
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Tạo className từ một object có key là tên class và value là điều kiện
 * 
 * @param {Object} classObj - Object với key là tên class và value là điều kiện boolean
 * @returns {string} - Chuỗi className đã được xử lý
 * 
 * @example
 * // Sử dụng với object conditions
 * classNamesObject({
 *   'btn': true,
 *   'btn-primary': isPrimary,
 *   'btn-large': size === 'large'
 * }) // => các class sẽ được thêm vào dựa trên điều kiện
 */
export function classNamesObject(classObj) {
  return Object.entries(classObj)
    .filter(([_, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ');
}

export default classNames; 