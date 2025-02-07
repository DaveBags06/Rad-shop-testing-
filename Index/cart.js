let cartItems = [];

function addToCart(name, price) {
    const cleanPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: name,
            price: cleanPrice,
            quantity: 1
        });
    }
    updateCartUI();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartUI();
}

function updateQuantity(index, change) {
    const item = cartItems[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        item.quantity = newQuantity;
    }
    updateCartUI();
}

function updateCartUI() {
    const cart = document.getElementById('cart');
    const cartContent = `
        <div class="cart-header">
            <h2>Shopping Cart</h2>
            <button onclick="toggleCart()" style="background:none;border:none;cursor:pointer">✕</button>
        </div>
        <div class="cart-items">
            ${cartItems.map((item, index) => `
                <div class="cart-item">
                    <div>
                        <h3>${item.name}</h3>
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div>
                        <p>₱${(item.price * item.quantity).toLocaleString()}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-total">
            <h3>Total: ₱${calculateTotal().toLocaleString()}</h3>
            <button onclick="checkout()" style="width:100%;padding:10px;background:#333;color:white;border:none;border-radius:5px;margin-top:10px">
                Checkout
            </button>
        </div>
    `;
    
    cart.innerHTML = cartContent;
}

function calculateTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('active');
}

function checkout() {
    alert('Thank you for shopping!');
}

// Add cart toggle button
const cartToggle = document.createElement('div');
cartToggle.className = 'cart-toggle';
cartToggle.innerHTML = '🛒';
cartToggle.onclick = toggleCart;
document.body.appendChild(cartToggle);



