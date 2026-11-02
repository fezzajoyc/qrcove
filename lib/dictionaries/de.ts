// de:Deutsche Übersetzung — Werte natürlich übersetzt, Schlüsselform identisch mit en.
// Vertrag: Schlüsselform muss mit en exakt übereinstimmen (tests/seo.test.ts tiefvergleichend), Werte müssen de sein.
const de = {
  brand: "QRCove",
  tagline: "Jeder QR-Code entsteht in Ihrem Browser.",
  metaDesc: "Kostenloser QR-Code-Generator und -Reader, der komplett in Ihrem Browser läuft. Erstellen Sie Codes für Links, WLAN, Kontakte und mehr — ohne Wasserzeichen, ohne Anmeldung, ohne Ablaufdatum. Beim Lesen von Bildern sehen Sie vor dem Öffnen, was drinsteckt.",

  nav: {
    tools: "Alle Tools",
    categories: "Kategorien",
    about: "Über uns",
    menu: "Menü",
    language: "Sprache",
  },

  home: {
    heroTitle: "QR-Codes, die nie ablaufen — kein Wasserzeichen, keine Anmeldung",
    heroSub: "{n} Tools zum Erstellen und Lesen von QR-Codes: Links, WLAN, Kontaktkarten, Standorte. Alles läuft lokal in Ihrem Browser — kostenlos, ohne Anmeldung, ohne Uploads.",
    browseAll: "Alle Tools ansehen",
    categoriesTitle: "Kategorien",
    featuredTitle: "Beliebte Tools",
    trustLocal: "Daten bleiben auf Ihrem Gerät",
    trustFree: "Kostenlos, ohne Konto",
    trustFast: "Sofort, funktioniert offline",
    rotating:
    [
      "Gäste verbinden sich mit einem Scan mit dem WLAN — niemand tippt Ihr Passwort",
      "Die Daten stecken im Code selbst: kein Redirect, der sterben kann",
      "Kontakte, Links und Orte — vom Scan direkt ins Telefon",
      "Kein Konto, kein Wasserzeichen, kein „dynamisches“ Abo, das ausläuft",
    ],
    statsLabels: { tools: "Tools", languages: "Sprachen", uploads: "Uploads", accounts: "Konten" },
    eyebrow: "Für immer kostenlos",
    heroCtaSecondary: "So funktioniert es",
    statsTools: "{n} Tools",
    statsLanguages: "{n} Sprachen",
    statsUploads: "0 Uploads",
    statsAccounts: "0 Konten",
    categoriesSub: "Alle QRCove-Tools, ausgeführt auf Ihrem Gerät.",
    popularSub: "Die Tools, die am häufigsten geöffnet werden.",
    privacyTitle: "Ihre Daten verlassen Ihr Gerät nie.",
    privacySub: "Es gibt keinen Upload-Schritt. Der QR-Code wird von JavaScript in Ihrem Browser gezeichnet — das ist kein Datenschutz-Versprechen, sondern die Bauweise.",
    privacyPoint1T: "Lokale Verarbeitung",
    privacyPoint1D: "Text und Bilder werden im Speicher des Browsers verarbeitet. Nichts wird irgendwohin übertragen.",
    privacyPoint2T: "Keine Konten",
    privacyPoint2D: "Keine Anmeldung, keine E-Mail, kein gespeicherter Verlauf. Tool öffnen und loslegen.",
    privacyPoint3T: "Ehrlich von Grund auf",
    privacyPoint3D:
      "Wenn etwas im Browser wirklich nicht geht, sagen wir das — statt es so zu tun, als würde es funktionieren.",
    privacyLink: "Die vollständigen Datenschutzhinweise lesen",
    endTitle: "Wählen Sie ein Tool. Es funktioniert einfach.",
    endSub: "Kostenlose QR-Tools, null Uploads, nichts zu installieren.",
  },

  tools: {
    title: "Alle Tools",
    subtitle: "Durchsuchen Sie {count} kostenlose Browser-Tools. Kein Upload, keine Anmeldung.",
    filterPlaceholder: "Tools suchen…",
    count: "{count} Tools",
    empty: "Keine Tools passen zu „{query}“.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF-Dateien zusammenfügen, teilen, konvertieren und bearbeiten — ohne sie irgendwo hochzuladen." },
    image: { name: "Bilder", desc: "Bilder direkt im Browser komprimieren, skalieren, zuschneiden und konvertieren." },
    text: { name: "Text", desc: "Text zählen, bereinigen, sortieren und umwandeln — sofort bei jeder Eingabe." },
    developer: { name: "Entwickler", desc: "Formatierer, Encoder, Decoder und Generatoren für die tägliche Entwicklerarbeit." },
    seo: { name: "SEO", desc: "Meta-Tags, Schema-Markup, SERP-Vorschau und weitere On-Page-SEO-Helfer." },
    security: { name: "Sicherheit", desc: "Passwörter, Hashes und Lookups — auf Ihrem Gerät erzeugt und geprüft." },
    utility: { name: "Werkzeuge", desc: "QR-Erstellung und -Lesen: Links, WLAN, Kontaktkarten, Scannen — alles lokal, ohne Ablauf." },
  },

  tool: {
    howTo: "So verwenden Sie es",
    faq: "Häufige Fragen",
    related: "Verwandte Tools",
    privacyNote:
      "Dieses Tool läuft vollständig in Ihrem Browser. Ihre Daten verlassen Ihr Gerät nie — sie werden auf keinen Server hochgeladen.",
    inCategory: "Mehr in {category}",
    backToCategory: "Alle {category}-Tools",
  },

  common: {
    copy: "Kopieren",
    copied: "Kopiert",
    download: "Herunterladen",
    reset: "Zurücksetzen",
    swap: "Tauschen",
    clear: "Leeren",
    error: "Etwas ist schiefgelaufen. Prüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
    input: "Eingabe",
    output: "Ergebnis",
    settings: "Optionen",
    dropFiles: "Dateien hierher ziehen oder klicken zum Auswählen",
    dropFile: "Datei hierher ziehen oder klicken zum Auswählen",
    processing: "Verarbeitung…",
    fileSize: "Größe",
    sample: "Beispiel ausprobieren",
    uppercase: "GROSSBUCHSTABEN",
  },

  unit: {
    from: "Von",
    to: "Nach",
    amount: "Menge",
    result: "Ergebnis",
    common: "Häufige Umrechnungen",
    formula: "Formel",
    allUnits: "Alle Einheiten",
  },

  text: {
    stats: {
      words: "Wörter",
      characters: "Zeichen",
      charsNoSpaces: "Ohne Leerzeichen",
      sentences: "Sätze",
      paragraphs: "Absätze",
      lines: "Zeilen",
      readingTime: "Lesezeit",
      readingMinutes: "{n} Min. Lesezeit",
    },
  },

  footer: {
    line: "Kostenlose QR-Tools. Nichts, was Sie hier tun, verlässt Ihr Gerät.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    about: "Über uns",
    badges: "Badges",
    language: "Sprache",
  },

  badge: {
    title: "QRCove-Badges",
    desc: "Setzen Sie ein QRCove-Badge auf Ihre Website, Ihr README oder Ihre Doku. Es verlinkt hierher und zeigt: Die QR-Tools dahinter laufen vollständig im Browser.",
    voluntary: "Das Einbetten ist völlig freiwillig — nehmen Sie ein Badge, wenn Ihnen das Projekt gefällt. Keine Erlaubnis nötig.",
    md: "Markdown (README)",
    html: "HTML (Website)",
    thanks: "Danke für die Weiterempfehlung — jede Einbettung hilft mehr Menschen, Tools zu entdecken, die ihre Dateien respektieren.",
  },

    embed: {
    title: "Dieses Tool einbetten",
    desc: "Binden Sie dieses Tool mit einer Zeile in Ihre Website ein — es läuft im Browser des Besuchers.",
  },

    mcp: {
    title: "MCP-Server — KI-zugängliche Tools",
    desc1: "QRCove liefert einen MCP-Server (Model Context Protocol): KI-Assistenten wie Claude oder Cursor bauen WLAN- und vCard-Payloads und klassifizieren dekodierte QR-Inhalte — dieselbe getestete Logik wie auf der Website, keine Neuimplementierung.",
    desc2: "Die Tools führen die reinen Funktionen der Seite aus: Payload-Erstellung, QR-Inhaltserkennung und die ISO-Kapazitätsmatrix. Das Rendern von QR-Bildern ist nur im Browser möglich; diese Text-Tools laufen über npx auf dem Rechner des KI-Clients — nichts geht an unsere Server.",
    toolsTitle: "Ausführbare Tools ({n})",
    requiresNode: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
    privacy: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
  },

    notFound: {
    title: "Seite nicht gefunden",
    body: "Das gesuchte Tool existiert nicht. Sehen Sie sich stattdessen alle Tools an.",
    home: "Zur Startseite",
  },
};

export default de;
