# Header 故障排除指南

## 当前问题
PC端显示了所有菜单内容，但应该只显示顶部的MENU、Logo、CART按钮。

## 预期显示状态

### 默认状态（未点击任何按钮）
- ✅ 顶部导航栏：显示 MENU | Logo | CART 
- ❌ 子导航菜单：应该完全隐藏
- ❌ 搜索区域：应该隐藏
- ❌ 覆盖层：应该隐藏

### 点击MENU按钮后
- ✅ 顶部导航栏：仍然显示
- ✅ 子导航菜单：从左侧滑入显示
- ✅ 覆盖层：显示半透明背景
- ❌ 搜索区域：保持隐藏

### 点击搜索按钮后（如果有）
- ✅ 顶部导航栏：仍然显示
- ✅ 搜索区域：在导航栏下方显示
- ❌ 子导航菜单：保持隐藏

## 检查步骤

### 1. 验证元素默认状态
在浏览器开发者工具中运行以下代码：

```javascript
// 检查subnav是否正确隐藏
const subnav = document.querySelector('.subnav');
console.log('Subnav display:', window.getComputedStyle(subnav).display);
console.log('Subnav visibility:', window.getComputedStyle(subnav).visibility);
console.log('Subnav opacity:', window.getComputedStyle(subnav).opacity);

// 检查overlay是否正确隐藏
const overlay = document.querySelector('.overlay');
console.log('Overlay display:', window.getComputedStyle(overlay).display);

// 检查搜索区域是否正确隐藏
const search = document.querySelector('.search');
console.log('Search display:', window.getComputedStyle(search).display);
console.log('Search visibility:', window.getComputedStyle(search).visibility);
```

### 2. 测试菜单交互
```javascript
// 测试菜单按钮
const menuButton = document.querySelector('.subnav-toggle');
if (menuButton) {
  console.log('Menu button found');
  menuButton.click(); // 应该打开菜单
  
  setTimeout(() => {
    const subnav = document.querySelector('.subnav');
    console.log('After click - Subnav display:', window.getComputedStyle(subnav).display);
    console.log('After click - Subnav classes:', subnav.className);
    
    menuButton.click(); // 再次点击应该关闭菜单
  }, 1000);
} else {
  console.log('Menu button not found');
}
```

### 3. 检查CSS加载
```javascript
// 检查CSS是否正确加载
const stylesheets = Array.from(document.styleSheets);
const headerCSS = stylesheets.find(sheet => 
  sheet.href && sheet.href.includes('component-header.css')
);
console.log('Header CSS loaded:', !!headerCSS);

// 检查关键CSS规则
if (headerCSS) {
  try {
    const rules = Array.from(headerCSS.cssRules);
    const subnavRule = rules.find(rule => 
      rule.selectorText && rule.selectorText.includes('.subnav')
    );
    console.log('Subnav CSS rule:', subnavRule?.cssText);
  } catch (e) {
    console.log('Cannot access CSS rules (CORS)');
  }
}
```

## 可能的原因和解决方案

### 原因1：CSS文件未正确加载
**检查**: Network面板中是否有`component-header.css`
**解决**: 确认文件路径正确，服务器可以访问

### 原因2：CSS缓存问题
**检查**: 硬刷新页面 (Ctrl+F5)
**解决**: 清除浏览器缓存或在URL后添加版本参数

### 原因3：CSS优先级问题
**检查**: 开发者工具中CSS规则是否被覆盖
**解决**: 增加CSS选择器权重或使用!important

### 原因4：JavaScript未正确执行
**检查**: 控制台是否有JavaScript错误
**解决**: 修复JavaScript错误，确保`component-header.js`正确加载

### 原因5：HTML结构不匹配
**检查**: DOM结构是否与CSS选择器匹配
**解决**: 更新HTML结构或CSS选择器

## 快速修复

如果问题仍然存在，可以在浏览器控制台中运行以下代码临时隐藏菜单：

```javascript
// 临时隐藏subnav
const subnav = document.querySelector('.subnav');
if (subnav) {
  subnav.style.display = 'none';
  subnav.style.visibility = 'hidden';
  subnav.style.opacity = '0';
}

// 临时隐藏overlay
const overlay = document.querySelector('.overlay');
if (overlay) {
  overlay.style.display = 'none';
}

// 临时隐藏搜索
const search = document.querySelector('.search');
if (search && !search.classList.contains('is-open')) {
  search.style.display = 'none';
}
```

## 联系信息
如果这些步骤都无法解决问题，请提供：
1. 浏览器控制台的完整输出
2. Network面板中的CSS/JS加载状态
3. Elements面板中的完整HTML结构
4. 当前页面的完整URL 