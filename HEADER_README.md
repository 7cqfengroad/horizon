# Verdura Header Implementation

## 概述
本项目实现了Verdura珠宝网站的header部分，包括导航、logo、购物车和搜索功能。

## 文件结构

```
├── sections/
│   ├── header.liquid          # 主header section
│   ├── announcement-bar.liquid # 公告栏section
│   └── header-group.json      # Header section group配置
├── assets/
│   ├── component-header.css   # Header样式文件
│   ├── component-header.js    # Header JavaScript功能
│   └── base.css              # 基础样式文件
├── layout/
│   └── theme.liquid          # 主题布局文件
└── templates/
    └── index.liquid          # 首页模板（测试用）
```

## 功能特性

### 1. 响应式导航
- **桌面端**: 三栏布局（Menu, Logo, Cart）
- **移动端**: 汉堡菜单 + 侧边栏导航
- **固定定位**: 页面滚动时header变为粘性

### 2. 导航菜单
- **产品分类**: Bracelets, Earclips, Cuffs, Rings, Necklaces等
- **品牌页面**: The Story, Visit, Contact等
- **移动端优化**: 全屏菜单体验

### 3. 购物车抽屉
- **侧边栏形式**: 从右侧滑出
- **实时更新**: 显示商品数量和总价
- **AJAX支持**: 无刷新添加/移除商品

### 4. 搜索功能
- **下拉搜索**: 点击展开搜索框
- **预测搜索**: 支持Shopify预测搜索API
- **键盘导航**: 完整的无障碍支持

### 5. 无障碍性
- **ARIA标签**: 完整的屏幕阅读器支持
- **键盘导航**: Tab键循环和焦点管理
- **高对比度**: 符合WCAG标准

## CSS特性

### 自定义属性
```css
:root {
  --font-body-family: 'Montserrat', sans-serif;
  --font-heading-family: 'Playfair Display', serif;
  --color-base-text: #000000;
  --color-base-background-1: #ffffff;
  --color-base-background-2: #f7f7f7;
  --color-base-accent-1: #934c4c;
  --color-base-accent-2: #262626;
}
```

### 响应式断点
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 动画效果
- **滑动动画**: `transform: translateX()` 用于菜单和购物车
- **淡入效果**: `opacity` 和 `visibility` 过渡
- **性能优化**: 使用 `transform` 避免重排

## JavaScript功能

### 核心类
```javascript
class HeaderComponent {
  // 菜单控制
  toggleMenu()
  openMenu()
  closeMenu()
  
  // 购物车控制
  toggleCart()
  openCart()
  closeCart()
  
  // 搜索控制
  toggleSearch()
  openSearch()
  closeSearch()
  
  // 工具函数
  updateCartCount()
  refreshCart()
  setupStickyHeader()
}
```

### 公共API
```javascript
// 全局访问接口
window.HeaderUtils = {
  openCart(),
  closeCart(),
  refreshCart(),
  openMenu(),
  closeMenu()
}
```

## Shopify集成

### Liquid模板变量
- `shop.name` - 商店名称
- `cart.item_count` - 购物车商品数量
- `routes.cart_url` - 购物车页面URL
- `routes.search_url` - 搜索页面URL

### Section设置
```json
{
  "logo": "image_picker",
  "logo_width": "range",
  "enable_search": "checkbox",
  "enable_sticky_header": "checkbox"
}
```

### 菜单配置
- 创建名为 `main-menu` 的导航菜单
- 支持多级菜单结构
- 自动读取collections数据

## 部署说明

### 1. 文件上传
将所有文件上传到对应的Shopify主题目录：
- `sections/` → sections文件夹
- `assets/` → assets文件夹
- `layout/` → layout文件夹
- `templates/` → templates文件夹

### 2. 菜单设置
1. 在Shopify后台 → 在线商店 → 导航
2. 创建名为 `main-menu` 的主菜单
3. 添加产品分类和页面链接

### 3. 主题设置
1. 上传logo图片
2. 设置logo宽度
3. 启用搜索功能
4. 配置公告栏文字

### 4. 测试项目
- 桌面端和移动端响应式
- 菜单开关功能
- 购物车添加/移除
- 搜索功能
- 滚动粘性效果

## 浏览器支持
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能优化
- CSS和JS文件懒加载
- 图片响应式加载
- 最小化重排和重绘
- 事件防抖处理

## 下一步开发
1. 实现hero video section
2. 添加产品分类滑块
3. 创建购物车详细功能
4. 集成预测搜索
5. 添加动画效果

## 联系方式
如有问题请参考Shopify主题开发文档或联系开发团队。 