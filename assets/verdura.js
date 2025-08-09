/**
 * Verdura Theme JavaScript
 * Initializes theme-specific functionality and custom elements
 */

// Initialize newsletter form
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForms = document.querySelectorAll('newsletter-form');
  if (newsletterForms.length > 0) {
    console.log('Newsletter forms initialized');
  }
});

// Initialize product slider
document.addEventListener('DOMContentLoaded', function() {
  const productSliders = document.querySelectorAll('product-slider');
  if (productSliders.length > 0) {
    console.log('Product sliders initialized');
  }
});

// Utility functions for theme
const VerduraTheme = {
  // Smooth scroll to element
  scrollTo: function(element, offset = 0) {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  },

  // Format price
  formatPrice: function(price, currency = '$') {
    return currency + (price / 100).toFixed(2);
  },

  // Debounce function
  debounce: function(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function
  throttle: function(func, limit) {
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
};

// Make VerduraTheme globally available
window.VerduraTheme = VerduraTheme;

// Initialize theme on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Verdura theme initialized');
  
  // Add any additional initialization here
  // For example: analytics, third-party integrations, etc.
}); 