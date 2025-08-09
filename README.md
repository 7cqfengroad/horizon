# Verdura Shopify 主题

基于 Verdura.com 网站设计的 Shopify 主题实现。

## 项目概述

这是一个根据 Verdura 珠宝网站（https://verdura.com）的设计和功能需求，从零开始构建的 Shopify 主题。该主题复现了原网站的主要设计元素、布局结构和用户体验。

## 已实现的功能

### 🏗️ 基础架构
- ✅ 主题布局文件 (`layout/theme.liquid`)
- ✅ 基础CSS样式系统 (`assets/base.css`, `assets/verdura.css`)
- ✅ 全局JavaScript功能 (`assets/global.js`)
- ✅ 主题设置配置 (`config/settings_schema.json`)
- ✅ 多语言支持 (`locales/en.default.json`)

### 📱 核心组件
- ✅ **Header导航** (`sections/header.liquid`)
  - 响应式导航菜单
  - 购物车图标和计数
  - 搜索功能
  - 移动端汉堡菜单

- ✅ **Hero视频区** (`sections/hero-video.liquid`)
  - 全屏视频背景
  - 文字覆盖层
  - 桌面/移动端不同视频支持

- ✅ **产品分类滑块** (`sections/collection-slider.liquid`)
  - 左侧分类导航
  - 右侧产品展示滑块
  - 支持多个collection展示

- ✅ **图文组合** (`sections/image-with-text.liquid`)
  - 灵活的图文布局
  - 支持双图片展示
  - 用于Zodiac、Very Verdura等区域

### 🛍️ 产品展示
- ✅ **产品卡片** (`snippets/card-product.liquid`)
  - 产品图片展示
  - 价格信息
  - 悬停效果
  - 快速添加购物车功能

- ✅ **价格显示** (`snippets/price.liquid`)
  - 常规价格和促销价格
  - 货币格式化
  - 促销标识

### 🔧 工具组件
- ✅ **图标系统** 
  - 购物车图标 (`snippets/icon-cart.liquid`)
  - 箭头图标 (`snippets/icon-caret.liquid`)
- ✅ **Meta标签** (`snippets/meta-tags.liquid`)
- ✅ **购物车通知** (`snippets/cart-notification.liquid`)

### 📄 模板
- ✅ **首页模板** (`templates/index.json`)
  - 配置了所有主要sections
  - 按Verdura网站结构排列

## 技术特性

### 🎨 设计系统
- **CSS变量系统**: 统一的颜色、间距、字体管理
- **响应式设计**: 适配桌面、平板、移动端
- **Flexbox/Grid布局**: 现代CSS布局技术
- **色彩方案**: 支持多种配色方案切换

### ⚡ 性能优化
- **图片优化**: 响应式图片加载
- **延迟加载**: 图片和视频懒加载
- **CSS压缩**: 优化样式文件大小
- **JavaScript模块化**: 组件化JS架构

### ♿ 无障碍访问
- **语义化HTML**: 正确的HTML结构
- **ARIA标签**: 屏幕阅读器支持
- **键盘导航**: 完整的键盘操作支持
- **焦点管理**: 清晰的焦点指示

### 🔧 Shopify集成
- **Liquid模板**: 完整的Shopify Liquid支持
- **动态sections**: 可在主题编辑器中配置
- **产品变体**: 支持产品选项和变体
- **购物车功能**: 完整的购物车集成

## 文件结构

```
horizon/
├── layout/
│   └── theme.liquid           # 主布局文件
├── sections/
│   ├── header.liquid         # 头部导航
│   ├── hero-video.liquid     # 英雄视频区
│   ├── collection-slider.liquid  # 产品分类滑块
│   └── image-with-text.liquid    # 图文组合
├── snippets/
│   ├── card-product.liquid   # 产品卡片
│   ├── price.liquid         # 价格组件
│   ├── meta-tags.liquid     # SEO标签
│   └── icon-*.liquid        # 图标组件
├── assets/
│   ├── base.css            # 基础样式
│   ├── verdura.css         # 主题样式
│   └── global.js           # 全局脚本
├── templates/
│   └── index.json          # 首页模板
├── config/
│   └── settings_schema.json # 主题设置
└── locales/
    └── en.default.json     # 英语翻译
```

## 部署到Shopify

### 1. 准备工作
确保你有：
- Shopify商店管理员权限
- Shopify CLI工具（可选，推荐）

### 2. 上传主题

#### 方式一：通过Shopify管理后台
1. 将所有文件打包为ZIP文件
2. 登录Shopify管理后台
3. 进入 "在线商店" > "主题"
4. 点击 "上传主题"
5. 选择ZIP文件上传

#### 方式二：通过Shopify CLI（推荐）
```bash
# 安装Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 登录Shopify
shopify auth login

# 推送主题到商店
shopify theme push
```

### 3. 配置主题
1. 在主题列表中找到上传的主题
2. 点击 "自定义" 进入主题编辑器
3. 配置各section的内容和设置
4. 上传产品图片和视频
5. 设置导航菜单
6. 发布主题

### 4. 内容配置

#### 必需设置：
- **Logo**: 在主题设置中上传品牌Logo
- **导航菜单**: 创建主导航菜单
- **产品集合**: 创建对应的product collections
- **产品**: 添加产品和产品图片
- **页面**: 创建必要的页面（联系我们、关于我们等）

#### 推荐设置：
- **颜色配色**: 调整为Verdura品牌色
- **字体**: 选择合适的品牌字体
- **社交媒体**: 配置社交媒体链接
- **SEO设置**: 配置元标题和描述

## 后续开发计划

### ✅ 新增完成功能
- ✅ **新品展示滑块** (`sections/product-slider.liquid`)
- ✅ **Newsletter订阅** (`sections/newsletter.liquid`)
- ✅ **Instagram展示** (`sections/instagram-feed.liquid`)
- ✅ **Footer页脚** (`sections/footer.liquid`)
- ✅ **三格布局** (`sections/three-square-layout.liquid`) - 用于Off-Season Collection

**新增组件和功能：**
- ✅ **社交媒体图标** (Facebook, Instagram, YouTube icons)
- ✅ **成功图标** (Newsletter成功状态显示)
- ✅ **表单验证** (Newsletter表单前端验证)
- ✅ **产品滑块交互** (自动播放、导航、响应式)
- ✅ **主题JavaScript** (`assets/verdura.js` - 工具函数和初始化)
- ✅ **翻译支持** (Footer、Newsletter、Slider相关翻译键)
- ✅ **首页模板更新** (包含所有新sections的配置)

### 🎯 功能增强
- 产品搜索和筛选
- 用户账户页面
- 购物车页面优化
- 产品详情页
- 集合页面模板
- 博客模板

### 📱 移动端优化
- 移动端导航优化
- 触摸手势支持
- 移动端视频优化
- 性能进一步优化

## 技术支持

如需技术支持或有问题咨询，请查看：
- [Shopify主题开发文档](https://shopify.dev/themes)
- [Liquid模板语言文档](https://shopify.github.io/liquid/)
- 项目Issues页面

## 版本信息

- **版本**: 1.0.0
- **创建日期**: 2024年
- **Shopify兼容性**: Shopify 2.0主题
- **浏览器支持**: 现代浏览器 (Chrome, Firefox, Safari, Edge)

---

基于 Verdura 网站分析文档构建，保持了原网站的设计精髓和用户体验。
