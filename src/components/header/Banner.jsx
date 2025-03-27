import React, { useEffect } from 'react';
import banner1 from '../../assets/banner/banner1.png';
import banner2 from '../../assets/banner/banner2.png';
import banner3 from '../../assets/banner/banner3.png';

function Banner() {
  useEffect(() => {
    // Khởi tạo carousel khi component được render
    const carouselElement = document.getElementById('bannerCarousel');
    if (carouselElement) {
      // Tạo một object mới để lưu cài đặt
      const options = {
        interval: 3000,
        ride: true,
        pause: false
      };
      
      // Cập nhật thuộc tính data-bs-* cho carousel
      Object.keys(options).forEach(key => {
        carouselElement.setAttribute(`data-bs-${key}`, options[key]);
      });
      
      // Kích hoạt carousel bằng cách gửi sự kiện
      const event = new Event('slid.bs.carousel');
      carouselElement.dispatchEvent(event);
    }
  }, []);

  return (
    <div className="col-lg-9 main-content">
      <div id="bannerCarousel" 
        className="carousel slide" 
        data-bs-ride="carousel" 
        data-bs-interval="3000"
        style={{ height: '341.48px' }}
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" aria-label="Slide 1" aria-current="true" className="active"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2" aria-current="false"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3" aria-current="false"></button>
        </div>
        <div className="carousel-inner" style={{ height: '100%' }}>
          <div className="carousel-item active" style={{ height: '100%' }}>
            <img className="d-block w-100 h-100" alt="Banner 1" src={banner1} style={{ objectFit: 'cover' }} />
          </div>
          <div className="carousel-item" style={{ height: '100%' }}>
            <img className="d-block w-100 h-100" alt="Banner 2" src={banner2} style={{ objectFit: 'cover' }} />
          </div>
          <div className="carousel-item" style={{ height: '100%' }}>
            <img className="d-block w-100 h-100" alt="Banner 3" src={banner3} style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <a className="carousel-control-prev" role="button" data-bs-target="#bannerCarousel" data-bs-slide="prev" href="#">
          <span aria-hidden="true" className="carousel-control-prev-icon" style={{backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px'}}></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" role="button" data-bs-target="#bannerCarousel" data-bs-slide="next" href="#">
          <span aria-hidden="true" className="carousel-control-next-icon" style={{backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px'}}></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Banner; 