// Payment functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load order summary from cart
    updateOrderSummary();
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update the input value
            this.value = value;
        });
    }
    
    // Format expiry date input
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            // Update the input value
            this.value = value;
        });
    }
    
    // Payment form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
            const nameOnCard = document.getElementById('name-on-card').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (cardNumber.length !== 16) {
                alert('Please enter a valid 16-digit card number');
                return;
            }
            
            if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
                alert('Please enter a valid expiry date in MM/YY format');
                return;
            }
            
            if (cvv.length < 3) {
                alert('Please enter a valid CVV');
                return;
            }
            
            if (!nameOnCard.trim()) {
                alert('Please enter the name on card');
                return;
            }
            
            if (!address.trim()) {
                alert('Please enter your delivery address');
                return;
            }
            
            if (!phone.trim()) {
                alert('Please enter your phone number');
                return;
            }
            
            // Process payment (in a real app, this would be done server-side)
            processPayment();
        });
    }
});

// Update order summary from cart
function updateOrderSummary() {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    
    if (cart.length === 0) {
        summaryItems.innerHTML = '<p>Your cart is empty</p>';
        summaryTotal.textContent = '$0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="summary-item">
                <span class="summary-item-name">${item.title} × ${item.quantity}</span>
                <span class="summary-item-price">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    summaryItems.innerHTML = html;
    summaryTotal.textContent = `$${total.toFixed(2)}`;
}

// Process payment (mock function)
function processPayment() {
    // Show loading state
    const submitBtn = document.querySelector('#payment-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would handle the payment gateway response here
        alert('Payment successful! Your order has been placed.');
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    }, 2000);
}