import { defineTool } from "../_lib/types";
import { QrScannerEngine } from "../_engines/qr-scanner-engine";

export default defineTool({
  slug: "qr-scanner",
  category: "utility",
  icon: "search",
  engine: { component: QrScannerEngine, props: {} },
  copy: {
    en: {
      name: "QR Code Reader",
      h1: "QR Code Reader — decode an image, see what is inside",
      tagline:
        "Decode QR codes from an image without installing an app — links, Wi-Fi, contact cards and more, with the raw content explained and copyable.",
      intro: [
        "Phone cameras hide what a QR code actually contains — you scan and get thrown into a link, a network or a contact with no chance to inspect it first. This reader shows you the raw payload before you act on it: the exact URL, the Wi-Fi credentials, the full vCard text, the coordinates.",
        "It does more than display text. The content is classified automatically — website link, Wi-Fi network, contact card, email or SMS draft, phone number, map coordinates — and you get the matching action: open the link, save the contact as .vcf, copy the Wi-Fi password, view the coordinates on a map.",
        "Decoding runs entirely in your browser: uploaded images are read from local pixels with the jsqr library, and nothing is uploaded anywhere. On Android Chrome you also get a live camera mode via the browser's built-in BarcodeDetector.",
      ],
      steps: [
        "Take a screenshot or photo of the QR code, or drop an image straight onto the page.",
        "The decoded content appears with its type and the raw string side by side.",
        "Check what it actually is before tapping anything — that is the point of reading a QR consciously.",
        "Copy the raw content, open the link, save the contact or view the location on a map.",
      ],
      faqs: [
        {
          q: "Why read a QR code from an image instead of just pointing my camera?",
          a: "Because your camera executes first and shows later. Reading from an image lets you see the destination before anything opens — the safe way to handle QR codes from posters, packages, emails or messages from strangers (quishing, fake-parking-meter and payment-redirect scams all travel by QR).",
        },
        {
          q: "Does the live camera mode work in every browser?",
          a: "No, and we say so up front: live scanning uses the browser's built-in BarcodeDetector API, which Android Chrome, Edge and Samsung Internet expose but Firefox and most desktop browsers do not. Everywhere else, use the image tab — photograph or screenshot the code and drop it in. Same decoding, still no upload.",
        },
        {
          q: "What kinds of QR content does it recognize?",
          a: "URLs, WIFI: network payloads (with the SSID, security type, password and hidden flag parsed out), vCard contact cards, geo coordinates, mailto and SMSTO drafts, tel: numbers — and anything else comes out as plain text you can copy.",
        },
        {
          q: "Are my images uploaded to a server?",
          a: "No. The image is decoded in your browser from local pixels; there is no upload step in the code at all. The same is true for camera frames, which are analyzed in memory only.",
        },
      ],
    },
    zh: {
      name: "二维码识别器",
      h1: "二维码识别 — 先看清里面是什么,再决定点不点",
      tagline:
        "上传图片识别二维码,无需安装 App:链接、Wi-Fi、名片等自动分类展示,原始内容可查看、可复制。",
      intro: [
        "手机相机不会告诉你二维码里到底装了什么——一扫就直接跳转、连网或存人,没有先查看的机会。这个识别器让你在行动之前先看到原始内容:确切的网址、Wi-Fi 凭据、完整 vCard 文本、坐标。",
        "它不只是显示文字。内容会被自动分类——网址链接、Wi-Fi 网络、联系人名片、邮件或短信草稿、电话号码、地图坐标——并给出对应操作:打开链接、把名片存成 .vcf、复制 Wi-Fi 密码、在地图上查看坐标。",
        "识别完全在浏览器里完成:上传的图片用 jsqr 库读取本地像素,不会上传到任何地方。在安卓 Chrome 上还有基于浏览器内置 BarcodeDetector 的实时摄像头模式。",
      ],
      steps: [
        "给二维码截图或拍照,或直接把图片拖到页面上。",
        "识别结果连同类型和原始字符串一起显示。",
        "点任何东西之前先看清它是什么——这正是“有意识地读码”的意义。",
        "复制原始内容、打开链接、保存联系人或在地图上查看位置。",
      ],
      faqs: [
        {
          q: "为什么用图片识别,而不是直接用手机相机扫?",
          a: "因为手机相机是“先执行、后展示”。从图片识别可以在任何东西打开之前先看清去向——这是处理海报、包裹、邮件或陌生人发来的二维码的安全方式(假停车码、付款跳转等骗局都靠二维码传播)。",
        },
        {
          q: "实时摄像头模式在所有浏览器里都能用吗?",
          a: "不能,而且我们直接告诉你:实时扫描依赖浏览器内置的 BarcodeDetector API,安卓的 Chrome、Edge、三星浏览器提供它,但 Firefox 和多数桌面浏览器没有。其他环境请用“从图片识别”——给码拍照或截图拖进来即可,识别方式相同,同样不上传。",
        },
        {
          q: "能识别哪些类型的二维码内容?",
          a: "网址、WIFI: 网络内容(解析出 SSID、加密方式、密码、隐藏标记)、vCard 联系人名片、地理坐标、mailto 和 SMSTO 草稿、tel: 号码——其余一律作为可复制的纯文本输出。",
        },
        {
          q: "我的图片会被上传到服务器吗?",
          a: "不会。图片在浏览器里从本地像素解码,代码里根本不存在上传这一步。摄像头画面同理,只在内存中分析。",
        },
      ],
    },
    ja: {
      name: "QRコード読み取り",
      h1: "QRコード読み取り — 画像から中身を確認してから開く",
      tagline:
        "画像からQRコードを読み取るツール。アプリ不要で、リンク・Wi-Fi・連絡先などを自動判別して表示し、元の内容をそのままコピーできます。",
      intro: [
        "スマホのカメラは QR コードの中身を見せてくれません — スキャンした瞬間にリンクへ飛び、ネットワークへ接続し、連絡先を保存します。このリーダーは、行動する前に生のペイロードを確認させます。正確な URL、Wi-Fi の資格情報、vCard 全文、座標です。",
        "テキスト表示だけではありません。内容は自動で分類されます — ウェブリンク、Wi-Fi ネットワーク、連絡先カード、メールや SMS の下書き、電話番号、地図座標 — そして対応するアクションを提示します。リンクを開く、連絡先を .vcf で保存、Wi-Fi パスワードをコピー、座標を地図で表示。",
        "読み取りは完全にブラウザ内で行われます。アップロードされた画像は jsqr ライブラリでローカルのピクセルから読み込まれ、どこにも送信されません。Android Chrome ではブラウザ内蔵の BarcodeDetector によるライブカメラモードも使えます。",
      ],
      steps: [
        "QR コードをスクリーンショットか写真に撮るか、画像をページにドロップします。",
        "読み取り結果が、種類と元の文字列と並んで表示されます。",
        "何かをタップする前に、それが実際に何かを確認します — これが「意識して読む」意味です。",
        "元の内容をコピー、リンクを開く、連絡先を保存、地図で場所を表示。",
      ],
      faqs: [
        {
          q: "カメラで直接読むのではなく、画像から読む理由は?",
          a: "カメラは先に実行して後から見せるからです。画像から読めば、何かが開く前にリンク先を確認できます。ポスター・荷物・メール・知らない人からの QR を扱う安全な方法です(偽駐車支払いや決済リダイレクト詐欺は QR で広がっています)。",
        },
        {
          q: "ライブカメラモードは全ブラウザで使えますか?",
          a: "使えません。正直に言います:ライブ読み取りはブラウザ内蔵の BarcodeDetector API を使います。Android の Chrome・Edge・Samsung Internet は公開していますが、Firefox や多くのデスクトップブラウザはしていません。それ以外では「画像から読み取り」タブを使ってください。写真やスクリーンショットをドロップするだけです。読み取り方式は同じで、アップロードもありません。",
        },
        {
          q: "どんな種類の QR 内容を認識しますか?",
          a: "URL、WIFI: ペイロード(SSID・暗号化方式・パスワード・ステルスフラグを解析)、vCard 連絡先、geo 座標、mailto と SMSTO の下書き、tel: 番号 — その他はすべてコピー可能なプレーンテキストとして出力します。",
        },
        {
          q: "画像はサーバーにアップロードされますか?",
          a: "いいえ。画像はブラウザ内でローカルのピクセルからデコードされ、コードにはアップロード処理そのものが存在しません。カメラのフレームも同様で、メモリ内でのみ解析されます。",
        },
      ],
    },
    es: {
      name: "Lector de códigos QR",
      h1: "Lector de QR — descodifica una imagen y mira qué hay dentro",
      tagline:
        "Decodifica códigos QR desde una imagen sin instalar apps: enlaces, Wi-Fi, tarjetas de contacto y más, con el contenido original explicado y copiable.",
      intro: [
        "La cámara del móvil no te enseña lo que contiene un código QR: escaneas y te lanzan a un enlace, una red o un contacto sin oportunidad de inspeccionarlo antes. Este lector te muestra el contenido en crudo antes de actuar: la URL exacta, las credenciales Wi-Fi, el texto completo de la vCard, las coordenadas.",
        "Hace más que mostrar texto. El contenido se clasifica automáticamente —enlace web, red Wi-Fi, tarjeta de contacto, borrador de correo o SMS, número de teléfono, coordenadas— y recibes la acción correspondiente: abrir el enlace, guardar el contacto como .vcf, copiar la contraseña Wi-Fi, ver las coordenadas en un mapa.",
        "La decodificación ocurre íntegramente en tu navegador: las imágenes se leen de píxeles locales con la librería jsqr y no se sube nada a ningún sitio. En Chrome para Android también tienes modo cámara en vivo con el BarcodeDetector integrado del navegador.",
      ],
      steps: [
        "Haz una captura o foto del código QR, o suelta una imagen directamente en la página.",
        "El contenido decodificado aparece con su tipo y la cadena original uno al lado del otro.",
        "Comprueba qué es realmente antes de tocar nada — de eso se trata leer un QR conscientemente.",
        "Copia el contenido original, abre el enlace, guarda el contacto o mira la ubicación en un mapa.",
      ],
      faqs: [
        {
          q: "¿Por qué leer un QR desde una imagen en vez de apuntar con la cámara?",
          a: "Porque tu cámara ejecuta primero y muestra después. Leer desde una imagen te deja ver el destino antes de que se abra nada — la forma segura de tratar códigos de carteles, paquetes, correos o mensajes de desconocidos (las estafas de parquímetros falsos y redirecciones de pago viajan todas en QR).",
        },
        {
          q: "¿El modo cámara en vivo funciona en todos los navegadores?",
          a: "No, y lo decimos desde el principio: el escaneo en vivo usa la API BarcodeDetector integrada del navegador, que exponen Chrome, Edge y Samsung Internet en Android pero no Firefox ni la mayoría de navegadores de escritorio. En el resto, usa la pestaña de imagen: fotografía o captura el código y suéltalo. Misma decodificación y tampoco se sube nada.",
        },
        {
          q: "¿Qué tipos de contenido QR reconoce?",
          a: "URLs, contenidos WIFI: (con SSID, tipo de seguridad, contraseña y bandera de red oculta parseados), tarjetas vCard, coordenadas geo, borradores mailto y SMSTO, números tel: — y todo lo demás sale como texto sin formato que puedes copiar.",
        },
        {
          q: "¿Mis imágenes se suben a un servidor?",
          a: "No. La imagen se decodifica en tu navegador desde píxeles locales; en el código no existe ningún paso de subida. Lo mismo vale para los fotogramas de la cámara, que solo se analizan en memoria.",
        },
      ],
    },
    pt: {
      name: "Leitor de QR Code",
      h1: "Leitor de QR Code — decodifique uma imagem e veja o que há dentro",
      tagline:
        "Leia códigos QR de uma imagem sem instalar aplicativos — links, Wi-Fi, cartões de contato e mais, com o conteúdo original explicado e copiável.",
      intro: [
        "A câmera do celular esconde o que um QR code realmente contém — você escaneia e é jogado num link, numa rede ou num contato sem chance de inspecionar antes. Este leitor mostra o conteúdo puro antes de você agir: a URL exata, as credenciais do Wi-Fi, o texto completo do vCard, as coordenadas.",
        "Ele faz mais que exibir texto. O conteúdo é classificado automaticamente — link de site, rede Wi-Fi, cartão de contato, rascunho de e-mail ou SMS, número de telefone, coordenadas de mapa — e você recebe a ação correspondente: abrir o link, salvar o contato como .vcf, copiar a senha do Wi-Fi, ver as coordenadas num mapa.",
        "A decodificação acontece inteiramente no seu navegador: as imagens são lidas de pixels locais com a biblioteca jsqr e nada é enviado para lugar nenhum. No Chrome para Android você também tem modo de câmera ao vivo pelo BarcodeDetector nativo do navegador.",
      ],
      steps: [
        "Tire uma captura de tela ou foto do QR code, ou solte uma imagem direto na página.",
        "O conteúdo decodificado aparece com o tipo e a string original lado a lado.",
        "Confira o que aquilo realmente é antes de tocar em qualquer coisa — esse é o ponto de ler um QR conscientemente.",
        "Copie o conteúdo original, abra o link, salve o contato ou veja a localização num mapa.",
      ],
      faqs: [
        {
          q: "Por que ler um QR de uma imagem em vez de apontar a câmera?",
          a: "Porque sua câmera executa primeiro e mostra depois. Ler de uma imagem permite ver o destino antes que qualquer coisa abra — a forma segura de lidar com QR codes de cartazes, embalagens, e-mails ou mensagens de desconhecidos (golpes de estacionamento falso e redirecionamento de pagamento viajam todos em QR).",
        },
        {
          q: "O modo de câmera ao vivo funciona em todos os navegadores?",
          a: "Não, e dizemos isso de cara: a leitura ao vivo usa a API BarcodeDetector nativa do navegador, que o Chrome, Edge e Samsung Internet no Android expõem, mas o Firefox e a maioria dos navegadores de desktop não. Nos demais, use a aba de imagem: fotografie ou capture o código e solte aqui. Mesma decodificação, e também sem upload.",
        },
        {
          q: "Que tipos de conteúdo QR ele reconhece?",
          a: "URLs, payloads WIFI: (com SSID, tipo de segurança, senha e flag de rede oculta extraídos), cartões vCard, coordenadas geo, rascunhos mailto e SMSTO, números tel: — e todo o resto sai como texto simples que você pode copiar.",
        },
        {
          q: "Minhas imagens são enviadas a um servidor?",
          a: "Não. A imagem é decodificada no seu navegador a partir de pixels locais; não existe etapa de upload no código. O mesmo vale para os quadros da câmera, analisados apenas na memória.",
        },
      ],
    },
  },
  related: ["qr-generator", "wifi-qr", "vcard-qr"],
});
