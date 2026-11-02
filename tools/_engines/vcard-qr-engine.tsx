"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { buildVCard } from "../_lib/qrdata";
import {
  Field, Note, PayloadBox, QrCanvas, QrDownloadButtons, pick,
  type QrStatus, type QrStyleOptions,
} from "./qr-ui";

/**
 * vCard 3.0 builder → QR. The payload is produced by the tested buildVCard();
 * scanning it offers "save contact" on every modern phone. The raw card text
 * is copyable and downloadable as a .vcf too.
 */

const DL = { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" };

const S = {
  intro: {
    en: "Put your details in a QR and hand over a contact in one scan — no app on the other side, no typing, no business card to lose.",
    zh: "把你的联系方式装进一个二维码,对方扫一下就保存——对方无需装 App,无需手动输入,也不会弄丢名片。",
    ja: "自分の情報を QR コードにまとめれば、相手は一読で連絡先を登録できます。アプリも手入力も不要で、名刺を失くす心配もありません。",
    es: "Pon tus datos en un QR y entrega un contacto en un escaneo: sin app en el otro lado, sin teclear y sin tarjeta que perder.",
    pt: "Coloque seus dados em um QR e entregue um contato em um escaneio — sem app do outro lado, sem digitação e sem cartão para perder.",
  },
  firstName: { en: "First name", zh: "名", ja: "名", es: "Nombre", pt: "Nome" },
  lastName: { en: "Last name", zh: "姓", ja: "姓", es: "Apellido", pt: "Sobrenome" },
  org: { en: "Organization", zh: "组织 / 公司", ja: "組織・会社", es: "Organización", pt: "Organização" },
  title: { en: "Job title", zh: "职位", ja: "役職", es: "Cargo", pt: "Cargo" },
  phone: { en: "Phone", zh: "电话", ja: "電話番号", es: "Teléfono", pt: "Telefone" },
  email: { en: "Email", zh: "邮箱", ja: "メールアドレス", es: "Correo electrónico", pt: "E-mail" },
  url: { en: "Website", zh: "网站", ja: "ウェブサイト", es: "Sitio web", pt: "Site" },
  addressTitle: { en: "Address (optional)", zh: "地址(可选)", ja: "住所(任意)", es: "Dirección (opcional)", pt: "Endereço (opcional)" },
  street: { en: "Street", zh: "街道", ja: "番地", es: "Calle", pt: "Rua" },
  city: { en: "City", zh: "城市", ja: "市区町村", es: "Ciudad", pt: "Cidade" },
  zip: { en: "Postal code", zh: "邮编", ja: "郵便番号", es: "Código postal", pt: "CEP" },
  country: { en: "Country", zh: "国家", ja: "国", es: "País", pt: "País" },
  payload: { en: "vCard text (exactly what the QR contains)", zh: "vCard 文本(二维码里的原始内容)", ja: "vCard テキスト(QR に含まれる内容そのもの)", es: "Texto vCard (lo que contiene el QR)", pt: "Texto vCard (exatamente o que o QR contém)" },
  copyCard: { en: "Copy vCard text", zh: "复制 vCard 文本", ja: "vCard テキストをコピー", es: "Copiar texto vCard", pt: "Copiar texto vCard" },
  vcf: { en: "Download .vcf", zh: "下载 .vcf", ja: ".vcf をダウンロード", es: "Descargar .vcf", pt: "Baixar .vcf" },
  empty: {
    en: "Add at least a name or an organization — the code appears here.",
    zh: "至少填一个姓名或组织名,二维码会出现在这里。",
    ja: "名前か組織名を入力すると、ここにコードが表示されます。",
    es: "Añade al menos un nombre u organización: el código aparece aquí.",
    pt: "Adicione pelo menos um nome ou organização — o código aparece aqui.",
  },
  tooLong: {
    en: "Too much detail for a single QR code — remove a field or shorten the values.",
    zh: "内容太多,装不进一个二维码——删掉一些字段或缩短内容。",
    ja: "内容が多すぎて 1 つの QR コードに収まりません。項目を減らすか短くしてください。",
    es: "Demasiados datos para un solo código QR: quita un campo o acorta los valores.",
    pt: "Detalhes demais para um único QR — remova um campo ou encurte os valores.",
  },
  note: {
    en: "The card follows vCard 3.0, the format iOS and Android offer to save straight into contacts. The QR is static — the card lives inside the pattern, so it keeps working even if this site disappears one day. Copy the vCard text to paste the same card into an email signature.",
    zh: "名片采用 vCard 3.0 格式,iOS 和安卓扫描后会直接提示保存到通讯录。二维码是静态的——名片内容就在图形里,即使有一天本站消失也照样能用。复制 vCard 文本还能贴进邮件签名。",
    ja: "カードは vCard 3.0 形式で、iOS・Android は読み取るとそのまま連絡先に保存できます。QR は静的で、カードの内容はパターンの中にあるため、このサイトがなくなっても使い続けられます。vCard テキストをコピーしてメール署名に貼ることもできます。",
    es: "La tarjeta sigue vCard 3.0, el formato que iOS y Android ofrecen guardar directamente en contactos. El QR es estático: la tarjeta vive dentro del patrón, así que seguirá funcionando aunque este sitio desaparezca. Copia el texto vCard para pegarlo en una firma de correo.",
    pt: "O cartão segue o vCard 3.0, o formato que iOS e Android oferecem para salvar direto nos contatos. O QR é estático — o cartão vive dentro do padrão, então continua funcionando mesmo se este site desaparecer. Copie o texto vCard para colar na assinatura de e-mail.",
  },
};

type VCardForm = {
  firstName: string; lastName: string; org: string; title: string;
  phone: string; email: string; url: string;
  street: string; city: string; zip: string; country: string;
};

const EMPTY: VCardForm = {
  firstName: "", lastName: "", org: "", title: "",
  phone: "", email: "", url: "",
  street: "", city: "", zip: "", country: "",
};

export function VCardQrEngine() {
  const { locale } = useI18n();
  const [form, setForm] = useState<VCardForm>(EMPTY);
  const [size, setSize] = useState(360);
  const [status, setStatus] = useState<QrStatus>("empty");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStatus = useCallback((s: QrStatus) => setStatus(s), []);

  const set = (k: keyof VCardForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const payload = buildVCard(form);
  const options: QrStyleOptions = { size, margin: 3, ecc: "M", dark: "#111111", light: "#ffffff" };
  const ready = status === "ok";

  const downloadVcf = () => {
    const name = (form.firstName || form.lastName || form.org || "contact").trim();
    downloadBlob(new Blob([payload], { type: "text/vcard" }), `${name.replace(/[^\w-]+/g, "-")}.vcf`);
  };

  return (
    <ToolPanel>
      <p className="text-[15px] leading-6 text-[var(--color-sub)]">{pick(locale, S.intro)}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, S.firstName)}>
              <input className="field" value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} aria-label={pick(locale, S.firstName)} />
            </Field>
            <Field label={pick(locale, S.lastName)}>
              <input className="field" value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} aria-label={pick(locale, S.lastName)} />
            </Field>
            <Field label={pick(locale, S.org)}>
              <input className="field" value={form.org} onChange={(e) => set("org")(e.target.value)} aria-label={pick(locale, S.org)} />
            </Field>
            <Field label={pick(locale, S.title)}>
              <input className="field" value={form.title} onChange={(e) => set("title")(e.target.value)} aria-label={pick(locale, S.title)} />
            </Field>
            <Field label={pick(locale, S.phone)}>
              <input className="field mono" value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="+1 555 123 4567" aria-label={pick(locale, S.phone)} />
            </Field>
            <Field label={pick(locale, S.email)}>
              <input className="field mono" value={form.email} onChange={(e) => set("email")(e.target.value)} aria-label={pick(locale, S.email)} />
            </Field>
            <Field label={pick(locale, S.url)}>
              <input className="field mono" value={form.url} onChange={(e) => set("url")(e.target.value)} placeholder="https://" aria-label={pick(locale, S.url)} />
            </Field>
          </div>

          <div className="rounded-2xl border hairline p-4">
            <p className="mb-3 text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.addressTitle)}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={pick(locale, S.street)}>
                <input className="field" value={form.street} onChange={(e) => set("street")(e.target.value)} aria-label={pick(locale, S.street)} />
              </Field>
              <Field label={pick(locale, S.city)}>
                <input className="field" value={form.city} onChange={(e) => set("city")(e.target.value)} aria-label={pick(locale, S.city)} />
              </Field>
              <Field label={pick(locale, S.zip)}>
                <input className="field mono" value={form.zip} onChange={(e) => set("zip")(e.target.value)} aria-label={pick(locale, S.zip)} />
              </Field>
              <Field label={pick(locale, S.country)}>
                <input className="field" value={form.country} onChange={(e) => set("country")(e.target.value)} aria-label={pick(locale, S.country)} />
              </Field>
            </div>
          </div>

          <Field label={`${size} px`}>
            <input type="range" min={192} max={768} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" aria-label="qr size" />
          </Field>
        </div>

        <div className="flex flex-col items-center justify-start gap-3">
          <div className="rounded-3xl border hairline p-3">
            <QrCanvas payload={payload} options={options} canvasRef={canvasRef} onStatus={onStatus} />
          </div>
          {status === "empty" && <p className="max-w-[240px] text-center text-[13px] text-[var(--color-sub)]">{pick(locale, S.empty)}</p>}
          {status === "error" && <p className="error-bg max-w-[260px] rounded-xl px-3 py-2 text-center text-[13px] text-[var(--color-bad)]">{pick(locale, S.tooLong)}</p>}
          <QrDownloadButtons
            canvasRef={canvasRef}
            payload={payload}
            options={options}
            disabled={!ready}
            labels={{ png: pick(locale, DL), svg: pick(locale, DL) }}
          />
          {payload && (
            <button
              type="button"
              onClick={downloadVcf}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, S.vcf)}
            </button>
          )}
        </div>
      </div>

      {payload && (
        <div className="mt-5 rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {pick(locale, S.payload)}
            </span>
            <CopyButton value={payload} label={pick(locale, S.copyCard)} />
          </div>
          <p className="mono mt-1.5 whitespace-pre-wrap break-all text-[12.5px] leading-5 text-[var(--color-ink)]">
            {payload}
          </p>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
