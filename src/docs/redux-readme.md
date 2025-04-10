# Hướng dẫn sử dụng Redux trong dự án

## Cấu trúc Redux
Dự án đã được tích hợp Redux với cấu trúc sau:

```
src/
├── store/
│   ├── index.js              # Cấu hình Redux store
│   ├── middleware/           # Các middleware custom
│   │   └── loggerMiddleware.js
│   └── slices/               # Redux slices
│       ├── counterSlice.js   # Slice mẫu
│       ├── productSlice.js   # Quản lý sản phẩm
│       └── orderSlice.js     # Quản lý đơn hàng và giỏ hàng
├── hooks/
│   └── reduxHooks.js         # Custom hooks
```

## Redux Toolkit
Dự án sử dụng Redux Toolkit để đơn giản hóa việc sử dụng Redux. Các tính năng chính:
- `createSlice`: Tạo reducers, actions, và action creators
- `configureStore`: Cấu hình Redux store
- `createAsyncThunk`: Xử lý các tác vụ bất đồng bộ

## Sử dụng Redux trong component

### 1. Sử dụng hooks để truy cập Redux
```jsx
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchProducts } from '../store/slices/productSlice';

// Trong component
const products = useAppSelector(state => state.products.products);
const loading = useAppSelector(state => state.products.loading);
const dispatch = useAppDispatch();

// Dispatch action
useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);
```

### 2. Giỏ hàng và đơn hàng
```jsx
import { addToCart, removeFromCart } from '../store/slices/orderSlice';

// Thêm sản phẩm vào giỏ hàng
dispatch(addToCart({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1
}));

// Xem giỏ hàng
const cart = useAppSelector(state => state.order.cart);
```

### 3. Quản lý sản phẩm
```jsx
import { setFilter, clearFilters } from '../store/slices/productSlice';

// Lọc sản phẩm
dispatch(setFilter({ category: 'phân bón' }));

// Lấy danh sách sản phẩm đã lọc
const filteredProducts = useAppSelector(state => state.products.filteredProducts);
```

## Thêm slice mới

Để thêm một slice mới:

1. Tạo file slice mới trong thư mục `src/store/slices/`
2. Sử dụng `createSlice` để định nghĩa state, reducers và actions
3. Export reducer và các actions
4. Thêm reducer vào file `src/store/index.js`

## Xử lý API

Sử dụng `createAsyncThunk` để xử lý các tác vụ API:

```jsx
export const fetchData = createAsyncThunk(
  'slice/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/data');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

Và xử lý trong slice:

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
}
``` 