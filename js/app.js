// Sparez App - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Set current time in status bar
    updateStatusBarTime();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize page-specific functionality
    initCurrentPage();
    
    // Initialize language toggle
    initLanguageToggle();
}

/**
 * Initialize language toggle functionality
 */
function initLanguageToggle() {
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        // Set initial state based on stored language
        const currentLang = localStorage.getItem('language') || 'en';
        languageToggle.classList.remove('en', 'tr');
        languageToggle.classList.add(currentLang);
        
        // Make sure the span exists
        let span = languageToggle.querySelector('span');
        if (!span) {
            span = document.createElement('span');
            languageToggle.appendChild(span);
        }
        span.textContent = currentLang.toUpperCase();
        
        // Add click event listener
        languageToggle.addEventListener('click', function() {
            // Get current language (might have changed since initialization)
            const currentLang = localStorage.getItem('language') || 'en';
            const newLang = currentLang === 'en' ? 'tr' : 'en';
            
            // Call the global changeLanguage function from translations.js
            if (typeof window.changeLanguage === 'function') {
                window.changeLanguage(newLang);
            } else {
                console.error('changeLanguage function not found');
            }
            
            // Update toggle appearance
            this.classList.remove('en', 'tr');
            this.classList.add(newLang);
            
            // Make sure the span exists
            let span = this.querySelector('span');
            if (!span) {
                span = document.createElement('span');
                this.appendChild(span);
            }
            span.textContent = newLang.toUpperCase();
        });
    }
}

/**
 * Update the time displayed in the status bar
 */
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-bar .time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
        
        // Update time every minute
        setTimeout(updateStatusBarTime, 60000);
    }
}

/**
 * Initialize global event listeners
 */
function initEventListeners() {
    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                // Remove active class from all nav items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Handle navigation (in a real app, this would load different views)
                const targetPage = this.getAttribute('data-page');
                if (targetPage) {
                    navigateToPage(targetPage);
                }
            }
        });
    });
    
    // Back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
    
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // In a real app, this would filter results based on input
            console.log('Searching for:', this.value);
        });
    });
}

/**
 * Initialize functionality specific to the current page
 */
function initCurrentPage() {
    // Determine current page based on body class or URL
    const bodyClasses = document.body.classList;
    
    if (bodyClasses.contains('login-page')) {
        initLoginPage();
    } else if (bodyClasses.contains('home-page')) {
        initHomePage();
    } else if (bodyClasses.contains('artist-profile-page')) {
        initArtistProfilePage();
    } else if (bodyClasses.contains('booking-page')) {
        initBookingPage();
    }
}

/**
 * Navigate to a specific page
 * @param {string} page - The page to navigate to
 */
function navigateToPage(page) {
    // In a real app, this would use proper routing
    // For this prototype, we'll just redirect to the HTML file
    window.location.href = `${page}.html`;
}

/**
 * Initialize login page functionality
 */
function initLoginPage() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, this would authenticate with a server
            console.log('Login attempt:', email);
            
            // Simulate successful login
            navigateToPage('home');
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-login-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.getAttribute('data-provider');
            
            // In a real app, this would authenticate with the social provider
            console.log('Social login with:', provider);
            
            // Simulate successful login
            navigateToPage('home');
        });
    });
    
    // Register link
    const registerLink = document.querySelector('.register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('register');
        });
    }
}

/**
 * Initialize home page functionality
 */
function initHomePage() {
    // Category pills
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // In a real app, this would filter content based on category
            const category = this.getAttribute('data-category');
            console.log('Selected category:', category);
        });
    });
    
    // Service category items
    const serviceCategories = document.querySelectorAll('.service-category');
    serviceCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            
            const categoryId = this.getAttribute('data-id');
            navigateToPage(`services.html?category=${categoryId}`);
        });
    });
    
    // Artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('click', function() {
            const artistId = this.getAttribute('data-id');
            navigateToPage(`artist-profile.html?id=${artistId}`);
        });
    });
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-id');
            navigateToPage(`service-detail.html?id=${serviceId}`);
        });
        
        // Book buttons inside service cards
        const bookButton = card.querySelector('.btn-book');
        if (bookButton) {
            bookButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                
                const serviceId = card.getAttribute('data-id');
                navigateToPage(`booking.html?service=${serviceId}`);
            });
        }
    });
}

/**
 * Initialize artist profile page functionality
 */
function initArtistProfilePage() {
    // Profile tabs
    const profileTabs = document.querySelectorAll('.artist-profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    profileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            profileTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.style.display = content.id === tabId ? 'block' : 'none';
            });
        });
    });
    
    // Book appointment button
    const bookButton = document.querySelector('.book-appointment-btn');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            const artistId = this.getAttribute('data-artist-id');
            navigateToPage(`booking.html?artist=${artistId}`);
        });
    }
    
    // Profile actions (call, message, etc.)
    const profileActions = document.querySelectorAll('.artist-profile-action');
    profileActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            
            const actionType = this.getAttribute('data-action');
            const artistId = this.getAttribute('data-artist-id');
            
            // Handle different action types
            switch (actionType) {
                case 'call':
                    console.log('Calling artist:', artistId);
                    break;
                case 'message':
                    console.log('Messaging artist:', artistId);
                    break;
                case 'direction':
                    console.log('Getting directions to artist:', artistId);
                    break;
                case 'share':
                    console.log('Sharing artist:', artistId);
                    break;
            }
        });
    });
}

/**
 * Initialize booking page functionality
 */
function initBookingPage() {
    // Date picker
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all date items
            dateItems.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked date item
            this.classList.add('active');
            
            // Update available time slots based on selected date
            const dateValue = this.getAttribute('data-date');
            updateTimeSlots(dateValue);
        });
    });
    
    // Time slots
    function updateTimeSlots(selectedDate) {
        const timeSlots = document.querySelectorAll('.time-slot');
        
        // In a real app, this would fetch available slots from the server
        // For this prototype, we'll just randomly disable some slots
        timeSlots.forEach(slot => {
            // Remove previous states
            slot.classList.remove('active', 'disabled');
            
            // Randomly disable some slots (for demonstration)
            if (Math.random() < 0.3) {
                slot.classList.add('disabled');
            }
        });
    }
    
    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                // Remove active class from all time slots
                timeSlots.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked time slot
                this.classList.add('active');
            }
        });
    });
    
    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected date and time
            const selectedDate = document.querySelector('.date-item.active');
            const selectedTime = document.querySelector('.time-slot.active');
            
            if (!selectedDate || !selectedTime) {
                alert('Please select a date and time for your appointment.');
                return;
            }
            
            // In a real app, this would submit the booking to the server
            console.log('Booking submitted:', {
                date: selectedDate.getAttribute('data-date'),
                time: selectedTime.textContent,
                service: new URLSearchParams(window.location.search).get('service'),
                artist: new URLSearchParams(window.location.search).get('artist')
            });
            
            // Navigate to confirmation page
            navigateToPage('booking-confirmation.html');
        });
    }
}
