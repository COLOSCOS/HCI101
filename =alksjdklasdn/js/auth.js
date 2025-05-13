// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Here you would typically validate and send to server
            // For demo purposes, we'll just show a success message
            alert('Login successful! Redirecting...');
            
            // In a real app, you would redirect after successful login
            // window.location.href = 'index.html';
        });
    }
    
    // Social login buttons
    const googleBtn = document.querySelector('.social-btn.google');
    const facebookBtn = document.querySelector('.social-btn.facebook');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Implement Google login
            alert('Google login would be implemented here');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            // Implement Facebook login
            alert('Facebook login would be implemented here');
        });
    }
    
    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset functionality would be implemented here');
        });
    }
});