// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.orange-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add to cart buttons on home page
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const item = {
                id: id,
                title: this.parentElement.querySelector('h3').textContent,
                price: parseFloat(this.parentElement.querySelector('.price').textContent.replace('$', '')),
                image: this.parentElement.querySelector('img').src,
                quantity: 1
            };
            
            addToCart(item);
            
            // Show confirmation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = 'var(--primary-color)';
            }, 2000);
        });
    });
});

// Cart functionality is in cart.js