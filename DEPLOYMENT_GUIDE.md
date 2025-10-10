# 🚀 HƯỚNG DẪN DEPLOYMENT PRODUCTION

## 📋 **Yêu cầu hệ thống**

### **1. Database (Supabase)**
- Tạo project Supabase mới
- Chạy SQL script để tạo bảng:

```sql
-- Tạo bảng orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'WAITING_CONFIRMATION' CHECK (status IN ('WAITING_CONFIRMATION', 'CONFIRMED', 'CANCELLED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_by VARCHAR(100),
  verified_at TIMESTAMP WITH TIME ZONE,
  note TEXT
);

-- Tạo bảng order_items
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  variant_id VARCHAR(100),
  variant_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Tạo trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### **2. Environment Variables**
Tạo file `.env.local` với nội dung:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **3. Dependencies**
```bash
npm install
```

## 🚀 **Deployment Steps**

### **Option 1: Vercel (Recommended)**

1. **Connect Repository:**
   - Push code lên GitHub/GitLab
   - Connect repository với Vercel

2. **Environment Variables:**
   - Thêm `NEXT_PUBLIC_SUPABASE_URL`
   - Thêm `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy:**
   - Vercel sẽ tự động build và deploy

### **Option 2: Manual Deployment**

1. **Build:**
   ```bash
   npm run build
   ```

2. **Start:**
   ```bash
   npm start
   ```

### **Option 3: Docker**

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json package-lock.json* ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   ENV NEXT_TELEMETRY_DISABLED 1
   
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   
   # Set the correct permission for prerender cache
   RUN mkdir .next
   RUN chown nextjs:nodejs .next
   
   # Automatically leverage output traces to reduce image size
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build & Run:**
   ```bash
   docker build -t mimo-agri-app .
   docker run -p 3000:3000 mimo-agri-app
   ```

## 🔧 **Post-Deployment Setup**

### **1. Database Setup**
- Chạy SQL script tạo bảng (xem phần trên)
- Thêm dữ liệu sản phẩm và danh mục

### **2. Supabase Configuration**
- Cấu hình Row Level Security (RLS) nếu cần
- Thiết lập Storage buckets cho hình ảnh

### **3. Domain & SSL**
- Cấu hình custom domain
- SSL certificate tự động với Vercel

## 📊 **Monitoring & Analytics**

### **1. Vercel Analytics**
- Enable trong Vercel Dashboard
- Theo dõi performance và usage

### **2. Error Tracking**
- Sentry integration (optional)
- Vercel Error Monitoring

## 🔒 **Security Checklist**

- ✅ Environment variables được bảo mật
- ✅ Supabase RLS được cấu hình
- ✅ HTTPS được enable
- ✅ CORS được cấu hình đúng
- ✅ Input validation được implement

## 📱 **Performance Optimization**

### **1. Next.js Optimizations**
- Image optimization tự động
- Code splitting tự động
- Static generation cho static pages

### **2. Database Optimization**
- Indexes đã được tạo
- Query optimization
- Connection pooling

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Database Connection Error:**
   - Kiểm tra SUPABASE_URL và SUPABASE_ANON_KEY
   - Kiểm tra network connectivity

2. **Build Errors:**
   - Kiểm tra Node.js version (>= 18)
   - Clear node_modules và reinstall

3. **Runtime Errors:**
   - Kiểm tra browser console
   - Kiểm tra Vercel function logs

## 📞 **Support**

- **Documentation:** README.md
- **Issues:** GitHub Issues
- **Contact:** mimoagriculture@gmail.com

---

*Cập nhật lần cuối: $(date)*
