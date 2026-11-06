document.addEventListener("DOMContentLoaded", () => {
    // 1. Mouse Glow Tracking Effect
    const cursorGlow = document.getElementById('cursorGlow');
    window.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 2. Interactive Canvas Particle Engine
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8 + 0.2;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(157, 78, 221, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 3. Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

//------------------------------------------------------cart--------------------------------------

// Cart Array & Logic
let cart = [];

const cartBtn = document.getElementById("cart-toggle-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const whatsappCheckoutBtn = document.getElementById("whatsapp-checkout-btn");

// Toggle Cart Drawer
function toggleCart() {
    cartDrawer.classList.toggle("open");
    cartOverlay.classList.toggle("active");
}

if (cartBtn) cartBtn.addEventListener("click", toggleCart);
if (cartCloseBtn) cartCloseBtn.addEventListener("click", toggleCart);
if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);

// Add to Cart Function (ප්‍රඩක්ට් පේජ් එකේ "Add to Cart" බටන් එකට මෙය සම්බන්ධ කරන්න)
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    toggleCart(); // Cart එක එකතු කළ ගමන් සයිඩ් ඩ්‍රෝවර් එක ඕපන් වේ
}

// Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart UI & Totals
function updateCartUI() {
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-text">Your bag is currently empty.</p>`;
        cartTotal.innerText = `LKR 0.00`;
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>LKR ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;
    });

    cartTotal.innerText = `LKR ${total.toLocaleString()}`;
}

// WhatsApp Checkout Integration
if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let message = "Hi NULL Store, I want to order the following items:\n\n";
        let total = 0;

        cart.forEach(item => {
            message += `- ${item.name} (Qty: ${item.quantity}) - LKR ${item.price * item.quantity}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: LKR ${total.toLocaleString()}`;
        
        let encodedMessage = encodeURIComponent(message);
        // මෙහි ඔබේ WhatsApp අංකය යොදන්න (උදා: 9477xxxxxxx)
        window.open(`https://wa.me/94770000000?text=${encodedMessage}`, '_blank');
    });
}

//-------------------------------------------------------------------------------home----------------

document.addEventListener("DOMContentLoaded", () => {
    console.log("NULL System Initialized // Secure Ledger Active");

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter Subscribe Interactive Feedback
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            const inputField = subscribeForm.querySelector('input[type="email"]');
            if (inputField && inputField.value.trim() !== "") {
                alert("Transmission successful. You have been added to the NULL list.");
                inputField.value = "";
            }
        });
    }
});

//---------------------------------------------------------------------