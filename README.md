# Verdura Jewelry - Shopify Theme

一个专为高端珠宝品牌设计的奢华Shopify主题，具有优雅的设计和现代的功能。

## 🌟 主要特性

### 设计特点
- **奢华美学** - 简洁优雅的设计，突出产品质感
- **完全响应式** - 在所有设备上都有完美的显示效果
- **高端品牌感** - 专为珠宝、手表等奢侈品牌设计
- **无障碍友好** - 符合WCAG 2.2标准

### 首页区块
- **Hero Banner** - 大图背景的主要展示区域
- **Featured Collections** - 特色产品集合展示
- **Zodiac Collection** - 星座主题产品特殊展示
- **Lifestyle Grid** - 品牌故事和生活方式展示
- **Very Verdura** - 特色产品系列
- **Visit Us** - 门店信息展示
- **New Arrivals** - 新品到货展示
- **Heritage Story** - 品牌历史故事
- **Newsletter** - 邮件订阅

### 技术特性
- **现代CSS Grid** - 灵活的布局系统
- **JavaScript增强** - 流畅的交互体验
- **SEO优化** - 搜索引擎友好
- **性能优化** - 快速加载时间
- **无障碍支持** - 键盘导航和屏幕阅读器支持

## 🚀 安装指南

### 前提条件
- Shopify开发环境
- Shopify CLI
- Node.js (推荐版本 16+)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd verdura-jewelry-theme
```

2. **安装依赖**
```bash
npm install
```

3. **配置Shopify CLI**
```bash
# 复制配置文件
cp config.example.yml config.yml

# 编辑config.yml，填入你的Shopify店铺信息
# - password: Shopify私有应用密码
# - theme_id: 主题ID（可选，留空将创建新主题）
# - store: 你的Shopify店铺域名
```

4. **开始开发**
```bash
npm run dev
```

## 📁 项目结构

```
verdura-jewelry-theme/
├── assets/                 # CSS, JS 和图片资源
│   ├── base.css            # 基础样式
│   ├── theme.css           # 主题特定样式
│   └── global.js           # 全局JavaScript
├── config/                 # 主题配置
│   └── settings_schema.json # 主题设置架构
├── layout/                 # 布局模板
│   └── theme.liquid        # 主要布局文件
├── locales/                # 多语言文件
│   └── en.default.json     # 英文翻译
├── sections/               # 可重用的页面区块
│   ├── header.liquid       # 网站头部
│   ├── footer.liquid       # 网站页脚
│   ├── hero-banner.liquid  # 主要横幅
│   └── ...                 # 其他区块
├── snippets/               # 可重用的代码片段
│   └── price.liquid        # 价格显示组件
├── templates/              # 页面模板
│   └── index.json          # 首页模板
└── README.md               # 项目说明
```

## 🎨 自定义设置

### 颜色配置
在主题编辑器中可以设置：
- 主色调 (Primary Color)
- 次要颜色 (Secondary Color) 
- 强调色 (Accent Color)
- 文本颜色 (Text Color)
- 背景颜色 (Background Color)

### 字体设置
- 标题字体
- 正文字体
- 基础字体大小

### 布局选项
- 最大容器宽度
- 粘性头部开关
- 社交媒体链接

## 📱 响应式设计

主题在以下断点进行优化：
- **桌面**: 1024px+
- **平板**: 768px - 1023px
- **手机**: 320px - 767px

## ♿ 无障碍功能

- **键盘导航** - 支持完整的键盘操作
- **屏幕阅读器** - 完善的ARIA标签
- **颜色对比** - 符合WCAG 2.2标准
- **焦点管理** - 清晰的焦点指示器
- **跳转链接** - 快速导航到主要内容

## 🛠️ 开发命令

```bash
# 启动开发环境
npm run dev

# 构建主题
npm run build

# 部署到Shopify
npm run deploy

# 监听文件变化
npm run watch
```

## 📦 主要依赖

- **Shopify CLI** - 主题开发工具
- **Liquid** - Shopify模板语言
- **Modern CSS** - Grid, Flexbox, Custom Properties
- **Vanilla JavaScript** - 原生JavaScript，无框架依赖

## 🎯 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- iOS Safari (最新版本)
- Chrome Android (最新版本)

## 📈 性能优化

- **图片懒加载** - 提升页面加载速度
- **CSS优化** - 最小化和压缩样式文件
- **JavaScript优化** - 异步加载和代码分割
- **字体优化** - 字体显示优化

## 🔧 故障排除

### 常见问题

1. **样式未加载**
   - 检查CSS文件路径
   - 确认asset_url过滤器正确使用

2. **JavaScript功能异常**
   - 检查浏览器控制台错误
   - 确认全局变量正确初始化

3. **图片显示问题**
   - 检查图片URL格式
   - 确认responsive image过滤器设置

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

该项目基于MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持

如果你在使用过程中遇到任何问题，请：

1. 查看[常见问题](#故障排除)
2. 搜索现有的Issues
3. 创建新的Issue并详细描述问题

---

**Verdura Jewelry Theme** - 为奢侈品牌打造的专业Shopify主题 