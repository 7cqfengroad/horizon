# Collection Slider 产品分类滑块 设置指南

## 概述

Collection Slider 是一个交互式产品分类展示组件，左侧提供垂直分类导航，右侧显示对应分类的产品网格。支持键盘导航和完整的无障碍功能。

## 特性

- ✅ 左侧垂直分类导航（桌面端）/ 水平滚动导航（移动端）
- ✅ 右侧产品网格展示（4列桌面端，2列平板，1列移动端）
- ✅ Tab界面模式的分类切换
- ✅ 产品悬停效果和缩放动画
- ✅ 价格显示（含折扣价格）
- ✅ "View Collection" 链接按钮
- ✅ 完整的键盘导航支持
- ✅ 响应式设计和移动端优化
- ✅ 无障碍功能支持（ARIA标签、屏幕阅读器友好）
- ✅ 高对比度和减少动画模式支持

## 在Shopify后台配置

### 1. 添加Section到主页

1. 进入Shopify后台 → 在线商店 → 模板
2. 点击"自定义"进入主题编辑器
3. 在主页中添加"产品分类滑块" section

### 2. 配置分类区块

每个分类作为一个独立的区块添加：

1. 点击"添加区块" → 选择"产品分类"
2. 在"选择产品分类"中选择要展示的Collection
3. 重复添加多个分类（建议3-6个）

### 3. 配置选项

#### 显示设置
```
每个分类显示产品数量: 4 (2-8可选)
显示价格: ✅ 开启
```

#### 布局设置
```
顶部内边距: 60px (0-100px)
底部内边距: 60px (0-100px)
```

## 示例配置

### Verdura 珠宝风格配置
```json
{
  "products_to_show": 4,
  "show_price": true,
  "section_padding_top": 60,
  "section_padding_bottom": 60,
  "blocks": [
    {
      "type": "collection",
      "settings": {
        "collection": "bracelets-watches"
      }
    },
    {
      "type": "collection", 
      "settings": {
        "collection": "earrings"
      }
    },
    {
      "type": "collection",
      "settings": {
        "collection": "rings"
      }
    },
    {
      "type": "collection",
      "settings": {
        "collection": "necklaces"
      }
    }
  ]
}
```

### 服装店配置
```json
{
  "products_to_show": 6,
  "show_price": true,
  "blocks": [
    {
      "type": "collection",
      "settings": {
        "collection": "womens-clothing"
      }
    },
    {
      "type": "collection",
      "settings": {
        "collection": "mens-clothing"
      }
    },
    {
      "type": "collection",
      "settings": {
        "collection": "accessories"
      }
    }
  ]
}
```

## 技术规范

### CSS类结构
```css
.collection-slider                 /* 主容器 */
├── .collection-slider__wrapper    /* 网格布局容器 */
├── .collection-slider__nav        /* 左侧导航区域 */
│   └── .collection-nav
│       └── .collection-nav__list  /* Tab列表 */
│           ├── .collection-nav__item
│           └── .collection-nav__button /* Tab按钮 */
└── .collection-slider__content    /* 右侧产品区域 */
    └── .collection-panel          /* Tab面板 */
        ├── .product-slider
        │   ├── .product-slider__track /* 产品网格 */
        │   │   └── .product-card   /* 产品卡片 */
        │   │       ├── .product-card__image
        │   │       └── .product-card__info
        │   └── .product-slider__nav /* 滑块导航（预留） */
        └── .collection-slider__footer /* 底部链接区域 */
```

### ARIA模式

该组件使用完整的Tab界面ARIA模式：

```html
<ul role="tablist" aria-orientation="vertical">
  <li role="presentation">
    <button 
      role="tab" 
      aria-selected="true"
      aria-controls="collection-panel-123"
      id="collection-tab-123"
    >
      Bracelets
    </button>
  </li>
</ul>

<div 
  role="tabpanel"
  aria-labelledby="collection-tab-123" 
  id="collection-panel-123"
>
  <!-- 产品内容 -->
</div>
```

### 键盘交互

- **Tab**: 进入/离开导航区域
- **Arrow Keys**: 在分类之间导航
- **Home**: 跳到第一个分类
- **End**: 跳到最后一个分类
- **Enter/Space**: 激活选中的分类

### 响应式断点

```css
@media screen and (max-width: 768px)  /* 平板：导航变横向，产品2列 */
@media screen and (max-width: 480px)  /* 移动端：产品1列 */
```

## 产品卡片特性

### 悬停效果
- 卡片向上移动4px
- 图片缩放1.05倍
- 添加阴影效果

### 价格显示
- 支持折扣价格显示
- 包含屏幕阅读器友好的价格标签
- 划线价格和当前价格区分

### 占位图片
- 当产品没有图片时显示几何图案背景
- 保持1:1宽高比

## 最佳实践

### Collection设置
1. **产品数量**: 每个Collection至少有4个产品以获得最佳展示效果
2. **图片质量**: 产品图片建议400x400px以上，保持正方形比例
3. **分类命名**: 使用简洁清晰的分类名称，避免过长文字

### 性能优化
1. **图片懒加载**: 所有产品图片使用`loading="lazy"`
2. **适当的产品数量**: 建议每个分类显示4-6个产品
3. **Collection限制**: 建议添加3-6个分类以保持导航清晰

### 无障碍考虑
1. **键盘导航**: 确保所有功能都可以通过键盘访问
2. **屏幕阅读器**: 产品标题和价格都有适当的标签
3. **颜色对比**: 所有文字和背景都满足WCAG对比度要求

## 常见问题

### Q: 分类导航在移动端显示不全？
A: 移动端导航会自动变为横向滚动，用户可以左右滑动查看所有分类。

### Q: 产品图片显示不正确？
A: 确保产品图片是正方形比例，组件会自动裁剪为1:1显示。

### Q: 如何调整显示的产品数量？
A: 在Section设置中调整"每个分类显示产品数量"滑块，范围2-8个。

### Q: 可以隐藏价格吗？
A: 可以，在Section设置中关闭"显示价格"选项。

### Q: 如何修改背景颜色？
A: 目前背景色固定为`#f8f8f8`，如需修改请编辑CSS文件中的`.collection-slider`类。

## 扩展功能

### 未来可添加的功能
- 产品滑块导航（当产品数量超过显示数量时）
- 自定义背景颜色设置
- 产品悬停时显示快速查看按钮
- 自定义分类图标

### 技术扩展
- 添加产品筛选功能
- 集成搜索功能
- 添加产品收藏功能
- 支持产品变体选择

## 兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 下一步

配置完成后，您可以继续添加其他sections：
- Image with Text (图文组合)
- Hero Banner (图片横幅)
- Product Slider (产品滑块)
- Newsletter (邮件订阅) 