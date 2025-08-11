# Section引用错误故障排除指南

## 错误信息
```
Liquid error (templates/index line 13): Error in tag 'section' - 'image-with-text' is not a valid section type
```

## 原因分析

这个错误通常由以下原因引起：
1. Shopify还没有识别到新上传的section文件
2. section文件存在语法错误
3. 文件上传不完整或被缓存

## 解决方案

### 方案1: 通过主题编辑器添加（推荐）

**步骤：**
1. 进入Shopify后台 → 在线商店 → 模板
2. 点击"自定义"进入主题编辑器
3. 在主页中点击"添加区块"
4. 查找"图文组合"并添加
5. 配置相关设置

**优点：**
- 避免直接修改模板代码
- 通过可视化界面配置
- 不会有引用错误

### 方案2: 等待文件同步

**步骤：**
1. 等待5-10分钟让Shopify同步文件
2. 重新启用模板中的section引用：

```liquid
{% comment %} 图文组合区域 - 可用于Zodiac、Very Verdura等 {% endcomment %}
{% section 'image-with-text' %}
```

### 方案3: 检查文件完整性

**检查项目：**
1. 确认`sections/image-with-text.liquid`文件存在
2. 确认文件包含完整的`{% schema %}`标签
3. 确认JSON语法正确

### 方案4: 重新上传文件

如果以上方案都不行：
1. 删除`sections/image-with-text.liquid`文件
2. 等待1-2分钟
3. 重新创建文件
4. 上传完整内容

## 当前状态

为避免错误，我已经暂时注释掉了模板中的section引用：

```liquid
{% comment %} 暂时注释掉，等待section文件生效 {% endcomment %}
{% comment %} {% section 'image-with-text' %} {% endcomment %}
```

## 恢复步骤

当section文件可用后，执行以下步骤恢复：

1. **确认section可用**：
   - 在主题编辑器中能看到"图文组合"选项
   
2. **恢复模板引用**：
```liquid
{% comment %} 图文组合区域 - 可用于Zodiac、Very Verdura等 {% endcomment %}
{% section 'image-with-text' %}
```

3. **或者通过主题编辑器添加**（推荐）

## 预防措施

1. **总是先通过主题编辑器测试新section**
2. **避免直接在模板中硬编码section引用**
3. **使用{{ content_for_index }}让用户灵活配置**
4. **新section创建后先在预览环境测试**

## 验证section是否可用

检查方法：
1. 进入主题编辑器
2. 点击"添加区块"
3. 查看是否有"图文组合"选项
4. 如果有，说明section已经可用

## 联系支持

如果问题持续存在：
1. 检查Shopify主题开发者控制台是否有错误信息
2. 确认Shopify账户有section开发权限
3. 联系Shopify技术支持 