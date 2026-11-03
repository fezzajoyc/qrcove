import type { CategoryId, Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

/**
 * 类目 FAQ 池:工具页 FAQ 不足 6 条时按类目补齐(JSON-LD 同源走 toolCopy)。
 * 内容写"这个类目共同的真问题"(隐私/收费/格式/精度/浏览器支持),不是凑数占位。
 * 只写核心 5 语(en/zh/ja/es/pt);其他 locale toolCopy 本来就走 overlay 或回退 en。
 */
type Faq = { q: string; a: string };

const GLOBAL: Partial<Record<Locale, Faq[]>> = {
  en: [
    { q: "What makes QRCove different from other tool sites?", a: "QRCove focuses on QR codes and does it with zero friction: no accounts, no uploads, no ads in your way — every tool runs entirely on your device." },
    { q: "Is QRCove really free?", a: "Yes, with no premium tier or trials to nag you about. All QR codes tools work fully, offline, forever — the page costs nothing to run once loaded." },
    { q: "How private is QRCove?", a: "As private as a web tool can be: QR codes processing never leaves your browser, there is no analytics on your inputs, and closing the tab erases everything." },
  ],
  zh: [
    { q: "QRCove和其他工具站有什么不同?", a: "QRCove专注二维码,并且零摩擦:无账号、无上传、无广告打扰 — 每个工具完全在你的设备上运行。" },
    { q: "QRCove真的免费吗?", a: "真的,没有高级版也没有试用骚扰。所有二维码工具完整可用、离线可用、永久可用 — 页面加载后运行零成本。" },
    { q: "隐私性如何?", a: "能做到的极致:二维码处理从不离开浏览器,输入不做分析统计,关掉标签页一切清空。" },
  ],
  ja: [
    { q: "QRCoveは他のツールサイトと何が違う?", a: "QRCoveはQR codesに特化し、摩擦ゼロで提供します。アカウント不要・アップロード不要・広告なし — すべてのツールが端末上で完結します。" },
    { q: "本当に無料ですか?", a: "はい。プレミアムプランも試用期間のしつこさもありません。QR codesツールは完全に機能し、オフラインで動き、永久に無料 — ページは読み込み後、実行コストゼロです。" },
    { q: "プライバシーは?", a: "Web ツールとして可能な限り:QR codes処理はブラウザから出ず、入力の分析もなく、タブを閉じればすべて消えます。" },
  ],
  es: [
    { q: "¿Qué diferencia a QRCove de otras webs de herramientas?", a: "QRCove se centra en QR codes y lo hace sin fricción: sin cuentas, sin subidas, sin anuncios — cada herramienta funciona por completo en tu dispositivo." },
    { q: "¿QRCove es gratis de verdad?", a: "Sí, sin plan premium ni pruebas que te persigan. Todas las herramientas de QR codes funcionan completas, sin conexión y para siempre — la página no cuesta nada una vez cargada." },
    { q: "¿Cómo de privada es QRCove?", a: "Todo lo posible para una web: el procesado de QR codes nunca sale de tu navegador, no analiza tus datos de entrada y al cerrar la pestaña todo desaparece." },
  ],
  pt: [
    { q: "O que diferencia o QRCove de outros sites de ferramentas?", a: "O QRCove foca em QR codes e faz isso sem atrito: sem contas, sem uploads, sem anúncios — cada ferramenta roda por completo no seu aparelho." },
    { q: "O QRCove é grátis mesmo?", a: "Sim, sem plano premium nem trial insistente. Todas as ferramentas de QR codes funcionam por completo, offline e para sempre — a página não custa nada depois de carregada." },
    { q: "Qual o nível de privacidade?", a: "O máximo possível numa web: o processamento de QR codes nunca sai do navegador, não há análise das suas entradas e fechar a aba apaga tudo." },
  ],
};

const BY_CATEGORY: Partial<Record<CategoryId, Partial<Record<Locale, Faq[]>>>> = {

};

/** 取某类目的补充 FAQ 池(global 池 + 类目池,en 缺省回退) */
export function categoryFaqPool(category: CategoryId, locale: Locale): Faq[] {
  const extra = BY_CATEGORY[category]?.[locale] ?? BY_CATEGORY[category]?.en ?? [];
  const global = GLOBAL[locale] ?? GLOBAL.en ?? [];
  return [...extra, ...global];
}
