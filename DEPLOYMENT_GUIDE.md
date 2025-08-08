# Shopify主题部署指南

## 🚨 当前问题：404错误

如果您看到404错误页面，请按照以下步骤排查和解决：

## 📋 部署检查清单

### 1. 确认文件结构
确保您的主题目录包含以下必要文件：
```
horizon/
├── assets/
│   ├── main.css
│   └── main.js
├── config/
│   └── settings_schema.json
├── layout/
│   ├── theme.liquid          # 主要布局文件
│   └── theme-minimal.liquid  # 测试用简化布局
├── sections/
│   ├── minimal-test.liquid   # 🔍 测试section
│   ├── header.liquid
│   ├── footer.liquid
│   └── 其他sections...
├── templates/
│   ├── index.json            # 主首页模板
│   └── index-minimal.json   # 🔍 测试首页模板
└── 其他目录...
```

### 2. 上传主题到Shopify

#### 方法A：通过Shopify后台上传
1. 将整个`horizon`文件夹压缩为`.zip`文件
2. 登录Shopify后台 → 在线商店 → 主题
3. 点击"上传主题" → 选择zip文件
4. 等待上传完成

#### 方法B：使用Shopify CLI（推荐）
```bash
# 安装Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 在horizon目录中运行
shopify theme dev

# 或部署到线上
shopify theme push
```

### 3. 激活主题
1. 在Shopify后台的主题列表中找到新上传的主题
2. 点击"操作" → "发布"或"预览"

### 4. 测试步骤

#### 🔍 第一步：测试简化版本
1. **临时重命名文件**：
   ```bash
   # 备份当前文件
   mv layout/theme.liquid layout/theme-backup.liquid
   mv templates/index.json templates/index-backup.json
   
   # 使用简化版本
   mv layout/theme-minimal.liquid layout/theme.liquid
   mv templates/index-minimal.json templates/index.json
   ```

2. **重新上传并测试**
   - 如果看到"✅ 主题加载成功！"，说明基础结构正确
   - 如果仍然404，说明是部署问题

#### 🔍 第二步：恢复完整版本
```bash
# 恢复原文件
mv layout/theme.liquid layout/theme-minimal.liquid
mv templates/index.json templates/index-minimal.json
mv layout/theme-backup.liquid layout/theme.liquid
mv templates/index-backup.json templates/index.json
```

### 5. 常见问题排查

#### 问题1：主题上传后仍显示404
**可能原因**：
- 主题未正确激活
- Shopify缓存问题
- 文件权限问题

**解决方案**：
```bash
# 清除浏览器缓存
# 强制刷新页面 (Ctrl+F5 或 Cmd+Shift+R)
# 等待5-10分钟让Shopify服务器更新
```

#### 问题2：主题预览正常但发布后404
**可能原因**：
- 主题发布过程中出错
- DNS或CDN缓存问题

**解决方案**：
1. 重新发布主题
2. 检查主题是否设为"当前主题"
3. 联系Shopify支持

#### 问题3：某些页面显示，首页不显示
**可能原因**：
- `templates/index.json`文件有语法错误
- 引用的sections不存在

**解决方案**：
1. 检查JSON语法
2. 确认所有引用的sections都存在
3. 使用简化版本测试

### 6. 调试技巧

#### 检查Shopify开发者工具
1. 按F12打开开发者工具
2. 查看Console tab是否有JavaScript错误
3. 查看Network tab是否有文件加载失败

#### 检查主题文件
1. 在Shopify后台 → 在线商店 → 主题 → 操作 → 编辑代码
2. 确认所有文件都已正确上传
3. 检查文件内容是否完整

### 7. 应急方案

如果所有方法都失败，使用以下应急步骤：

1. **创建最简单的主题**：
   ```liquid
   <!-- layout/theme.liquid -->
   <!DOCTYPE html>
   <html>
   <head>
     <title>{{ shop.name }}</title>
     {{ content_for_header }}
   </head>
   <body>
     <h1>网站正在维护中</h1>
     <p>请稍后再试</p>
     {{ content_for_layout }}
   </body>
   </html>
   ```

2. **创建空白首页**：
   ```json
   {
     "sections": {},
     "order": []
   }
   ```

3. **逐步添加功能**：
   - 首先确保基本结构工作
   - 然后逐个添加sections
   - 最后添加复杂功能

## 📞 获取帮助

如果问题仍然存在：
1. 检查Shopify系统状态：https://status.shopify.com/
2. 查看Shopify社区论坛
3. 联系Shopify技术支持
4. 提供错误信息和操作步骤给开发者

## 🎯 成功标志

主题部署成功的标志：
- ✅ 首页能正常访问
- ✅ 看到预期的内容或测试信息
- ✅ 浏览器开发者工具无错误
- ✅ CSS和JS文件正确加载 