import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setSelectedProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/orderSlice';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';

// Import extracted components
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductVariants from '../components/product/ProductVariants';
import QuantitySelector from '../components/product/QuantitySelector';
import ProductActions from '../components/product/ProductActions';
import ProductTabs from '../components/product/ProductTabs';
import SocialShare from '../components/product/SocialShare';
import MessengerChat from '../components/product/MessengerChat';

// Temporary import for demo purposes - will need to replace with actual product images
import productImg1 from '../assets/product/chai-xit/1.png';
import productImg2 from '../assets/product/tam-bay-con-trung/1.png';
import productImg3 from '../assets/product/nap-bay/1.png';
import productImg4 from '../assets/product/tinh-dau/1.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading } = useAppSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { cart } = useAppSelector(state => state.order);
  const isCartEnabled = cart.length > 0;

  // Sample product images array for demo (in real app, these would come from the product data)
  const productImages = [
    { id: 1, image: productImg1 },
    { id: 2, image: productImg2 },
    { id: 3, image: productImg3 },
    { id: 4, image: productImg4 },
  ];

  useEffect(() => {
    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Convert productId from string to number since IDs in products.js are numbers
    const id = parseInt(productId, 10);
    const products = allProducts();
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      // Enhance product with more detail for demonstration
      // In a real app, these fields would come from your backend
      if (!foundProduct.detailedDescription) {
        foundProduct.detailedDescription = `
          <p>Chi tiết về sản phẩm ${foundProduct.title}:</p>
          <ul>
            <li>Chất lượng cao</li>
            <li>Thiết kế tinh tế</li>
            <li>Bảo hành 12 tháng</li>
            <li>Sản xuất tại Việt Nam</li>
          </ul>
          <p>Sản phẩm này rất phù hợp để sử dụng trong vườn hoặc trang trại nhỏ. 
          Với công nghệ tiên tiến, sản phẩm sẽ giúp bạn tiết kiệm thời gian và công sức.</p>
          <p>Hướng dẫn sử dụng:</p>
          <ol>
            <li>Mở hộp và kiểm tra sản phẩm</li>
            <li>Đọc kỹ hướng dẫn sử dụng đi kèm</li>
            <li>Áp dụng theo chỉ dẫn trên bao bì</li>
            <li>Để xa tầm tay trẻ em</li>
          </ol>
        `;
      }
      
      if (!foundProduct.specifications) {
        foundProduct.specifications = [
          { name: "Xuất xứ", value: "Việt Nam" },
          { name: "Trọng lượng", value: "250g" },
          { name: "Kích thước", value: "15 x 10 x 5 cm" },
          { name: "Chất liệu", value: "Nhựa cao cấp" },
        ];
      }
      
      dispatch(setSelectedProduct(foundProduct));

      // Reset selectedVariant when product changes
      setSelectedVariant(null);
    }
  }, [productId, dispatch]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const getProductPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return product ? product.price : 0;
  };

  const getProductOldPrice = () => {
    if (selectedVariant) {
      return selectedVariant.oldPrice;
    }
    return product ? product.oldPrice : 0;
  };

  const formatVariantText = () => {
    if (!selectedVariant || !product.variations || !product.variations.options) {
      return '';
    }
    
    return product.variations.options.map((option, index) => {
      if (selectedVariant.attributes[index]) {
        return `\n${option.name}: ${selectedVariant.attributes[index]}`;
      }
      return '';
    }).join('');
  };

  const handleAddToCart = () => {
    if (product) {
      const variantText = formatVariantText();
      const title = product.title + (variantText ? ` (${variantText.trim().replace(/\n/g, ', ')})` : '');
      const price = getProductPrice();
      const image = selectedVariant && selectedVariant.image ? selectedVariant.image : product.img;
      
      dispatch(addToCart({
        id: product.id,
        name: title,
        price: price,
        image: image,
        quantity: quantity
      }));
    }
  };

  const handleBuyNow = () => {
    if (isMobile) {
      // On mobile, redirect to Facebook Messenger
      const currentUrl = window.location.href;
      const variantText = formatVariantText();
      const priceText = getProductPrice().toLocaleString();
      const message = encodeURIComponent(`Tôi muốn mua sản phẩm: ${product.title}${variantText}\nGiá: ${priceText}đ\nSố lượng: ${quantity}\nLink: ${currentUrl}`);
      window.open(`https://m.me/www.mimo.agri?ref=${message}`, '_blank');
    } else {
      // On desktop, focus the messenger chat
      try {
        window.FB.CustomerChat.show(true);
        window.FB.CustomerChat.showDialog(true);
      } catch (e) {
        console.error('Không thể mở khung chat Messenger:', e);
        // Fallback if can't open chat
        const currentUrl = window.location.href;
        const variantText = formatVariantText();
        const priceText = getProductPrice().toLocaleString();
        const message = encodeURIComponent(`Tôi muốn mua sản phẩm: ${product.title}${variantText}\nGiá: ${priceText}đ\nSố lượng: ${quantity}\nLink: ${currentUrl}`);
        window.open(`https://www.facebook.com/messages/t/108621171549372?ref=${message}`, '_blank');
      }
    }
  };

  // Function to handle Facebook share
  const handleFacebookShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(product.title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // Function to handle Messenger share
  const handleMessengerShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.facebook.com/dialog/send?app_id=936619743392459&link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // Function to handle Zalo share
  const handleZaloShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://zalo.me/share?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Function to handle buying through Zalo
  const handleZaloBuy = () => {
    if (product) {
      // Create message with product info
      const currentUrl = window.location.href;
      const variantText = formatVariantText();
      const priceText = getProductPrice().toLocaleString();
      const message = `Tôi muốn mua sản phẩm: ${product.title}${variantText}\nGiá: ${priceText}đ\nSố lượng: ${quantity}\nLink: ${currentUrl}`;
      
      // Open Zalo with the shop's phone number and template message
      window.open(`https://zalo.me/0853991995?text=${message}`, '_blank');
    }
  };

  // Kiểm tra xem biến thể hiện tại có còn hàng không
  const isOutOfStock = () => {
    return selectedVariant && selectedVariant.stock <= 0;
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="page-content-container py-5">
          <div className="text-center">Đang tải...</div>
        </Container>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <Container className="page-content-container py-5">
          <div className="text-center">
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link to="/san-pham" className="btn btn-primary">
              Quay lại trang sản phẩm
            </Link>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="page-content-container py-5">
        <div className="product-detail-container">
          <Row>
            <Col lg={6} md={6} sm={12} className="mb-4">
              <ProductImageGallery 
                product={product || {}} 
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                selectedVariant={selectedVariant}
              />
            </Col>
            
            <Col lg={6} md={6} sm={12} className="mb-4">
              <ProductInfo
                title={product.title}
                price={getProductPrice()}
                oldPrice={getProductOldPrice()}
                categoryId={product.categoryId}
                description={product.description}
              />
              
              {/* Render the ProductVariants component */}
              <ProductVariants
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={handleVariantChange}
              />
              
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                isDisabled={isOutOfStock()}
              />
              
              <ProductActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onZaloBuy={handleZaloBuy}
                isOutOfStock={isOutOfStock()}
              />
              
              <SocialShare 
                onFacebookShare={handleFacebookShare}
                onMessengerShare={handleMessengerShare}
                onZaloShare={handleZaloShare}
              />
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col>
              <ProductTabs 
                product={product}
              />
            </Col>
          </Row>
        </div>
      </Container>
      
      <MessengerChat />
      <Footer />
    </>
  );
};

export default ProductDetail; 