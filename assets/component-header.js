/**
 * Verdura Header Component
 * Handles navigation menu, search, cart drawer, and responsive behaviors
 */

class HeaderComponent {
  constructor() {
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.header__menu-toggle');
    this.menu = document.querySelector('.header__menu');
    this.menuCloseBtn = document.querySelector('.header__menu-close-btn');
    this.cartToggle = document.querySelector('.header__cart-toggle');
    this.cartDrawer = document.querySelector('.cart-drawer');
    this.cartCloseBtn = document.querySelector('.cart-drawer__close');
    this.searchToggle = document.querySelector('.header__search-toggle');
    this.searchDrawer = document.querySelector('.header__search');
    this.overlay = document.querySelector('.header__overlay');
    this.cartCount = document.querySelector('.header__cart-count');
    
    this.isMenuOpen = false;
    this.isCartOpen = false;
    this.isSearchOpen = false;
    this.lastScrollY = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupStickyHeader();
    this.setupKeyboardNavigation();
    this.updateCartCount();
  }
  
  bindEvents() {
    // Menu toggle events
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    if (this.menuCloseBtn) {
      this.menuCloseBtn.addEventListener('click', () => this.closeMenu());
    }
    
    // Cart toggle events
    if (this.cartToggle) {
      this.cartToggle.addEventListener('click', () => this.toggleCart());
    }
    
    if (this.cartCloseBtn) {
      this.cartCloseBtn.addEventListener('click', () => this.closeCart());
    }
    
    // Search toggle events
    if (this.searchToggle) {
      this.searchToggle.addEventListener('click', () => this.toggleSearch());
    }
    
    // Overlay click events
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeAll());
    }
    
    // Escape key to close all overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.menu.contains(e.target) && !this.menuToggle.contains(e.target)) {
        this.closeMenu();
      }
      
      if (this.isCartOpen && !this.cartDrawer.contains(e.target) && !this.cartToggle.contains(e.target)) {
        this.closeCart();
      }
      
      if (this.isSearchOpen && !this.searchDrawer.contains(e.target) && !this.searchToggle.contains(e.target)) {
        this.closeSearch();
      }
    });
    
    // Cart update events
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });
    
    // Window resize events
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // Focus management for menu items
    if (this.menu) {
      const menuLinks = this.menu.querySelectorAll('a, button');
      menuLinks.forEach(link => {
        link.addEventListener('focus', () => {
          if (!this.isMenuOpen) {
            this.openMenu();
          }
        });
      });
    }
  }
  
  setupStickyHeader() {
    if (!this.header) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add stuck class when scrolled
      if (currentScrollY > 100) {
        this.header.classList.add('is-stuck');
      } else {
        this.header.classList.remove('is-stuck');
      }
      
      this.lastScrollY = currentScrollY;
    };
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  setupKeyboardNavigation() {
    // Tab trapping for menu
    if (this.menu) {
      this.menu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && this.isMenuOpen) {
          this.trapFocus(e, this.menu);
        }
      });
    }
    
    // Tab trapping for cart drawer
    if (this.cartDrawer) {
      this.cartDrawer.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && this.isCartOpen) {
          this.trapFocus(e, this.cartDrawer);
        }
      });
    }
  }
  
  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
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
    if (!this.menu) return;
    
    this.closeCart();
    this.closeSearch();
    
    this.isMenuOpen = true;
    this.menu.setAttribute('aria-hidden', 'false');
    this.menuToggle?.setAttribute('aria-expanded', 'true');
    this.overlay?.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable = this.menu.querySelector('a, button');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 300);
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.menu.classList.add('is-open');
    });
  }
  
  closeMenu() {
    if (!this.menu || !this.isMenuOpen) return;
    
    this.isMenuOpen = false;
    this.menu.setAttribute('aria-hidden', 'true');
    this.menuToggle?.setAttribute('aria-expanded', 'false');
    this.overlay?.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove animation class
    this.menu.classList.remove('is-open');
    
    // Return focus to menu toggle
    if (this.menuToggle) {
      this.menuToggle.focus();
    }
  }
  
  toggleCart() {
    if (this.isCartOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }
  
  openCart() {
    if (!this.cartDrawer) return;
    
    this.closeMenu();
    this.closeSearch();
    
    this.isCartOpen = true;
    this.cartDrawer.setAttribute('aria-hidden', 'false');
    this.cartToggle?.setAttribute('aria-expanded', 'true');
    this.overlay?.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable = this.cartDrawer.querySelector('a, button');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 300);
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.cartDrawer.classList.add('is-open');
    });
  }
  
  closeCart() {
    if (!this.cartDrawer || !this.isCartOpen) return;
    
    this.isCartOpen = false;
    this.cartDrawer.setAttribute('aria-hidden', 'true');
    this.cartToggle?.setAttribute('aria-expanded', 'false');
    this.overlay?.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove animation class
    this.cartDrawer.classList.remove('is-open');
    
    // Return focus to cart toggle
    if (this.cartToggle) {
      this.cartToggle.focus();
    }
  }
  
  toggleSearch() {
    if (this.isSearchOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
  
  openSearch() {
    if (!this.searchDrawer) return;
    
    this.closeMenu();
    this.closeCart();
    
    this.isSearchOpen = true;
    this.searchDrawer.setAttribute('aria-hidden', 'false');
    this.searchToggle?.setAttribute('aria-expanded', 'true');
    
    // Focus search input
    setTimeout(() => {
      const searchInput = this.searchDrawer.querySelector('.header__search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 300);
  }
  
  closeSearch() {
    if (!this.searchDrawer || !this.isSearchOpen) return;
    
    this.isSearchOpen = false;
    this.searchDrawer.setAttribute('aria-hidden', 'true');
    this.searchToggle?.setAttribute('aria-expanded', 'false');
    
    // Return focus to search toggle
    if (this.searchToggle) {
      this.searchToggle.focus();
    }
  }
  
  closeAll() {
    this.closeMenu();
    this.closeCart();
    this.closeSearch();
  }
  
  updateCartCount() {
    if (!this.cartCount) return;
    
    // This would typically fetch from Shopify cart API
    // For now, we'll just update based on existing cart data
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        this.cartCount.textContent = cart.item_count;
        
        // Update cart toggle attribute
        if (this.cartToggle) {
          this.cartToggle.setAttribute('aria-label', `Cart with ${cart.item_count} items`);
        }
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }
  
  handleResize() {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
  
  // Public API for external cart updates
  refreshCart() {
    this.updateCartCount();
    
    // Trigger cart content refresh if cart is open
    if (this.isCartOpen) {
      const cartContent = document.querySelector('.cart-drawer__content');
      if (cartContent) {
        // This would typically reload cart content via AJAX
        fetch('/cart?view=drawer')
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.cart-drawer__content');
            if (newContent) {
              cartContent.innerHTML = newContent.innerHTML;
            }
          })
          .catch(error => {
            console.error('Error refreshing cart:', error);
          });
      }
    }
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.headerComponent = new HeaderComponent();
});

// Expose for external access
window.HeaderComponent = HeaderComponent;

// Cart utility functions for theme integration
window.HeaderUtils = {
  openCart: function() {
    if (window.headerComponent) {
      window.headerComponent.openCart();
    }
  },
  
  closeCart: function() {
    if (window.headerComponent) {
      window.headerComponent.closeCart();
    }
  },
  
  refreshCart: function() {
    if (window.headerComponent) {
      window.headerComponent.refreshCart();
    }
  },
  
  openMenu: function() {
    if (window.headerComponent) {
      window.headerComponent.openMenu();
    }
  },
  
  closeMenu: function() {
    if (window.headerComponent) {
      window.headerComponent.closeMenu();
    }
  }
}; 