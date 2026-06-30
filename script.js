// WhatsApp Business Number
const WHATSAPP_NUMBER = '923001234567'; // Change this to your WhatsApp number

// Sample Products Database
const products = [
    {
        id: 1,
        name: 'Premium Headphones',
        category: 'electronics',
        price: 4999,
        description: 'High-quality wireless headphones with noise cancellation',
        icon: '🎧'
    },
    {
        id: 2,
        name: 'Organic Face Cream',
        category: 'beauty',
        price: 1299,
        description: 'Natural and organic face cream for all skin types',
        icon: '💄'
    },
    {
        id: 3,
        name: 'Cotton T-Shirt',
        category: 'clothing',
        price: 799,
        description: 'Premium quality 100% cotton t-shirt, comfortable fit',
        icon: '👕'
    },
    {
        id: 4,
        name: 'Smartwatch',
        category: 'electronics',
        price: 8999,
        description: 'Latest smartwatch with fitness tracking features',
        icon: '⌚'
    },
    {
        id: 5,
        name: 'Leather Wallet',
        category: 'accessories',
        price: 2499,
        description: 'Genuine leather wallet with RFID protection',
        icon: '👜'
    },
    {
        id: 6,
        name: 'Lip Balm Set',
        category: 'beauty',
        price: 899,
        description: 'Set of 5 premium lip balms with different flavors',
        icon: '💋'
    },
    {
        id: 7,
        name: 'Jeans',
        category: 'clothing',
        price: 2299,
        description: 'Stylish denim jeans with perfect fit',
        icon: '👖'
    },
    {
        id: 8,
        name: 'Sunglasses',
        category: 'accessories',
        price: 3499,
        description: 'UV protected stylish sunglasses',
        icon: '😎'
    },
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadges = document.querySelectorAll('#cart-count');
    cartBadges.forEach(badge => {
        badge.textContent = count;
    });
}

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('✅ Added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Update Cart Quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

// Display Products
function displayProducts(productsToDisplay = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <div style="font-size: 60px;">${product.icon}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                    <button class="product-btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display Featured Products on Home
function displayFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProducts');
    if (!featuredGrid) return;
    
    const featured = products.slice(0, 6);
    featuredGrid.innerHTML = featured.map(product => `
        <div class="product-card" style="cursor: pointer;" onclick="window.location.href='shop.html'">
            <div class="product-image">
                <div style="font-size: 60px;">${product.icon}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Product Modal
let currentProductId = null;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    currentProductId = productId;
    
    document.getElementById('modalImage').innerHTML = `<div style="font-size: 100px; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #ecf0f1;">${product.icon}</div>`;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.description;
    document.getElementById('modalPrice').textContent = `Rs. ${product.price.toLocaleString()}`;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('quantity').value = 1;
    
    document.getElementById('productModal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Modal Close Button
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.onclick = closeProductModal;
}

// Quantity Controls
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const quantityInput = document.getElementById('quantity');

if (decreaseQtyBtn) {
    decreaseQtyBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
    });
}

if (increaseQtyBtn) {
    increaseQtyBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}

// Add to Cart from Modal
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(currentProductId, quantity);
        closeProductModal();
    });
}

// Order on WhatsApp from Modal
const orderWhatsAppBtn = document.getElementById('orderWhatsAppBtn');
if (orderWhatsAppBtn) {
    orderWhatsAppBtn.addEventListener('click', () => {
        const product = products.find(p => p.id === currentProductId);
        const quantity = document.getElementById('quantity').value;
        const message = `Hi! I want to order ${quantity}x ${product.name} (Rs. ${product.price}). Total: Rs. ${product.price * quantity}`;
        sendWhatsAppMessage(message);
    });
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 20px;">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-actions">
                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, this.value)">
                <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 200 : 0;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = `Rs. ${shipping.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `Rs. ${total.toLocaleString()}`;
}

// Checkout Button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    });
}

// Cart WhatsApp Button
const cartWhatsAppBtn = document.getElementById('cartWhatsAppBtn');
if (cartWhatsAppBtn) {
    cartWhatsAppBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        sendCartWhatsAppMessage();
    });
}

