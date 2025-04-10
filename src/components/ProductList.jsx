import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';

const ProductList = () => {
  const { items, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
  };

  const handleSelectProduct = (product) => {
    dispatch(selectProduct(product));
  };

  if (loading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (items.length === 0) {
    return <div>Không có sản phẩm nào.</div>;
  }

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      <div className="row">
        {items.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(product.price)}
                </p>
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => handleSelectProduct(product)}
                >
                  Chi tiết
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 