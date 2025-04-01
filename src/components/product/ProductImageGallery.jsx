import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImageGallery = ({ product, selectedImage, setSelectedImage, selectedVariant }) => {
  // Nếu có biến thể được chọn và có hình ảnh, đặt ảnh đó làm ảnh chính
  useEffect(() => {
    if (selectedVariant && selectedVariant.image) {
      // Tìm index của ảnh biến thể trong mảng images của sản phẩm (nếu có)
      const imageIndex = product.images && product.images.findIndex(img => img === selectedVariant.image);
      if (imageIndex !== -1) {
        setSelectedImage(imageIndex);
      }
    }
  }, [selectedVariant, product.images, setSelectedImage]);

  // Chỉ lấy ra mảng hình ảnh nếu có, nếu không thì tạo mảng chỉ với hình ảnh mặc định
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.img];

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <Carousel activeIndex={selectedImage} onSelect={setSelectedImage} interval={null} controls={images.length > 1}>
          {images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={img}
                alt={`${product.title} - Ảnh ${idx + 1}`}
              />
            </Carousel.Item>
          ))}
          {product.videoUrl && (
            <Carousel.Item>
              <div className="video-container">
                <video 
                  controls
                  poster={selectedVariant ? selectedVariant.image : product.img}
                >
                  <source src={product.videoUrl} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      
      {images.length > 1 && (
        <div className="thumbnail-gallery">
          {images.map((img, idx) => {
            // Đánh dấu ảnh thumbnail nếu nó là ảnh của biến thể đang chọn
            const isVariantImage = selectedVariant && selectedVariant.image === img;
            
            return (
              <div 
                key={idx} 
                className={`thumbnail-item ${selectedImage === idx ? 'active' : ''} ${isVariantImage ? 'variant-image' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                />
                {isVariantImage && (
                  <div className="variant-indicator">
                    <i className="fa fa-check"></i>
                  </div>
                )}
              </div>
            );
          })}
          {product.videoUrl && (
            <div 
              className={`thumbnail-item ${selectedImage === images.length ? 'active' : ''}`}
              onClick={() => setSelectedImage(images.length)}
            >
              <div className="video-thumbnail">
                <img 
                  src={selectedVariant ? selectedVariant.image : product.img} 
                  alt="Video thumbnail" 
                />
                <div className="play-icon">
                  <i className="fa fa-play"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery; 