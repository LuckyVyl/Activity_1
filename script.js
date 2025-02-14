document.addEventListener("DOMContentLoaded", () => {
    
    const products = [
        { id: 1, name: "Casual Black Polo", price: 900, image: "product1.jpg" },
        { id: 2, name: "Waterproof Hoodie", price: 750, image: "product2.jpg" },
        { id: 3, name: "Blue Sweatshirt", price: 650, image: "product3.jpg" },
        { id: 4, name: "Hooded Urban Jacket", price: 500, image: "product4.jpg" },
        { id: 5, name: "Gray Sports Jacket", price: 400, image: "product5.jpg" },
        { id: 6, name: "Green Hoodie", price: 1000, image: "product6.jpg" },
        { id: 7, name: "Dark Green Hoodie", price: 300, image: "product7.jpg" },
        { id: 8, name: "Light Green Hoodie", price: 244, image: "product8.jpg" }
    ];

    const cart = [];
    const productContainer = document.querySelector(".product-content");
    const cartCount = document.querySelector(".cart-item-count");
    const cartDisplay = document.createElement("div");
    cartDisplay.classList.add("cart-display");
    document.body.appendChild(cartDisplay);

    function renderProducts() {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productBox = document.createElement("div");
            productBox.classList.add("product-box");
            productBox.innerHTML = `
                <div class="img-box">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h2 class="product-title">${product.name}</h2>
                <div class="price-and-cart">
                    <span class="price">$${product.price}</span>
                    <i class="ri-shopping-bag-line add-cart" data-id="${product.id}"></i>
                </div>
            `;
            productContainer.appendChild(productBox);
        });
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".add-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(item => item.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartDisplay.innerHTML = "<h2>Shopping Cart</h2>";
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            cartDisplay.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${item.price * item.quantity}</span>
                </div>
            `;
        });
        cartDisplay.innerHTML += `<h3>Total: $${totalPrice}</h3>`;

        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.visibility = totalItems > 0 ? "visible" : "hidden";
    }

    renderProducts();
});

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.getElementById("cart-container");
    const closeCart = document.getElementById("close-cart");

   
    cartIcon.addEventListener("click", function () {
        cartContainer.classList.toggle("cart-visible");
    });


    closeCart.addEventListener("click", function () {
        cartContainer.classList.remove("cart-visible");
    });
});

