/**
 * Booking Cache - Handles caching of booking details using localStorage
 * Enhanced to support synchronization between services.html and booking.html
 */

// Keys for storing booking details in localStorage
const BOOKING_CACHE_KEY = 'sparez_booking_cache';
const SERVICE_SELECTION_KEY = 'sparez_selected_service';
const CATEGORY_SELECTION_KEY = 'sparez_selected_category';

/**
 * Save booking details to localStorage
 * @param {Object} bookingDetails - The booking details to cache
 */
function saveBookingToCache(bookingDetails) {
    try {
        // Save the full booking details
        localStorage.setItem(BOOKING_CACHE_KEY, JSON.stringify(bookingDetails));
        
        // If service information is provided, save it separately for better synchronization
        if (bookingDetails.service) {
            // Save the service selection
            const serviceData = {
                name: bookingDetails.service,
                id: bookingDetails.serviceId || '',
                price: bookingDetails.price || '',
                duration: bookingDetails.duration || '',
                category: bookingDetails.category || detectCategoryFromService(bookingDetails.service),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(SERVICE_SELECTION_KEY, JSON.stringify(serviceData));
            
            // If we have category information, save it too
            if (serviceData.category) {
                localStorage.setItem(CATEGORY_SELECTION_KEY, serviceData.category);
            }
        }
        
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
        // Try to get the full booking data first
        const cachedData = localStorage.getItem(BOOKING_CACHE_KEY);
        if (cachedData) {
            const bookingData = JSON.parse(cachedData);
            
            // Check if we have separate service selection data
            const serviceData = localStorage.getItem(SERVICE_SELECTION_KEY);
            if (serviceData) {
                const parsedServiceData = JSON.parse(serviceData);
                
                // Merge the service data with the booking data
                // This ensures we have the most up-to-date service selection
                return {
                    ...bookingData,
                    service: parsedServiceData.name || bookingData.service,
                    serviceId: parsedServiceData.id || bookingData.serviceId,
                    price: parsedServiceData.price || bookingData.price,
                    duration: parsedServiceData.duration || bookingData.duration,
                    category: parsedServiceData.category || bookingData.category
                };
            }
            
            return bookingData;
        }
        
        // If no full booking data, check for service selection only
        const serviceData = localStorage.getItem(SERVICE_SELECTION_KEY);
        if (serviceData) {
            const parsedServiceData = JSON.parse(serviceData);
            return {
                service: parsedServiceData.name,
                serviceId: parsedServiceData.id,
                price: parsedServiceData.price,
                duration: parsedServiceData.duration,
                category: parsedServiceData.category,
                timestamp: parsedServiceData.timestamp
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error retrieving booking details from cache:', error);
        return null;
    }
}

/**
 * Get only the selected service information
 * @returns {Object|null} The selected service or null if not found
 */
function getSelectedService() {
    try {
        const serviceData = localStorage.getItem(SERVICE_SELECTION_KEY);
        return serviceData ? JSON.parse(serviceData) : null;
    } catch (error) {
        console.error('Error retrieving selected service:', error);
        return null;
    }
}

/**
 * Get the selected category
 * @returns {string|null} The selected category or null if not found
 */
function getSelectedCategory() {
    try {
        return localStorage.getItem(CATEGORY_SELECTION_KEY);
    } catch (error) {
        console.error('Error retrieving selected category:', error);
        return null;
    }
}

/**
 * Clear booking details from localStorage
 */
function clearBookingCache() {
    try {
        localStorage.removeItem(BOOKING_CACHE_KEY);
        localStorage.removeItem(SERVICE_SELECTION_KEY);
        localStorage.removeItem(CATEGORY_SELECTION_KEY);
        console.log('Booking cache cleared');
    } catch (error) {
        console.error('Error clearing booking cache:', error);
    }
}

/**
 * Detect the category based on the service name
 * @param {string} serviceName - The name of the service
 * @returns {string} The detected category
 */
function detectCategoryFromService(serviceName) {
    // Define category keywords
    const categoryMap = {
        'massage': ['masaj', 'masajı', 'massage'],
        'facial': ['cilt', 'yüz', 'facial', 'bakım'],
        'treatment': ['terapi', 'therapy', 'tedavi', 'medikal'],
        'hotstone': ['taş', 'stone']
    };
    
    // Convert service name to lowercase for case-insensitive matching
    const lowerServiceName = serviceName.toLowerCase();
    
    // Check each category for matching keywords
    for (const [category, keywords] of Object.entries(categoryMap)) {
        for (const keyword of keywords) {
            if (lowerServiceName.includes(keyword.toLowerCase())) {
                return category;
            }
        }
    }
    
    // Default to massage if no match found
    return 'massage';
}
