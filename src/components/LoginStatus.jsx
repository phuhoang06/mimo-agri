import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

const LoginStatus = () => {
  const { isAuthenticated, currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="login-status">
        <button className="btn btn-primary">Đăng nhập</button>
      </div>
    );
  }

  return (
    <div className="login-status">
      <div className="dropdown">
        <button 
          className="btn btn-secondary dropdown-toggle" 
          type="button"
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          {currentUser?.name || 'Người dùng'}
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Tài khoản</a></li>
          <li><a className="dropdown-item" href="#">Đơn hàng</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  );
};

export default LoginStatus; 