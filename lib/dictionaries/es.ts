import type { Dictionary } from "../i18n";

const es: Dictionary = {
  brand: "QRCove",
  tagline: "Cada código QR se crea en tu navegador.",
  metaDesc: "Generador y lector de códigos QR gratis que funciona íntegramente en tu navegador. Crea códigos para enlaces, Wi-Fi, contactos y más — sin marca de agua, sin registro, sin caducidad. Al leer imágenes, mira qué contienen antes de abrirlas.",

  nav: {
    tools: "Todas las herramientas",
    categories: "Categorías",
    about: "Acerca de",
    menu: "Menú",
    language: "Idioma",
  },

  home: {
    heroTitle: "Códigos QR que nunca caducan — sin marca de agua, sin registro",
    heroSub: "{n} herramientas para crear y leer códigos QR: enlaces, Wi-Fi, tarjetas de contacto, ubicaciones. Todo se ejecuta en tu navegador — gratis, sin registro, sin subidas.",
    browseAll: "Ver todas las herramientas",
    categoriesTitle: "Categorías",
    featuredTitle: "Herramientas populares",
    trustLocal: "Los datos se quedan en tu dispositivo",
    trustFree: "Gratis, sin cuenta",
    trustFast: "Instantáneo, funciona sin conexión",
    rotating:
    [
      "Los invitados se conectan al Wi-Fi con un escaneo — nadie teclea tu contraseña",
      "Los datos viven dentro del código: sin redirecciones que puedan morir",
      "Contactos, enlaces y ubicaciones — del escaneo directo al móvil",
      "Sin cuenta, sin marca de agua, sin suscripción “dinámica” que caduque",
    ],
    statsLabels: { tools: "herramientas", languages: "idiomas", uploads: "subidas", accounts: "cuentas" },
    eyebrow: "Gratis siempre",
    heroCtaSecondary: "Cómo funciona",
    statsTools: "{n} herramientas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 subidas",
    statsAccounts: "0 cuentas",
    categoriesSub: "Todas las herramientas de QRCove, ejecutándose en tu dispositivo.",
    popularSub: "Las herramientas más usadas.",
    privacyTitle: "Tus datos nunca salen de tu dispositivo.",
    privacySub: "No existe el paso de subida. El QR lo dibuja JavaScript en tu navegador — no es una promesa de política, es cómo está construido.",
    privacyPoint1T: "Procesado local",
    privacyPoint1D: "El texto y las imágenes se procesan en la memoria del navegador. No se transmite nada, a ningún sitio.",
    privacyPoint2T: "Sin cuentas",
    privacyPoint2D: "Ni registro, ni correo, ni historial. Abre y usa.",
    privacyPoint3T: "Honestos por diseño",
    privacyPoint3D: "Si algo no se puede hacer en el navegador, lo decimos en vez de fingir.",
    privacyLink: "Leer la nota de privacidad",
    endTitle: "Elige una herramienta. Funciona.",
    endSub: "Herramientas QR gratis, cero subidas, nada que instalar.",
  },

  tools: {
    title: "Todas las herramientas",
    subtitle: "Busca entre {count} herramientas gratuitas. Sin subidas, sin registro.",
    filterPlaceholder: "Buscar herramientas…",
    count: "{count} herramientas",
    empty: "Ninguna herramienta coincide con «{query}».",
  },

  categories: {
    pdf: { name: "PDF", desc: "Combina, divide, convierte y edita PDF sin subirlos a ningún sitio." },
    image: { name: "Imagen", desc: "Comprime, redimensiona, recorta y convierte imágenes en tu navegador." },
    text: { name: "Texto", desc: "Cuenta, limpia, ordena y transforma texto al instante, mientras escribes." },
    developer: { name: "Desarrollador", desc: "Formateadores, codificadores, decodificadores y generadores para el día a día." },
    seo: { name: "SEO", desc: "Metaetiquetas, datos estructurados, vista previa SERP y más ayuda SEO." },
    security: { name: "Seguridad", desc: "Contraseñas, hashes y consultas: generados y verificados en tu dispositivo." },
    utility: { name: "Utilidades", desc: "Creación y lectura de QR: enlaces, Wi-Fi, tarjetas de contacto, escaneo — todo local y sin caducidad." },
  },

  tool: {
    howTo: "Cómo usarlo",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    privacyNote:
      "Esta herramienta funciona por completo en tu navegador. Tus datos nunca salen de tu dispositivo y no se suben a ningún servidor.",
    inCategory: "Más de {category}",
    backToCategory: "Todas las herramientas de {category}",
  },

  common: {
    copy: "Copiar",
    copied: "Copiado",
    download: "Descargar",
    reset: "Restablecer",
    swap: "Intercambiar",
    clear: "Limpiar",
    error: "Algo salió mal. Revisa los datos e inténtalo de nuevo.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opciones",
    dropFiles: "Suelta los archivos aquí o haz clic para elegirlos",
    dropFile: "Suelta un archivo aquí o haz clic para elegirlo",
    processing: "Procesando…",
    fileSize: "Tamaño",
    sample: "Probar un ejemplo",
    uppercase: "MAYÚSCULAS",
  },

  unit: {
    from: "De",
    to: "A",
    amount: "Cantidad",
    result: "Resultado",
    common: "Conversiones frecuentes",
    formula: "Fórmula",
    allUnits: "Todas las unidades",
  },

  text: {
    stats: {
      words: "Palabras",
      characters: "Caracteres",
      charsNoSpaces: "Sin espacios",
      sentences: "Frases",
      paragraphs: "Párrafos",
      lines: "Líneas",
      readingTime: "Tiempo de lectura",
      readingMinutes: "{n} min de lectura",
    },
  },

  footer: {
    line: "Herramientas QR gratis. Nada de lo que hagas aquí sale de tu dispositivo.",
    privacy: "Privacidad",
    terms: "Términos",
    about: "Acerca de",
    badges: "Insignias",
    language: "Idioma",
  },

  badge: {
    title: "Insignias de QRCove",
    desc: "Pon una insignia de QRCove en tu sitio, README o documentación. Enlaza aquí y cuenta que las herramientas QR que hay detrás funcionan por completo en el navegador.",
    voluntary: "Incrustarla es totalmente voluntario: elige una si te gusta el proyecto. No hace falta permiso.",
    md: "Markdown (README)",
    html: "HTML (web)",
    thanks: "Gracias por pasarlo — cada inserción ayuda a más gente a descubrir herramientas que respetan sus archivos.",
  },

    embed: {
    title: "Insertar esta herramienta",
    desc: "Pon esta herramienta en tu sitio con una línea: se ejecuta en el navegador del visitante.",
  },

    mcp: {
    title: "Servidor MCP — herramientas accesibles para IA",
    desc1: "QRCove incluye un servidor MCP (Model Context Protocol): asistentes de IA como Claude o Cursor pueden construir payloads Wi-Fi y vCard y clasificar contenido QR decodificado — la misma lógica probada de este sitio, no una reimplementación.",
    desc2: "Las herramientas ejecutan las funciones puras del propio sitio: construcción de payloads, detección de contenido QR y la matriz de capacidad ISO. El renderizado de imágenes QR es solo de navegador; estas herramientas de texto se ejecutan en la máquina del cliente de IA vía npx — nada se envía a nuestros servidores.",
    toolsTitle: "Herramientas ejecutables ({n})",
    requiresNode: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
    privacy: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
  },

    notFound: {
    title: "Página no encontrada",
    body: "La herramienta que buscas no existe. Explora todas las herramientas.",
    home: "Ir a la página principal",
  },
};

export default es;
