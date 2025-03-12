/**
 * Sparez - Page Transitions
 * This script adds smooth loading animations between page transitions
 * using custom animations for a fluid user experience.
 */

// Load motion library
document.addEventListener('DOMContentLoaded', function() {
    // Load motion.js script
    const motionScript = document.createElement('script');
    motionScript.src = 'js/motion.js';
    document.head.appendChild(motionScript);

    // Initialize page transitions when motion is loaded
    motionScript.onload = function() {
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

    // Create animation container with motion animation
    const animationContainer = document.createElement('div');
    animationContainer.id = 'motion-animation';
    animationContainer.style.cssText = `
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    `;
    
    // Create animated box using motion
    const animatedBox = document.createElement('div');
    animatedBox.style.cssText = `
        width: 100px;
        height: 100px;
        background-color: #f5f5f5;
        border-radius: 5px;
        margin-bottom: 20px;
    `;
    animationContainer.appendChild(animatedBox);
    
    // Add loading text
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Yükleniyor...';
    loadingText.style.cssText = `
        font-size: 18px;
        margin-top: 15px;
        font-weight: 500;
    `;
    animationContainer.appendChild(loadingText);
    
    // Add to overlay
    overlay.appendChild(animationContainer);
    
    // Apply motion animation
    window.motion.animate(animatedBox, {
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
    }, {
        duration: 2,
        ease: "ease-in-out",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
    });

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
