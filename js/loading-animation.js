/**
 * Sparez - Loading Animation
 * This file contains the common loading animation with Turkish quotes about peaceful mind
 */

// Turkish quotes about peaceful mind
const peacefulQuotes = [
    "Huzurlu bir zihin, sağlıklı bir vücudun temelidir.",
    "Dinlenme anı, hayatın en güzel anlarından biridir.",
    "Kendinize zaman ayırmak, başkalarına daha iyi hizmet etmenin anahtarıdır.",
    "Zihin sakinleştiğinde, vücut iyileşir.",
    "İç huzur, dış güzelliğin kaynağıdır.",
    "Nefes al, bırak ve anın tadını çıkar.",
    "Kendine iyi bakmak, bencillik değil, hayatta kalmak için bir gerekliliktir."
];

/**
 * Shows a loading overlay with a random peaceful quote
 * @param {string} message - Optional message to show below the quote (default: "Yükleniyor...")
 * @param {number} duration - Optional duration in milliseconds (if not provided, overlay will remain until hideLoadingOverlay is called)
 * @param {Function} callback - Optional callback function to execute after the duration
 * @returns {HTMLElement} - The created overlay element
 */
function showLoadingOverlay(message = "Yükleniyor...", duration = null, callback = null) {
    // Get random quote
    const randomQuote = peacefulQuotes[Math.floor(Math.random() * peacefulQuotes.length)];
    
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    
    overlay.innerHTML = `
        <div class="loading-spinner" style="margin-bottom: 2rem;">
            <i class="fas fa-spa fa-spin" style="font-size: 3rem; color: var(--primary-color);"></i>
        </div>
        <p class="quote" style="font-style: italic; color: var(--text-muted); margin-bottom: 1rem; text-align: center; max-width: 80%;">
            "${randomQuote}"
        </p>
        <p style="font-size: 1rem; color: var(--text-muted);">${message}</p>
    `;
    
    document.body.appendChild(overlay);
    
    // If duration is provided, hide the overlay after the specified duration
    if (duration) {
        setTimeout(() => {
            hideLoadingOverlay();
            if (callback) callback();
        }, duration);
    }
    
    return overlay;
}

/**
 * Hides the loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showLoadingOverlay, hideLoadingOverlay, peacefulQuotes };
} else {
    // For browser use
    window.showLoadingOverlay = showLoadingOverlay;
    window.hideLoadingOverlay = hideLoadingOverlay;
    window.peacefulQuotes = peacefulQuotes;
}
