# Zodiac Section 故障排除指南

## 问题
`Liquid error (templates/index line 13): Error in tag 'section' - 'zodiac' is not a valid section type`

## 原因
这个错误通常表示Shopify还没有识别到新创建的`sections/zodiac.liquid`文件。

## 解决方案

### 方案1：通过主题编辑器添加（推荐）

1. **进入Shopify管理后台**
   - 转到 在线商店 > 主题
   - 点击"自定义"进入主题编辑器

2. **添加Zodiac Section**
   - 在主页预览中，点击"添加分区"按钮
   - 在可用分区列表中找到"星座系列"
   - 点击添加

3. **配置内容**
   - 上传左侧图片：星座吊坠图片1
   - 上传右侧图片：星座吊坠图片2
   - 确认文字内容：
     - 标题：Zodiac
     - 副标题：Pendant Necklaces
     - 描述：Using archival postcards Fulco di Verdura purchased at the Museum of Natural History, Verdura sets diamonds as stars and engraves constellations in gold
     - 按钮文字：View Collection
     - 按钮链接：/collections/zodiac-pendant-necklaces

4. **保存并发布**

### 方案2：检查文件同步

1. **确认文件存在**
   - 检查`sections/zodiac.liquid`文件是否正确上传
   - 确认文件名没有特殊字符或空格

2. **重新上传**
   - 删除`sections/zodiac.liquid`文件
   - 重新创建并上传文件

3. **等待同步**
   - Shopify可能需要几分钟来识别新文件
   - 刷新主题编辑器页面

### 方案3：启用模板中的引用

等Section在主题编辑器中可见后，可以重新启用模板中的引用：

```liquid
{% comment %} 取消注释下面这行 {% endcomment %}
{% section 'zodiac' %}
```

## 预期效果

Section正确加载后，您应该能看到：

### 布局
- **左侧**：星座吊坠图片（或占位图案）
- **中间**：标题、副标题、描述文字和按钮
- **右侧**：星座吊坠图片（或占位图案）
- **背景**：浅灰色 (#f7f7f7)

### 响应式设计
- **桌面端**：三列布局（图片-文字-图片）
- **移动端**：单列布局（垂直排列）

### 交互效果
- 图片悬停时轻微放大
- 按钮悬停效果
- 高对比度模式支持

## 如果问题持续

如果以上方案都无法解决，请：

1. **检查主题编辑器**
   - 在"添加分区"列表中查找"星座系列"
   - 如果找不到，说明文件还未被识别

2. **检查控制台错误**
   - 打开浏览器开发者工具
   - 查看是否有其他JavaScript或CSS错误

3. **联系支持**
   - 提供具体的错误截图
   - 说明已尝试的解决步骤

## 临时解决方案

在等待Section正确加载期间，Zodiac内容已暂时注释，网站其他部分应该正常工作：

- ✅ Hero Video Section
- ✅ Collection Slider Section  
- ⏳ Zodiac Section（暂时隐藏）

## 下一步

一旦Zodiac Section正常工作，我们可以继续开发：

1. **Off-Season Collection** - 三格布局
2. **Very Verdura Section** - 复用图文组合
3. **Visit Gallery Section** - 反向图文布局
4. **New Arrivals Slider** - 产品滑块
5. **Heritage Section** - 品牌历史

---

*创建时间：{{ "now" | date: "%Y-%m-%d %H:%M" }}* 