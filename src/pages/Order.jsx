import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import { useCart } from '../utils/CartManager';
import axios from 'axios';

function Order() {
  const { cart, groupItems, clearCart } = useCart();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
      window.location.href = "/";
    }
    axios.get('https://provinces.open-api.vn/api/?depth=3')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, [cart]);

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
    return groupItems().reduce((sum, item) => {
      if (selectedItems.has(item.title)) {
        return sum + (item.price * item.quantity);
      }
      return sum;
    }, 0);
  };

  const handleOrderConfirmation = async () => {
    const form = document.getElementById("customerForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (selectedItems.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
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
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbziJ5XvxnWBYuZUbivKOoNUBv-AXeLbR1yWRHy6ovibZiTRSXgS0YtsfUbSzDBTts39aA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error("Lỗi khi gửi đơn hàng");
      clearCart();
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại Mimo Agri.");
      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row>
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0"><i className="fas fa-user me-2"></i>Thông tin khách hàng</h4>
              </Card.Header>
              <Card.Body>
                <Form id="customerForm">
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" id="fullName" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="tel" id="phone" required />
                    <Form.Text>Định dạng: 09xxxxxxxx hoặc 03xxxxxxxx</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Select id="city" onChange={handleCityChange} required>
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {cities.map(city => (
                        <option key={city.code} value={city.code}>{city.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Select id="district" onChange={handleDistrictChange} required>
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(district => (
                        <option key={district.code} value={district.code}>{district.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Xã/Phường</Form.Label>
                    <Form.Select id="ward" required>
                      <option value="">Chọn Xã/Phường</option>
                      {wards.map(ward => (
                        <option key={ward.code} value={ward.code}>{ward.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ chi tiết</Form.Label>
                    <Form.Control type="text" id="address" required />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Giỏ hàng</h4>
              </Card.Header>
              <Card.Body>
                <div id="orderItems">
                  {groupItems().map((item, index) => (
                    <div className="mb-3" key={index}>
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          id={`item-${index}`}
                          className="me-2"
                          onChange={(e) => {
                            if (e.target.checked) selectedItems.add(item.title);
                            else selectedItems.delete(item.title);
                            setSelectedItems(new Set(selectedItems));
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{item.title}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="input-group" style={{ width: '120px' }}>
                              <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, -1)}>-</Button>
                              <Form.Control type="number" className="text-center" value={item.quantity} min="1" max="99" onChange={(e) => updateQuantity(index, e.target.value)} />
                              <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, 1)}>+</Button>
                            </div>
                            <span className="text-success">{(item.price * item.quantity).toLocaleString()}₫</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Tổng tiền:</h5>
                  <h5 className="text-success mb-0">{calculateTotal().toLocaleString()}₫</h5>
                </div>
                <Button variant="success" className="w-100" id="confirmOrder" onClick={handleOrderConfirmation}>
                  <i className="fas fa-check me-2"></i>Xác nhận đặt hàng
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Order; 