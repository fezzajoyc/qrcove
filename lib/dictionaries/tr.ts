// tr — Türkçe sözlük. Anahtar şekli en ile birebir aynıdır (tests/seo.test.ts derin karşılaştırır).
const tr = {
  brand: "QRCove",
  tagline: "Her QR kodu tarayıcınızda oluşturulur.",
  metaDesc: "Tamamen tarayıcınızda çalışan ücretsiz QR kod oluşturucu ve okuyucu. Bağlantılar, Wi-Fi, kişiler ve daha fazlası için kod oluşturun — filigran yok, kayıt yok, son kullanma tarihi yok. Resim okurken, açmadan önce içinde ne olduğunu görün.",

  nav: {
    tools: "Tüm araçlar",
    categories: "Kategoriler",
    about: "Hakkında",
    menu: "Menü",
    language: "Dil",
  },

  home: {
    heroTitle: "Süresi asla dolmayan QR kodlar — filigran yok, kayıt yok",
    heroSub: "{n} araçla QR kod oluşturma ve okuma: bağlantılar, Wi-Fi, kişi kartları, konumlar. Her şey tarayıcınızda yerel çalışır — ücretsiz, kayıt yok, yükleme yok.",
    browseAll: "Tüm araçlara göz at",
    categoriesTitle: "Kategoriler",
    featuredTitle: "Popüler araçlar",
    trustLocal: "Veriler cihazınızda kalır",
    trustFree: "Ücretsiz, hesap yok",
    trustFast: "Anında, çevrimdışı bile çalışır",
    rotating:
    [
      "Misafirler tek taramayla Wi-Fi'ya bağlanır — kimse şifrenizi yazmaz",
      "Veriler kodun içinde yaşar: ölebilecek bir yönlendirme yok",
      "Kişiler, bağlantılar ve konumlar — taramadan doğrudan telefona",
      "Hesap yok, filigran yok, süresi dolan “dinamik” abonelik yok",
    ],
    statsLabels: { tools: "araç", languages: "dil", uploads: "yükleme", accounts: "hesap" },
    eyebrow: "Sonsuza kadar ücretsiz",
    heroCtaSecondary: "Nasıl çalışır",
    statsTools: "{n} araç",
    statsLanguages: "{n} dil",
    statsUploads: "0 yükleme",
    statsAccounts: "0 hesap",
    categoriesSub: "QRCove'un tüm araçları, cihazınızda çalışır.",
    popularSub: "En çok açılan araçlar.",
    privacyTitle: "Verileriniz cihazınızdan asla çıkmaz.",
    privacySub: "Yükleme adımı yok. QR'ı tarayıcınızdaki JavaScript çizer — bu bir gizlilik vaadi değil, yapılış biçimidir.",
    privacyPoint1T: "Yerel işleme",
    privacyPoint1D: "Metin ve resimler tarayıcının belleğinde işlenir. Hiçbir yere hiçbir şey iletilmez.",
    privacyPoint2T: "Hesap yok",
    privacyPoint2D: "Kayıt yok, e-posta yok, saklanan geçmiş yok. Aracı aç ve kullan.",
    privacyPoint3T: "Tasarımdan dürüst",
    privacyPoint3D:
      "Bir şey gerçekten tarayıcıda yapılamıyorsa, yapılabiliyormuş gibi göstermek yerine bunu söyleriz.",
    privacyLink: "Tüm gizlilik notunu oku",
    endTitle: "Bir araç seç. Gerisi kendiliğinden.",
    endSub: "Ücretsiz QR araçları, sıfır yükleme, kuruluma gerek yok.",
  },

  tools: {
    title: "Tüm araçlar",
    subtitle: "{count} ücretsiz tarayıcı aracı. Yükleme yok, kayıt yok.",
    filterPlaceholder: "Araçlarda ara…",
    count: "{count} araç",
    empty: "“{query}” ile eşleşen araç yok.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF dosyalarını hiçbir yere yüklemeden birleştir, böl, dönüştür ve düzenle." },
    image: { name: "Görsel", desc: "Görselleri doğrudan tarayıcında sıkıştır, yeniden boyutlandır, kırp ve dönüştür." },
    text: { name: "Metin", desc: "Metni yazarken anında say, temizle, sırala ve dönüştür." },
    developer: { name: "Geliştirici", desc: "Günlük geliştirici işleri için biçimlendiriciler, kodlayıcılar, çözücüler ve üreteçler." },
    seo: { name: "SEO", desc: "Meta etiketleri, schema işaretlemesi, SERP önizlemesi ve diğer sayfa içi SEO yardımcıları." },
    security: { name: "Güvenlik", desc: "Şifreler, karma (hash) değerleri ve sorgular — cihazında üretilir, cihazında denetlenir." },
    utility: { name: "Yardımcı Araçlar", desc: "QR oluşturma ve okuma: bağlantılar, Wi-Fi, kişi kartları, tarama — tamamen yerel, süresiz." },
  },

  tool: {
    howTo: "Nasıl kullanılır",
    faq: "Sık sorulan sorular",
    related: "İlgili araçlar",
    privacyNote:
      "Bu araç tamamen tarayıcında çalışır. Verilerin asla cihazından çıkmaz — hiçbir sunucuya yüklenmez.",
    inCategory: "{category} kategorisinde daha fazlası",
    backToCategory: "Tüm {category} araçları",
  },

  common: {
    copy: "Kopyala",
    copied: "Kopyalandı",
    download: "İndir",
    reset: "Sıfırla",
    swap: "Değiştir",
    clear: "Temizle",
    error: "Bir şeyler ters gitti. Girdini kontrol edip tekrar dene.",
    input: "Girdi",
    output: "Sonuç",
    settings: "Seçenekler",
    dropFiles: "Dosyaları buraya bırak veya tıklayarak seç",
    dropFile: "Dosyayı buraya bırak veya tıklayarak seç",
    processing: "İşleniyor…",
    fileSize: "Boyut",
    sample: "Örneği dene",
    uppercase: "BÜYÜKHARF",
  },

  unit: {
    from: "Kaynak",
    to: "Hedef",
    amount: "Miktar",
    result: "Sonuç",
    common: "Sık kullanılan dönüşümler",
    formula: "Formül",
    allUnits: "Tüm birimler",
  },

  text: {
    stats: {
      words: "Kelime",
      characters: "Karakter",
      charsNoSpaces: "Boşluksuz",
      sentences: "Cümle",
      paragraphs: "Paragraf",
      lines: "Satır",
      readingTime: "Okuma süresi",
      readingMinutes: "{n} dk okuma",
    },
  },

  footer: {
    line: "Ücretsiz QR araçları. Burada yaptığınız hiçbir şey cihazınızdan çıkmaz.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    about: "Hakkında",
    badges: "Rozetler",
    language: "Dil",
  },

  badge: {
    title: "QRCove rozetleri",
    desc: "QRCove rozetini sitene, README'ne veya dokümanlarına ekle. Rozet buraya bağlanır ve arkasındaki QR araçlarının tamamen tarayıcıda çalıştığını anlatır.",
    voluntary: "Yerleştirme tamamen isteğe bağlıdır — projeyi seviyorsan bir rozet seç. İzin almaya gerek yok.",
    md: "Markdown (README)",
    html: "HTML (web sitesi)",
    thanks: "Duyulmamıza yardım ettiğin için teşekkürler — her yerleştirme, dosyalarına saygı duyan araçları daha çok kişinin keşfetmesini sağlar.",
  },

  embed: {
    title: "Bu aracı gömün",
    desc: "Tek satırla bu aracı sitenize ekleyin — ziyaretçinin tarayıcısında çalışır.",
  },

    mcp: {
    title: "MCP sunucusu — AI erişimli araçlar",
    desc1: "QRCove bir MCP (Model Context Protocol) sunucusu içerir: Claude veya Cursor gibi AI asistanları Wi-Fi ve vCard yükleri oluşturabilir ve çözülmüş QR içeriklerini sınıflandırabilir — bu sitenin test edilmiş mantığının aynısı, yeniden yazılmış hali değil.",
    desc2: "Araçlar sitenin kendi saf fonksiyonlarını çalıştırır: yük oluşturma, QR içerik algılama ve ISO kapasite matrisi. QR görsel oluşturma yalnızca tarayıcıdadır; bu metin araçları npx ile AI istemcisinin makinesinde çalışır — sunucularımıza hiçbir şey gönderilmez.",
    toolsTitle: "Çalıştırılabilir araçlar ({n})",
    requiresNode: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
    privacy: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
  },

    notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığın araç mevcut değil. Onun yerine tüm araçlara göz at.",
    home: "Ana sayfaya git",
  },
};

export default tr;
