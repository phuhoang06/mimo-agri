import React from 'react';
import { Form } from 'react-bootstrap';
import FormGroup from './FormGroup';
import { Button } from '../ui';

function CustomerForm({ 
  cities = [], 
  districts = [], 
  wards = [], 
  handleCityChange, 
  handleDistrictChange, 
  onSubmit,
  formRef
}) {
  // Chuẩn bị options cho các dropdown
  const cityOptions = cities.map(city => ({ 
    value: city.code, 
    label: city.name 
  }));
  
  const districtOptions = districts.map(district => ({ 
    value: district.code, 
    label: district.name 
  }));
  
  const wardOptions = wards.map(ward => ({ 
    value: ward.code, 
    label: ward.name 
  }));
  
  return (
    <Form id="customerForm" ref={formRef}>
      <FormGroup 
        label="Họ và tên" 
        id="fullName" 
        required
      />
      <FormGroup 
        label="Số điện thoại" 
        id="phone" 
        type="tel" 
        required
        helpText="Định dạng: 09xxxxxxxx hoặc 03xxxxxxxx"
      />
      <FormGroup 
        label="Tỉnh/Thành phố" 
        id="city" 
        type="select" 
        onChange={handleCityChange} 
        required
        options={cityOptions}
        placeholder="Chọn Tỉnh/Thành phố"
      />
      <FormGroup 
        label="Quận/Huyện" 
        id="district" 
        type="select" 
        onChange={handleDistrictChange} 
        required
        options={districtOptions}
        placeholder="Chọn Quận/Huyện"
      />
      <FormGroup 
        label="Xã/Phường" 
        id="ward" 
        type="select" 
        required
        options={wardOptions}
        placeholder="Chọn Xã/Phường"
      />
      <FormGroup 
        label="Địa chỉ cụ thể" 
        id="address" 
        required
        placeholder="Ví dụ: Số 123, Ngõ 45"
      />
      <FormGroup>
        <Button 
          variant="success" 
          onClick={onSubmit} 
          icon="fas fa-check"
          isFullWidth
        >
          Xác nhận đặt hàng
        </Button>
      </FormGroup>
    </Form>
  );
}

export default CustomerForm; 