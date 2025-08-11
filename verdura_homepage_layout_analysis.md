# Verdura.com 首页布局详细分析

## 整体页面结构

Verdura首页采用经典的从上到下流式布局，主要分为以下部分：

### 1. 页头区域 (Header Section)
- **位置**：页面顶部固定定位
- **布局**：水平三栏布局
  - **左侧**：汉堡菜单按钮 ("Menu")
  - **中间**：Verdura品牌Logo（可点击返回首页）
  - **右侧**：购物车按钮，显示商品数量 ("Cart (0)")
- **特点**：
  - 背景透明，悬浮在其他内容之上
  - 移动端友好的响应式设计
  - 包含隐藏的导航菜单和搜索功能

### 2. 主要内容区域 (Main Content)

#### 2.1 英雄视频区 (Hero Full Screen Section)
- **HTML ID**: `HeroFullScreen-template--15323282800742__hero_full_screen`
- **布局特点**：
  - 全屏视频背景（自动播放、循环、静音）
  - 桌面和移动端使用不同的视频文件
  - 视频上方覆盖文字："Heritage of Style" + "Explore the Collection"
  - 整个区域可点击，链接到产品集合页面

#### 2.2 产品分类选择器滑块 (Collection Selector Slider)
- **HTML ID**: `CollectionSelectorSlider-template--15323282800742__collection_selector_slider`
- **布局结构**：
  - **左侧导航栏**：垂直排列的产品分类
    - Bracelets（手镯）
    - Earclips（耳夹）
    - Cuffs（袖扣）
    - Rings（戒指）
    - Necklaces（项链）
  - **右侧产品展示区**：
    - 对应分类的产品轮播滑块
    - 每个产品图片带有悬停效果，显示产品名称
    - 底部"View Collection"链接按钮
- **交互功能**：
  - 点击左侧分类切换右侧产品展示
  - 使用Swiper.js实现滑块功能
  - 左右导航箭头控制产品滑动

#### 2.3 星座系列横幅 (Zodiac Double Image Banner)
- **HTML ID**: `DoubleImageBanner-template--15323282800742__double_image_banner`
- **布局**：水平两栏布局
  - **左侧**：两张星座吊坠产品图片垂直排列
  - **右侧**：文字内容区域
    - 标题："Zodiac"
    - 副标题："Pendant Necklaces"
    - 描述文字
    - "View Collection"按钮
- **样式特点**：
  - 背景色：`#f7f7f7`（浅灰色）
  - 文字动画效果（逐字符淡入）

#### 2.4 淡季系列三格布局 (Off-Season Collection Three Square Layout)
- **HTML ID**: `ThreeSquareLayout-template--15323282800742__three_square_layout`
- **布局结构**：
  - **左侧大格**：
    - 视频/图片媒体内容
    - 下方文字说明和"View"按钮
  - **右侧两个小格**：
    - 垂直排列的两张正方形图片
- **设计元素**：
  - 自定义形状颜色：`--shape-color: #934c4c`（深红棕色）
  - 动画效果：滚动触发的淡入动画

#### 2.5 Very Verdura特惠系列横幅 (Very Verdura Double Image Banner)
- **HTML ID**: `DoubleImageBanner-template--15323282800742__double_image_banner_2`
- **布局**：复用Zodiac区域的设计模式
  - **左侧**：两张产品图片
  - **右侧**：文字内容
    - 标题："Very Verdura"
    - 副标题："Gifts Under $20,000"
    - "Shop"按钮
- **背景色**：`#f7f7f7`（与Zodiac区域相同）

#### 2.6 参观画廊区域 (Visit Gallery Image with Text)
- **HTML ID**: `ImageWithText-template--15323282800742__image_with_text`
- **布局**：水平两栏布局（反向排列）
  - **左侧**：文字内容
    - 标题："Visit"
    - 副标题："The Gallery"
    - 营业时间说明
    - "Arrange Visit"按钮
  - **右侧**：画廊室内环境图片
- **设计元素**：
  - 形状颜色装饰：`#934c4c`

#### 2.7 新品到货滑块 (New Arrivals Product Slider)
- **HTML ID**: `ProductSlider-template--15323282800742__product_slider`
- **布局特点**：
  - 水平产品滑块展示
  - 左右导航箭头
  - 产品悬停效果显示名称
  - 响应式产品数量显示

#### 2.8 品牌历史区域 (Heritage Image with Text)
- **HTML ID**: `ImageWithText-template--15323282800742__image_with_text_2`
- **布局**：标准的图文组合
  - **左侧**：历史照片
  - **右侧**：文字内容
    - 标题："Heritage"
    - 副标题："About Fulco Di Verdura"
    - 品牌故事描述
    - "Discover our Heritage"按钮

