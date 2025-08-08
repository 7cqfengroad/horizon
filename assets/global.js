/**
 * Verdura Global JavaScript
 * Handles cart functionality, product interactions, and general site features
 */

class CartAPI {
  constructor() {
    this.baseUrl = window.location.origin;
  }

  async getCart() {
    try {
      const response = await fetch(`${this.baseUrl}/cart.js`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  async addToCart(items) {
    try {
      const response = await fetch(`${this.baseUrl}/cart/add.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: Array.isArray(items) ? items : [items] })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.description || 'Failed to add to cart');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async updateCart(updates) {
    try {
      const response = await fetch(`${this.baseUrl}/cart/update.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  async changeCartItem(line, quantity) {
    try {
      const response = await fetch(`${this.baseUrl}/cart/change.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line: line,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to change cart item');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error changing cart item:', error);
      throw error;
    }
  }
}

class NotificationManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create notification container if it doesn't exist
    this.container = document.getElementById('notification-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'notification-container';
      this.container.className = 'notification-container';
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Close notification">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
          </svg>
        </button>
      </div>
    `;

    // Add event listener for close button
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => this.hide(notification));

    // Add to container
    this.container.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('notification--visible');
    });

    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => this.hide(notification), duration);
    }

    return notification;
  }

  hide(notification) {
    notification.classList.remove('notification--visible');
    notification.classList.add('notification--hiding');
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

class ProductForm {
  constructor(form) {
    this.form = form;
    this.productId = this.form.dataset.productId;
    this.variantIdInput = this.form.querySelector('[name="id"]');
    this.submitButton = this.form.querySelector('[type="submit"]');
    this.quantityInput = this.form.querySelector('[name="quantity"]');
    this.variantSelectors = this.form.querySelectorAll('[name^="options"]');
    
    this.cart = new CartAPI();
    this.notifications = new NotificationManager();
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Add change listeners to variant selectors
    this.variantSelectors.forEach(selector => {
      selector.addEventListener('change', this.handleVariantChange.bind(this));
    });

    // Add quantity controls
    this.setupQuantityControls();
  }

  setupQuantityControls() {
    const quantityWrapper = this.quantityInput?.closest('.quantity-input-wrapper');
    if (!quantityWrapper) return;

    const minusBtn = quantityWrapper.querySelector('.quantity-minus');
    const plusBtn = quantityWrapper.querySelector('.quantity-plus');

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(this.quantityInput.value) || 1;
        if (currentValue > 1) {
          this.quantityInput.value = currentValue - 1;
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(this.quantityInput.value) || 1;
        this.quantityInput.value = currentValue + 1;
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    if (!this.variantIdInput || !this.variantIdInput.value) {
      this.notifications.error('Please select a variant');
      return;
    }

    const formData = new FormData(this.form);
    const variantId = parseInt(formData.get('id'));
    const quantity = parseInt(formData.get('quantity')) || 1;

    // Disable submit button
    const originalText = this.submitButton.textContent;
    this.submitButton.disabled = true;
    this.submitButton.textContent = 'Adding...';

    try {
      await this.cart.addToCart({
        id: variantId,
        quantity: quantity
      });

      this.notifications.success('Product added to cart!');
      this.updateCartCount();
      
      // Trigger custom event
      document.dispatchEvent(new CustomEvent('cart:item-added', {
        detail: { variantId, quantity }
      }));

    } catch (error) {
      this.notifications.error(error.message || 'Failed to add to cart');
    } finally {
      // Re-enable submit button
      this.submitButton.disabled = false;
      this.submitButton.textContent = originalText;
    }
  }

  handleVariantChange() {
    // This would typically update price, availability, etc.
    // For now, just trigger a custom event
    document.dispatchEvent(new CustomEvent('variant:changed', {
      detail: { form: this.form }
    }));
  }

  async updateCartCount() {
    try {
      const cart = await this.cart.getCart();
      const cartIcons = document.querySelectorAll('[data-cart-count]');
      
      cartIcons.forEach(icon => {
        let countElement = icon.querySelector('.cart-count');
        
        if (cart.item_count > 0) {
          if (!countElement) {
            countElement = document.createElement('span');
            countElement.className = 'cart-count';
            icon.appendChild(countElement);
          }
          countElement.textContent = cart.item_count;
        } else if (countElement) {
          countElement.remove();
        }
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }
}

class SearchModal {
  constructor() {
    this.modal = null;
    this.input = null;
    this.results = null;
    this.isOpen = false;
    this.searchTimeout = null;
    
    this.init();
  }

  init() {
    // Create modal structure
    this.createModal();
    
    // Add event listeners to search triggers
    const searchTriggers = document.querySelectorAll('[data-search-trigger]');
    searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  createModal() {
    const modalHtml = `
      <div class="search-modal" id="search-modal">
        <div class="search-modal__overlay"></div>
        <div class="search-modal__content">
          <div class="search-modal__header">
            <input type="text" 
                   class="search-modal__input" 
                   placeholder="Search products..."
                   autocomplete="off">
            <button class="search-modal__close" aria-label="Close search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="search-modal__results"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    this.modal = document.getElementById('search-modal');
    this.input = this.modal.querySelector('.search-modal__input');
    this.results = this.modal.querySelector('.search-modal__results');
    
    // Add event listeners
    this.modal.querySelector('.search-modal__close').addEventListener('click', () => this.close());
    this.modal.querySelector('.search-modal__overlay').addEventListener('click', () => this.close());
    this.input.addEventListener('input', this.handleSearch.bind(this));
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('search-modal--active');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Focus input after animation
    setTimeout(() => {
      this.input.focus();
    }, 100);
  }

  close() {
    this.modal.classList.remove('search-modal--active');
    this.isOpen = false;
    document.body.style.overflow = '';
    this.input.value = '';
    this.results.innerHTML = '';
  }

  handleSearch(event) {
    const query = event.target.value.trim();
    
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    if (query.length < 2) {
      this.results.innerHTML = '';
      return;
    }
    
    // Debounce search
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    try {
      this.results.innerHTML = '<div class="search-loading">Searching...</div>';
      
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`);
      const data = await response.json();
      
      this.displayResults(data.resources.results.products || []);
    } catch (error) {
      console.error('Search error:', error);
      this.results.innerHTML = '<div class="search-error">Search failed. Please try again.</div>';
    }
  }

  displayResults(products) {
    if (products.length === 0) {
      this.results.innerHTML = '<div class="search-empty">No products found</div>';
      return;
    }
    
    const resultsHtml = products.map(product => `
      <a href="${product.url}" class="search-result">
        <div class="search-result__image">
          ${product.image ? `<img src="${product.image}" alt="${product.title}">` : '<div class="search-result__placeholder"></div>'}
        </div>
        <div class="search-result__info">
          <h3 class="search-result__title">${product.title}</h3>
          <div class="search-result__price">${product.price}</div>
        </div>
      </a>
    `).join('');
    
    this.results.innerHTML = resultsHtml;
  }
}

// Recent Products Manager
class RecentProductsManager {
  constructor() {
    this.storageKey = 'verdura_recent_products';
    this.maxItems = 8;
  }

  add(product) {
    let recent = this.get();
    
    // Remove if already exists
    recent = recent.filter(item => item.id !== product.id);
    
    // Add to beginning
    recent.unshift(product);
    
    // Keep only max items
    recent = recent.slice(0, this.maxItems);
    
    localStorage.setItem(this.storageKey, JSON.stringify(recent));
  }

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

// Lazy Loading for Images
class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              this.imageObserver.unobserve(img);
            }
          }
        });
      });

      this.observeImages();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  observeImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.imageObserver.observe(img));
  }

  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product forms
  const productForms = document.querySelectorAll('form[action*="/cart/add"]');
  productForms.forEach(form => new ProductForm(form));

