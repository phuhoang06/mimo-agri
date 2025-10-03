-- Script thêm dữ liệu mẫu cho ecommerce database
-- Chạy trên Supabase SQL Editor

-- 1. Thêm categories
INSERT INTO categories (name, type) VALUES 
('Electronics', 'product'),
('Fashion', 'product'),
('Home & Garden', 'product'),
('Tech News', 'article'),
('Product Reviews', 'article')
ON CONFLICT (name) DO NOTHING;

-- 2. Thêm users mẫu
INSERT INTO users (id, name, email, role) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Admin User', 'admin@ecommerce.com', 'admin'),
('550e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john@example.com', 'customer'),
('550e8400-e29b-41d4-a716-446655440002', 'Jane Smith', 'jane@example.com', 'customer')
ON CONFLICT (id) DO NOTHING;

-- 3. Thêm products mẫu
DO $$ 
DECLARE 
    electronics_id UUID;
    fashion_id UUID;
    home_id UUID;
BEGIN
    -- Lấy category IDs
    SELECT id INTO electronics_id FROM categories WHERE name = 'Electronics' LIMIT 1;
    SELECT id INTO fashion_id FROM categories WHERE name = 'Fashion' LIMIT 1;
    SELECT id INTO home_id FROM categories WHERE name = 'Home & Garden' LIMIT 1;
    
    -- Thêm products
    INSERT INTO products (name, price, stock, description, category_id, image_url) VALUES 
    ('iPhone 15 Pro', 999.99, 50, 'Latest iPhone with advanced features and A17 Pro chip', electronics_id, 'https://via.placeholder.com/300x300?text=iPhone+15'),
    ('MacBook Air M3', 1299.99, 30, 'Lightweight laptop with M3 chip, perfect for work and creativity', electronics_id, 'https://via.placeholder.com/300x300?text=MacBook+Air'),
    ('AirPods Pro', 249.99, 100, 'Active noise cancellation wireless earbuds', electronics_id, 'https://via.placeholder.com/300x300?text=AirPods+Pro'),
    ('Samsung Galaxy S24', 899.99, 40, 'Flagship Android phone with excellent camera', electronics_id, 'https://via.placeholder.com/300x300?text=Galaxy+S24'),
    ('Nike Air Max', 129.99, 75, 'Comfortable running shoes with Air Max technology', fashion_id, 'https://via.placeholder.com/300x300?text=Nike+Air+Max'),
    ('Adidas Hoodie', 79.99, 60, 'Cozy hoodie perfect for casual wear', fashion_id, 'https://via.placeholder.com/300x300?text=Adidas+Hoodie'),
    ('Coffee Maker', 159.99, 25, 'Automatic coffee maker with programmable timer', home_id, 'https://via.placeholder.com/300x300?text=Coffee+Maker'),
    ('Plant Pot Set', 39.99, 80, 'Set of 3 ceramic plant pots for indoor plants', home_id, 'https://via.placeholder.com/300x300?text=Plant+Pots')
    ON CONFLICT (name) DO NOTHING;
END $$;

-- 4. Thêm articles mẫu
DO $$ 
DECLARE 
    tech_news_id UUID;
    reviews_id UUID;
    admin_id UUID;
BEGIN
    -- Lấy category IDs
    SELECT id INTO tech_news_id FROM categories WHERE name = 'Tech News' LIMIT 1;
    SELECT id INTO reviews_id FROM categories WHERE name = 'Product Reviews' LIMIT 1;
    SELECT id INTO admin_id FROM users WHERE role = 'admin' LIMIT 1;
    
    -- Thêm articles
    INSERT INTO articles (title, slug, content, category_id, author_id) VALUES 
    ('iPhone 15 Pro Review: Worth the Upgrade?', 'iphone-15-pro-review', 'A comprehensive review of the latest iPhone 15 Pro including camera improvements, performance, and battery life...', reviews_id, admin_id),
    ('Top 10 Tech Trends in 2024', 'top-tech-trends-2024', 'Discover the most important technology trends that will shape 2024, from AI innovations to sustainable tech...', tech_news_id, admin_id),
    ('MacBook Air M3 vs M2: What Changed?', 'macbook-air-m3-vs-m2', 'Detailed comparison between the new MacBook Air M3 and its predecessor, covering performance, price, and features...', reviews_id, admin_id),
    ('The Future of E-commerce', 'future-of-ecommerce', 'How online shopping is evolving with new technologies like AR, AI, and voice commerce...', tech_news_id, admin_id)
    ON CONFLICT (slug) DO NOTHING;
