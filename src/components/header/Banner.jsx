import React, { useEffect } from 'react';
import banner1 from '../../assets/banner/banner1.png';
import banner2 from '../../assets/banner/banner2.png';
import banner3 from '../../assets/banner/banner3.png';

function Banner() {
  useEffect(() => {
    // Initialize carousel
    const carouselElement = document.getElementById('bannerCarousel');
    if (carouselElement) {
      const options = {
        interval: 3000,
        ride: true,
        pause: false
      };
      
      Object.keys(options).forEach(key => {
        carouselElement.setAttribute(`data-bs-${key}`, options[key]);
      });
      
      const event = new Event('slid.bs.carousel');
      carouselElement.dispatchEvent(event);
    }
  }, []);

  return (
    <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={banner1} className="d-block w-100" alt="Banner 1" />
        </div>
        <div className="carousel-item">
          <img src={banner2} className="d-block w-100" alt="Banner 2" />
        </div>
        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="Banner 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Banner; 