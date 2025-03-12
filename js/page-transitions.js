/**
 * Sparez - Page Transitions
 * This script adds smooth loading animations between page transitions
 * using Lottie animations for a fluid user experience.
 */

// Load Lottie library
document.addEventListener('DOMContentLoaded', function() {
    // Create a script element for Lottie
    const lottieScript = document.createElement('script');
    lottieScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
    lottieScript.integrity = 'sha512-yAr4fN9WZH6hESbOwoFZjyqmypIgqLYlEHdpf50T3NE5QKn8fX4tsEyoGpLQMKfyJpfPbUEbOgfXAAjGLNS/MA==';
    lottieScript.crossOrigin = 'anonymous';
    lottieScript.referrerPolicy = 'no-referrer';
    document.head.appendChild(lottieScript);

    // Wait for Lottie to load
    lottieScript.onload = function() {
        initPageTransitions();
    };
});

function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);

    // Create animation container with spa-themed content
    const animationContainer = document.createElement('div');
    animationContainer.id = 'lottie-animation';
    animationContainer.style.cssText = `
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    `;
    
    // Add spa icon and text
    const spaIconContainer = document.createElement('div');
    spaIconContainer.className = 'spa-icon-container';
    spaIconContainer.style.cssText = `
        margin-bottom: 20px;
        animation: pulse 2s infinite ease-in-out;
    `;
    
    const spaIcon = document.createElement('i');
    spaIcon.className = 'fas fa-spa';
    spaIcon.style.cssText = `
        font-size: 60px;
        color: white;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading...';
    loadingText.style.cssText = `
        font-size: 18px;
        margin-top: 15px;
        font-weight: 500;
    `;
    
    // Create loading dots animation
    const loadingDots = document.createElement('div');
    loadingDots.className = 'loading-dots';
    loadingDots.style.cssText = `
        display: flex;
        gap: 5px;
        margin-top: 10px;
    `;
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            animation: loadingDot 1.5s infinite ease-in-out;
            animation-delay: ${i * 0.2}s;
        `;
        loadingDots.appendChild(dot);
    }
    
    // Add elements to container
    spaIconContainer.appendChild(spaIcon);
    animationContainer.appendChild(spaIconContainer);
    animationContainer.appendChild(loadingText);
    animationContainer.appendChild(loadingDots);
    overlay.appendChild(animationContainer);
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes loadingDot {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-10px); opacity: 1; }
        }
        
        .spa-icon-container {
            position: relative;
        }
        
        .spa-icon-container::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            z-index: -1;
            animation: pulse 2s infinite ease-in-out alternate;
        }
    `;
    document.head.appendChild(animationStyles);

    // Handle all link clicks for page transitions
    document.addEventListener('click', function(e) {
        // Find closest anchor tag
        const link = e.target.closest('a');
        
        // If it's a link with href and not external
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) && 
            !link.hasAttribute('data-no-transition') &&
            !link.getAttribute('href').startsWith('#') &&
            !link.getAttribute('href').startsWith('javascript:')) {
            
            e.preventDefault();
            const targetUrl = link.href;
            
            // Show overlay with animation
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            
            // After animation delay, navigate to the new page (3 seconds as requested)
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 3000);
        }
    });

    // Handle back button
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Hide overlay if coming from back/forward cache
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }
    });

    // Add page entrance animation
    const pageEntranceAnimation = () => {
        // Create entrance overlay
        const entranceOverlay = document.createElement('div');
        entranceOverlay.className = 'page-entrance-overlay';
        entranceOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 9998;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(entranceOverlay);

        // Fade out entrance overlay
        setTimeout(() => {
            entranceOverlay.style.opacity = '0';
            setTimeout(() => {
                entranceOverlay.remove();
            }, 500);
        }, 300);

        // Add entrance animations to page elements
        const appShell = document.querySelector('.app-shell');
        if (appShell) {
            appShell.style.animation = 'fadeIn 0.5s ease-out forwards';
        }
    };

    // Run entrance animation
    pageEntranceAnimation();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .app-shell {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
