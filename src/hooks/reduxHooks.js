import { useDispatch, useSelector } from 'react-redux';

// Sử dụng hooks này thay vì useDispatch và useSelector trực tiếp
// Điều này giúp dễ dàng mocking trong tests và cải thiện type-safety

/**
 * Hook để truy cập Redux dispatch
 */
export const useAppDispatch = () => useDispatch();

/**
 * Hook để truy cập Redux state
 * @param {Function} selector - Selector function
 */
export const useAppSelector = useSelector; 