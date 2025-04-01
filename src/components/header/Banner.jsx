import React, { useEffect } from 'react';
import banner1 from '../../assets/banner/1.png'
import banner2 from '../../assets/banner/2.png'
import banner3 from '../../assets/banner/3.png'

function Banner() {
  useEffect(() => {
    // Initialize carousel
    const carouselElement = document.getElementById('bannerCarousel');
    if (carouselElement && window.bootstrap) {
      // Initialize Bootstrap carousel
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
        wrap: true
      });
    }
  }, []);

  const bannerStyle = {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'contain'
  };

  return (
    <div 
      id="bannerCarousel"
      className="carousel slide" 
      style={bannerStyle} 
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            src={banner1} 
            className="d-block w-100" 
            style={imageStyle} 
            alt="Banner 1"
          />
        </div>
        <div className="carousel-item">
          <img 
            src={banner2} 
            className="d-block w-100" 
            style={imageStyle} 
            alt="Banner 2"
          />
        </div>
        <div className="carousel-item">
          <img 
            src={banner3} 
            className="d-block w-100" 
            style={imageStyle} 
            alt="Banner 3"
          />
        </div>
      </div>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
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
