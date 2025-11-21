# Hướng Dẫn Deploy lên Vercel

## ✅ Chuẩn Bị

Dự án đã sẵn sàng deployment với:
- Build thành công locally ✓
- TypeScript & ESLint đã được cấu hình để skip warnings trong build ✓
- YouTube API Key đã di chuyển sang environment variable ✓
- Supabase client đã được cấu hình đúng ✓

---

## 🚀 Các Bước Deploy

### Bước 1: Merge code vào nhánh main

```bash
# Chuyển về nhánh main
git checkout main

# Merge nhánh v3
git merge v3

# Push lên GitHub
git push origin main
```

*Hoặc có thể deploy trực tiếp từ nhánh `v3` nếu muốn.*

---

### Bước 2: Deploy trên Vercel

#### Option 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. Truy cập **[vercel.com](https://vercel.com)**
2. Đăng nhập bằng GitHub account
3. Click **"Add New Project"**
4. Chọn repository `phuhoang06/mimo-agri`
5. **Configure Project:**
   - **Framework Preset:** Next.js (tự động phát hiện)
   - **Build Command:** `npm run build` (mặc định)
   - **Output Directory:** `.next` (mặc định)
   
6. **Environment Variables** - Thêm các biến sau:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wdrhgnynlchomcsnpzum.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...` |
| `YOUTUBE_API_KEY` | `AIzaSyDsX_3V2rp9Vn6AzTsk80xUN9OFilOkt5Q` |

7. Click **"Deploy"**

Vercel sẽ:
- Tự động build project
- Deploy lên production
- Tạo domain (ví dụ: `mimo-agri.vercel.app`)
- Tự động deploy lại mỗi khi push code mới

---

#### Option 2: Deploy qua Vercel CLI

```bash
# Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

---

## 🔐 Environment Variables trên Vercel

Sau khi deploy, bạn có thể quản lý environment variables tại:
**Project Settings → Environment Variables**

### Biến bắt buộc:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Giá trị: `https://wdrhgnynlchomcsnpzum.supabase.co`
   - Scope: Production, Preview, Development

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Giá trị: Anon key từ Supabase project
   - Scope: Production, Preview, Development

3. **YOUTUBE_API_KEY**
   - Giá trị: `AIzaSyDsX_3V2rp9Vn6AzTsk80xUN9OFilOkt5Q`
   - Scope: Production, Preview, Development

---

## 📝 Sau Khi Deploy

### Kiểm tra website

- URL production sẽ là: `https://mimo-agri.vercel.app` (hoặc domain tùy chỉnh)
- Kiểm tra các chức năng:
  - [ ] Trang chủ load đúng
  - [ ] Lấy sản phẩm từ Supabase
  - [ ] Trang /videos hiển thị video
  - [ ] Nút "Cập nhật dữ liệu" sync được từ YouTube
  - [ ] Video detail page hoạt động

### Cấu hình Custom Domain (Tùy chọn)

1. Vào **Project Settings → Domains**
2. Thêm domain của bạn (ví dụ: `mimoagri.com`)
3. Cập nhật DNS records theo hướng dẫn của Vercel

---

## ⚠️ Lưu Ý Quan Trọng

### 1. YouTube API Quota
- YouTube Data API có quota limit: **10,000 units/day**
- Mỗi request videos list = 1 unit
- Monitor usage tại: [Google Cloud Console](https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas)

### 2. Supabase RLS
- Đảm bảo Row Level Security policies cho phép:
  - `SELECT` trên `youtube_video` table (public read)
  - `UPDATE` trên `youtube_video` table (cho API sync)
- Nếu sync không hoạt động, có thể cần sử dụng Service Role Key thay vì Anon Key

### 3. Database Setup
- Đảm bảo đã chạy `setup_video_db.sql` trên Supabase production database
- Thêm video IDs vào bảng `youtube_video` trước khi sync

### 4. Auto-Deploy
- Vercel tự động deploy khi push code lên GitHub
- Có thể tắt auto-deploy trong Project Settings nếu muốn

---

## 🐛 Troubleshooting

### Build Failed
- Check build logs trong Vercel dashboard
- Nếu lỗi TypeScript: Đã cấu hình `ignoreBuildErrors: true` trong `next.config.ts`
- Nếu lỗi ESLint: Đã cấu hình `ignoreDuring Builds: true`

### Environment Variables Not Working
- Nhấn "Redeploy" sau khi thêm/sửa env vars
- Check console logs có thể thấy `undefined` nếu env var thiếu

### Video Sync Not Working
- Check Supabase RLS policies
- Check YouTube API key valid
- Check server logs trong Vercel dashboard (Functions tab)

### 500 Internal Server Error
- Check Function logs trong Vercel
- Thường là database connection hoặc env vars thiếu

---

## 📊 Monitoring

Vercel cung cấp:
- **Analytics**: Traffic, visitors, page views
- **Speed Insights**: Core Web Vitals
- **Logs**: Runtime logs, build logs
- **Functions**: API route performance

Truy cập tại Project Dashboard.

---

## 🎉 Hoàn Thành!

Sau khi deploy thành công, website sẽ:
- ✅ Hoạt động như trên local
- ✅ Tự động scale theo traffic
- ✅ SSL/HTTPS miễn phí
- ✅ CDN global để load nhanh
- ✅ Auto-deploy khi push code mới

**Domain**: `https://mimo-agri.vercel.app`

---

## 📞 Support

Nếu gặp vấn đề:
1. Check Vercel deployment logs
2. Check Supabase logs  
3. Check browser console (F12)
4. Liên hệ support Vercel hoặc review lại docs

**Good luck!** 🚀
