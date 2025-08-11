# Image with Text 图文组合 设置指南

## 概述

Image with Text 是一个灵活的图文组合组件，支持三种布局模式：两侧图片+中间文字、图片在左+文字在右、文字在左+图片在右。非常适合用于Zodiac Section（星座系列）、Very Verdura等品牌展示场景。

## 特性

- ✅ 三种布局模式（两侧图片+中间文字、左右标准布局）
- ✅ 自定义背景颜色
- ✅ 响应式设计（移动端自动垂直排列）
- ✅ 图片悬停效果（轻微缩放）
- ✅ 富文本描述支持
- ✅ 可选按钮链接
- ✅ 完整的无障碍功能支持
- ✅ 高对比度和减少动画模式支持
- ✅ 图片占位符（当未选择图片时）

## 布局模式

### 1. 两侧图片 + 中间文字
**最适合场景**: Zodiac Section、Very Verdura Section
- 左右两侧各一张产品图片
- 中间居中显示文字内容
- 比例：1:2:1（左图:文字:右图）

### 2. 图片在左，文字在右
**最适合场景**: 产品介绍、品牌故事
- 标准的左右对称布局
- 比例：1:1

### 3. 文字在左，图片在右  
**最适合场景**: Visit Gallery Section、Heritage Section
- 文字内容在左侧
- 图片在右侧
- 比例：1:1

## 在Shopify后台配置

### 1. 添加Section到主页

1. 进入Shopify后台 → 在线商店 → 模板
2. 点击"自定义"进入主题编辑器
3. 在主页中添加"图文组合" section

### 2. 配置选项

#### 布局设置
```
布局样式: 两侧图片 + 中间文字
背景颜色: #f7f7f7 (浅灰色)
```

#### 两侧图片设置（仅在两侧图片布局中使用）
```
左侧图片: 选择产品图片
左侧图片描述: "Zodiac Pendant Capricorn"
右侧图片: 选择产品图片  
右侧图片描述: "Zodiac Pendant Pisces"
```

#### 标准图片设置（在左右布局中使用）
```
图片: 选择单张图片
图片描述: 图片的描述文字
```

#### 文字内容
```
标题: Zodiac
副标题: Pendant Necklaces
描述文字: 富文本编辑器，支持段落、粗体、斜体等格式
```

#### 按钮设置
```
按钮文字: View Collection
按钮链接: /collections/zodiac-pendant-necklaces
```

#### 间距设置
```
顶部内边距: 60px (0-100px)
底部内边距: 60px (0-100px)
```

## 示例配置

### Zodiac Section 配置
```json
{
  "layout": "two_images_center_text",
  "background_color": "#f7f7f7",
  "image_left": "zodiac-capricorn.jpg",
  "image_left_alt": "Zodiac Pendant Capricorn",
  "image_right": "zodiac-pisces.jpg", 
  "image_right_alt": "Zodiac Pendant Pisces",
  "title": "Zodiac",
  "subtitle": "Pendant Necklaces",
  "description": "<p>Using archival postcards Fulco di Verdura purchased at the Museum of Natural History, Verdura sets diamonds as stars and engraves constellations in gold</p>",
  "button_text": "View Collection",
  "button_url": "/collections/zodiac-pendant-necklaces"
}
```

### Very Verdura Section 配置
```json
{
  "layout": "two_images_center_text",
  "background_color": "#f7f7f7",
  "image_left": "three-stone-ring.jpg",
  "image_left_alt": "Three Stone Ring",
  "image_right": "very-verdura-collection.jpg",
  "image_right_alt": "Very Verdura Collection", 
  "title": "Very Verdura",
  "subtitle": "Gifts Under $20,000",
  "description": "<p>A collection of pieces perfect for gifting and receiving</p>",
  "button_text": "Shop",
  "button_url": "/collections/very-verdura-gifts-under-15-000"
}
```

### Heritage Section 配置
```json
{
  "layout": "image_left",
  "background_color": "#ffffff",
  "image": "heritage-fulco.jpg",
  "image_alt": "Fulco di Verdura Historical Photo",
  "title": "Heritage",
  "subtitle": "About Fulco Di Verdura", 
  "description": "<p>Born into Sicilian aristocracy in 1898, Verdura's founder, Duke Fulco di Verdura, began his extraordinary career in Paris as a designer for Coco Chanel...</p>",
  "button_text": "Discover our Heritage",
  "button_url": "/pages/the-story"
}
```

### Visit Gallery Section 配置
```json
{
  "layout": "image_right",
  "background_color": "#f8f8f8", 
  "image": "gallery-interior.jpg",
  "image_alt": "Verdura Gallery Interior",
  "title": "Visit",
  "subtitle": "The Gallery",
  "description": "<p>The Verdura gallery is open 10 AM – 5 PM, Monday – Friday. Arrange your visit below</p>",
  "button_text": "Arrange Visit",
  "button_url": "/pages/contact"
}
```

## 技术规范

