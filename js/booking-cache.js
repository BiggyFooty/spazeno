/**
 * Booking Cache - Handles caching of booking details using localStorage
 */

// Key for storing booking details in localStorage
const BOOKING_CACHE_KEY = 'sparez_booking_cache';

/**
 * Save booking details to localStorage
 * @param {Object} bookingDetails - The booking details to cache
 */
function saveBookingToCache(bookingDetails) {
    try {
        localStorage.setItem(BOOKING_CACHE_KEY, JSON.stringify(bookingDetails));
        console.log('Booking details saved to cache:', bookingDetails);
    } catch (error) {
        console.error('Error saving booking details to cache:', error);
    }
}

/**
 * Get booking details from localStorage
 * @returns {Object|null} The cached booking details or null if not found
 */
function getBookingFromCache() {
    try {
        const cachedData = localStorage.getItem(BOOKING_CACHE_KEY);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        return null;
    } catch (error) {
        console.error('Error retrieving booking details from cache:', error);
        return null;
    }
}

/**
 * Clear booking details from localStorage
 */
function clearBookingCache() {
    try {
        localStorage.removeItem(BOOKING_CACHE_KEY);
        console.log('Booking cache cleared');
    } catch (error) {
        console.error('Error clearing booking cache:', error);
    }
}
