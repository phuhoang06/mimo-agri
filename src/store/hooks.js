import { useDispatch, useSelector } from 'react-redux';

// Sử dụng hook này thay vì useDispatch
export const useAppDispatch = () => useDispatch();

// Sử dụng hook này thay vì useSelector
export const useAppSelector = useSelector; 