END $$;

-- 5. Thêm orders mẫu
DO $$ 
DECLARE 
    customer1_id UUID;
    customer2_id UUID;
    iphone_id UUID;
    airpods_id UUID;
    nike_id UUID;
    order1_id UUID;
    order2_id UUID;
BEGIN
    -- Lấy user IDs
    SELECT id INTO customer1_id FROM users WHERE email = 'john@example.com' LIMIT 1;
    SELECT id INTO customer2_id FROM users WHERE email = 'jane@example.com' LIMIT 1;
    
    -- Lấy product IDs
    SELECT id INTO iphone_id FROM products WHERE name = 'iPhone 15 Pro' LIMIT 1;
    SELECT id INTO airpods_id FROM products WHERE name = 'AirPods Pro' LIMIT 1;
    SELECT id INTO nike_id FROM products WHERE name = 'Nike Air Max' LIMIT 1;
    
    -- Thêm orders
    INSERT INTO orders (id, user_id, status, total_price) VALUES 
    ('650e8400-e29b-41d4-a716-446655440000', customer1_id, 'pending', 1249.98),
    ('650e8400-e29b-41d4-a716-446655440001', customer2_id, 'shipped', 379.98)
    RETURNING id INTO order1_id;
    
    -- Lấy order IDs
    SELECT id INTO order1_id FROM orders WHERE total_price = 1249.98 LIMIT 1;
    SELECT id INTO order2_id FROM orders WHERE total_price = 379.98 LIMIT 1;
    
    -- Thêm order items
    INSERT INTO order_items (order_id, product_id, qty, price) VALUES 
    (order1_id, iphone_id, 1, 999.99),
    (order1_id, airpods_id, 1, 249.99),
    (order2_id, nike_id, 1, 129.99),
    (order2_id, airpods_id, 1, 249.99)
    ON CONFLICT DO NOTHING;
END $$;

-- 6. Thêm comments mẫu
DO $$ 
DECLARE 
    customer1_id UUID;
    customer2_id UUID;
    iphone_article_id UUID;
    trends_article_id UUID;
BEGIN
    -- Lấy user IDs
    SELECT id INTO customer1_id FROM users WHERE email = 'john@example.com' LIMIT 1;
    SELECT id INTO customer2_id FROM users WHERE email = 'jane@example.com' LIMIT 1;
    
    -- Lấy article IDs
    SELECT id INTO iphone_article_id FROM articles WHERE slug = 'iphone-15-pro-review' LIMIT 1;
    SELECT id INTO trends_article_id FROM articles WHERE slug = 'top-tech-trends-2024' LIMIT 1;
    
    -- Thêm comments
    INSERT INTO comments (user_id, article_id, content) VALUES 
    (customer1_id, iphone_article_id, 'Great review! Very detailed and helpful for making a purchase decision.'),
    (customer2_id, iphone_article_id, 'I agree with the camera improvements. The photos are amazing!'),
    (customer1_id, trends_article_id, 'Interesting predictions. I especially like the part about AI integration.'),
    (customer2_id, trends_article_id, 'Thanks for sharing! Looking forward to seeing these trends develop.')
    ON CONFLICT DO NOTHING;
END $$;

-- Kiểm tra dữ liệu đã được thêm
SELECT 'Products' as table_name, count(*) as count FROM products
UNION ALL
SELECT 'Categories', count(*) FROM categories  
UNION ALL
SELECT 'Users', count(*) FROM users
UNION ALL
SELECT 'Articles', count(*) FROM articles
UNION ALL
SELECT 'Orders', count(*) FROM orders
UNION ALL
SELECT 'Order Items', count(*) FROM order_items
UNION ALL
SELECT 'Comments', count(*) FROM comments;

