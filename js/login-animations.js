/**
 * Sparez - Login Page Animations
 * This script adds fluid animations to the login page elements
 * and handles basic login functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginContainer = document.querySelector('.login-container');
    const loginLogo = document.querySelector('.login-logo');
    const formGroups = document.querySelectorAll('.form-group');
    const socialButtons = document.querySelectorAll('.social-btn');
    const submitButtons = document.querySelectorAll('.submit-btn');
    
    // Get form elements
    const loginFormContainer = document.getElementById('loginForm');
    const signupFormContainer = document.getElementById('signupForm');
    const loginFormElement = loginFormContainer.querySelector('form');
    const signupFormElement = signupFormContainer.querySelector('form');
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    
    // Handle login form submission
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Check test credentials
            if (email === 'test@gmail.com' && password === 'test') {
                // Create success notification
                const notification = document.createElement('div');
                notification.className = 'login-notification success';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Login successful! Redirecting...</span>
                `;
                
                // Add to page
                loginContainer.appendChild(notification);
                
                // Animate button
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
                submitBtn.disabled = true;
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            } else {
                // Create error notification
                const notification = document.createElement('div');
                notification.className = 'login-notification error';
                notification.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>Invalid email or password</span>
                `;
                
                // Add to page
                loginContainer.appendChild(notification);
                
                // Remove after delay
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 3000);
                
                // Shake the form
                loginFormElement.classList.add('shake');
                setTimeout(() => {
                    loginFormElement.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Handle signup form submission
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'login-notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Account created successfully!</span>
            `;
            
            // Add to page
            loginContainer.appendChild(notification);
            
            // Animate button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitBtn.disabled = true;
            
            // Switch to login form after delay
            setTimeout(() => {
                // Remove notification
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 300);
                
                // Switch to login form
                if (showLoginBtn) {
                    showLoginBtn.click();
                }
                
                // Reset form
                signupFormElement.reset();
                submitBtn.innerHTML = 'Create account';
                submitBtn.disabled = false;
                
                // Show success message in login form
                setTimeout(() => {
                    const loginNotification = document.createElement('div');
                    loginNotification.className = 'login-notification success';
                    loginNotification.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>Please sign in with your new account</span>
                    `;
                    
                    loginContainer.appendChild(loginNotification);
                    
                    setTimeout(() => {
                        loginNotification.classList.add('fade-out');
                        setTimeout(() => {
                            loginNotification.remove();
                        }, 300);
                    }, 3000);
                }, 500);
            }, 2000);
        });
    }
    
    // Add staggered entrance animations
    function animateEntrance() {
        // Initial delay
        let delay = 0.1;
        
        // Animate logo with bounce effect
        if (loginLogo) {
            loginLogo.style.animation = `fadeIn 0.6s ease-out ${delay}s both, floatAnimation 3s ease-in-out infinite`;
            delay += 0.1;
        }
        
        // Animate social buttons with staggered delay
        socialButtons.forEach((btn, index) => {
            btn.style.animation = `fadeIn 0.5s ease-out ${delay + (index * 0.1)}s both, slideUp 0.5s ease-out ${delay + (index * 0.1)}s both`;
        });
        
        delay += 0.3;
        
        // Animate form groups with staggered delay
        formGroups.forEach((group, index) => {
            group.style.animation = `fadeIn 0.5s ease-out ${delay + (index * 0.1)}s both, slideUp 0.5s ease-out ${delay + (index * 0.1)}s both`;
        });
        
        delay += 0.3;
        
        // Animate submit button with pulse effect
        submitButtons.forEach(btn => {
            btn.style.animation = `fadeIn 0.5s ease-out ${delay}s both, slideUp 0.5s ease-out ${delay}s both`;
            
            // Add pulse effect on hover
            btn.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });
            
            btn.addEventListener('mouseleave', function() {
                this.classList.remove('pulse');
            });
        });
    }
    
    // Run entrance animations
    animateEntrance();
    
    // Form toggle animations with enhanced transitions
    if (showSignupBtn && showLoginBtn && loginFormContainer && signupFormContainer) {
        // Enhanced form toggle with smoother transitions
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // First fade out login form
            loginFormContainer.style.opacity = '0';
            loginFormContainer.style.transform = 'translateX(-30px)';
            
            // After a short delay, start moving forms
            setTimeout(() => {
                loginFormContainer.classList.remove('active');
                signupFormContainer.classList.add('active');
                
                // Position the signup form
                signupFormContainer.style.transform = 'translateX(0)';
                
                // Fade in the signup form
                setTimeout(() => {
                    signupFormContainer.style.opacity = '1';
                    
                    // Re-run entrance animations for the new form
                    const newFormGroups = signupFormContainer.querySelectorAll('.form-group');
                    newFormGroups.forEach((group, index) => {
                        group.style.animation = `fadeIn 0.5s ease-out ${0.1 + (index * 0.1)}s both, slideUp 0.5s ease-out ${0.1 + (index * 0.1)}s both`;
                    });
                    
                    const newSubmitBtn = signupFormContainer.querySelector('.submit-btn');
                    if (newSubmitBtn) {
                        newSubmitBtn.style.animation = `fadeIn 0.5s ease-out 0.5s both, slideUp 0.5s ease-out 0.5s both`;
                    }
                }, 50);
            }, 300);
        });
        
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // First fade out signup form
            signupFormContainer.style.opacity = '0';
            signupFormContainer.style.transform = 'translateX(30px)';
            
            // After a short delay, start moving forms
            setTimeout(() => {
                signupFormContainer.classList.remove('active');
                loginFormContainer.classList.add('active');
                
                // Position the login form
                loginFormContainer.style.transform = 'translateX(0)';
                
                // Fade in the login form
                setTimeout(() => {
                    loginFormContainer.style.opacity = '1';
                    
                    // Re-run entrance animations for the new form
                    const newFormGroups = loginFormContainer.querySelectorAll('.form-group');
                    newFormGroups.forEach((group, index) => {
                        group.style.animation = `fadeIn 0.5s ease-out ${0.1 + (index * 0.1)}s both, slideUp 0.5s ease-out ${0.1 + (index * 0.1)}s both`;
                    });
                    
                    const newSubmitBtn = loginFormContainer.querySelector('.submit-btn');
                    if (newSubmitBtn) {
                        newSubmitBtn.style.animation = `fadeIn 0.5s ease-out 0.3s both, slideUp 0.5s ease-out 0.3s both`;
                    }
                }, 50);
            }, 300);
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.submit-btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add floating label effect to input fields
    const inputFields = document.querySelectorAll('.form-control');
    
    inputFields.forEach(input => {
        // Check if input has value on load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Add event listeners
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Password strength indicator for signup form
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Create strength indicator if it doesn't exist
            let strengthIndicator = this.parentElement.querySelector('.password-strength');
            
            if (!strengthIndicator) {
                strengthIndicator = document.createElement('div');
                strengthIndicator.classList.add('password-strength');
                this.parentElement.appendChild(strengthIndicator);
            }
            
            // Calculate password strength
            if (password.length >= 8) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;
            
            // Update strength indicator
            strengthIndicator.className = 'password-strength';
            
            if (password.length === 0) {
                strengthIndicator.style.display = 'none';
            } else {
                strengthIndicator.style.display = 'block';
                
                switch(strength) {
                    case 0:
                    case 1:
                        strengthIndicator.classList.add('weak');
                        strengthIndicator.textContent = 'Weak';
                        break;
                    case 2:
                    case 3:
                        strengthIndicator.classList.add('medium');
                        strengthIndicator.textContent = 'Medium';
                        break;
                    case 4:
                        strengthIndicator.classList.add('strong');
                        strengthIndicator.textContent = 'Strong';
                        break;
                }
            }
        });
    }
    
    // Password match indicator
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;
            
            // Create match indicator if it doesn't exist
            let matchIndicator = this.parentElement.querySelector('.password-match');
            
            if (!matchIndicator) {
                matchIndicator = document.createElement('div');
                matchIndicator.classList.add('password-match');
                this.parentElement.appendChild(matchIndicator);
            }
            
            // Update match indicator
            if (confirmPassword.length === 0) {
                matchIndicator.style.display = 'none';
            } else {
                matchIndicator.style.display = 'block';
                
                if (password === confirmPassword) {
                    matchIndicator.classList.remove('no-match');
                    matchIndicator.classList.add('match');
                    matchIndicator.textContent = 'Passwords match';
                } else {
                    matchIndicator.classList.remove('match');
                    matchIndicator.classList.add('no-match');
                    matchIndicator.textContent = 'Passwords do not match';
                }
            }
        });
    }
});
