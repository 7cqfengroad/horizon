/**
 * Global JavaScript for Verdura Jewelry Theme
 */

class ThemeGlobal {
  constructor() {
    this.init();
  }

  init() {
    this.initAccessibility();
    this.initQuickAdd();
    this.initProductCards();
    this.initScrollBehavior();
  }

  /**
   * Initialize accessibility features
   */
  initAccessibility() {
    // Add focus-visible polyfill class to body
    document.body.classList.add('js');
    
    // Trap focus in modals
    this.initFocusTrap();
    
    // Add skip links functionality
    this.initSkipLinks();
  }

  /**
   * Initialize focus trap for modal elements
   */
  initFocusTrap() {
    const modalSelectors = '[role="dialog"], .modal, .drawer';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const activeModal = document.querySelector(`${modalSelectors}:not([hidden]):not(.hidden)`);
        if (activeModal) {
          this.trapFocus(e, activeModal);
        }
      }
    });
  }

  /**
   * Trap focus within element
   */
  trapFocus(event, element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Initialize skip links
   */
  initSkipLinks() {
    const skipLinks = document.querySelectorAll('.skip-to-content-link');
    
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Initialize quick add functionality
   */
  initQuickAdd() {
    const quickAddButtons = document.querySelectorAll('.product-card__quick-add');
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', this.handleQuickAdd.bind(this));
    });
  }

  /**
   * Handle quick add to cart
   */
  async handleQuickAdd(event) {
    const button = event.target;
    const productId = button.dataset.productId;
    
    if (!productId) return;
    
    button.disabled = true;
    button.textContent = 'Adding...';
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      });
      
      if (response.ok) {
        button.textContent = 'Added!';
        this.updateCartCount();
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.disabled = false;
          button.textContent = 'Quick Add';
        }, 2000);
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Quick add error:', error);
      button.textContent = 'Error';
      
      setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Quick Add';
      }, 2000);
    }
  }

  /**
   * Update cart count in header
   */
  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('.header__cart-count');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
        element.classList.toggle('visually-hidden', cart.item_count === 0);
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  /**
   * Initialize product card interactions
   */
  initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      // Add keyboard navigation
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const link = card.querySelector('.product-card__title-link');
          if (link) {
            e.preventDefault();
            link.click();
          }
        }
      });
      
      // Add hover effects for touch devices
      card.addEventListener('touchstart', () => {
        card.classList.add('touch-hover');
      });
      
      card.addEventListener('touchend', () => {
        setTimeout(() => {
          card.classList.remove('touch-hover');
        }, 300);
      });
    });
  }

  /**
   * Initialize smooth scroll behavior
   */
  initScrollBehavior() {
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  /**
   * Utility function to debounce function calls
   */
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

  /**
   * Utility function to throttle function calls
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Show loading state
   */
  showLoading(element, text = 'Loading...') {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.textContent = text;
    element.classList.add('loading');
  }

  /**
   * Hide loading state
   */
  hideLoading(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText || element.textContent;
    element.classList.remove('loading');
  }

  /**
   * Display notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add('notification--visible');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('notification--visible');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.theme = new ThemeGlobal();
});

// Add to global scope for access from other scripts
window.ThemeGlobal = ThemeGlobal; 