/**
 * Sparez - Hotel Data
 * This file contains the list of hotels available in the application
 */

// Define the hotel data
var hotelData = [
  {
    "otel_isim": "Elite World",
    "sube_adi": "Elite World Europe",
    "adres": "Yeşilköy Mah., Havaalanı Caddesi No: 34, Bakırköy, İstanbul",
    "google_yildiz": 4.3,
    "fotograf_linki": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "aciklama": "Elite World Europe, lüks ve konforun mükemmel bir şekilde harmanlandığı bir spa deneyimi sunuyor. Modern tesislerimiz ve uzman terapistlerimizle kendinizi yenilenmiş hissedeceksiniz.",
    "hizmetler": ["İsveç Masajı", "Derin Doku Masajı", "Sıcak Taş Terapisi", "Aromaterapi", "Yüz Bakımı"],
    "yorumlar": [
      {"kullanici": "Ayşe Y.", "yildiz": 5, "yorum": "Harika bir deneyimdi, kesinlikle tekrar geleceğim!"},
      {"kullanici": "Mehmet K.", "yildiz": 4, "yorum": "Terapistler çok profesyonel, ortam çok rahatlatıcı."},
      {"kullanici": "Zeynep A.", "yildiz": 4, "yorum": "Masaj sonrası kendimi yenilenmiş hissettim."}
    ]
  },
  {
    "otel_isim": "Radisson Blu",
    "sube_adi": "Radisson Blu Bosphorus",
    "adres": "Çırağan Caddesi No: 46, Beşiktaş, İstanbul",
    "google_yildiz": 4.5,
    "fotograf_linki": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "aciklama": "Boğaz manzarası eşliğinde lüks bir spa deneyimi yaşayın. Radisson Blu Bosphorus, İstanbul'un kalbinde benzersiz bir rahatlama fırsatı sunuyor.",
    "hizmetler": ["İsveç Masajı", "Aromaterapi", "Sıcak Taş Terapisi", "Türk Hamamı", "Cilt Bakımı"],
    "yorumlar": [
      {"kullanici": "Deniz K.", "yildiz": 5, "yorum": "Boğaz manzarası eşliğinde masaj harika bir deneyimdi."},
      {"kullanici": "Ece Y.", "yildiz": 5, "yorum": "Terapistler çok profesyonel, kesinlikle tavsiye ederim."},
      {"kullanici": "Murat S.", "yildiz": 4, "yorum": "Ortam çok lüks ve rahatlatıcı."}
    ]
  },
  {
    "otel_isim": "Lazzoni",
    "sube_adi": "Lazzoni Hotel",
    "adres": "Ortabayır Mah., Dereboyu Cd. No: 37, Beşiktaş, İstanbul",
    "google_yildiz": 4.6,
    "fotograf_linki": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "aciklama": "Lazzoni Hotel, modern tasarımı ve özel spa hizmetleriyle misafirlerine unutulmaz bir deneyim sunuyor. Uzman terapistlerimiz sizin için en uygun tedaviyi önerecektir.",
    "hizmetler": ["İsveç Masajı", "Derin Doku Masajı", "Bali Masajı", "Aromaterapi", "Vücut Bakımı"],
    "yorumlar": [
      {"kullanici": "Gizem Y.", "yildiz": 5, "yorum": "Modern tasarım ve kaliteli hizmet bir arada."},
      {"kullanici": "Onur K.", "yildiz": 4, "yorum": "Bali masajı gerçekten çok rahatlatıcıydı."},
      {"kullanici": "Seda M.", "yildiz": 5, "yorum": "Terapistler alanında uzman, çok memnun kaldım."}
    ]
  },
  {
    "otel_isim": "Richmond",
    "sube_adi": "Richmond Nua Wellness Spa",
    "adres": "Merkez Mah., Darıcadı Sokak No: 3, Kadıköy, İstanbul",
    "google_yildiz": 4.1,
    "fotograf_linki": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "aciklama": "Richmond Nua Wellness Spa, bütünsel bir yaklaşımla vücut ve zihin dengenizi yeniden kurmanıza yardımcı olur. Doğadan ilham alan tedavilerimizle kendinizi yenileyin.",
    "hizmetler": ["İsveç Masajı", "Sıcak Taş Terapisi", "Ayurveda Masajı", "Detoks Programları", "Yüz Bakımı"],
    "yorumlar": [
      {"kullanici": "Hakan T.", "yildiz": 4, "yorum": "Detoks programı sonrası kendimi çok daha iyi hissediyorum."},
      {"kullanici": "Elif S.", "yildiz": 5, "yorum": "Ayurveda masajı muhteşemdi, kesinlikle tavsiye ederim."},
      {"kullanici": "Tolga B.", "yildiz": 3, "yorum": "Hizmet iyi ancak fiyatlar biraz yüksek."}
    ]
  },
  {
    "otel_isim": "Lazzoni",
    "sube_adi": "Lazzoni Tower",
    "adres": "Levent Mah., Büyükdere Cd. No: 40, Şişli, İstanbul",
    "google_yildiz": 4.6,
    "fotograf_linki": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "aciklama": "Lazzoni Tower, şehrin merkezinde modern ve lüks bir spa deneyimi sunuyor. İş hayatının stresinden uzaklaşmak için ideal bir ortam.",
    "hizmetler": ["İsveç Masajı", "Derin Doku Masajı", "Sıcak Taş Terapisi", "Yüz Bakımı", "Vücut Bakımı"],
    "yorumlar": [
      {"kullanici": "Ceren Y.", "yildiz": 5, "yorum": "İş çıkışı uğradım ve harika bir deneyimdi."},
      {"kullanici": "Mert K.", "yildiz": 4, "yorum": "Masaj teknikleri gerçekten etkileyici."},
      {"kullanici": "Ayşe B.", "yildiz": 5, "yorum": "Personel çok ilgili ve profesyonel."}
    ]
  }
];

// Export the hotel data for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { hotelData };
} else {
  // For browser use
  window.hotelData = hotelData;
}
