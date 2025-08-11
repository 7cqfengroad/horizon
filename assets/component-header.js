/**
 * Verdura Header Component JavaScript
 * 处理头部导航的所有交互功能，包括菜单切换、搜索、购物车等
 */

(function() {
  'use strict';

  // 头部导航类
  class VerduraHeader {
    constructor() {
      this.header = document.querySelector('.site-header');
      this.subnav = document.querySelector('.subnav');
      this.overlay = document.querySelector('.overlay');
      this.searchContainer = document.querySelector('.search');
      this.body = document.body;
      
      // 按钮元素
      this.menuToggles = document.querySelectorAll('.subnav-toggle');
      this.cartButton = document.querySelector('.cart-button');
      this.searchToggle = document.querySelector('.search-toggle');
      this.searchInput = document.querySelector('.search-input');
      
      // 状态管理
      this.isMenuOpen = false;
      this.isSearchOpen = false;
      this.lastFocusedElement = null;
      
      // 初始化
      this.init();
    }

    init() {
      if (!this.header) return;

      this.bindEvents();
      this.setupKeyboardNavigation();
      this.updateCartCount();
      this.setupScrollBehavior();
      
      // 标记为已初始化
      this.header.classList.add('js-initialized');
      
      console.log('Verdura Header initialized');
    }

    bindEvents() {
      // 菜单切换事件
      this.menuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMenu();
        });
      });

      // 覆盖层点击事件
      if (this.overlay) {
        this.overlay.addEventListener('click', () => {
          this.closeMenu();
          this.closeSearch();
        });
      }

      // 搜索切换事件
      if (this.searchToggle) {
        this.searchToggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleSearch();
        });
      }

      // 购物车事件
      if (this.cartButton) {
        this.cartButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCart();
        });
      }

      // ESC键关闭
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAll();
        }
      });

      // 窗口调整大小事件
      window.addEventListener('resize', this.debounce(() => {
        this.handleResize();
      }, 250));

      // 购物车更新事件
      document.addEventListener('cart:updated', () => {
        this.updateCartCount();
      });
    }

    setupKeyboardNavigation() {
      // Tab键导航支持
      this.header.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          this.handleTabNavigation(e);
        }
      });

      // 搜索框回车事件
      if (this.searchInput) {
        this.searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.submitSearch();
          }
        });
      }
    }

    toggleMenu() {
      if (this.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    openMenu() {
      if (this.isMenuOpen) return;

      this.lastFocusedElement = document.activeElement;
      this.isMenuOpen = true;
      
      // 更新DOM状态
      this.body.classList.add('js-menu-open');
      this.subnav.classList.add('is-open');
      this.overlay.classList.add('is-open');
      
      // 更新ARIA属性
      this.menuToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'true');
      });
      
      this.subnav.setAttribute('aria-hidden', 'false');
      this.overlay.setAttribute('aria-hidden', 'false');

      // 焦点管理
      setTimeout(() => {
        const firstFocusable = this.subnav.querySelector('a, button');
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 100);

      // 关闭搜索（如果开启）
      this.closeSearch();
      
      this.announceToScreenReader('Navigation menu opened');
    }

    closeMenu() {
      if (!this.isMenuOpen) return;

      this.isMenuOpen = false;
      
      // 更新DOM状态
      this.body.classList.remove('js-menu-open');
      this.subnav.classList.remove('is-open');
      this.overlay.classList.remove('is-open');
      
      // 更新ARIA属性
      this.menuToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
      });
      
      this.subnav.setAttribute('aria-hidden', 'true');
      this.overlay.setAttribute('aria-hidden', 'true');

      // 恢复焦点
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
        this.lastFocusedElement = null;
      }
      
      this.announceToScreenReader('Navigation menu closed');
    }

    toggleSearch() {
      if (this.isSearchOpen) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    }

    openSearch() {
      if (this.isSearchOpen) return;

      this.isSearchOpen = true;
      this.searchContainer.classList.add('is-open');
      
      // 焦点到搜索框
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 100);

      // 关闭菜单（如果开启）
      this.closeMenu();
      
      this.announceToScreenReader('Search opened');
    }

    closeSearch() {
      if (!this.isSearchOpen) return;

      this.isSearchOpen = false;
      this.searchContainer.classList.remove('is-open');
      
      this.announceToScreenReader('Search closed');
    }

    closeAll() {
      this.closeMenu();
      this.closeSearch();
    }

    submitSearch() {
      const form = this.searchInput.closest('form');
      if (form && this.searchInput.value.trim()) {
        form.submit();
      }
    }

    openCart() {
      // 购物车功能 - 触发自定义事件供其他组件监听
      const cartEvent = new CustomEvent('cart:open', {
        detail: { source: 'header' }
      });
      
      document.dispatchEvent(cartEvent);
      this.announceToScreenReader('Shopping cart opened');
    }

    updateCartCount() {
      // 更新购物车数量显示
      const cartCountElements = document.querySelectorAll('.cartQuantity');
      
      // 从Shopify获取购物车数据
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          const count = cart.item_count || 0;
          cartCountElements.forEach(element => {
            element.textContent = count;
          });
          
          // 更新购物车按钮的无障碍标签
          if (this.cartButton) {
            const label = count > 0 ? 
              `购物车，${count}件商品` : 
              '购物车为空';
            this.cartButton.setAttribute('aria-label', label);
          }
        })
        .catch(error => {
          console.warn('Failed to update cart count:', error);
        });
    }

    setupScrollBehavior() {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateHeaderOnScroll = () => {
        const currentScrollY = window.scrollY;
        
        // 添加滚动状态类
        if (currentScrollY > 100) {
          this.header.classList.add('is-scrolled');
        } else {
          this.header.classList.remove('is-scrolled');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateHeaderOnScroll);
          ticking = true;
        }
      });
    }

    handleResize() {
      // 响应式处理
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop && this.isMenuOpen) {
        // 桌面端时调整菜单布局
        this.adjustDesktopMenu();
      }
      
      // 移动端时确保正确关闭搜索
      if (!isDesktop && this.isSearchOpen) {
        this.closeSearch();
      }
    }

    adjustDesktopMenu() {
      // 桌面端菜单调整逻辑
      const mobileCollections = this.subnav.querySelector('.collections.mobile');
      const desktopCollections = this.subnav.querySelector('.collections.desktop');
      
      if (mobileCollections && desktopCollections) {
        mobileCollections.style.display = 'none';
        desktopCollections.style.display = 'flex';
      }
    }

    handleTabNavigation(e) {
      if (!this.isMenuOpen) return;

      const focusableElements = this.subnav.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    announceToScreenReader(message) {
      // 为屏幕阅读器用户提供语音反馈
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // 移除元素避免DOM污染
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }

    // 工具函数：防抖
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // 公共API
    destroy() {
      // 清理事件监听器和状态
      this.closeAll();
      this.header.classList.remove('js-initialized');
    }
  }

  // 购物车抽屉类（简化版）
  class CartDrawer {
    constructor() {
      this.drawer = null;
      this.init();
    }

    init() {
      // 监听购物车打开事件
      document.addEventListener('cart:open', () => {
        this.open();
      });

      // 创建购物车抽屉DOM
      this.createDrawer();
    }

    createDrawer() {
      // 创建购物车抽屉HTML结构
      const drawerHTML = `
        <div class="cart-drawer" id="cart-drawer" aria-hidden="true" role="dialog" aria-labelledby="cart-title">
          <div class="cart-drawer-content">
            <div class="cart-drawer-header">
              <h2 id="cart-title">Cart</h2>
              <button class="cart-drawer-close btn" type="button" aria-label="关闭购物车">
                <span>×</span>
              </button>
            </div>
            <div class="cart-drawer-body">
              <p class="cart-empty-message">Your cart is empty.</p>
              <div class="cart-delivery-info">
                <p>Delivery times are subject to several factors, including availability, shipping partner schedules, and weather conditions. If you wish to discuss the details of your order before purchasing, please email info@verdura.com or call (212) 758-3388.</p>
              </div>
            </div>
          </div>
          <div class="cart-drawer-overlay"></div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', drawerHTML);
      this.drawer = document.getElementById('cart-drawer');
      
      // 绑定关闭事件
      const closeButton = this.drawer.querySelector('.cart-drawer-close');
      const overlay = this.drawer.querySelector('.cart-drawer-overlay');
      
      closeButton.addEventListener('click', () => this.close());
      overlay.addEventListener('click', () => this.close());
    }

    open() {
      if (!this.drawer) return;
      
      this.drawer.classList.add('is-open');
      this.drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('cart-drawer-open');
      
      // 焦点管理
      const closeButton = this.drawer.querySelector('.cart-drawer-close');
      if (closeButton) {
        closeButton.focus();
      }
    }

    close() {
      if (!this.drawer) return;
      
      this.drawer.classList.remove('is-open');
      this.drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('cart-drawer-open');
    }
  }

  // DOM加载完成后初始化
  function initHeader() {
    // 初始化头部导航
    window.verduraHeader = new VerduraHeader();
    
    // 初始化购物车抽屉
    window.cartDrawer = new CartDrawer();
    
    // 暴露全局方法供外部调用
    window.VerduraHeader = {
      openMenu: () => window.verduraHeader.openMenu(),
      closeMenu: () => window.verduraHeader.closeMenu(),
      openCart: () => window.verduraHeader.openCart(),
      updateCartCount: () => window.verduraHeader.updateCartCount()
    };
  }

  // 初始化时机处理
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }

  // Shopify主题编辑器支持
  if (typeof window.Shopify !== 'undefined' && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      if (event.detail.sectionId.includes('header')) {
        // 重新初始化头部
        if (window.verduraHeader) {
          window.verduraHeader.destroy();
        }
        initHeader();
      }
    });
  }

})(); 