  // Initialize search modal
  new SearchModal();

  // Initialize lazy loading
  new LazyLoader();

  // Initialize recent products manager
  window.recentProducts = new RecentProductsManager();

  // Track product views on product pages
  const productPage = document.querySelector('[data-product-id]');
  if (productPage) {
    const productId = productPage.dataset.productId;
    const productTitle = document.querySelector('.product-title')?.textContent;
    const productImage = document.querySelector('.product-main-image')?.src;
    const productPrice = document.querySelector('.product-price')?.textContent;
    const productUrl = window.location.pathname;

    if (productId && productTitle) {
      window.recentProducts.add({
        id: productId,
        title: productTitle,
        image: productImage,
        price: productPrice,
        url: productUrl
      });
    }
  }

  // Global cart functionality
  window.cart = new CartAPI();
  window.notifications = new NotificationManager();
});

// Add notification styles
const notificationStyles = `
  <style>
    .notification-container {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 10000;
      max-width: 400px;
    }

    .notification {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
      transform: translateX(100%);
      transition: transform 0.3s ease, opacity 0.3s ease;
      opacity: 0;
    }

    .notification--visible {
      transform: translateX(0);
      opacity: 1;
    }

    .notification--hiding {
      transform: translateX(100%);
      opacity: 0;
    }

    .notification--success {
      border-left: 4px solid #4CAF50;
    }

    .notification--error {
      border-left: 4px solid #ff4444;
    }

    .notification--info {
      border-left: 4px solid #2196F3;
    }

    .notification__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
    }

    .notification__message {
      font-size: 1.4rem;
      margin-right: 1rem;
    }

    .notification__close {
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    .notification__close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .search-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10vh;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .search-modal--active {
      opacity: 1;
      visibility: visible;
    }

    .search-modal__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .search-modal__content {
      position: relative;
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      margin: 0 2rem;
    }

    .search-modal__header {
      display: flex;
      align-items: center;
      padding: 2rem;
      border-bottom: 1px solid #eee;
    }

    .search-modal__input {
      flex: 1;
      border: none;
      font-size: 1.8rem;
      outline: none;
    }

    .search-modal__close {
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      padding: 0.5rem;
      margin-left: 1rem;
    }

    .search-modal__results {
      max-height: 400px;
      overflow-y: auto;
    }

    .search-result {
      display: flex;
      align-items: center;
      padding: 1.5rem 2rem;
      text-decoration: none;
      color: inherit;
      border-bottom: 1px solid #eee;
      transition: background-color 0.3s ease;
    }

    .search-result:hover {
      background-color: #f5f5f5;
    }

    .search-result__image {
      width: 60px;
      height: 60px;
      margin-right: 1.5rem;
      border-radius: 4px;
      overflow: hidden;
      background: #f5f5f5;
    }

    .search-result__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .search-result__placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
    }

    .search-result__title {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .search-result__price {
      font-size: 1.3rem;
      color: #666;
    }

    .search-loading,
    .search-error,
    .search-empty {
      padding: 3rem 2rem;
      text-align: center;
      color: #666;
      font-size: 1.4rem;
    }

    @media screen and (max-width: 768px) {
      .notification-container {
        left: 1rem;
        right: 1rem;
        max-width: none;
      }

      .search-modal {
        padding-top: 5vh;
      }
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles); 