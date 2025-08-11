# Hero Video Section 设置指南

## 概述

Hero Video Section 是一个全屏视频背景组件，支持桌面和移动端不同视频、文字覆盖和可点击区域功能。

## 特性

- ✅ 全屏视频背景（100vh, 70vh, 50vh 可选）
- ✅ 桌面和移动端分别配置不同视频
- ✅ 视频封面图片支持
- ✅ 备用背景图片（当视频无法播放时）
- ✅ 文字覆盖（标题、副标题、按钮）
- ✅ 整个区域可点击功能
- ✅ 响应式设计和移动端优化
- ✅ 无障碍功能支持
- ✅ 高对比度和减少动画模式支持

## 在Shopify后台配置

### 1. 添加Section到主页

1. 进入Shopify后台 → 在线商店 → 模板
2. 点击"自定义"进入主题编辑器
3. 在主页中添加"英雄视频区" section

### 2. 视频设置

**桌面端视频：**
- 格式：MP4
- 建议分辨率：1920x1080
- 建议文件大小：<10MB
- 建议码率：7.2Mbps

**移动端视频：**
- 格式：MP4
- 建议分辨率：1080x1920 (竖屏) 或 1280x720
- 建议文件大小：<5MB
- 建议码率：3.0Mbps

**视频要求：**
- 自动播放兼容：必须静音
- 循环播放：是
- 预加载：metadata

### 3. 配置选项

#### 视频设置
```
桌面端视频URL: https://your-cdn.com/desktop-video.mp4
桌面端视频封面图: 选择1920x1080的图片
移动端视频URL: https://your-cdn.com/mobile-video.mp4
移动端视频封面图: 选择合适的移动端图片
备用背景图片: 当视频无法播放时显示的图片
```

#### 内容设置
```
标题: Heritage of Style
副标题: Explore the Collection
文字颜色: #f7f7f7 (浅灰色)
```

#### 按钮设置
```
按钮文字: View Collection
按钮链接: /collections/all
```

#### 链接设置
```
启用整个区域可点击: ✅
区域点击链接: /collections/all
```

#### 布局设置
```
区域高度: 大 (100vh) - 全屏高度
```

## 示例配置

### Verdura 风格配置
```json
{
  "desktop_video": "https://cdn.example.com/verdura-hero-desktop.mp4",
  "mobile_video": "https://cdn.example.com/verdura-hero-mobile.mp4",
  "title": "Heritage of Style",
  "subtitle": "Explore the Collection",
  "text_color": "#f7f7f7",
  "button_text": "View Collection",
  "button_url": "/collections/all",
  "link_url": "/collections/all",
  "enable_full_click": true,
  "height": "large"
}
```

### 简约风格配置
```json
{
  "fallback_image": "hero-background.jpg",
  "title": "Welcome to Our Store",
  "subtitle": "Discover Amazing Products",
  "text_color": "#ffffff",
  "height": "medium"
}
```

## 技术规范

### CSS类结构
```css
.hero-video                    /* 主容器 */
├── .hero-video--small         /* 50vh 高度 */
├── .hero-video--medium        /* 70vh 高度 */
└── .hero-video--large         /* 100vh 高度 */

.hero-video__wrapper           /* 内容包装器 */
├── .hero-video__media         /* 视频元素 */
│   ├── .hero-video__media--desktop
│   └── .hero-video__media--mobile
├── .hero-video__fallback      /* 备用图片容器 */
├── .hero-video__content       /* 文字覆盖容器 */
│   └── .hero-video__content-wrapper
│       ├── .hero-video__title
│       ├── .hero-video__subtitle
│       └── .hero-video__button
└── .hero-video__link-overlay  /* 可点击区域覆盖 */
```

### 响应式断点
```css
@media screen and (max-width: 768px)  /* 平板和移动端 */
@media screen and (max-width: 480px)  /* 小屏移动端 */
```

### 无障碍特性
- 视频使用 `aria-hidden="true"`
- 可点击区域有适当的 `aria-label`
- 支持键盘导航
- 高对比度模式支持
- 减少动画模式支持

## 常见问题

### Q: 视频无法自动播放？
A: 确保视频是静音的。现代浏览器不允许有声音的视频自动播放。

### Q: 视频文件太大加载慢？
A: 
- 压缩视频文件，建议使用H.264编码
- 设置合适的码率：桌面端7.2Mbps，移动端3.0Mbps
- 使用CDN加速
- 设置封面图片作为加载时的占位

### Q: 移动端显示不正常？
A: 确保为移动端设置了单独的视频文件，移动端建议使用较小的分辨率和文件大小。

### Q: 如何优化性能？
A: 
- 使用 `preload="metadata"` 而不是 `preload="auto"`
- 设置合适的封面图片
- 压缩视频文件
- 考虑使用流媒体服务

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 下一步

配置完成后，您可以继续添加其他sections：
- Collection Slider (产品分类滑块)
- Image with Text (图文组合)
- Product Slider (产品滑块)
- Newsletter (邮件订阅) 