### CSS类结构
```css
.image-with-text                           /* 主容器 */
├── .image-with-text--two_images_center_text /* 两侧图片布局 */
├── .image-with-text--image_left           /* 图片在左布局 */
├── .image-with-text--image_right          /* 图片在右布局 */
└── .image-with-text__wrapper              /* 内容包装器 */
    ├── .image-with-text__image            /* 图片容器 */
    │   ├── .image-with-text__image--left  /* 左侧图片 */
    │   ├── .image-with-text__image--right /* 右侧图片 */
    │   ├── .image-with-text__image--standard /* 标准图片 */
    │   ├── .image-with-text__img          /* 图片元素 */
    │   └── .image-with-text__placeholder  /* 占位符 */
    └── .image-with-text__content          /* 文字内容容器 */
        └── .image-with-text__content-wrapper
            ├── .image-with-text__title    /* 标题 */
            ├── .image-with-text__subtitle /* 副标题 */
            ├── .image-with-text__description /* 描述 */
            └── .image-with-text__button   /* 按钮 */
```

### 响应式断点
```css
@media screen and (max-width: 768px)  /* 平板：布局变垂直 */
@media screen and (max-width: 480px)  /* 移动端：字体和间距调整 */
```

### Grid布局
- **两侧图片布局**: `grid-template-columns: 1fr 2fr 1fr`
- **左右标准布局**: `grid-template-columns: 1fr 1fr`
- **移动端**: 所有布局都变为 `grid-template-columns: 1fr`

## 设计特点

### 文字样式
- **标题**: 2.5rem, 字重300, 字间距0.02em
- **副标题**: 1.2rem, 字重400, 斜体, 颜色#666
- **描述**: 1rem, 行高1.6, 颜色#555
- **按钮**: 使用 `.btn--secondary` 样式

### 图片效果
- **悬停缩放**: `transform: scale(1.02)`
- **圆角**: `border-radius: 8px`
- **占位符**: 几何图案背景，4:5宽高比
- **懒加载**: 所有图片使用 `loading="lazy"`

### 背景色选项
- **Zodiac/Very Verdura**: `#f7f7f7` (浅灰色)
- **Heritage**: `#ffffff` (白色)
- **Visit Gallery**: `#f8f8f8` (更浅的灰色)

## 无障碍功能

### ARIA支持
- 图片占位符包含 `visually-hidden` 描述文字
- 图片使用适当的 `alt` 属性
- 富文本内容保持语义结构

### 键盘导航
- 按钮可通过Tab键访问
- 焦点指示器清晰可见
- 符合WCAG 2.2标准

### 高对比度模式
- 文字颜色增强为纯黑色
- 图片添加黑色边框
- 提高视觉辨识度

## 最佳实践

### 图片建议
1. **两侧图片**: 建议使用相同尺寸，600x750px或类似比例
2. **标准图片**: 建议800x600px或16:10比例
3. **文件格式**: JPEG用于照片，PNG用于图标
4. **文件大小**: 单张图片不超过500KB

### 内容建议
1. **标题**: 简洁有力，2-3个词最佳
2. **副标题**: 补充说明，避免重复标题
3. **描述**: 控制在2-3段以内，每段50-100字
4. **按钮文字**: 明确的行动指令，如"View Collection"

### 布局选择
1. **两侧图片**: 适合产品展示，需要对称的视觉效果
2. **图片在左**: 适合产品介绍，图片为主要内容
3. **图片在右**: 适合品牌故事，文字为主要内容

## 常见问题

### Q: 如何选择合适的布局？
A: 
- 产品展示选择"两侧图片 + 中间文字"
- 品牌故事选择"文字在左，图片在右"
- 产品介绍选择"图片在左，文字在右"

### Q: 移动端布局如何显示？
A: 所有布局在移动端都会自动变为垂直排列：图片-文字-图片 或 图片-文字。

### Q: 如何调整背景颜色？
A: 在Section设置的"背景颜色"中选择或输入十六进制颜色代码。

### Q: 图片显示不正确怎么办？
A: 确保图片比例合适，建议使用4:5或3:4的产品图片比例。

### Q: 如何添加多段文字？
A: 在"描述文字"的富文本编辑器中，使用段落功能添加多段内容。

## 扩展可能

### 未来可添加的功能
- 图片点击放大功能
- 多图片轮播（用于产品多角度展示）
- 自定义文字颜色设置
- 视频支持（替代静态图片）
- 图片动画效果选项

### 技术扩展
- 支持WebP格式图片
- 添加图片SEO优化
- 集成产品快速预览
- 支持3D图片展示

## 兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+ 
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 下一步

配置完成后，您可以继续添加其他sections：
- Three Square Layout (三格布局) - 用于Off-Season Collection
- Product Slider (产品滑块) - 用于New Arrivals  
- Newsletter (邮件订阅) - 用于邮件收集
- Instagram Feed (Instagram展示) - 用于社交媒体集成 