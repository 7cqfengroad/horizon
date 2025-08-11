# Zodiac Section 设置指南

## ✅ 已完成的工作

现在Zodiac Section已经按照Collection Slider的模式创建，可以在主题编辑器中完全编辑！

### 🔧 技术实现

1. **参考了Collection Slider的结构**
   - 使用`{% stylesheet %}`标签内嵌CSS
   - 使用section settings而不是blocks
   - 完整的schema配置
   - 预设默认值

2. **文件结构**
   - `sections/zodiac.liquid` - 主section文件
   - `locales/en.default.json` - 翻译支持
   - `templates/index.liquid` - 模板引用

## 🎯 在主题编辑器中配置

### 1. 访问配置

进入 **Shopify管理后台 → 在线商店 → 主题 → 自定义**

### 2. 找到星座系列section

在主页中找到"星座系列"section，点击进入编辑

### 3. 可配置选项

#### **图片设置**
- **左侧图片**: 上传星座吊坠图片（建议摩羯座）
- **左侧图片描述**: 图片alt文字 (默认: "Zodiac Pendant Capricorn")
- **右侧图片**: 上传星座吊坠图片（建议双鱼座）
- **右侧图片描述**: 图片alt文字 (默认: "Zodiac Pendant Pisces")

#### **文字内容**
- **标题**: 主标题 (默认: "Zodiac")
- **副标题**: 副标题 (默认: "Pendant Necklaces")
- **描述文字**: 富文本编辑器，可添加段落、链接等
- 默认描述: "Using archival postcards Fulco di Verdura purchased at the Museum of Natural History, Verdura sets diamonds as stars and engraves constellations in gold"

#### **按钮设置**
- **按钮文字**: CTA按钮文字 (默认: "View Collection")
- **按钮链接**: 跳转URL (默认: "/collections/zodiac-pendant-necklaces")

#### **样式设置**
- **背景颜色**: 可选择任意颜色 (默认: #f7f7f7)
- **顶部内边距**: 0-100px (默认: 60px)
- **底部内边距**: 0-100px (默认: 60px)

## 📱 响应式设计

### 桌面端 (>768px)
```
[左侧图片]  [标题+副标题+描述+按钮]  [右侧图片]
```

### 移动端 (≤768px)
```
[左侧图片]
[标题+副标题+描述+按钮]
[右侧图片]
```

## 🎨 推荐图片规格

- **尺寸**: 600px 宽度（高度自适应）
- **比例**: 建议 4:5 或 3:4
- **格式**: JPG/PNG
- **内容**: 高质量的星座吊坠产品图

## 🔄 与原网站对比

### 原Verdura网站Zodiac Section:
- 左侧: 摩羯座吊坠图片
- 中间: Zodiac + Pendant Necklaces + 描述文字 + View Collection按钮
- 右侧: 双鱼座吊坠图片
- 背景: 浅灰色

### 我们的实现:
- ✅ 完全一致的布局
- ✅ 相同的响应式行为
- ✅ 可编辑的内容和图片
- ✅ 预设的默认内容
- ✅ 无障碍支持

## 💡 使用建议

1. **图片优化**
   - 上传前压缩图片以提高加载速度
   - 使用WebP格式（Shopify会自动转换）
   - 提供准确的alt文字

2. **内容编辑**
   - 保持描述文字简洁有力
   - 确保按钮链接指向正确的产品集合
   - 根据品牌需要调整颜色

3. **测试**
   - 在不同设备上测试显示效果
   - 确认所有链接正常工作
   - 验证图片加载正常

## 🚀 下一步开发

Zodiac Section完成后，可以继续开发其他sections：

1. **Off-Season Collection** - 三格布局视频/图片组合
2. **Very Verdura Section** - 复用当前image-with-text模式
3. **Visit Gallery Section** - 反向图文布局
4. **New Arrivals Slider** - 水平产品滑块
5. **Heritage Section** - 品牌历史图文

---

*创建时间: 2024年12月*
*文件: sections/zodiac.liquid* 