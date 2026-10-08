# 🌟 Yiğit Alp İçin Ritmik Sayma & Matematik Dünyası (3. Sınıf)

Bu çalışma seti, 3. sınıfa giden oğlunuz **Yiğit Alp**'in **6'şar, 7'şer ve 8'er ritmik saymaları** kolayca, eğlenerek ve kalıcı bir şekilde öğrenmesi için MEB müfredatına ve çocuk pedagojisine tam uyumlu olarak hazırlanmıştır.

Set içerisinde hem **baskıya hazır A4 materyaller (PDF ve etkileşimli HTML)** hem de doğrudan tarayıcıda çalışan **etkileşimli bir web oyunu** bulunmaktadır.

---

## 🌐 Canlı İnternet Bağlantısı (Her Yerden Erişin)

Bu proje internete yüklendi! Yiğit Alp telefonundan, tabletinden veya istediğiniz herhangi bir bilgisayardan tek tıkla ulaşabilir:

👉 **[https://biteker.github.io/yigit-alp-ritmik-sayma/](https://biteker.github.io/yigit-alp-ritmik-sayma/)**

- **Doğrudan Oyun:** [https://biteker.github.io/yigit-alp-ritmik-sayma/oyun/index.html](https://biteker.github.io/yigit-alp-ritmik-sayma/oyun/index.html)
- **Çalışma Kağıtları:** [https://biteker.github.io/yigit-alp-ritmik-sayma/basili_materyaller/tum_materyaller_rehberi.html](https://biteker.github.io/yigit-alp-ritmik-sayma/basili_materyaller/tum_materyaller_rehberi.html)

---

## 🚀 Yerel Olarak Başlatmak İçin (İnternetsiz)

### 1. Etkileşimli Oyunu Başlatmak İçin:
Terminalden tek komutla veya dosyaya tıklayarak başlatabilirsiniz:
```bash
./oyunu_baslat.sh
```
*(veya doğrudan `oyun/index.html` dosyasını Google Chrome, Firefox vb. herhangi bir tarayıcıda çift tıklayarak açabilirsiniz.)*

### 2. Çalışma Kağıtları ve Materyalleri Açmak İçin:
```bash
./materyalleri_ac.sh
```
*(veya `basili_materyaller/tum_materyaller_rehberi.html` dosyasını tarayıcınızda açabilirsiniz.)*

---

## 📁 Dosya ve Klasör Yapısı

```text
/home/biteker/Documents/Yigit/
├── index.html                           -> Tüm projenin ana karşılama ve yönetim sayfası
├── oyunu_baslat.sh                      -> Oyunu tek tıkla tarayıcıda açan çalıştırılabilir betik
├── materyalleri_ac.sh                   -> Materyal portalını tarayıcıda açan betik
│
├── pdf_ciktilari/                       -> DOĞRUDAN YAZDIRILABİLİR HAZIR PDF DOSYALARI (A4)
│   ├── 01_ritmik_sayma_posteri.pdf      -> 1 sayfa renkli başucu / duvar posteri
│   ├── 02_6sar_calisma_kagidi.pdf       -> 1 sayfa tam boy 6'şar etkinlik sayfası
│   ├── 03_7ser_calisma_kagidi.pdf       -> 1 sayfa tam boy 7'şer etkinlik sayfası
│   ├── 04_8er_calisma_kagidi.pdf        -> 1 sayfa tam boy 8'er etkinlik sayfası
│   ├── 05_karisik_sampiyonluk.pdf       -> 1 sayfa 6, 7, 8 büyük final ve ortak duraklar testi
│   ├── 06_kes_yapistir_kartlar.pdf      -> 2 sayfa kesilip oynanabilir flaş / hafıza kartları
│   └── 07_ritmik_cark_ve_cetvel.pdf     -> 1 sayfa döner çark ve 3 adet kitap ayracı / cep cetveli
│
├── basili_materyaller/                  -> ETKİLEŞİMLİ VE YAZDIRILABİLİR HTML SAYFALARI
│   ├── tum_materyaller_rehberi.html     -> Tüm kağıtları tek ekranda toplayan veli & öğrenci paneli
│   ├── 01_ritmik_sayma_posteri.html
│   ├── 02_6sar_calisma_kagidi.html      -> (Cevapları Göster/Gizle özellikli)
│   ├── 03_7ser_calisma_kagidi.html      -> (Cevapları Göster/Gizle özellikli)
│   ├── 04_8er_calisma_kagidi.html      -> (Cevapları Göster/Gizle özellikli)
│   ├── 05_karisik_sampiyonluk.html      -> (Cevapları Göster/Gizle özellikli)
│   ├── 06_kes_yapistir_kartlar.html
│   ├── 07_ritmik_cark_ve_cetvel.html
│   └── print_style.css                  -> A4 tam sayfa baskı ve ekran CSS tasarımı
│
└── oyun/                                -> ETKİLEŞİMLİ WEB OYUNU ("Yiğit Alp: Ritmik Macera")
    ├── index.html                       -> Oyun arayüzü ve Başarı Sertifikası (Diploma)
    ├── game.js                          -> 4 oyun modu, soru algoritmaları, skor ve kayıt motoru
    ├── audio.js                         -> Web Audio API osilatör ses efektleri (Harici dosyasız)
    ├── confetti.js                      -> Kutlama konfeti yağmuru animasyonu
    └── style.css                        -> Çocuk dostu modern uzay teması ve animasyonlar
```

---

## 🖨️ Basılı Materyallerin Detayları

Tüm çalışma kağıtları **tam olarak 1 A4 sayfası** (kartlar 2 sayfa) boyutuna optimize edilmiştir. Sayfa taşması yapmaz, kenar boşlukları ve yazı tipleri 8-9 yaş grubu çocukların ergonomisine göre tasarlanmıştır:

1. **Ritmik Sayma Başucu Posteri (`01_ritmik_sayma_posteri.pdf`)**:
   - 6'şar (Roket), 7'şer (Okyanus) ve 8'er (Aslan) saymaları 10 adıma kadar gösterir.
   - Sayıların örüntü sırları yer alır (Örn: 6'larda birler basamağı 6-2-8-4-0 döngüsü, 7'lerde hafta hesabı, 8'lerde geriye çift sayılar).
   - Çocuğun çalışma masasının karşısına veya odasına asılmak için idealdir.

2. **6'şar Ritmik Sayma Çalışma Kağıdı (`02_6sar_calisma_kagidi.pdf`)**:
   - *1. Etkinlik:* Roketin Yıldız Rotası (Eksik halkaları tamamlama)
   - *2. Etkinlik:* Arı Maya'nın Bal Peteği Labirenti (Sadece 6'nın katlarını sarıya boyayarak kovana ulaşma)
   - *3. Etkinlik:* Dedektif Yiğit Alp (Seriye karışmış hatalı sayıyı yakalama)
   - *4. Etkinlik:* Geri Sayım Paraşütü (60'tan 6'ya geriye doğru sayma)
   - *5. Etkinlik:* Ritmik Saymadan Çarpmaya Yıldız Köprüsü (3×6, 5×6, 7×6, 9×6)

3. **7'şer Ritmik Sayma Çalışma Kağıdı (`03_7ser_calisma_kagidi.pdf`)**:
   - *1. Etkinlik:* Denizaltının Sihirli İncileri (Eksik sayıları tamamlama)
   - *2. Etkinlik:* Takvim Ustası (1 hafta = 7 gün mantığıyla hafta-gün hesaplama)
   - *3. Etkinlik:* Batık Hazine Haritası (7'nin katlarını boyayarak sandığa ulaşma)
   - *4. Etkinlik:* Derinlikten Yüzeye (70'ten 7'ye geriye doğru sayma)
   - *5. Etkinlik:* Adım Numarası ile Sayıyı Eşleştirme

4. **8'er Ritmik Sayma Çalışma Kağıdı (`04_8er_calisma_kagidi.pdf`)**:
   - *1. Etkinlik:* Süper Kahraman Basamakları (Eksik basamakları tamamlama)
   - *2. Etkinlik:* Ahtapot & Örümcek Problemleri (8 bacaklı / 8 kollu zeka soruları)
   - *3. Etkinlik:* Süper Hakem Yiğit Alp (Doğru [D] / Yanlış [Y] analizi)
   - *4. Etkinlik:* Geriye Doğru 8'er İniş (80'den 8'e geriye sayma)
   - *5. Etkinlik:* 8'ler Hızlı Çarpım Şimşeği

5. **6, 7, 8 Karışık Şampiyonlar Ligi (`05_karisik_sampiyonluk.pdf`)**:
   - 3 farklı vagon (6'şar, 7'şer, 8'er) arasına karışmış sayıları doğru vagona taşıma.
   - Kuralı Bul Dedektifi (Verilen dizinin kaçar sayıldığını bulma).
   - **Ortak Duraklar Zeka Sorusu:** 24'ün hem 6 hem 8'de, 42'nin hem 6 hem 7'de, 56'nın hem 7 hem 8'de olduğunu fark ettiren üst düzey kavrayış etkinliği.
   - 8 soruluk hızlı çarpım şimşeği.

6. **Ritmik Flaş Kartlar & Hafıza Oyunu (`06_kes_yapistir_kartlar.pdf`)**:
   - 2 sayfa, kesik çizgili (✂) kartlar.
   - Soru kartları (Örn: "6'nın 4. adımı / 4 × 6") ve eşleşen cevap kartları (Örn: "24").
   - Ebeveynle soru-cevap hız yarışması veya masaya ters dizerek hafıza oyunu oynanabilir.

7. **Ritmik Sayma Çarkı & Kalemlik Cetvelleri (`07_ritmik_cark_ve_cetvel.pdf`)**:
   - Makasla kesilip ortasına raptiye/ataş takılarak döndürülebilen 3 halkalı ritmik çark şablonu.
   - Kitap arasına ayraç veya kalem kutusuna konabilecek 3 adet renkli mini ritmik cetvel.

---

## 🎮 Etkileşimli Oyun: "Yiğit Alp: Ritmik Macera"

Oyun, tarayıcıda doğrudan çalışır ve hiçbir kurulum, indirme veya internet bağlantısı gerektirmez.

### Özellikler:
- **Kişiselleştirilmiş Deneyim:** Oyun Yiğit Alp'in adıyla açılır, başarılarını hafızasında tutar.
- **Web Audio API Ses Motoru:** Doğru cevaplarda neşeli kristal tınılar, yanlışlarda yumuşak uyarı, roket fırlatışında yükselen motor sesi, seviye bitiminde şampiyonluk melodisi (fanfare).
- **Konfeti Yağmuru:** Her roket kalkışında ve rekor anında ekranda renkli konfetiler patlar.
- **Kalıcı Skor & Yıldızlar:** Yiğit Alp'in kazandığı yıldızlar ve kırdığı rekorlar tarayıcının `localStorage` alanında saklanır.
- **4 Eğlenceli Oyun Modu:**
  1. 🚀 **Roket Fırlatma:** 10 basamağı sırayla bilerek rokete yakıt doldurur. 10. adımda roket dumanlar çıkararak uzaya fırlar!
  2. 🔍 **Kayıp Sayı Dedektifi:** Sayı zincirindeki kayıp `?` işaretini bulur.
  3. ⏱️ **60 Saniye Şampiyonu:** 1 dakikada ardışık doğru cevaplar vererek çarpanı (Combo x2, x3) katlar ve kendi rekorunu kırmaya çalışır.
  4. ⚖️ **Doğru mu Yanlış mı?:** 3 can ile ekrandaki ifadenin doğru veya yanlış olduğuna hızlı refleksle karar verir (Klavyeden `D` ve `Y` tuşlarıyla da oynanabilir).
- **Yazdırılabilir Başarı Diploması:** Ana menüdeki veya oyun sonundaki "Sertifikamı Görüntüle" butonuna tıklandığında Yiğit Alp adına düzenlenmiş, tarihli, yıldızlı ve madalyalı altın diploma açılır. Tek tıkla yazdırılabilir veya PDF olarak saklanabilir!

---

## 💡 Veliler İçin 3 Altın Öneri

1. **Önce Posteri İnceleyin:** Başucu posterini odasına asın ve ilk birkaç gün sayarken parmaklarıyla adımları takip etmesini sağlayın.
2. **Geriye Saymaya Dikkat:** Bir çocuk bir saymayı geriye doğru takılmadan sayabiliyorsa, o ritmik örüntüyü zihninde tamamen kalıcı hale getirmiş demektir.
3. **Günde 10 Dakika Oyun:** Akşamları 10 dakika etkileşimli oyunda roket fırlatması veya 60 saniye maratonu yapması, ritmik saymanın ezbere değil refleks haline gelmesini sağlayacaktır.
