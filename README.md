# Usta Yapı — Tadilat portföy sitesi

Türkçe, mobil uyumlu ve bağımlılık gerektirmeyen statik site. Node.js 22 ile çalışır.

## Çalıştırma

```sh
npm run dev
```

Yerel önizleme: http://127.0.0.1:4173

```sh
npm run build
npm run preview
```

`dist/` klasörünü herhangi bir statik site sunucusunda yayınlayabilirsiniz.

## İşletme bilgileri

`site.config.js` dosyasında işletme adı, telefon, WhatsApp ve hizmet bölgesini düzenleyin. Telefon ve WhatsApp için `+90` ile başlayan uluslararası biçimi kullanın. İki alan birbirinden bağımsızdır. Numara verilmediği için başlangıçta boş bırakılmıştır; bağlantılar yanlış bir kişiye arama veya mesaj göndermez. `Usta Yapı` geçici tasarım adıdır.

WhatsApp formu sunucuya veri kaydetmez. Seçilen hizmet ve yazılan açıklamayla bir WhatsApp mesajı hazırlar; ziyaretçi mesajı WhatsApp üzerinden kendisi gönderir.

## Görseller

Fotoğraflar **indirilmez** ve kod deposunda bulunmaz. `images.unsplash.com` adresinden boyutlandırılmış dış bağlantılarla yüklenir. Fontlar da Google Fonts üzerinden yüklenir. İnternet bağlantısı gerektirirler.

Lisans: https://unsplash.com/license

Kullanılan Unsplash görselleri:

- Salon: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- Banyo: https://images.unsplash.com/photo-1620626011761-996317b8d101
- Mutfak: https://images.unsplash.com/photo-1556912172-45b7abe8b7e1
- Dış cephe: https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8

Görseller ilham amaçlı temsili örneklerdir; gerçek müşteri projesi olarak sunulmaz. Gerçek portföy için `app.js` içindeki `projects` dizisini işletmenin kendi işleri ve izinli dış görsel bağlantılarıyla güncelleyin.
