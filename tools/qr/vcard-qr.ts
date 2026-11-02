import { defineTool } from "../_lib/types";
import { VCardQrEngine } from "../_engines/vcard-qr-engine";

export default defineTool({
  slug: "vcard-qr",
  category: "utility",
  icon: "card",
  engine: { component: VCardQrEngine, props: {} },
  copy: {
    en: {
      name: "vCard QR Code Generator",
      h1: "vCard QR Code — your contact card in one scan",
      tagline:
        "Build a contact-card QR code (vCard 3.0) that saves your name, phone, email and company straight into a phone, plus a downloadable .vcf file.",
      intro: [
        "A vCard QR is the business card that cannot be lost. Scan it and the phone offers to save a full contact — name, organization, job title, phone, email, website and address — with every field already filled in. No app on the receiver's side, no transcription errors, no typed-out URL in a chat that nobody scrolls back to find.",
        "The card follows vCard 3.0, the version iOS and Android have offered to import since forever, and escaping is handled properly: commas and semicolons inside company names or multi-line addresses will not corrupt the card (a common bug in quick-and-dirty builders).",
        "You also get the raw vCard text: copy it into an email signature or download a .vcf file to attach. And because the QR is static, the card is embedded in the pattern itself — it keeps working even if this site is gone.",
      ],
      steps: [
        "Fill in at least a first or last name — every other field is optional.",
        "Add a phone, email, website or address only if you want them on the card; empty fields are left out of the QR.",
        "Scan the live preview with your own phone to see exactly what the recipient will get.",
        "Download the code as PNG or SVG, save the .vcf, or copy the vCard text for your email signature.",
      ],
      faqs: [
        {
          q: "What is a vCard QR code?",
          a: "A QR code whose payload is a vCard (a standardized contact file format). Scanners recognize the BEGIN:VCARD marker and offer “save contact” instead of showing a wall of text — the fields land in the right slots of the phone's address book.",
        },
        {
          q: "How much information fits in one code?",
          a: "A typical card with name, org, title, phone, email and URL encodes comfortably at error-correction level M. If you add a full address and the code gets dense, the tool tells you and you can drop a field or lower the correction level.",
        },
        {
          q: "Can I update the card later?",
          a: "A static QR is frozen at generation time — print new cards or re-order and regenerate when details change. If you need a code whose target never changes but whose content updates, that is a dynamic (redirect-based) service, and it dies when the subscription does.",
        },
        {
          q: "Is my contact data uploaded anywhere?",
          a: "No. The card is built and drawn in your browser; nothing leaves your device. That also means we cannot recover it — keep the .vcf if you plan to reprint later.",
        },
      ],
    },
    zh: {
      name: "名片二维码生成器",
      h1: "名片二维码 — 扫一下,联系人直接进手机",
      tagline:
        "制作联系人名片二维码(vCard 3.0),扫一扫直接保存姓名、电话、邮箱和公司,还能下载 .vcf 文件。",
      intro: [
        "vCard 二维码是不会丢的名片。对方扫一下,手机就会提示保存完整联系人——姓名、公司、职位、电话、邮箱、网站、地址,每个字段都已填好。对方无需装 App,不会有转录错误,也不会再出现“聊天记录里翻不到的链接”。",
        "名片采用 vCard 3.0——iOS 和安卓一直支持导入的版本,而且转义处理正确:公司名或地址里的逗号、分号不会破坏名片(这是很多粗制滥造生成器的常见 bug)。",
        "你还能拿到原始 vCard 文本:复制进邮件签名,或下载 .vcf 附件。二维码是静态的,名片就嵌在图形里——即使本站消失,它也照常工作。",
      ],
      steps: [
        "至少填一个名或姓——其他字段都可选。",
        "只在需要时添加电话、邮箱、网站或地址;留空的字段不会进入二维码。",
        "用自己的手机扫一下实时预览,看看对方会得到什么。",
        "下载 PNG 或 SVG,保存 .vcf,或复制 vCard 文本用于邮件签名。",
      ],
      faqs: [
        {
          q: "什么是 vCard 二维码?",
          a: "内容是一张 vCard(标准联系人文件格式)的二维码。识别程序看到 BEGIN:VCARD 标记后,会提示“保存联系人”而不是显示一堆文字——各字段直接落到手机通讯录的对应位置。",
        },
        {
          q: "一个码能装多少信息?",
          a: "典型的姓名 + 公司 + 职位 + 电话 + 邮箱 + 网址在 M 级纠错下绰绰有余。如果加了完整地址导致码很密,工具会提示你,删一个字段或降低纠错级别即可。",
        },
        {
          q: "以后能更新名片吗?",
          a: "静态二维码在生成时就定格了——信息变了就重印或重新生成。如果需要“入口不变、内容可更新”的码,那是动态(跳转)服务的事,而它会在订阅到期时一起失效。",
        },
        {
          q: "我的联系人信息会被上传吗?",
          a: "不会。名片在浏览器里构建和绘制,任何数据都不离开你的设备。这也意味着我们无法帮你找回——以后还要重印的话,记得保存 .vcf。",
        },
      ],
    },
    ja: {
      name: "連絡先QRコード生成",
      h1: "連絡先QRコード — 一読で名刺を渡せる",
      tagline:
        "連絡先QRコード(vCard 3.0)を作成。氏名・電話・メール・会社名などをワンタップで保存でき、.vcf ファイルのダウンロードにも対応します。",
      intro: [
        "vCard QR コードは失くせない名刺です。読み取るとスマホが連絡先の保存を提案し、氏名・組織・役職・電話・メール・ウェブサイト・住所がすべて入力済みで登録されます。相手側にアプリは不要、転記ミスもなく、チャットに流れて探せない URL もありません。",
        "カードは vCard 3.0 形式 — iOS と Android が昔から読み込めるバージョンで、エスケープも正しく処理されます。会社名や住所にカンマやセミコロンが入ってもカードは壊れません(手抜きジェネレーターに多いバグです)。",
        "生の vCard テキストも取得できます。メール署名に貼るもよし、.vcf ファイルを添付するもよし。QR は静的で、カードはパターン自体に埋め込まれているため、このサイトがなくなっても機能し続けます。",
      ],
      steps: [
        "少なくとも名か姓を入力します — 他の項目はすべて任意です。",
        "電話・メール・サイト・住所は必要なものだけ追加。空欄の項目は QR に入りません。",
        "自分のスマホでライブプレビューをスキャンし、相手に見える内容を確認します。",
        "PNG または SVG でダウンロード、.vcf を保存、または vCard テキストをコピーして署名に貼ります。",
      ],
      faqs: [
        {
          q: "vCard QR コードとは何ですか?",
          a: "ペイロードが vCard(標準化された連絡先ファイル形式)の QR コードです。スキャナーは BEGIN:VCARD を認識し、文字の塊を表示する代わりに「連絡先に保存」を提示します。各項目はアドレス帳の正しい欄に入ります。",
        },
        {
          q: "1 つのコードにどれくらい入りますか?",
          a: "氏名・組織・役職・電話・メール・URL の典型的なカードなら、誤り訂正 M で余裕を持って収まります。住所まで追加してコードが密になったら、ツールが知らせるので項目を減らすか訂正レベルを下げます。",
        },
        {
          q: "後からカードを更新できますか?",
          a: "静的 QR は生成時に固定されます — 詳細が変わったら新しいカードを印刷するか、再生成してください。リンク先が不変で中身だけ更新できるコードが必要なら、それは動的(リダイレクト)サービスであり、サブスクが切れると同時に消えます。",
        },
        {
          q: "連絡先データはどこかにアップロードされますか?",
          a: "いいえ。カードはブラウザ内で構築・描画され、端末から何も出ません。ということは当方でも復元できません — 再印刷の予定があれば .vcf を保存しておいてください。",
        },
      ],
    },
    es: {
      name: "Generador de QR vCard",
      h1: "QR vCard — tu tarjeta de contacto en un escaneo",
      tagline:
        "Crea un QR de tarjeta de contacto (vCard 3.0) que guarda tu nombre, teléfono, email y empresa directo en el móvil, con archivo .vcf descargable.",
      intro: [
        "Un QR vCard es la tarjeta de presentación que no se puede perder. Al escanearla, el móvil ofrece guardar un contacto completo —nombre, organización, cargo, teléfono, email, web y dirección— con todos los campos ya rellenados. Sin app en el otro lado, sin errores de transcripción y sin enlaces enterrados en un chat que nadie vuelve a buscar.",
        "La tarjeta sigue vCard 3.0, la versión que iOS y Android importan desde hace años, y el escapado se trata bien: las comas y los puntos y coma dentro de nombres de empresa o direcciones de varias líneas no corrompen la tarjeta (un fallo típico de los generadores improvisados).",
        "También obtienes el texto vCard en crudo: cópialo en una firma de correo o descarga un .vcf para adjuntar. Y como el QR es estático, la tarjeta está incrustada en el patrón — seguirá funcionando aunque este sitio desaparezca.",
      ],
      steps: [
        "Rellena al menos un nombre o apellido — todos los demás campos son opcionales.",
        "Añade teléfono, email, web o dirección solo si los quieres en la tarjeta; los campos vacíos no entran en el QR.",
        "Escanea la vista previa con tu propio móvil para ver exactamente lo que recibirá la otra persona.",
        "Descarga el código en PNG o SVG, guarda el .vcf o copia el texto vCard para tu firma.",
      ],
      faqs: [
        {
          q: "¿Qué es un código QR vCard?",
          a: "Un QR cuyo contenido es una vCard (un formato estandarizado de archivo de contacto). Los escáneres reconocen el marcador BEGIN:VCARD y ofrecen «guardar contacto» en vez de mostrar un muro de texto: los campos caen en el sitio correcto de la agenda.",
        },
        {
          q: "¿Cuánta información cabe en un código?",
          a: "Una tarjeta típica con nombre, empresa, cargo, teléfono, email y URL entra con holgura en corrección M. Si añades una dirección completa y el código se vuelve denso, la herramienta te avisa: quita un campo o baja el nivel de corrección.",
        },
        {
          q: "¿Puedo actualizar la tarjeta más adelante?",
          a: "Un QR estático queda congelado al generarse — imprime tarjetas nuevas y regenera cuando cambien los datos. Si necesitas un código cuyo destino no cambia pero cuyo contenido sí, eso es un servicio dinámico (con redirección), y muere cuando muere la suscripción.",
        },
        {
          q: "¿Mis datos de contacto se suben a algún sitio?",
          a: "No. La tarjeta se construye y dibuja en tu navegador; nada sale de tu dispositivo. Eso también significa que no podemos recuperarla — guarda el .vcf si piensas reimprimirla.",
        },
      ],
    },
    pt: {
      name: "Gerador de QR vCard",
      h1: "QR vCard — seu cartão de contato em um escaneio",
      tagline:
        "Crie um QR de cartão de contato (vCard 3.0) que salva nome, telefone, e-mail e empresa direto no celular, com arquivo .vcf para baixar.",
      intro: [
        "Um QR vCard é o cartão de visitas que não se perde. Ao escanear, o celular oferece salvar um contato completo — nome, organização, cargo, telefone, e-mail, site e endereço — com todos os campos já preenchidos. Sem app do outro lado, sem erros de digitação e sem link enterrado num chat que ninguém vai procurar depois.",
        "O cartão segue o vCard 3.0, a versão que iOS e Android importam desde sempre, e o escape é tratado direito: vírgulas e ponto e vírgula em nomes de empresa ou endereços de várias linhas não corrompem o cartão (um bug comum em geradores improvisados).",
        "Você também recebe o texto vCard puro: copie para a assinatura do e-mail ou baixe um .vcf para anexar. E como o QR é estático, o cartão está embutido no próprio padrão — continua funcionando mesmo se este site sumir.",
      ],
      steps: [
        "Preencha pelo menos um nome ou sobrenome — todos os outros campos são opcionais.",
        "Adicione telefone, e-mail, site ou endereço apenas se quiser no cartão; campos vazios não entram no QR.",
        "Escaneie a prévia com seu próprio celular para ver exatamente o que a outra pessoa receberá.",
        "Baixe o código em PNG ou SVG, salve o .vcf ou copie o texto vCard para a assinatura do e-mail.",
      ],
      faqs: [
        {
          q: "O que é um QR code vCard?",
          a: "Um QR code cujo conteúdo é um vCard (um formato padronizado de arquivo de contato). Os leitores reconhecem o marcador BEGIN:VCARD e oferecem “salvar contato” em vez de mostrar um muro de texto — os campos caem nos lugares certos da agenda.",
        },
        {
          q: "Quanta informação cabe em um código?",
          a: "Um cartão típico com nome, empresa, cargo, telefone, e-mail e URL cabe folgado na correção M. Se você adicionar um endereço completo e o código ficar denso, a ferramenta avisa: remova um campo ou baixe o nível de correção.",
        },
        {
          q: "Posso atualizar o cartão depois?",
          a: "Um QR estático fica congelado no momento da geração — imprima novos cartões e gere de novo quando os dados mudarem. Se você precisa de um código cujo destino nunca muda mas cujo conteúdo atualiza, isso é um serviço dinâmico (com redirecionamento), e ele morre junto com a assinatura.",
        },
        {
          q: "Meus dados de contato são enviados para algum lugar?",
          a: "Não. O cartão é construído e desenhado no seu navegador; nada sai do seu aparelho. Isso também significa que não conseguimos recuperá-lo — guarde o .vcf se pretende reimprimir depois.",
        },
      ],
    },
  },
  related: ["qr-generator", "wifi-qr", "qr-scanner"],
});
