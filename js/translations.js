// Translations for Sparez App
// Make changeLanguage function globally accessible
window.changeLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageContent();
};

const translations = {
    en: {
        // Common
        appName: "Sparez",
        appTagline: "Luxury Hotel Spa Reservations",
        home: "Home",
        booking: "Booking",
        services: "Services",
        profile: "Profile",
        back: "Back",
        cancel: "Cancel",
        done: "Done",
        confirm: "Confirm",
        reschedule: "Reschedule",
        
        // Login Page
        loginTitle: "Let's get you Login!",
        loginSubtitle: "Enter your information below.",
        loginWith: "Or login with",
        emailAddress: "Email Address",
        password: "Password",
        forgotPassword: "Forgot Password?",
        login: "Login",
        dontHaveAccount: "Don't have an account?",
        registerNow: "Register Now",
        
        // Home Page
        welcome: "Welcome",
        searchPlaceholder: "Search for spa services or hotels",
        popularSpas: "Popular Hotel Spas",
        nearbySpas: "Nearby Hotel Spas",
        viewAll: "View all",
        
        // Services Page
        spaServices: "Spa Services",
        luxurySpaServices: "Luxury Spa Services",
        
        // Booking Page
        bookSpaService: "Book Spa Service",
        selectService: "Select Service",
        minimumRating: "Minimum Rating",
        therapistGenderPreference: "Therapist Gender Preference",
        male: "Male",
        female: "Female",
        noPreference: "No Preference",
        selectDate: "Select Date",
        selectTime: "Select Time",
        confirmBooking: "Confirm Booking",
        
        // Booking Confirmation Page
        bookingConfirmed: "Booking Confirmed!",
        bookingSuccessMessage: "Your hotel spa appointment has been successfully booked.",
        bookingDetails: "Booking Details",
        service: "Service",
        hotelSpa: "Hotel Spa",
        dateTime: "Date & Time",
        location: "Location",
        bookingID: "Booking ID",
        viewInCalendar: "View in Calendar",
        backToHome: "Back to Home",
        confirmationSent: "A confirmation has been sent to your email and phone.",
        needChanges: "Need to make changes? You can reschedule or cancel your appointment up to 24 hours before the scheduled time.",
        
        // Calendar Page
        calendar: "Calendar",
        bookingsFor: "Bookings for",
        
        // Spa Services
        swedishMassage: "Swedish Massage",
        deepTissueMassage: "Deep Tissue Massage",
        aromatherapyMassage: "Aromatherapy Massage",
        hotStoneMassage: "Hot Stone Massage",
        luxuryFacial: "Luxury Facial",
        spaPackage: "Spa Package",
        minutes: "minutes",
    },
    tr: {
        // Common
        appName: "Sparez",
        appTagline: "Lüks Otel Spa Rezervasyonları",
        home: "Ana Sayfa",
        booking: "Rezervasyon",
        services: "Hizmetler",
        profile: "Profil",
        back: "Geri",
        cancel: "İptal",
        done: "Tamam",
        confirm: "Onayla",
        reschedule: "Yeniden Planla",
        
        // Login Page
        loginTitle: "Hadi Giriş Yapalım!",
        loginSubtitle: "Bilgilerinizi aşağıya girin.",
        loginWith: "Veya şununla giriş yapın",
        emailAddress: "E-posta Adresi",
        password: "Şifre",
        forgotPassword: "Şifremi Unuttum?",
        login: "Giriş Yap",
        dontHaveAccount: "Hesabınız yok mu?",
        registerNow: "Şimdi Kaydolun",
        
        // Home Page
        welcome: "Hoş Geldiniz",
        searchPlaceholder: "Spa hizmetleri veya oteller için arama yapın",
        popularSpas: "Popüler Otel Spaları",
        nearbySpas: "Yakındaki Otel Spaları",
        viewAll: "Tümünü Gör",
        
        // Services Page
        spaServices: "Spa Hizmetleri",
        luxurySpaServices: "Lüks Spa Hizmetleri",
        
        // Booking Page
        bookSpaService: "Spa Hizmeti Rezervasyonu",
        selectService: "Hizmet Seçin",
        minimumRating: "Minimum Değerlendirme",
        therapistGenderPreference: "Terapist Cinsiyet Tercihi",
        male: "Erkek",
        female: "Kadın",
        noPreference: "Fark Etmez",
        selectDate: "Tarih Seçin",
        selectTime: "Saat Seçin",
        confirmBooking: "Rezervasyonu Onayla",
        
        // Booking Confirmation Page
        bookingConfirmed: "Rezervasyon Onaylandı!",
        bookingSuccessMessage: "Otel spa randevunuz başarıyla rezerve edildi.",
        bookingDetails: "Rezervasyon Detayları",
        service: "Hizmet",
        hotelSpa: "Otel Spa",
        dateTime: "Tarih & Saat",
        location: "Konum",
        bookingID: "Rezervasyon ID",
        viewInCalendar: "Takvimde Görüntüle",
        backToHome: "Ana Sayfaya Dön",
        confirmationSent: "E-posta ve telefonunuza bir onay gönderildi.",
        needChanges: "Değişiklik yapmak mı istiyorsunuz? Randevunuzu planlanan saatten 24 saat öncesine kadar yeniden planlayabilir veya iptal edebilirsiniz.",
        
        // Calendar Page
        calendar: "Takvim",
        bookingsFor: "Rezervasyonlar:",
        
        // Spa Services
        swedishMassage: "İsveç Masajı",
        deepTissueMassage: "Derin Doku Masajı",
        aromatherapyMassage: "Aromaterapi Masajı",
        hotStoneMassage: "Sıcak Taş Masajı",
        luxuryFacial: "Lüks Yüz Bakımı",
        spaPackage: "Spa Paketi",
        minutes: "dakika",
    }
};

// Default language
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageContent();
}

// Function to get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Function to update page content
function updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                element.setAttribute('placeholder', t(key));
            } else {
                element.textContent = t(key);
            }
        }
    });
    
    // Update language toggle button
    const langToggle = document.querySelector('.language-toggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage.toUpperCase();
    }
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Dispatch event for custom handling
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage } }));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updatePageContent();
    
    // Add event listener to language toggle buttons
    document.querySelectorAll('.language-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'tr' : 'en';
            changeLanguage(newLang);
        });
    });
});
