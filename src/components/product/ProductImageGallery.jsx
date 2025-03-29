import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImageGallery = ({ product, selectedImage, setSelectedImage }) => {
  return (
    <div className="product-gallery">
      <div className="main-image-container mb-3">
        <Carousel activeIndex={selectedImage} onSelect={setSelectedImage} interval={null}>
          {product.images && product.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 img-fluid"
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
                  className="d-block w-100 img-fluid"
                  poster={product.img}
                >
                  <source src={product.videoUrl} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      
      <div className="thumbnail-gallery d-flex">
        {product.images && product.images.map((img, idx) => (
          <div 
            key={idx} 
            className={`thumbnail-item ${selectedImage === idx ? 'active' : ''}`}
            onClick={() => setSelectedImage(idx)}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="img-fluid"
            />
          </div>
        ))}
        {product.videoUrl && (
          <div 
            className={`thumbnail-item ${selectedImage === (product.images ? product.images.length : 0) ? 'active' : ''}`}
            onClick={() => setSelectedImage(product.images ? product.images.length : 0)}
          >
            <div className="video-thumbnail">
              <img 
                src={product.img} 
                alt="Video thumbnail" 
                className="img-fluid"
              />
              <div className="play-icon">
                <i className="fa fa-play"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery; 