### 3. 页脚前置区域 (Footer Group Sections)

#### 3.1 邮件订阅区域 (Newsletter Signup)
- **HTML ID**: `NewsletterSignup-sections--15323283193958__newsletter_signup`
- **布局**：水平两栏布局
  - **左侧**：大标题"Sign up now"
  - **右侧**：订阅表单
    - 欢迎文字
    - 邮箱输入框
    - 提交按钮
- **设计特点**：
  - 形状颜色：`#262626`（深色调）

#### 3.2 Instagram展示区域 (Instagram Feed)
- **HTML ID**: `InstagramFeed-sections--15323283193958__instagram_feed`
- **布局**：
  - 标题："Find us on Instagram"（链接到Instagram主页）
  - 2x2网格展示四张Instagram图片
  - 每张图片链接到对应的Instagram帖子

### 4. 页脚区域 (Footer)
- **HTML ID**: `sections--15323283193958__footer`
- **布局结构**：
  - **左侧**：
    - Verdura白色Logo
    - 社交媒体图标（Facebook, Instagram, YouTube）
    - 联系信息（地址、电话、邮箱）
    - 导航链接
  - **右侧**：
    - 版权信息
    - 网站制作方链接

## 技术实现特点

### 响应式设计
- 使用 CSS Grid 和 Flexbox 布局
- 桌面端和移动端差异化内容展示
- 图片使用 `srcset` 和 `sizes` 属性优化加载

### 动画效果
- 滚动触发的文字和元素动画
- 使用 `transform` 和 `opacity` 实现平滑过渡
- 产品悬停效果和滑块交互

### 性能优化
- 图片懒加载 (`loading="lazy"`)
- 视频预加载和优化压缩
- CSS 和 JavaScript 资源异步加载

### Shopify特有结构
- 所有区域都是独立的 Shopify Section
- 使用 Liquid 模板语言
- 支持主题定制和内容管理

## 导航菜单结构

### 主导航菜单
- **The Collection** (产品系列)
  - **Shop by Category** (按分类购买):
    - Bracelets & Watches
    - Cuffs
    - Earclips
    - Rings
    - Necklaces
    - Brooches
    - Men's
    - Zodiac Pendant Necklaces
    - All
  - **Shop by Collection** (按系列购买):
    - Featured in Feud
    - Off-Season Collection
    - Byzantine Collection
    - Caged Collection
    - Constellation Collection
    - Curb-Link Collection
    - Night & Day Collection
    - Stardust Collection
    - Vintage Verdura
    - Very Verdura Gifts Under $20,000

### 页面导航
- The Story (品牌故事)
- Visit (参观)
- Contact (联系我们)
- At Your Service (客户服务)
- News (新闻)
- Catalogues (目录)

## 关键数据结构

### 产品分类滑块数据示例
```javascript
{
  "collections": [
    {
      "id": "bracelets",
      "name": "Bracelets",
      "url": "/collections/bracelets-watches",
      "active": true,
      "products": [
        {
          "title": "Twenty Buck Bracelet",
          "image": "产品图片URL",
          "url": "/products/twenty-buck-bracelet"
        }
        // ... 更多产品
      ]
    }
    // ... 其他分类
  ]
}
```

### 颜色主题
- 主背景色：白色 (`#ffffff`)
- 次要背景色：浅灰色 (`#f7f7f7`)
- 装饰色彩：深红棕色 (`#934c4c`)
- 深色调：深灰色 (`#262626`)
- 文字颜色：黑色系

## Shopify开发建议

### 必需的Section文件
1. `hero-video.liquid` - 英雄视频区
2. `collection-selector-slider.liquid` - 产品分类滑块
3. `double-image-banner.liquid` - 双图横幅（可复用）
4. `three-square-layout.liquid` - 三格布局
5. `image-with-text.liquid` - 图文组合（可复用）
6. `product-slider.liquid` - 产品滑块
7. `newsletter-signup.liquid` - 邮件订阅
8. `instagram-feed.liquid` - Instagram展示

### JavaScript依赖
- Swiper.js（产品滑块）
- GSAP或类似动画库（文字动画效果）
- 响应式媒体查询处理

### CSS关键特性
- CSS Custom Properties（自定义属性）
- CSS Grid 和 Flexbox
- 动画和过渡效果
- 响应式媒体查询

这个布局设计体现了高端珠宝品牌的优雅气质，通过精心安排的视觉层次和交互体验，展示了品牌的产品和故事，为用户提供了沉浸式的浏览体验。 