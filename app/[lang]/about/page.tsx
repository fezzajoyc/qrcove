import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "QRCove is a small suite of QR tools that run entirely in your browser. There is no backend: the links, Wi-Fi passwords and contact details you type are turned into QR codes by JavaScript on your own device, and the images you upload are decoded locally too.",
    "That design gives us three properties we care about. It is private by construction — there is nothing to upload, so nothing can leak. It is fast — there is no round trip to a server. And it is honest — our codes are static, so they never expire and there is no subscription that can quietly kill them.",
    "QRCove is deliberately focused: generate (any content type), read (with the payload explained before you act on it), plus the two dedicated flows people actually use most — Wi-Fi sharing and contact cards. Available in 15 languages.",
  ],
  zh: [
    "QRCove 是一组完全在浏览器里运行的二维码工具。没有后端:你输入的链接、Wi-Fi 密码和联系人信息,都由你自己设备上的 JavaScript 生成二维码;上传的图片也在本地解码。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有上传,就谈不上泄露;速度快——没有服务器往返;诚实——我们生成的是静态二维码,永不过期,也没有会让它悄悄失效的订阅。",
    "QRCove 刻意聚焦:生成(各类内容)、识别(先解释码里是什么,再决定点不点),再加上人们实际用得最多的两个专属流程——Wi-Fi 分享和联系人名片。支持 15 种语言。",
  ],
  ja: [
    "QRCove はブラウザ内で完結する QR ツール集です。バックエンドはありません。入力したリンク、Wi-Fi パスワード、連絡先はデバイス上の JavaScript が QR コードに変え、アップロードした画像の読み取りもローカルで行われます。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(アップロードがないので漏えいもない)、速い(サーバー往復がない)、そして誠実(静的 QR なので期限がなく、静かに失効するサブスクもありません)。",
    "QRCove は意図的に絞っています。生成(あらゆる内容)、読み取り(開く前に中身を解説)、そして実際に最も使われる 2 つの専用フロー — Wi-Fi 共有と連絡先カード。15 言語対応です。",
  ],
  es: [
    "QRCove es un pequeño conjunto de herramientas QR que funciona por completo en tu navegador. No hay backend: los enlaces, contraseñas Wi-Fi y datos de contacto que escribes se convierten en códigos QR por JavaScript en tu propio dispositivo, y las imágenes que subes también se decodifican en local.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay subidas, así que no puede haber fugas. Velocidad: sin viajes al servidor. Honestidad: nuestros códigos son estáticos, no caducan y no existe una suscripción que pueda eliminarlos en silencio.",
    "QRCove está deliberadamente enfocado: generar (todo tipo de contenido), leer (con el payload explicado antes de actuar), más los dos flujos que la gente más usa — Wi-Fi y tarjetas de contacto. Disponible en 15 idiomas.",
  ],
  pt: [
    "QRCove é um pequeno conjunto de ferramentas de QR que roda inteiramente no seu navegador. Não há backend: os links, senhas de Wi-Fi e dados de contato que você digita viram QR codes pelo JavaScript do seu próprio aparelho, e as imagens enviadas também são decodificadas localmente.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não há uploads, logo não há vazamentos. Velocidade: sem viagem ao servidor. Honestidade: nossos códigos são estáticos, nunca expiram e não há assinatura que possa matá-los em silêncio.",
    "O QRCove é deliberadamente focado: gerar (todo tipo de conteúdo), ler (com o payload explicado antes de agir), além dos dois fluxos que as pessoas mais usam — Wi-Fi e cartões de contato. Disponível em 15 idiomas.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
