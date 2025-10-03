-- Migration: Thêm cột images và video_url vào bảng products
-- Chạy script này trong Supabase SQL Editor

-- 1. Thêm cột images (JSONB array) để lưu nhiều ảnh
ALTER TABLE products ADD COLUMN images JSONB;

-- 2. Thêm cột video_url (TEXT) để lưu 1 video
ALTER TABLE products ADD COLUMN video_url TEXT;

-- 3. Thêm comment để mô tả cột
COMMENT ON COLUMN products.images IS 'Array of image URLs for product gallery';
COMMENT ON COLUMN products.video_url IS 'URL of product video (YouTube or direct video file)';

-- 4. Kiểm tra cấu trúc bảng
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
