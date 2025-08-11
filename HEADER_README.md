# Verdura 头部导航组件

基于 Verdura.com 原始设计实现的 Shopify 主题头部导航系统。

## 特性

### 🎨 设计特点
- **忠实还原**: 完全按照 Verdura.com 的原始设计实现
- **响应式设计**: 完美适配桌面端和移动端
- **品牌一致性**: 保持 Verdura 奢华珠宝品牌的视觉风格
- **优雅交互**: 流畅的动画和过渡效果

### ♿ 无障碍功能
- **键盘导航**: 完整的键盘访问支持
- **屏幕阅读器**: ARIA 标签和语义化 HTML
- **焦点管理**: 智能焦点切换和陷阱
- **高对比度**: 支持高对比度模式
- **减少动画**: 尊重用户的动画偏好设置

### 📱 响应式特性
- **移动优先**: 移动端菜单和桌面端菜单分离设计
- **触摸友好**: 符合移动端触摸标准的按钮尺寸
- **自适应布局**: 根据屏幕尺寸自动调整布局

## 文件结构

```
├── sections/
│   ├── header.liquid              # 主头部 section
│   └── header-group.json          # Section 组配置
├── layout/
│   └── theme.liquid               # 主题布局文件
└── assets/
    ├── base.css                   # 基础样式和工具类
    ├── component-header.css       # 头部导航样式
    ├── component-header.js        # 头部交互逻辑
    └── cart-drawer.css           # 购物车抽屉样式
```

## 组件功能

### 1. 主导航栏
- **Logo 居中**: Verdura 标志居中显示
- **菜单按钮**: 左侧汉堡菜单（移动端和桌面端）
- **购物车按钮**: 右侧购物车，显示商品数量

### 2. 移动端菜单
- **全屏覆盖**: 灰色半透明背景
- **分类导航**: "The Collection" 主入口
- **双列布局**: 
  - 左列：按分类购买（Category）
  - 右列：按系列购买（Collection）
- **页面链接**: The Story、Visit、Contact 等静态页面

### 3. 桌面端菜单
- **优化布局**: 更宽敞的桌面端专用布局
- **更大字体**: 适配桌面端的字体尺寸
- **更多空间**: 充分利用桌面端屏幕空间

### 4. 搜索功能
- **下拉搜索**: 从头部展开的搜索栏
- **即时搜索**: 集成 Shopify 搜索 API
- **键盘支持**: 回车提交搜索

### 5. 购物车抽屉
- **右侧滑出**: 从右侧滑出的购物车面板
- **深色主题**: 深灰色背景配白色文字
- **商品管理**: 显示商品、修改数量、删除商品
- **结账按钮**: 直接跳转到结账页面

## 使用方法

### 1. 在主题中添加头部

在 `layout/theme.liquid` 中添加：

```liquid
<!-- 头部导航 -->
{% sections 'header-group' %}
```

### 2. 配置导航链接

通过 Shopify 主题编辑器可以配置：

- **Logo 上传**: 上传 Verdura logo 图片
- **菜单文字**: 自定义按钮文字（支持多语言）
- **导航链接**: 添加/编辑分类和页面链接
- **搜索设置**: 配置搜索功能

### 3. 添加导航项目

支持三种类型的导航项目：

#### 分类链接 (Category Link)
```json
{
  "type": "category_link",
  "settings": {
    "title": "Rings",
    "url": "/collections/rings"
  }
}
```

#### 系列链接 (Collection Link)
```json
{
  "type": "collection_link",
  "settings": {
    "title": "Byzantine Collection",
    "url": "/collections/byzantine-collection"
  }
}
```

#### 页面链接 (Page Link)
```json
{
  "type": "page_link",
  "settings": {
    "title": "The Story",
    "url": "/pages/the-story"
  }
}
```

## 自定义配置

### CSS 自定义变量

可以通过修改 CSS 变量来调整样式：

```css
:root {
  --header-height: 80px;
  --header-bg-color: #ffffff;
  --header-text-color: #000000;
  --header-border-color: rgba(0, 0, 0, 0.1);
  --subnav-bg-color: rgba(220, 220, 220, 0.95);
  --cart-drawer-bg-color: #2c2c2c;
}
```

### JavaScript API

可以通过 JavaScript 控制头部行为：

```javascript
// 打开菜单
window.VerduraHeader.openMenu();

// 关闭菜单
window.VerduraHeader.closeMenu();

// 打开购物车
window.VerduraHeader.openCart();

// 更新购物车数量
window.VerduraHeader.updateCartCount();
```

## 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 性能优化

### 1. 资源加载
- **字体预加载**: 关键字体预先加载
- **图片优化**: Logo 使用多尺寸 srcset
- **CSS 拆分**: 组件化的 CSS 文件

### 2. JavaScript 优化
- **延迟加载**: 非关键 JavaScript 延迟加载
- **事件防抖**: 滚动和窗口调整事件防抖
- **内存管理**: 正确的事件监听器清理

### 3. 动画性能
- **硬件加速**: 使用 transform 而非 position
- **减少重绘**: 避免触发布局重新计算
- **帧率优化**: 使用 requestAnimationFrame

## 故障排除

### 常见问题

1. **菜单无法打开**
   - 检查 JavaScript 文件是否正确加载
   - 确认没有 JavaScript 错误
   - 验证按钮的 class 名称是否正确

2. **样式显示异常**
   - 确认 CSS 文件加载顺序正确
   - 检查是否有样式冲突
   - 验证 CSS 变量是否正确定义

3. **购物车数量不更新**
   - 确认购物车 API 接口可用
   - 检查网络连接
   - 验证 Shopify 权限设置

### 调试模式

开启调试模式查看详细日志：

```javascript
// 在浏览器控制台中执行
localStorage.setItem('verdura-debug', 'true');
location.reload();
```

## 维护和更新

### 定期检查
- **依赖更新**: 检查第三方库更新
- **浏览器兼容性**: 测试新版本浏览器
- **性能监控**: 监控加载时间和交互性能

### 版本控制
- 遵循语义化版本控制
- 详细的变更日志
- 向后兼容性保证

## 贡献指南

欢迎贡献代码改进这个组件：

1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 创建 Pull Request

请确保：
- 代码符合项目规范
- 包含适当的测试
- 更新相关文档

---

> 这个头部导航组件完全基于 Verdura.com 的原始设计，保持了品牌的奢华感和专业性，同时确保了现代 web 标准的无障碍性和性能要求。 