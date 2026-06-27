# Proje Adı: Transfer Merkezi

[![Kotlin](https://img.shields.io/badge/kotlin-1.9+-blue.svg)](https://kotlinlang.org/)
[![Firebase](https://img.shields.io/badge/firebase-auth-yellow.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Hazırlayan:** Muhammed Furkan Aktaş  
**Öğrenci No:** 24010501063  

## 1. Projenin Amacı ve Kısa Açıklaması
Transfer Merkezi, Süper Lig takımlarındaki oyuncu transferlerini, resmi KAP bildirimlerini ve transfer dedikodularını tek bir platformda toplamayı hedefleyen güncel bir Android uygulamasıdır. Kullanıcıların bilgi kirliliğinden uzak, güvenilir transfer haberlerine ulaşmasını sağlarken, kayıtlı olmayan kullanıcılar için "Blurwall" (bulanıklık duvarı) gibi oyunlaştırılmış ve modern kayıt teşvik yöntemleri barındırır.

## 2. Kullanılan Teknolojiler / Kütüphaneler
- **Programlama Dili:** Kotlin
- **Arayüz Geliştirme:** Android XML Layouts, Material Design
- **Veri ve Kimlik Yönetimi:** Firebase (Authentication, Realtime Database), RSS Feed Entegrasyonu
- **Üçüncü Parti Kütüphaneler:** 
  - *Coil / Glide:* Görsel yükleme ve Blur efekti optimizasyonu
  - *Antigravity:* Veri çekme ve arayüz entegrasyonu
  - *AppCompatDelegate:* Sistem geneli Karanlık/Aydınlık (Dark/Light) tema yönetimi

## 3. Proje Klasör Yapısı

TransferMerkezi/
├── app/
│   ├── src/main/java/com.furkan.transfermerkezi/
│   │   ├── data/              # RSS feed sağlayıcıları ve Antigravity modülü
│   │   ├── ui/                # Activity, Fragment ve arayüz bileşenleri
│   │   ├── adapter/           # Haber ve KAP listeleri için RecyclerView adaptörleri
│   │   └── util/              # AuthManager (Giriş kontrolü) ve Utils
│   └── res/                   # Layout, String, Colors ve Tema (XML) dosyaları
├── .github/workflows/         # CI/CD test yapılandırması
├── build.gradle               # Proje bağımlılıkları
└── README.md                  # Proje dokümantasyonu

## 4. Kurulum Adımları
1. Projeyi GitHub üzerinden bilgisayarınıza klonlayın: `git clone https://github.com/furkannaktass1/Transfer-Merkezi.git`
2. Android Studio'yu açarak **"Open"** veya **"Import Project"** seçeneğiyle indirdiğiniz klasörü seçin.
3. Firebase entegrasyonu için oluşturduğunuz `google-services.json` dosyasını `app/` dizini içerisine yerleştirin.
4. Gradle Sync işleminin bitmesini bekleyin.

## 5. Çalıştırma / Kullanım Talimatları
- Projeyi USB Hata Ayıklama (USB Debugging) modu açık fiziksel bir cihazda veya Android Emülatör üzerinde çalıştırın.
- Uygulama ilk açıldığında giriş yapmamış kullanıcılar, haber detaylarını kısıtlı (Blur efekti uygulanmış) şekilde görür. Tüm detaylara erişmek ve içerik paylaşmak için kayıt işlemi tamamlanmalıdır.
- Alt navigasyon barındaki **KAP** sekmesi üzerinden sadece resmi transfer bildirimleri filtrelenmiş olarak takip edilebilir.
- Sağ üstteki ayarlar veya profil menüsünden uygulama teması (Karanlık/Aydınlık) değiştirilebilir.

## 6. Ekran Görüntüleri

Kullanıcı Girişi ve Kayıt İşlemleri
| Giriş Ekranı | Kayıt Ol Ekranı |
| :---: | :---: |
| ![Giriş Ekranı](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Giri%C5%9F%20Ekran%C4%B1.png) | ![Kayıt Ol Ekranı](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Kay%C4%B1t%20Ol%20Ekran%C4%B1.png) |

Ana Akış ve Haber Detayı
| Ana Sayfa | Haber Detay Ekranı |
| :---: | :---: |
| ![Ana Sayfa](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Ana%20Sayfa.png) | ![Haber Detayı](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Haber%20Detay%20Ekran%C4%B1.png) |

Özelleştirme ve Profil Ayarları
| Takım Seçim Ekranı | Profil Ekranı |
| :---: | :---: |
| ![Takım Seçimi](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Tak%C4%B1m%20Se%C3%A7im%20Ekran%C4%B1.png) | ![Profil](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Profil%20Ekran%C4%B1.png) |

Favoriler
| Favori Haberler |
| :---: |
| ![Favoriler](https://github.com/furkannaktass1/Transfer-Merkezi/blob/main/Favori%20Haberler.png) |

## 7. GitHub Proje Bağlantısı
https://github.com/furkannaktass1/Transfer-Merkezi

## 8. Kaynakça
- Kamuyu Aydınlatma Platformu (KAP) Resmi Web Sitesi ve RSS Verileri
- Android Developers Documentation (https://developer.android.com)
- Firebase Documentation (https://firebase.google.com/docs)
