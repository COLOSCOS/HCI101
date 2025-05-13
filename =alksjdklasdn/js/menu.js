// Menu items data
const menuItems = [
    {
        id: 'b1',
        title: 'Classic Burger',
        category: 'burgers',
        price: 8.99,
        desc: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce',
        img: 'images/burger1.jpg'
    },
    {
        id: 'b2',
        title: 'Cheeseburger',
        category: 'burgers',
        price: 9.99,
        desc: 'Classic burger with a slice of American cheese melted on top',
        img: 'images/burger2.jpg'
    },
    {
        id: 'b3',
        title: 'Bacon Burger',
        category: 'burgers',
        price: 10.99,
        desc: 'Juicy beef patty topped with crispy bacon strips and cheddar cheese',
        img: 'images/burger3.jpg'
    },
    {
        id: 'p1',
        title: 'Margherita Pizza',
        category: 'pizzas',
        price: 12.99,
        desc: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        img: 'images/pizza1.jpg'
    },
    {
        id: 'p2',
        title: 'Pepperoni Pizza',
        category: 'pizzas',
        price: 14.99,
        desc: 'Tomato sauce, mozzarella, and loads of pepperoni',
        img: 'images/pizza2.jpg'
    },
    {
        id: 'p3',
        title: 'Vegetarian Pizza',
        category: 'pizzas',
        price: 13.99,
        desc: 'Tomato sauce, mozzarella, bell peppers, mushrooms, and olives',
        img: 'images/pizza3.jpg'
    },
    {
        id: 's1',
        title: 'California Roll',
        category: 'sushi',
        price: 6.99,
        desc: 'Crab, avocado, and cucumber wrapped in seaweed and rice',
        img: 'images/sushi1.jpg'
    },
    {
        id: 's2',
        title: 'Salmon Nigiri',
        category: 'sushi',
        price: 7.99,
        desc: 'Fresh salmon slices on pressed rice',
        img: 'images/sushi2.jpg'
    },
    {
        id: 's3',
        title: 'Dragon Roll',
        category: 'sushi',
        price: 11.99,
        desc: 'Eel, crab, and cucumber topped with avocado slices',
        img: 'images/sushi3.jpg'
    },
    {
        id: 'd1',
        title: 'Chocolate Lava Cake',
        category: 'desserts',
        price: 6.99,
        desc: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        img: 'images/dessert1.jpg'
    },
    {
        id: 'd2',
        title: 'Cheesecake',
        category: 'desserts',
        price: 5.99,
        desc: 'Classic New York style cheesecake with strawberry topping',
        img: 'images/dessert2.jpg'
    },
    {
        id: 'd3',
        title: 'Tiramisu',
        category: 'desserts',
        price: 6.99,
        desc: 'Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
        img: 'images/dessert3.jpg'
    },
    {
        id: 'dr1',
        title: 'Soft Drink',
        category: 'drinks',
        price: 2.49,
        desc: 'Choice of Coke, Diet Coke, Sprite, or Fanta',
        img: 'images/drink1.jpg'
    },
    {
        id: 'dr2',
        title: 'Iced Tea',
        category: 'drinks',
        price: 2.99,
        desc: 'Freshly brewed iced tea with lemon',
        img: 'images/drink2.jpg'
    },
    {
        id: 'dr3',
        title: 'Milkshake',
        category: 'drinks',
        price: 4.99,
        desc: 'Vanilla, chocolate, or strawberry milkshake',
        img: 'images/drink3.jpg'
    }
];

// Load menu items
document.addEventListener('DOMContentLoaded', function() {
    displayMenuItems(menuItems);
    setupCategoryButtons();
    setupSearch();
});

// Display menu items
function displayMenuItems(items) {
    const menuGrid = document.getElementById('menu-items');
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<p class="no-items">No items found</p>';
        return;
    }
    
    let html = '';
    
    items.forEach(item => {
        html += `
            <div class="menu-item" data-category="${item.category}">
                <img src="${item.img}" alt="${item.title}" class="menu-item-img">
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <p class="menu-item-desc">${item.desc}</p>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
    });
    
    menuGrid.innerHTML = html;
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const item = menuItems.find(item => item.id === id);
            
            if (item) {
                addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.img,
                    quantity: 1
                });
                
                // Show confirmation
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = 'var(--primary-color)';
                }, 2000);
            }
        });
    });
}

// Setup category filter buttons
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterMenuItems(category);
        });
    });
}

// Filter menu items by category
function filterMenuItems(category) {
    if (category === 'all') {
        displayMenuItems(menuItems);
        return;
    }
    
    const filteredItems = menuItems.filter(item => item.category === category);
    displayMenuItems(filteredItems);
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('menu-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            // If search is empty, show items based on selected category
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            filterMenuItems(activeCategory);
            return;
        }
        
        const filteredItems = menuItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.desc.toLowerCase().includes(searchTerm)
        );
        
        displayMenuItems(filteredItems);
    });
}