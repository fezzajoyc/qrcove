import { defineTool } from "../_lib/types";
import { WifiQrEngine } from "../_engines/wifi-qr-engine";

export default defineTool({
  slug: "wifi-qr",
  category: "utility",
  icon: "wifi",
  featured: true,
  engine: { component: WifiQrEngine, props: {} },
  copy: {
    en: {
      name: "Wi-Fi QR Code Generator",
      h1: "Wi-Fi QR Code — let guests join in one scan",
      tagline:
        "Turn your Wi-Fi name and password into a QR code guests join in one camera tap — the standard WIFI format, works offline, never expires, no account.",
      intro: [
        "This is the most useful QR code in real life: one printed sheet by the counter, the hotel bed or the router and nobody types your 24-character password again. iPhone and Android cameras read the WIFI: format natively — scan, confirm, connected.",
        "The payload follows the de-facto standard that phone cameras parse: network name, password, security type (WPA/WPA2/WPA3, WEP or open) and a hidden-network flag. Special characters in passwords — semicolons, commas, colons, quotes, backslashes — are escaped correctly, which is exactly where hand-made generators break.",
        "The code is static and generated in your browser: the credentials live inside the pattern, not behind a login that lapses. Print it, laminate it, forget about it.",
      ],
      steps: [
        "Type the network name (SSID) exactly as your router broadcasts it — case matters.",
        "Enter the password and pick the security type; choose “open” for networks without a password.",
        "Tick “hidden network” only if your router does not broadcast the SSID.",
        "Download the PNG or SVG, print it where guests can see it, and scan it once yourself to verify.",
      ],
      faqs: [
        {
          q: "Does the QR code contain my Wi-Fi password?",
          a: "Yes — that is the point. Anyone who scans the code can join the network, so treat the printed sheet exactly like a password you say out loud: fine for guests and customers, not for the wall of a public lobby on an open corporate network.",
        },
        {
          q: "Will it work on iPhones and Android phones?",
          a: "Yes. Both platforms' stock cameras parse the standard WIFI: payload — no app needed. The phone shows the network name and a join button after scanning.",
        },
        {
          q: "My password contains characters like ; , : \" \\ — will it still work?",
          a: "Yes. Those characters are delimiters in the WIFI: format and get backslash-escaped here. Many hand-rolled generators skip this step and produce codes that silently fail on exactly those passwords.",
        },
        {
          q: "Does the code stop working when I change the Wi-Fi password?",
          a: "The code encodes whatever credentials you entered, so after changing the router password, generate and print a new one. The code itself never expires — but the password inside it must match the network.",
        },
      ],
    },
    zh: {
      name: "Wi-Fi 二维码生成器",
      h1: "Wi-Fi 二维码 — 客人扫一下就连上网",
      tagline:
        "把 Wi-Fi 名称和密码变成二维码,客人相机一扫即连——标准 WIFI 格式,离线可用,永不过期,无需账号。",
      intro: [
        "这是现实生活中最有用的二维码:在吧台、酒店床头或路由器旁贴一张,就再没有人需要手动输入你那 24 位密码。iPhone 和安卓相机原生识别 WIFI: 格式——扫码、确认、连上。",
        "内容遵循手机相机实际解析的事实标准:网络名称、密码、加密方式(WPA/WPA2/WPA3、WEP 或开放)以及隐藏网络标记。密码里的特殊字符——分号、逗号、冒号、引号、反斜杠——都会被正确转义,而这正是手搓生成器最容易出错的地方。",
        "二维码是静态的,在浏览器里生成:凭据就藏在图形里,不存在过期一说。打印、过塑、贴上,然后忘掉它。",
      ],
      steps: [
        "输入网络名称(SSID),要和路由器广播的完全一致——大小写有影响。",
        "输入密码并选择加密方式;无密码的网络选“开放”。",
        "只有路由器不广播 SSID 时才勾选“隐藏网络”。",
        "下载 PNG 或 SVG,贴在客人看得到的地方,并自己先扫一次验证。",
      ],
      faqs: [
        {
          q: "二维码里包含我的 Wi-Fi 密码吗?",
          a: "包含——这正是它的用途。任何扫到的人都能连上网络,所以请把打印出来的纸当成你大声说出的密码对待:给客人和顾客用没问题;公司开放网络的公共大堂就别贴了。",
        },
        {
          q: "iPhone 和安卓都能用吗?",
          a: "能。两个平台的系统相机都解析标准 WIFI: 内容,无需装 App。扫码后手机会显示网络名和“加入”按钮。",
        },
        {
          q: "密码里有 ; , : \" \\ 这样的字符还能用吗?",
          a: "能。这些字符在 WIFI: 格式里是分隔符,本工具会用反斜杠正确转义。很多手写的生成器跳过了这一步,生成的码恰恰在这类密码上悄悄失效。",
        },
        {
          q: "改了 Wi-Fi 密码后码会失效吗?",
          a: "码里编码的是你当时输入的凭据,所以改了路由器密码后,重新生成并打印一张即可。码本身永不过期——但里面的密码必须和网络匹配。",
        },
      ],
    },
    ja: {
      name: "Wi-Fi QRコード生成",
      h1: "Wi-Fi QRコード — お客様が一読で接続",
      tagline:
        "Wi-Fi の名前とパスワードをQRコードに。カメラをかざすだけで接続でき、標準の WIFI 形式でオフラインでも動作、有効期限もアカウントもありません。",
      intro: [
        "実生活で最も役立つ QR コードです。カウンター、ホテルのベッドサイド、ルーターの横に 1 枚貼っておけば、誰も 24 文字のパスワードを打ち込まなくなります。iPhone も Android も WIFI: 形式を標準カメラで読み取れます — スキャン、確認、接続。",
        "ペイロードはスマホカメラが実際に解析する事実上の標準に従います。ネットワーク名、パスワード、暗号化方式(WPA/WPA2/WPA3、WEP、オープン)、ステルス network フラグ。パスワード内の特殊文字(セミコロン、カンマ、コロン、引用符、バックスラッシュ)も正しくエスケープします — 手作りジェネレーターが壊れがちな箇所です。",
        "コードは静的でブラウザ内で生成されます。資格情報はパターンの中にあり、失効するログインの向こう側にはありません。印刷して、ラミネートして、あとは忘れて構いません。",
      ],
      steps: [
        "ネットワーク名(SSID)をルーターの表示どおり正確に入力します。大文字小文字が重要です。",
        "パスワードを入力して暗号化方式を選択。パスワードのないネットワークは「オープン」に。",
        "ルーターが SSID を非公開にしている場合のみ「ステルスネットワーク」にチェック。",
        "PNG または SVG をダウンロードして見える場所に貼り、自分でも一度スキャンして確認します。",
      ],
      faqs: [
        {
          q: "QR コードに Wi-Fi パスワードが含まれますか?",
          a: "含まれます — それが目的です。コードを読めた人は誰でもネットワークに接続できるので、印刷物は声に出して読み上げるパスワードと同じ扱いにしてください。来客や店舗では問題なく、社内ネットワークのロビー壁面などには不向きです。",
        },
        {
          q: "iPhone と Android の両方で使えますか?",
          a: "はい。両プラットフォームの標準カメラが WIFI: 形式のペイロードを解析します。アプリ不要で、読み取るとネットワーク名と接続ボタンが表示されます。",
        },
        {
          q: "パスワードに ; , : \" \\\\ などの文字があっても大丈夫?",
          a: "大丈夫です。これらは WIFI: 形式の区切り文字なので、ここではバックスラッシュで正しくエスケープされます。多くの手作りジェネレーターはこの処理を省き、まさにその種のパスワードで黙って失敗するコードを作ります。",
        },
        {
          q: "Wi-Fi パスワードを変えたらコードは使えなくなりますか?",
          a: "コードには入力した時点の資格情報がエンコードされています。ルーターのパスワードを変更したら新しいコードを生成して印刷し直してください。コード自体に期限はありませんが、中のパスワードはネットワークと一致している必要があります。",
        },
      ],
    },
    es: {
      name: "Generador de QR de Wi-Fi",
      h1: "QR de Wi-Fi — los invitados se conectan con un escaneo",
      tagline:
        "Convierte el nombre y la contraseña de tu Wi-Fi en un QR que los invitados conectan con un toque de cámara — formato estándar, sin caducidad ni cuenta.",
      intro: [
        "Es el código QR más útil de la vida real: una hoja impresa junto a la barra, la cama del hotel o el router y nadie vuelve a teclear tu contraseña de 24 caracteres. Las cámaras de iPhone y Android leen el formato WIFI: de forma nativa: escanear, confirmar, conectado.",
        "El contenido sigue el estándar de facto que los móviles parsean: nombre de red, contraseña, tipo de seguridad (WPA/WPA2/WPA3, WEP o abierta) y bandera de red oculta. Los caracteres especiales de las contraseñas —punto y coma, comas, dos puntos, comillas, barras invertidas— se escapan correctamente, que es justo donde fallan los generadores hechos a mano.",
        "El código es estático y se genera en tu navegador: las credenciales viven dentro del patrón, no detrás de un login que caduca. Imprímelo, plastifícalo y olvídate.",
      ],
      steps: [
        "Escribe el nombre de red (SSID) exactamente como lo emite tu router: las mayúsculas importan.",
        "Introduce la contraseña y elige el tipo de seguridad; usa «abierta» para redes sin contraseña.",
        "Marca «red oculta» solo si tu router no emite el SSID.",
        "Descarga el PNG o SVG, imprímelo donde los invitados lo vean y escanéalo una vez tú para verificarlo.",
      ],
      faqs: [
        {
          q: "¿El QR contiene mi contraseña de Wi-Fi?",
          a: "Sí — para eso existe. Quien escanee el código podrá conectarse, así que trata la hoja impresa como una contraseña que dices en voz alta: perfecto para invitados y clientes; no tanto en el vestíbulo de una red corporativa abierta.",
        },
        {
          q: "¿Funciona en iPhone y Android?",
          a: "Sí. Las cámaras de serie de ambas plataformas parsean el contenido WIFI: estándar, sin app. Tras escanear, el móvil muestra el nombre de red y un botón para unirse.",
        },
        {
          q: "Mi contraseña tiene caracteres como ; , : \" \\\\ — ¿funcionará?",
          a: "Sí. Esos caracteres son delimitadores del formato WIFI: y aquí se escapan con barra invertida. Muchos generadores improvisados se saltan este paso y producen códigos que fallan silenciosamente justo con esas contraseñas.",
        },
        {
          q: "¿Deja de funcionar si cambio la contraseña del Wi-Fi?",
          a: "El código codifica las credenciales que introdujiste, así que al cambiar la contraseña del router, genera e imprime uno nuevo. El código no caduca nunca, pero la contraseña que contiene debe coincidir con la red.",
        },
      ],
    },
    pt: {
      name: "Gerador de QR de Wi-Fi",
      h1: "QR de Wi-Fi — as visitas se conectam com um escaneio",
      tagline:
        "Transforme o nome e a senha do seu Wi-Fi em um QR que as visitas conectam com um toque da câmera — formato padrão, sem expiração e sem conta.",
      intro: [
        "Este é o QR code mais útil da vida real: uma folha impressa perto do balcão, da cama do hotel ou do roteador e ninguém mais digita sua senha de 24 caracteres. As câmeras de iPhone e Android leem o formato WIFI: nativamente — escanear, confirmar, conectado.",
        "O conteúdo segue o padrão de fato que os celulares interpretam: nome da rede, senha, tipo de segurança (WPA/WPA2/WPA3, WEP ou aberta) e a flag de rede oculta. Caracteres especiais em senhas — ponto e vírgula, vírgulas, dois-pontos, aspas, barras invertidas — são escapados corretamente, exatamente onde geradores feitos à mão quebram.",
        "O código é estático e gerado no seu navegador: as credenciais vivem dentro do padrão, não atrás de um login que vence. Imprima, plastifique e esqueça.",
      ],
      steps: [
        "Digite o nome da rede (SSID) exatamente como o roteador transmite — maiúsculas importam.",
        "Informe a senha e escolha o tipo de segurança; use “aberta” para redes sem senha.",
        "Marque “rede oculta” apenas se seu roteador não transmite o SSID.",
        "Baixe o PNG ou SVG, imprima onde as visitas vejam e escaneie você mesmo uma vez para conferir.",
      ],
      faqs: [
        {
          q: "O QR code contém minha senha de Wi-Fi?",
          a: "Sim — essa é justamente a função. Quem escanear o código poderá se conectar, então trate a folha impressa como uma senha dita em voz alta: ótimo para visitas e clientes; não tanto na parede do saguí de uma rede corporativa aberta.",
        },
        {
          q: "Funciona em iPhone e Android?",
          a: "Sim. As câmeras nativas das duas plataformas interpretam o conteúdo WIFI: padrão, sem app. Depois de escanear, o celular mostra o nome da rede e um botão para conectar.",
        },
        {
          q: "Minha senha tem caracteres como ; , : \" \\\\ — vai funcionar?",
          a: "Vai. Esses caracteres são delimitadores do formato WIFI: e aqui são escapados com barra invertida. Muitos geradores caseiros pulam essa etapa e produzem códigos que falham silenciosamente justamente com essas senhas.",
        },
        {
          q: "O código para de funcionar se eu trocar a senha do Wi-Fi?",
          a: "O código codifica as credenciais que você digitou, então ao trocar a senha do roteador, gere e imprima um novo. O código em si nunca expira — mas a senha dentro dele precisa corresponder à rede.",
        },
      ],
    },
  },
  related: ["qr-generator", "vcard-qr", "qr-scanner"],
});
