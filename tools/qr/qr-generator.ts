import { defineTool } from "../_lib/types";
import { QrGeneratorEngine } from "../_engines/qr-generator-engine";

export default defineTool({
  slug: "qr-generator",
  category: "utility",
  icon: "qr",
  featured: true,
  engine: { component: QrGeneratorEngine, props: {} },
  copy: {
    en: {
      name: "QR Code Generator",
      h1: "QR Code Generator — free, no watermark, never expires",
      tagline:
        "Create free QR codes for links, Wi-Fi, contacts and more — SVG and PNG download, no watermark, no signup, no expiry. Made entirely in your browser.",
      intro: [
        "Type a link, a message or a Wi-Fi password and a scannable QR code appears instantly. Download it as SVG (infinitely sharp for print) or PNG (for slides and docs) — in whatever colors match your design.",
        "These are static QR codes: the content is encoded in the pattern itself, not in a redirect on someone's server. That is why they never expire. Services selling “dynamic” QR codes typically stop working the month you stop paying — with a static code, the data travels inside the image and keeps working even if this site disappears tomorrow.",
        "Everything is generated locally in your browser with the qrcode library. No account, no watermark, no scan limits, no uploaded data.",
      ],
      steps: [
        "Pick a content type: URL, plain text, Wi-Fi, contact card, email, SMS, phone or a map location.",
        "Fill in the form — the QR preview updates live as you type.",
        "Optionally adjust error correction (L–H), size, margin and the two colors.",
        "Download the code as PNG or SVG, or copy the exact encoded string.",
      ],
      faqs: [
        {
          q: "Do these QR codes ever expire?",
          a: "No. A static QR code is just data drawn as a pattern — your URL or Wi-Fi password is literally inside the image. There is no redirect service that can be switched off, no subscription to lapse. Scan it ten years from now and it still works.",
        },
        {
          q: "Is there a watermark or a signup?",
          a: "No watermark, no account, no email required, no limit on how many codes you make. The download buttons are always enabled once the code is valid.",
        },
        {
          q: "Which error-correction level should I pick?",
          a: "M (15% recovery) is the safe default. Pick Q or H when the code will be printed small, on fabric, or partially covered by a logo — higher levels embed more redundancy, which also shortens the maximum payload. L is fine for clean on-screen use.",
        },
        {
          q: "SVG or PNG?",
          a: "SVG for anything printed or resized later — it is a vector, sharp at any size. PNG for slides, chats and platforms that do not accept SVG. Both downloads are generated on your device from the same code.",
        },
      ],
    },
    zh: {
      name: "二维码生成器",
      h1: "二维码生成器 — 免费、无水印、永不过期",
      tagline:
        "免费生成网址、Wi-Fi、名片、文本等二维码,支持 SVG 与 PNG 下载——无水印、无需注册、永不过期,全程在你的浏览器里完成。",
      intro: [
        "输入链接、文字或 Wi-Fi 密码,可扫描的二维码立即出现。下载为 SVG(印刷任意放大都清晰)或 PNG(适合幻灯片和文档),颜色随你设计搭配。",
        "这些是静态二维码:内容直接编码在图形里,而不是存在某台服务器的跳转链接上——所以永不过期。某些服务卖的“动态二维码”通常在你停止付费的那个月就失效;而静态码的数据就在图片里,即使本站明天消失也照样能扫。",
        "全部在浏览器内用 qrcode 库本地生成。没有账号、没有水印、没有扫码次数限制,也不上传任何数据。",
      ],
      steps: [
        "选择内容类型:网址、纯文本、Wi-Fi、联系人名片、邮件、短信、电话或地图位置。",
        "填写表单——二维码预览会随输入实时更新。",
        "按需调整纠错级别(L–H)、尺寸、留白和两种颜色。",
        "下载 PNG 或 SVG,或复制精确的编码字符串。",
      ],
      faqs: [
        {
          q: "这些二维码会过期吗?",
          a: "不会。静态二维码只是把数据画成图形——你的网址或 Wi-Fi 密码就 literally 在图片里。没有可被关停的跳转服务,也没有会到期的订阅。十年后扫,照样能用。",
        },
        {
          q: "有水印吗?需要注册吗?",
          a: "无水印、无账号、不要求邮箱、不限生成次数。二维码有效时下载按钮始终可用。",
        },
        {
          q: "纠错级别怎么选?",
          a: "M(15% 冗余)是安全的默认值。码要印得小、印在布料上或会被 Logo 遮住一部分时选 Q 或 H——级别越高冗余越多,可容纳的内容也随之变少。纯屏幕使用选 L 即可。",
        },
        {
          q: "选 SVG 还是 PNG?",
          a: "要印刷或以后还要缩放就选 SVG——矢量格式,任意尺寸都清晰。幻灯片、聊天和不支持 SVG 的平台用 PNG。两者都从同一份码在你的设备上生成。",
        },
      ],
    },
    ja: {
      name: "QRコード生成",
      h1: "QRコード生成 — 無料・透かしなし・有効期限なし",
      tagline:
        "URL・Wi-Fi・連絡先・テキストなど無料のQRコードを生成。SVG/PNGでダウンロードでき、透かしも登録も有効期限もありません。すべてブラウザ内で完結します。",
      intro: [
        "リンク、テキスト、Wi-Fi パスワードを入力すると、読み取れる QR コードがその場で表示されます。SVG(印刷してもいくら拡大しても鮮明)と PNG(スライドや文書向け)でダウンロードでき、配色も自由です。",
        "これは静的 QR コードです。内容はどこかのサーバー上のリダイレクトではなく、パターンそのものにエンコードされています。だから期限切れがありません。「動的 QR」を売るサービスは、多くの場合支払いが止まった月から使えなくなります。静的コードならデータが画像の中にあり、このサイトが明日消えても読み続けられます。",
        "生成は qrcode ライブラリでブラウザ内のみ。アカウント登録、透かし、読み取り回数制限、データのアップロードは一切ありません。",
      ],
      steps: [
        "内容の種類を選択:URL、テキスト、Wi-Fi、連絡先、メール、SMS、電話、地図上の位置。",
        "フォームに入力 — QR プレビューが入力に合わせてリアルタイムで更新されます。",
        "必要に応じて誤り訂正(L–H)、サイズ、余白、2 色を調整。",
        "PNG または SVG でダウンロード、またはエンコードされた文字列をコピー。",
      ],
      faqs: [
        {
          q: "QR コードに有効期限はありますか?",
          a: "ありません。静的 QR コードはデータを図形として描いたもの — URL や Wi-Fi パスワードは文字どおり画像の中にあります。停止されうるリダイレクトサービスも、切れるサブスクリプションもありません。10 年後に読み取っても動きます。",
        },
        {
          q: "透かしや登録はありますか?",
          a: "透かしなし、アカウント不要、メールアドレスも不要、生成枚数の制限もありません。コードが有効になればダウンロードボタンは常に使えます。",
        },
        {
          q: "誤り訂正レベルはどれを選ぶべき?",
          a: "M(15% 復元)が安全な既定値です。小さく印刷する、布に印刷する、ロゴで一部を覆う場合は Q か H を。レベルが高いほど冗長性が増し、そのぶん最大データ量は減ります。画面表示なら L で十分です。",
        },
        {
          q: "SVG と PNG のどちら?",
          a: "印刷物や後で拡大縮小する予定なら SVG — ベクター形式なのでどのサイズでも鮮明です。スライドやチャット、SVG を受け付けないサービスには PNG。どちらも同じコードから端末上で生成されます。",
        },
      ],
    },
    es: {
      name: "Generador de códigos QR",
      h1: "Generador de códigos QR — gratis, sin marca de agua, sin caducidad",
      tagline:
        "Crea códigos QR gratis para enlaces, Wi-Fi, contactos y más — descarga en SVG y PNG, sin marca de agua, sin registro y sin caducidad. Todo en tu navegador.",
      intro: [
        "Escribe un enlace, un mensaje o una contraseña Wi-Fi y un código QR escaneable aparece al instante. Descárgalo en SVG (nitidez infinita para imprenta) o PNG (para diapositivas y documentos), con los colores que encajen con tu diseño.",
        "Son códigos QR estáticos: el contenido va codificado en el propio patrón, no en un redireccionamiento del servidor de nadie. Por eso no caducan nunca. Los servicios que venden códigos “dinámicos” suelen dejar de funcionar el mes en que dejas de pagar; con un código estático los datos viajan dentro de la imagen y siguen funcionando aunque este sitio desaparezca mañana.",
        "Todo se genera localmente en tu navegador con la librería qrcode. Sin cuenta, sin marca de agua, sin límites de escaneo, sin datos subidos.",
      ],
      steps: [
        "Elige el tipo de contenido: URL, texto, Wi-Fi, tarjeta de contacto, correo, SMS, teléfono o ubicación en el mapa.",
        "Rellena el formulario — la vista previa del QR se actualiza mientras escribes.",
        "Ajusta si quieres la corrección de errores (L–H), el tamaño, el margen y los dos colores.",
        "Descarga el código en PNG o SVG, o copia la cadena exacta codificada.",
      ],
      faqs: [
        {
          q: "¿Estos códigos QR caducan?",
          a: "No. Un código QR estático es solo datos dibujados como patrón: tu URL o contraseña Wi-Fi está literalmente dentro de la imagen. No hay un servicio de redirección que puedan apagar ni una suscripción que caduque. Escanéalo dentro de diez años y seguirá funcionando.",
        },
        {
          q: "¿Lleva marca de agua o hay que registrarse?",
          a: "Ni marca de agua, ni cuenta, ni email, ni límite de códigos. Los botones de descarga quedan activos en cuanto el código es válido.",
        },
        {
          q: "¿Qué nivel de corrección de errores elijo?",
          a: "M (15 % de recuperación) es el valor seguro por defecto. Elige Q o H si el código se imprimirá pequeño, en tela, o quedará parcialmente cubierto por un logo: más corrección añade redundancia y reduce la capacidad máxima. L basta para uso limpio en pantalla.",
        },
        {
          q: "¿SVG o PNG?",
          a: "SVG para imprenta o para reescalar después: es vectorial y nítido a cualquier tamaño. PNG para diapositivas, chats y plataformas que no aceptan SVG. Ambas descargas se generan en tu dispositivo desde el mismo código.",
        },
      ],
    },
    pt: {
      name: "Gerador de QR Code",
      h1: "Gerador de QR Code — grátis, sem marca d'água, nunca expira",
      tagline:
        "Crie QR codes grátis para links, Wi-Fi, contatos e mais — download em SVG e PNG, sem marca d'água, sem cadastro e sem expiração. Tudo no seu navegador.",
      intro: [
        "Digite um link, uma mensagem ou uma senha de Wi-Fi e um QR code escaneável aparece na hora. Baixe em SVG (nitidez infinita para impressão) ou PNG (para slides e documentos), com as cores que combinarem com o seu design.",
        "Estes são QR codes estáticos: o conteúdo está codificado no próprio padrão, não num redirecionamento no servidor de alguém. É por isso que nunca expiram. Serviços que vendem QR “dinâmico” normalmente deixam de funcionar no mês em que você para de pagar; num código estático os dados viajam dentro da imagem e continuam funcionando mesmo se este site desaparecer amanhã.",
        "Tudo é gerado localmente no seu navegador com a biblioteca qrcode. Sem conta, sem marca d'água, sem limite de leituras, sem dados enviados.",
      ],
      steps: [
        "Escolha o tipo de conteúdo: URL, texto, Wi-Fi, cartão de contato, e-mail, SMS, telefone ou localização no mapa.",
        "Preencha o formulário — a prévia do QR atualiza em tempo real enquanto você digita.",
        "Ajuste se quiser a correção de erros (L–H), o tamanho, a margem e as duas cores.",
        "Baixe o código em PNG ou SVG, ou copie a string exata codificada.",
      ],
      faqs: [
        {
          q: "Esses QR codes expiram?",
          a: "Não. Um QR code estático são apenas dados desenhados como padrão — seu link ou senha de Wi-Fi está literalmente dentro da imagem. Não há serviço de redirecionamento que possa ser desligado nem assinatura que vença. Escaneie daqui a dez anos e ainda funcionará.",
        },
        {
          q: "Tem marca d'água ou precisa de cadastro?",
          a: "Sem marca d'água, sem conta, sem e-mail, sem limite de códigos. Os botões de download ficam ativos assim que o código é válido.",
        },
        {
          q: "Qual nível de correção de erros escolher?",
          a: "M (15% de recuperação) é o padrão seguro. Escolha Q ou H quando o código for impresso pequeno, em tecido, ou ficar parcialmente coberto por um logo — níveis maiores embutem mais redundância e reduzem a capacidade máxima. L basta para uso limpo em tela.",
        },
        {
          q: "SVG ou PNG?",
          a: "SVG para impressão ou para redimensionar depois — é vetorial e nítido em qualquer tamanho. PNG para slides, chats e plataformas que não aceitam SVG. Os dois downloads são gerados no seu dispositivo a partir do mesmo código.",
        },
      ],
    },
  },
  related: ["wifi-qr", "vcard-qr", "qr-scanner"],
});
