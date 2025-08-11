# Verdura.com 主页分析报告

## 概述
基于对Verdura.com主页HTML源码和截图的分析，本文档详细记录了网站的布局结构、组件类型和数据，以便在Shopify上实现相同的网站体验。

## 页面整体结构

```
页面层级：
├── Header (头部导航)
├── Main Content (主要内容区域)
│   ├── Hero Video Section (英雄视频区)
│   ├── Collection Selector Slider (产品分类滑块)
│   ├── Zodiac Section (星座系列)
│   ├── Off-Season Collection (淡季系列)
│   ├── Very Verdura Section (特价系列)
│   ├── Visit Gallery Section (参观画廊)
│   ├── New Arrivals Slider (新品滑块)
│   └── Heritage Section (品牌历史)
├── Newsletter Signup (邮件订阅)
├── Instagram Feed (Instagram展示)
└── Footer (页脚)
```

## 详细组件分析

### 1. Header Navigation (头部导航)
**模块类型**: Fixed Header with Mobile Menu
**Shopify实现**: Header Section

#### 结构组成:
- **Logo**: 居中显示的Verdura标志
- **Menu Button**: 左侧汉堡菜单按钮
- **Cart Button**: 右侧购物车按钮，显示商品数量

#### 数据内容:
```javascript
{
  "logo": {
    "image": "logo_verdura.png",
    "alt_text": "Verdura Fine Jewelry"
  },
  "navigation": {
    "categories": [
      "Bracelets & Watches",
      "Cuffs", 
      "Earclips",
      "Rings",
      "Necklaces",
      "Brooches",
      "Men's",
      "Zodiac Pendant Necklaces",
      "All"
    ],
    "collections": [
      "Featured in Feud",
      "Off-Season Collection",
      "Byzantine Collection",
      "Caged Collection",
      "Constellation Collection",
      "Curb-Link Collection",
      "Night & Day Collection",
      "Stardust Collection",
      "Vintage Verdura",
      "Very Verdura Gifts Under $20,000"
    ],
    "pages": [
      "The Story",
      "Visit", 
      "Contact",
      "At Your Service",
      "News",
      "Catalogues"
    ]
  }
}
```

### 2. Hero Video Section (英雄视频区)
**模块类型**: Full-screen Video Background with Text Overlay
**Shopify实现**: Hero Section with Video

#### 特点:
- 全屏视频背景，自动播放，循环，静音
- 桌面和移动端使用不同视频文件
- 覆盖文字："Heritage of Style" + "Explore the Collection"
- 整个区域可点击跳转到产品页面

#### 数据结构:
```javascript
{
  "desktop_video": {
    "url": "6c82f86bf3fe4fdfbf72fe5c1c5299ba.HD-1080p-7.2Mbps.mp4",
    "poster": "preview_image.jpg"
  },
  "mobile_video": {
    "url": "7e686613a57d4a53be041af83d0a41c4.HD-1080p-7.2Mbps.mp4", 
    "poster": "06-18-24-VERDURA_GJ3202_1_for_web.jpg"
  },
  "text_overlay": {
    "title": "Heritage of Style",
    "subtitle": "Explore the Collection",
    "color": "#f7f7f7"
  },
  "link_url": "/collections/all-products"
}
```

### 3. Collection Selector Slider (产品分类滑块)
**模块类型**: Interactive Product Category Showcase
**Shopify实现**: Collection Slider Section

#### 功能:
- 左侧：垂直分类导航（Bracelets, Earclips, Cuffs, Rings, Necklaces）
- 右侧：对应分类的产品滑块展示
- 鼠标悬停显示产品名称
- "View Collection"链接按钮