// Send Cart via WhatsApp
function sendCartWhatsAppMessage() {
    let message = '🛒 *Shopping Cart Order*\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 200;
    const total = subtotal + shipping;
    
    message += `\n📦 Subtotal: Rs. ${subtotal.toLocaleString()}\n🚚 Shipping: Rs. ${shipping}\n💳 *Total: Rs. ${total.toLocaleString()}*\n\nPlease confirm my order.`;
    
    sendWhatsAppMessage(message);
}

// Send WhatsApp Message
function sendWhatsAppMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Checkout Form
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === 'whatsapp') {
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
                delivery: document.querySelector('input[name="delivery"]:checked').value
            };
            
            sendCheckoutWhatsAppMessage(formData);
        } else {
            // Cash on Delivery
            const fullName = document.getElementById('fullName').value;
            showNotification(`✅ Order confirmed! Will be delivered to ${fullName}`);
            
            // Clear cart and redirect
            setTimeout(() => {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'index.html';
            }, 2000);
        }
    });
    
    // Display checkout items
    displayCheckoutSummary();
}

// Display Checkout Summary
function displayCheckoutSummary() {
    const orderItems = document.getElementById('orderItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (!orderItems) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 200;
    const total = subtotal + shipping;
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} x${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (checkoutTotal) checkoutTotal.textContent = `Rs. ${total.toLocaleString()}`;
    
    // Update shipping based on delivery method
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const newShipping = radio.value === 'standard' ? 200 : 500;
            if (checkoutShipping) checkoutShipping.textContent = `Rs. ${newShipping}`;
            if (checkoutTotal) checkoutTotal.textContent = `Rs. ${subtotal + newShipping}`;
        });
    });
}

// Send Checkout via WhatsApp
function sendCheckoutWhatsAppMessage(formData) {
    let message = '📦 *New Order via WhatsApp*\n\n';
    message += `👤 *Name:* ${formData.fullName}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📱 *Phone:* ${formData.phone}\n`;
    message += `🏠 *Address:* ${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}\n`;
    message += `🚚 *Delivery:* ${formData.delivery === 'standard' ? 'Standard (3-5 days)' : 'Express (1-2 days)'}\n\n`;
    
    message += '*📋 Items:*\n';
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = formData.delivery === 'standard' ? 200 : 500;
    const total = subtotal + shipping;
    
    message += `\n💰 *Subtotal: Rs. ${subtotal.toLocaleString()}*\n`;
    message += `📦 *Shipping: Rs. ${shipping}*\n`;
    message += `💳 *Total: Rs. ${total}*\n\n`;
    message += `✅ Please confirm my order.`;
    
    sendWhatsAppMessage(message);
    
    // Clear cart and show success
    setTimeout(() => {
        showNotification('✅ Order sent to WhatsApp!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1000);
}

// Clear Filters
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortFilter').value = 'name';
    displayProducts();
}

// Filters
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

if (categoryFilter || sortFilter) {
    function applyFilters() {
        let filtered = [...products];
        
        if (categoryFilter && categoryFilter.value) {
            filtered = filtered.filter(p => p.category === categoryFilter.value);
        }
        
        if (sortFilter) {
            switch(sortFilter.value) {
                case 'price-low':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
        }
        
        displayProducts(filtered);
        
        // Update products count
        const productsCount = document.getElementById('productsCount');
        if (productsCount) {
            productsCount.textContent = filtered.length;
        }
    }
    
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Modal Close on Outside Click
const modal = document.getElementById('productModal');
if (modal) {
    window.onclick = (event) => {
        if (event.target === modal) {
            closeProductModal();
        }
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayProducts();
    displayFeaturedProducts();
    displayCart();
    displayCheckoutSummary();
    
    // Update products count on shop page
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = products.length;
    }
});