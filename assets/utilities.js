/**
 * Verdura Theme Utilities
 * Common JavaScript functions and utilities
 */

class Utilities {
  static debounce(func, wait, immediate = false) {
    let timeout = null;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, delay) {
    let timeoutId = null;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  static getSectionId() {
    return document.getElementById('shopify-section-' + template.suffix)
  }

  static fetchConfig(type = 'json') {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
    };
  }

  static formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || '${{amount}}';

    function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      const parts = number.split('.');
      const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
      const centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  static getUrlParams() {
    return new URLSearchParams(window.location.search);
  }

  static updateUrlParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== '') {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    return url.toString();
  }

  static replaceUrlParams(url) {
    window.history.replaceState(null, null, url);
  }

  static isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  static onDocumentReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  static animate(element, keyframes, options = {}) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve();
    }

    const animation = element.animate(keyframes, {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
      ...options
    });

    return animation.finished;
  }

  static slideDown(element, duration = 300) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.display = 'block';
      return Promise.resolve();
    }

    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.height = '0';
    element.style.overflow = 'hidden';

    return this.animate(element, [
      { height: '0px' },
      { height: `${height}px` }
    ], { duration }).then(() => {
      element.style.height = '';
      element.style.overflow = '';
    });
  }

  static slideUp(element, duration = 300) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.display = 'none';
      return Promise.resolve();
    }

    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.overflow = 'hidden';

    return this.animate(element, [
      { height: `${height}px` },
      { height: '0px' }
    ], { duration }).then(() => {
      element.style.display = 'none';
      element.style.height = '';
      element.style.overflow = '';
    });
  }

  static fadeIn(element, duration = 300) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.opacity = '1';
      return Promise.resolve();
    }

    element.style.opacity = '0';
    element.style.display = 'block';

    return this.animate(element, [
      { opacity: '0' },
      { opacity: '1' }
    ], { duration });
  }

  static fadeOut(element, duration = 300) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.display = 'none';
      return Promise.resolve();
    }

    return this.animate(element, [
      { opacity: '1' },
      { opacity: '0' }
    ], { duration }).then(() => {
      element.style.display = 'none';
    });
  }
}

// Make utilities available globally
window.Utilities = Utilities;

// Auto-setup on DOM ready
Utilities.onDocumentReady(() => {
  // Remove no-js class
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Add loaded class to body after page load
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Handle prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotionPreference(mq) {
    if (mq.matches) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }
  handleMotionPreference(mediaQuery);
  mediaQuery.addEventListener('change', handleMotionPreference);
});

export { Utilities };
