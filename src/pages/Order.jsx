import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePageTitle } from '../hooks';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import { Card } from '../components/ui';
import { CustomerForm } from '../components/form';
import { OrderItemList, OrderSummary } from '../components/order';
import { useCart } from '../utils/CartManager';
import axios from 'axios';

function Order() {
  const { cart, groupItems, clearCart } = useCart();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const customerFormRef = useRef(null);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle('Đặt hàng');

  useEffect(() => {
    // Đảm bảo cart đã được nạp từ localStorage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setIsCartLoaded(true);
      
      if (parsedCart.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
        window.location.href = "/";
        return;
      }
    } else {
      setIsCartLoaded(true);
      if (cart.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
        window.location.href = "/";
        return;
      }
    }
    
    // Auto-select all items in cart
    const allItems = new Set(groupItems().map(item => item.title));
    setSelectedItems(allItems);
    
    // Scroll to customer form
    if (customerFormRef.current) {
      customerFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus on the first input field
      setTimeout(() => {
        const firstInput = customerFormRef.current.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 500);
    }
    
    axios.get('https://provinces.open-api.vn/api/?depth=3')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, [cart, groupItems]);

  const handleCityChange = (e) => {
    const province = cities.find(p => p.code === parseInt(e.target.value));
    setDistricts(province ? province.districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const district = districts.find(d => d.code === parseInt(e.target.value));
    setWards(district ? district.wards : []);
  };

  const updateQuantity = (index, change) => {
    const items = groupItems();
    const item = items[index];
    if (typeof change === "number") {
      item.quantity = Math.max(1, Math.min(99, item.quantity + change));
    } else {
      item.quantity = Math.max(1, Math.min(99, parseInt(change) || 1));
    }
    const newCart = [];
    items.forEach(i => {
      for (let j = 0; j < i.quantity; j++) {
        newCart.push({ title: i.title, price: i.price, img: i.img });
      }
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.location.reload(); // Reload để cập nhật cart
  };

  const calculateTotal = () => {
    const items = groupItems();
    return items.reduce((sum, item) => {
      if (selectedItems.has(item.title)) {
        return sum + (item.price * item.quantity);
      }
      return sum;
    }, 0);
  };

  const handleOrderConfirmation = async () => {
    try {
      const form = document.getElementById("customerForm");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      if (selectedItems.size === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm!");
        return;
      }
      
      // Tạo dữ liệu đơn hàng
      const orderData = {
        customerInfo: {
          fullName: document.getElementById("fullName").value,
          phone: document.getElementById("phone").value,
          city: document.getElementById("city").selectedOptions[0].textContent,
          district: document.getElementById("district").selectedOptions[0].textContent,
          ward: document.getElementById("ward").selectedOptions[0].textContent,
          address: document.getElementById("address").value
        },
        items: groupItems().filter(item => selectedItems.has(item.title)),
        totalAmount: calculateTotal()
      };
      
      console.log("Đang gửi đơn hàng...");
      
      // Gửi đơn hàng đến server
      const response = await fetch('http://localhost:5000/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      // Xử lý phản hồi
      if (response.ok) {
        const responseData = await response.json();
        console.log("Phản hồi từ server:", responseData);
        
        // Xóa giỏ hàng
        clearCart();
        
        // Hiển thị thông báo
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại Mimo Agri.");
        
        // Chuyển hướng về trang chủ
        window.location.href = "/";
      } else {
        throw new Error("Lỗi khi gửi đơn hàng. Mã lỗi: " + response.status);
      }
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
      alert("Có lỗi xảy ra khi đặt hàng: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row>
          <Col md={8}>
            <Card 
              className="shadow-sm" 
              title="Thông tin khách hàng" 
              headerClassName="bg-success text-white"
              titleClassName="mb-0"
              headerIcon="fas fa-user"
              bodyClassName="p-3"
            >
              <CustomerForm
                cities={cities}
                districts={districts}
                wards={wards}
                handleCityChange={handleCityChange}
                handleDistrictChange={handleDistrictChange}
                onSubmit={handleOrderConfirmation}
                formRef={customerFormRef}
              />
            </Card>
          </Col>
          
          <Col md={4}>
            <Card 
              className="shadow-sm" 
              title="Đơn hàng của bạn" 
              headerClassName="bg-primary text-white"
              titleClassName="mb-0"
              headerIcon="fas fa-shopping-cart"
            >
              {isCartLoaded && (
                <>
                  <OrderItemList
                    items={groupItems()}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    updateQuantity={updateQuantity}
                  />
                  <OrderSummary total={calculateTotal()} />
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Order;