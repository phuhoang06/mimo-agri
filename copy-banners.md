# HƯỚNG DẪN COPY BANNER IMAGES

## 📁 Copy 3 banner files vào thư mục đúng:

**Đường dẫn đích:** `ecommerce-app/public/banners/`

**Copy files với tên chính xác:**
- `1_final.jpg` → `1_final.jpg`
- `2_final.jpg` → `2_final.jpg`  
- `banner_final.jpg` → `banner_final.jpg`

## 🔧 Các vấn đề có thể gặp:

### 1. **Độ phân giải không đủ:**
- Banner gốc: 1214 x 315 px
- Tỷ lệ khung hình: 3.85:1
- Đảm bảo không bị méo ảnh

### 2. **File không load được:**
- Kiểm tra tên file đúng chính xác
- Kiểm tra đường dẫn: `public/banners/banner1.png`
- Restart dev server sau khi copy

### 3. **Hiển thị không đúng:**
- Check browser console có lỗi không
- Thử hard refresh (Ctrl+F5)
- Kiểm tra file size không quá lớn

## 🚀 Test sau khi copy:
1. Copy 3 files: `1_final.jpg`, `2_final.jpg`, `banner_final.jpg` vào `public/banners/`
2. Restart `npm run dev`
3. Mở trang chủ → kiểm tra banner carousel
4. Nếu vẫn thấy background xanh → banner chưa load đúng
5. Nếu thấy banner images → thành công! ✅

## 📸 Banner content:
- **Banner 1**: Chuyên Giải Pháp Kiểm Soát Ruồi Vàng
- **Banner 2**: Keo Xịt Ruồi Vàng 750ml  
- **Banner 3**: Hạt Giống Dụng Cụ Làm Vườn

## 📞 Fallback hiện tại:
Nếu banner không load, sẽ hiển thị design tạm thời với text content phù hợp.
