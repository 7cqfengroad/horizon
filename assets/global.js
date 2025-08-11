/**
 * Verdura Fine Jewelry Theme - Global JavaScript
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

  // Initialize all components
  initMobileMenu();
  initSearchToggle();
  initScrollAnimations();
  initImageLazyLoading();
  initCartFunctionality();
  initFormValidation();

});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const body = document.body;

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.style.display = 'block';
      body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.style.display = 'none';
      body.style.overflow = '';
    });
  }

  // Close menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.style.display = 'none';
        body.style.overflow = '';
      }
    });
  }

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
      body.style.overflow = '';
    }
  });
}

/**
 * Search Toggle Functionality
 */
function initSearchToggle() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = document.querySelector('.search-bar input');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function() {
      const isVisible = searchBar.style.display !== 'none';
      searchBar.style.display = isVisible ? 'none' : 'block';

      if (!isVisible && searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
  // Observe elements for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('[class*="animate-"], .slide-up, .fade-in-element');
  animatedElements.forEach(function(element) {
    observer.observe(element);
  });
}

/**
 * Lazy Loading for Images
 */
function initImageLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
}

/**
 * Cart Functionality
 */
function initCartFunctionality() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const form = button.closest('form');
      if (!form) return;

      const formData = new FormData(form);

      // Show loading state
      button.classList.add('loading');
      button.textContent = 'Adding...';

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Update cart count
        updateCartCount();

        // Show success message
        showNotification('Product added to cart!', 'success');

        // Reset button
        button.classList.remove('loading');
        button.textContent = 'Add to Cart';
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        showNotification('Error adding product to cart', 'error');

        // Reset button
        button.classList.remove('loading');
        button.textContent = 'Add to Cart';
      });
    });
  });
}

/**
 * Update Cart Count
 */
function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartCountElements = document.querySelectorAll('#cart-count, [data-cart-count]');
      cartCountElements.forEach(function(element) {
        element.textContent = cart.item_count;
      });
    })
    .catch(error => {
      console.error('Error updating cart count:', error);
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      let isValid = true;

      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          showFieldError(field, 'This field is required');
        } else {
          clearFieldError(field);
        }
      });

      // Validate email fields
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(function(field) {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid email address');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}

/**
 * Show field error
 */
function showFieldError(field, message) {
  clearFieldError(field);

  field.classList.add('error');

  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.color = '#e74c3c';
  errorElement.style.fontSize = '14px';
  errorElement.style.marginTop = '5px';

  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
  field.classList.remove('error');

  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Email validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(function(notification) {
    notification.remove();
  });

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  // Add CSS for animation
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(function() {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = function() {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

/**
 * Smooth scroll to element
 */
function scrollToElement(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Export functions for use in other scripts
window.VerduraTheme = {
  showNotification,
  scrollToElement,
  getUrlParameter,
  debounce,
  throttle,
  updateCartCount
};
