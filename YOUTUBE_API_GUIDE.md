# Hướng Dẫn Sử Dụng YouTube Data API

## Tổng Quan
Đã cập nhật VideoSection để có thể lấy tiêu đề video từ YouTube Data API, với fallback titles khi không có API key.

## Cách Hoạt Động

### ✅ **Hiện Tại (Fallback Mode)**
- Sử dụng tiêu đề fallback được định nghĩa sẵn
- Hiển thị loading state khi đang tải
- Hoạt động ngay lập tức không cần API key

### 🔮 **Với YouTube Data API (Production)**
- Lấy tiêu đề thực tế từ YouTube
- Cập nhật tự động khi video thay đổi
- Thông tin chi tiết hơn (description, duration, etc.)

## Setup YouTube Data API

### 1. **Tạo Google Cloud Project**
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Kích hoạt **YouTube Data API v3**

### 2. **Tạo API Key**
1. Vào **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy API key và thêm vào `.env.local`

### 3. **Cấu Hình Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

### 4. **Cập Nhật Code**
```typescript
// Trong YouTubeVideoFetcher.tsx
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

if (apiKey) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(',')}&key=${apiKey}`
  )
  // Process real YouTube data
} else {
  // Use fallback titles
}
```

## API Usage

### **Request Format**
```
GET https://www.googleapis.com/youtube/v3/videos
?part=snippet
&id=OHqcNAyqV2A,osD0RAxQsbE
&key=YOUR_API_KEY
```

### **Response Format**
```json
{
  "items": [
    {
      "id": "OHqcNAyqV2A",
      "snippet": {
        "title": "Real YouTube Video Title",
        "description": "Video description...",
        "thumbnails": {
          "maxres": {
            "url": "https://i.ytimg.com/vi/OHqcNAyqV2A/maxresdefault.jpg"
          }
        }
      }
    }
  ]
}
```

## Component Architecture

### **YouTubeVideoFetcher.tsx**
- Fetches video data from YouTube API
- Handles loading states
- Provides fallback data
- No UI rendering (invisible component)

### **VideoSection.tsx**
- Main video display component
- Uses YouTubeVideoFetcher for data
- Handles video modal
- Responsive design

## Features

### ✅ **Current Features**
- **Fallback Titles**: 
  - "Bẫy RUỒI VÀNG - Hướng dẫn sử dụng hiệu quả, tiết kiệm và an toàn"
  - "BẪY RUỒI VÀNG Chai Xịt - Sản phẩm diệt ruồi vàng hiệu quả 40%"
- **Loading States**: Skeleton loading
- **Error Handling**: Graceful fallbacks
- **Responsive Design**: Mobile & desktop
- **Modal Player**: Full-screen video viewing

### 🔮 **With API Key**
- **Real Titles**: Actual YouTube video titles
- **Auto Updates**: Titles update when video changes
- **Rich Metadata**: Description, duration, etc.
- **Better Thumbnails**: High-quality thumbnails

## Performance

### ✅ **Optimizations**
- **Lazy Loading**: Only fetch when needed
- **Caching**: Cache API responses
- **Fallback**: No API dependency
- **Loading States**: Smooth UX

### ⚠️ **API Limits**
- **Quota**: 10,000 units/day (free)
- **Rate Limits**: 100 requests/100 seconds
- **Cost**: Free tier available

## Security

### ✅ **Best Practices**
- **API Key**: Store in environment variables
- **CORS**: Handle cross-origin requests
- **Validation**: Validate API responses
- **Error Handling**: Graceful failures

### ⚠️ **Important Notes**
- **Public API Key**: Can be exposed in client-side code
- **Domain Restrictions**: Restrict API key to your domain
- **Usage Monitoring**: Monitor API usage

## Testing

### **Without API Key**
```bash
npm run dev
# Visit http://localhost:3000
# Should show fallback titles
```

### **With API Key**
```bash
# Add API key to .env.local
NEXT_PUBLIC_YOUTUBE_API_KEY=your_key_here

npm run dev
# Should show real YouTube titles
```

## Troubleshooting

### ❌ **Common Issues**

1. **API Key Invalid**
   - Check API key in Google Cloud Console
   - Verify YouTube Data API v3 is enabled
   - Check domain restrictions

2. **Quota Exceeded**
   - Check usage in Google Cloud Console
   - Implement caching
   - Consider upgrading quota

3. **CORS Errors**
   - API calls are server-side only
   - Use Next.js API routes if needed

4. **Video Not Found**
   - Check video IDs are correct
   - Verify videos are public
   - Handle private/deleted videos

### ✅ **Solutions**

1. **Check API Key**
   ```bash
   # Test API key
   curl "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=OHqcNAyqV2A&key=YOUR_KEY"
   ```

2. **Monitor Usage**
   - Google Cloud Console > APIs & Services > Quotas
   - Set up billing alerts

3. **Implement Caching**
   ```typescript
   // Cache API responses
   const cacheKey = `youtube-${videoIds.join(',')}`
   const cached = localStorage.getItem(cacheKey)
   if (cached) return JSON.parse(cached)
   ```

## Future Enhancements

### 🔮 **Potential Features**
1. **Video Categories**: Organize by category
2. **Playlists**: Create video playlists
3. **Search**: Search within videos
4. **Analytics**: Track video views
5. **Comments**: Display video comments
6. **Related Videos**: Show related content
7. **Live Streaming**: Support live videos
8. **Subtitles**: Display video subtitles

### 📊 **Analytics Integration**
- **Video Views**: Track video engagement
- **Click Through**: Monitor video clicks
- **User Behavior**: Analyze viewing patterns
- **Performance**: Monitor loading times

## Cost Considerations

### 💰 **Pricing**
- **Free Tier**: 10,000 units/day
- **Paid Tier**: $0.20 per 1,000 units
- **Enterprise**: Custom pricing

### 📈 **Usage Estimation**
- **1 video info**: ~1 unit
- **100 videos/day**: ~100 units
- **Monthly cost**: ~$0.60 (free tier)

## Conclusion

VideoSection hiện tại hoạt động tốt với fallback titles. Để có tiêu đề thực tế từ YouTube:

1. **Setup API Key** (optional)
2. **Add to .env.local**
3. **Restart development server**
4. **Enjoy real YouTube titles!**

Điều này giúp website luôn hiển thị tiêu đề chính xác và cập nhật tự động khi video thay đổi trên YouTube.
