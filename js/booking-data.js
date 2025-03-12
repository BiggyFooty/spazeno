/**
 * Booking Data - Simulates a database for storing and retrieving booking information
 */

// Global variable to store the current booking
window.currentBooking = {
    service: null,
    date: null,
    time: null,
    gender: null,
    hotel: null,
    bookingId: null,
    timestamp: null
};

/**
 * Save booking details to the global variable
 * @param {Object} bookingDetails - The booking details to save
 */
function saveBookingData(bookingDetails) {
    try {
        // Generate a booking ID if not provided
        if (!bookingDetails.bookingId) {
            bookingDetails.bookingId = 'SPZ-' + Math.floor(10000 + Math.random() * 90000);
        }
        
        // Add timestamp
        bookingDetails.timestamp = new Date().toISOString();
        
        // Save to global variable
        window.currentBooking = bookingDetails;
        
        // Also try to save to localStorage as backup
        try {
            localStorage.setItem('sparez_current_booking', JSON.stringify(bookingDetails));
        } catch (storageError) {
            console.warn('Could not save to localStorage:', storageError);
        }
        
        console.log('Booking data saved:', window.currentBooking);
        return true;
    } catch (error) {
        console.error('Error saving booking data:', error);
        return false;
    }
}

/**
 * Get booking details from the global variable
 * @returns {Object|null} The booking details or null if not found
 */
function getBookingData() {
    try {
        // Check if we have data in the global variable
        if (window.currentBooking && window.currentBooking.service) {
            return window.currentBooking;
        }
        
        // Try to get from localStorage as backup
        try {
            const storedData = localStorage.getItem('sparez_current_booking');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                // Update the global variable
                window.currentBooking = parsedData;
                return parsedData;
            }
        } catch (storageError) {
            console.warn('Could not retrieve from localStorage:', storageError);
        }
        
        return null;
    } catch (error) {
        console.error('Error retrieving booking data:', error);
        return null;
    }
}

/**
 * Clear booking data
 */
function clearBookingData() {
    try {
        // Clear global variable
        window.currentBooking = {
            service: null,
            date: null,
            time: null,
            gender: null,
            hotel: null,
            bookingId: null,
            timestamp: null
        };
        
        // Clear localStorage
        try {
            localStorage.removeItem('sparez_current_booking');
        } catch (storageError) {
            console.warn('Could not clear localStorage:', storageError);
        }
        
        console.log('Booking data cleared');
        return true;
    } catch (error) {
        console.error('Error clearing booking data:', error);
        return false;
    }
}