#### 数据结构:
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
          "image": "Untitled-1_2000x2000_acf_cropped.png",
          "url": "/products/twenty-buck-bracelet"
        },
        {
          "title": "Curb-Link Bracelet", 
          "image": "verdura-curb-link-bracelet-web.jpg",
          "url": "/products/curb-link-bracelet-yellow-gold"
        },
        {
          "title": "Oval Link Bracelet",
          "image": "Verdura-Oval-Link-Bracelet_Gold_1.png",
          "url": "/products/oval-link-bracelet"
        },
        {
          "title": "Stirrup Bracelet",
          "image": "Verdura-Stirrup-Bracelet_Gold_1.png", 
          "url": "/products/stirrup-bracelet"
        }
      ]
    },
    // ... 其他分类的类似结构
  ]
}
```

### 4. Zodiac Section (星座系列)
**模块类型**: Two-Image Banner with Text Content
**Shopify实现**: Image with Text Section

#### 布局:
- 两侧：两张产品图片（星座吊坠）
- 中建：文字内容区域
- 背景色：#f7f7f7

#### 数据内容:
```javascript
{
  "background_color": "#f7f7f7",
  "images": [
    {
      "src": "Verdura-Jewelry-Zodiac-Pendant-Necklace-Capricorn-Gold-Diamond-1.jpg",
      "alt": "Zodiac Pendant Capricorn"
    },
    {
      "src": "Verdura-Jewelry-Zodiac-Pendant-Necklace-Pisces-Gold-Diamond-1.jpg", 
      "alt": "Zodiac Pendant Pisces"
    }
  ],
  "content": {
    "title": "Zodiac",
    "subtitle": "Pendant Necklaces",
    "description": "Using archival postcards Fulco di Verdura purchased at the Museum of Natural History, Verdura sets diamonds as stars and engraves constellations in gold",
    "cta_text": "View Collection",
    "cta_url": "/collections/zodiac-pendant-necklaces"
  }
}
```

### 5. Off-Season Collection (淡季系列)
**模块类型**: Three-Square Layout with Video
**Shopify实现**: Multi-media Content Section

#### 布局:
- 左侧：大型视频/图片 + 文字描述
- 右侧：两张正方形图片垂直排列
- 自定义形状颜色：#934c4c

#### 数据结构:
```javascript
{
  "shape_color": "#934c4c",
  "left_content": {
    "media": {
      "type": "video",
      "video_url": "904052fe8ee24998a0768d662c4b3978.HD-720p-3.0Mbps.mp4",
      "poster": "Sequence-01-square.jpg"
    },
    "text": {
      "title": "The Off-Season Collection",
      "description": "We are delighted to introduce the Off-Season Collection - over a dozen new archival pieces that we feel captures this paradox of American style. These bangles, lariats, hoops and pendants are meant to be as relevant to your wardrobe in high season as well as off season, whether you don them for an audience or a solo stroll down an empty beach.",
      "cta_text": "View",
      "cta_url": "/collections/off-season-collection"
    }
  },
  "right_images": [
    {
      "src": "Q449_MPI_230505_VERDURA_MP_SH10_1869-V1_FNL.jpg",
      "alt": "Off-Season Collection Image 1"
    },
    {
      "src": "Q449_MPI_230505_VERDURA_MP_SH3_556-V1_FNL.jpg",
      "alt": "Off-Season Collection Image 2"
    }
  ]
}
```

### 6. Very Verdura Section (特价系列)
**模块类型**: Two-Image Banner with Text Content (复用Zodiac样式)
**Shopify实现**: Image with Text Section

#### 数据内容:
```javascript
{
  "background_color": "#f7f7f7",
  "images": [
    {
      "src": "Verdura-Jewelry-Three-Stone-Ring-Gold-Amethyst-Peridot.jpg",
      "alt": "Three Stone Ring"
    },
    {
      "src": "Artboard-1-20.png",
      "alt": "Very Verdura Collection"
    }
  ],
  "content": {
    "title": "Very Verdura", 
    "subtitle": "Gifts Under $20,000",
    "description": "A collection of pieces perfect for gifting and receiving",
    "cta_text": "Shop",
    "cta_url": "/collections/very-verdura-gifts-under-15-000"
  }
}
```

### 7. Visit Gallery Section (参观画廊)
**模块类型**: Image with Text Layout (反向布局)
**Shopify实现**: Image with Text Section

#### 布局特点:
- 左侧：文字内容
- 右侧：画廊室内图片
- 形状颜色：#934c4c

#### 数据结构:
```javascript
{
  "layout": "reverse", // 文字在左，图片在右
  "shape_color": "#934c4c",
  "text_content": {
    "title": "Visit",
    "subtitle": "The Gallery", 
    "description": "The Verdura gallery is open 10 AM – 5 PM, Monday – Friday. Arrange your visit below",
    "cta_text": "Arrange Visit",
    "cta_url": "/pages/contact"
  },
  "image": {
    "src": "Verdura-Salon_PinkRoom_058_ret_cropped-for-web.jpg",
    "alt": "Verdura Gallery Interior"
  }
}
```

### 8. New Arrivals Slider (新品滑块)
**模块类型**: Horizontal Product Slider
**Shopify实现**: Product Slider Section

#### 特点:
- 水平滑动产品展示
- 左右导航箭头
- 产品悬停效果显示标题

#### 数据结构:
```javascript
{
  "title": "New Arrivals",
  "products": [
    {
      "title": "Mondello Bangle",
      "image": "Mondello-Bangle_Black-Ceramic-Gold_O-V2_PUPA_23.jpg",
      "url": "/products/mondello-bangle"
    },
    {
      "title": "Sun Cuff in Diamond", 
      "image": "Sun-Cuff_Diamond-Gold_V3_PUPA_23.jpg",
      "url": "/products/sun-cuff-in-diamond"
    },
    {
      "title": "Whisk Ring in Topaz",
      "image": "Whisk-Ring_White-Topaz_V6_PUPA_23.jpg", 
      "url": "/products/whisk-ring-in-topaz"
    },
    // ... 更多产品
  ]
}
```

### 9. Heritage Section (品牌历史)
**模块类型**: Image with Text Layout
**Shopify实现**: Image with Text Section

#### 数据结构:
```javascript
{
  "layout": "standard", // 图片在左，文字在右
  "shape_color": "#d4d4d4",
  "image": {
    "src": "home_heritage_img1_v2.jpg",
    "alt": "Fulco di Verdura Historical Photo"
  },
  "text_content": {
    "title": "Heritage",
    "subtitle": "About Fulco Di Verdura",
    "description": "Born into Sicilian aristocracy in 1898, Verdura's founder, Duke Fulco di Verdura, began his extraordinary career in Paris as a designer for Coco Chanel. After eight years with Chanel where he, most notably, created the Maltese Cross cuffs that became his signature, Verdura followed his passion for design to America in 1934.",
    "cta_text": "Discover our Heritage",
    "cta_url": "/pages/the-story"
  }
}
```

### 10. Newsletter Signup (邮件订阅)
**模块类型**: Newsletter Subscription Form
**Shopify实现**: Newsletter Section

#### 布局:
- 左侧：大标题 "Sign up now"
- 右侧：表单区域

#### 数据结构:
```javascript
{
  "shape_color": "#262626",
  "left_title": "Sign up now",
  "form_content": {
    "title": "Welcome to Verdura",
    "description": "Please join our email list for updates about new collections and special events",
    "placeholder": "Enter Email Address Here",
    "button_text": "Submit",
    "success_message": "Thank you!"
  }
}
```

### 11. Instagram Feed (Instagram展示)
**模块类型**: Social Media Feed Display
**Shopify实现**: Instagram Feed Section

#### 特点:
- 标题链接到Instagram主页
- 四张Instagram图片网格展示
- 每张图片链接到对应的Instagram帖子

#### 数据结构:
```javascript
{
  "title": "Find us on Instagram",
  "instagram_url": "https://www.instagram.com/verdurajewelry/",
  "posts": [
    {
      "image_url": "instagram_post_1.jpg",
      "post_url": "https://www.instagram.com/p/DNDjfrKtO-m/",
      "alt_text": "Instagram post description"
    },
    // ... 其他帖子
  ]
}
```

### 12. Footer (页脚)
**模块类型**: Multi-column Footer
**Shopify实现**: Footer Section

#### 布局结构:
- 左侧：Logo + 社交媒体图标 + 联系信息 + 导航链接
- 右侧：版权信息 + 网站制作方链接

#### 数据结构:
```javascript
{
  "logo": {
    "image": "logo_verdura_white.png",
    "url": "/"
  },
  "social_links": [
    {
      "platform": "facebook",
      "url": "https://www.facebook.com/verdura/"
    },
    {
      "platform": "instagram", 
      "url": "https://www.instagram.com/verdurajewelry/"
    },
    {
      "platform": "youtube",
      "url": "https://youtube.com/@verdurajewelry"
    }
  ],
  "contact_info": [
    "745 Fifth Avenue, Suite 1205 New York, NY 10151",
    "Call us: +1 (212) 758-3388",
    "Email us: info@verdura.com"
  ],
  "footer_links": [
    {
      "text": "Online Accessibility Statement",
      "url": "/pages/online-accessibility-statement"
    },
    {
      "text": "Catalogues", 
      "url": "/pages/catalogues"
    },
    {
      "text": "Customer Service / FAQ",
      "url": "/pages/customer-service"
    }
  ],
  "copyright": "Copyright © 2025 Verdura",
  "website_credit": {
    "text": "Website by The Beaux Arts",
    "url": "https://www.thebeauxartsdigital.com/"
  }
}
```

## Shopify实现方案

### 必需的Shopify Sections:
1. `header.liquid` - 头部导航
2. `hero-video.liquid` - 英雄视频区
3. `collection-slider.liquid` - 产品分类滑块
4. `image-with-text.liquid` - 图文组合（可复用多个实例）
5. `three-square-layout.liquid` - 三格布局
6. `product-slider.liquid` - 产品滑块
7. `newsletter.liquid` - 邮件订阅
8. `instagram-feed.liquid` - Instagram展示
9. `footer.liquid` - 页脚

### 必需的Shopify Assets:
1. JavaScript文件：Swiper滑块库，动画效果，移动端菜单
2. CSS文件：响应式布局，动画效果，自定义样式
3. 图片资源：所有产品图片，背景图片，Logo文件
4. 视频文件：英雄区域的桌面和移动端视频

### 数据管理:
1. **Collections**: 为每个产品分类创建对应的Shopify Collection
2. **Products**: 所有展示的产品需要在Shopify中创建
3. **Pages**: 创建品牌故事、联系我们等静态页面
4. **Settings**: 使用Theme Settings管理颜色、文字等可配置内容
5. **Metafields**: 用于存储额外的产品或Collection信息

### 技术特点:
1. **响应式设计**: 桌面端和移动端适配
2. **性能优化**: 图片lazy loading，视频压缩
3. **动画效果**: 滚动触发的文字和元素动画
4. **交互体验**: 滑块导航，悬停效果，平滑滚动
5. **SEO优化**: 语义化HTML，合适的meta标签

## 下一步开发计划

1. **创建基础模板结构**
2. **开发可复用的Sections**
3. **实现响应式CSS样式**
4. **添加JavaScript交互功能**
5. **集成Shopify数据和功能**
6. **性能优化和测试**
7. **部署和调试**

这个分析为Shopify主题开发提供了完整的蓝图，确保能够准确复现Verdura网站的设计和功能。 