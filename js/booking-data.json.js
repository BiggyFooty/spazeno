/**
 * Booking Data JSON - Contains the current booking information
 * This file is dynamically updated when a booking is made
 */

// Define the current booking data as a global variable
window.CURRENT_BOOKING_DATA = {
    "service": "İsveç Masajı",
    "date": "Per 13",
    "time": "11:00",
    "gender": "Erkek",
    "hotel": "Lazzoni Hotel",
    "bookingId": "SPZ-" + Math.floor(10000 + Math.random() * 90000),
    "timestamp": new Date().toISOString()
};
