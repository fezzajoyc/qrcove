"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import {
  buildGeoString, buildMailto, buildSmsString, buildVCard, buildWifiString,
  type WifiEncryption,
} from "../_lib/qrdata";
import {
  Field, Note, PayloadBox, QrCanvas, QrDownloadButtons, Sel, Tabs, pick,
  type QrEcc, type QrStatus, type QrStyleOptions,
} from "./qr-ui";

/**
 * Featured QR generator. Every content type is built by the tested pure
 * builders in tools/_lib/qrdata.ts; the qrcode package draws pixels in the
 * browser only (dynamic import, nothing uploaded).
 */

type ContentType = "url" | "text" | "wifi" | "vcard" | "email" | "sms" | "phone" | "geo";

const S = {
  tabUrl: { en: "URL", zh: "网址", ja: "URL", es: "URL", pt: "URL" },
  tabText: { en: "Text", zh: "文本", ja: "テキスト", es: "Texto", pt: "Texto" },
  tabWifi: { en: "Wi-Fi", zh: "Wi-Fi", ja: "Wi-Fi", es: "Wi-Fi", pt: "Wi-Fi" },
  tabVcard: { en: "Contact", zh: "联系人", ja: "連絡先", es: "Contacto", pt: "Contato" },
  tabEmail: { en: "Email", zh: "邮件", ja: "メール", es: "Correo", pt: "E-mail" },
  tabSms: { en: "SMS", zh: "短信", ja: "SMS", es: "SMS", pt: "SMS" },
  tabPhone: { en: "Phone", zh: "电话", ja: "電話", es: "Teléfono", pt: "Telefone" },
  tabGeo: { en: "Location", zh: "位置", ja: "位置", es: "Ubicación", pt: "Local" },
  urlField: { en: "Web address", zh: "网址", ja: "ウェブアドレス", es: "Dirección web", pt: "Endereço web" },
  urlHint: {
    en: "Include https:// so scanners open the page directly instead of showing text.",
    zh: "记得加上 https://,扫码后才会直接打开页面,而不是显示一串文本。",
    ja: "https:// を付けると、読み取り時にテキスト表示ではなくページが直接開きます。",
    es: "Incluye https:// para que los escáneres abran la página directamente en vez de mostrar texto.",
    pt: "Inclua https:// para que os leitores abram a página diretamente em vez de mostrar texto.",
  },
  textField: { en: "Text to encode", zh: "要编码的文本", ja: "エンコードするテキスト", es: "Texto a codificar", pt: "Texto a codificar" },
  ssid: { en: "Network name (SSID)", zh: "网络名称(SSID)", ja: "ネットワーク名(SSID)", es: "Nombre de red (SSID)", pt: "Nome da rede (SSID)" },
  wifiPass: { en: "Password", zh: "密码", ja: "パスワード", es: "Contraseña", pt: "Senha" },
  wifiEnc: { en: "Security", zh: "加密方式", ja: "暗号化方式", es: "Seguridad", pt: "Segurança" },
  wifiHidden: { en: "Hidden network", zh: "隐藏网络", ja: "ステルス(非公開)ネットワーク", es: "Red oculta", pt: "Rede oculta" },
  firstName: { en: "First name", zh: "名", ja: "名", es: "Nombre", pt: "Nome" },
  lastName: { en: "Last name", zh: "姓", ja: "姓", es: "Apellido", pt: "Sobrenome" },
  org: { en: "Organization", zh: "组织", ja: "組織", es: "Organización", pt: "Organização" },
  phone: { en: "Phone", zh: "电话", ja: "電話番号", es: "Teléfono", pt: "Telefone" },
  email: { en: "Email", zh: "邮箱", ja: "メールアドレス", es: "Correo electrónico", pt: "E-mail" },
  subject: { en: "Subject", zh: "主题", ja: "件名", es: "Asunto", pt: "Assunto" },
  body: { en: "Message", zh: "正文", ja: "本文", es: "Mensaje", pt: "Mensagem" },
  message: { en: "Prefilled message", zh: "预填短信内容", ja: "事前入力メッセージ", es: "Mensaje prellenado", pt: "Mensagem pré-preenchida" },
  lat: { en: "Latitude", zh: "纬度", ja: "緯度", es: "Latitud", pt: "Latitude" },
  lon: { en: "Longitude", zh: "经度", ja: "経度", es: "Longitud", pt: "Longitude" },
  ecc: { en: "Error correction", zh: "纠错级别", ja: "誤り訂正レベル", es: "Corrección de errores", pt: "Correção de erros" },
  colors: { en: "Colors (code / background)", zh: "颜色(码 / 背景)", ja: "色(コード / 背景)", es: "Colores (código / fondo)", pt: "Cores (código / fundo)" },
  size: { en: "Size", zh: "尺寸", ja: "サイズ", es: "Tamaño", pt: "Tamanho" },
  margin: { en: "Margin (quiet zone)", zh: "留白(静区)", ja: "余白(クワイエットゾーン)", es: "Margen (zona silenciosa)", pt: "Margem (zona silenciosa)" },
  payload: { en: "Encoded content", zh: "编码内容", ja: "エンコード内容", es: "Contenido codificado", pt: "Conteúdo codificado" },
  downloadPng: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" },
  downloadSvg: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" },
  empty: {
    en: "Fill in the form — the code appears here as you type.",
    zh: "填写左侧表单,二维码会随输入实时出现在这里。",
    ja: "フォームに入力すると、ここにリアルタイムでコードが表示されます。",
    es: "Rellena el formulario: el código aparece aquí mientras escribes.",
    pt: "Preencha o formulário — o código aparece aqui enquanto você digita.",
  },
  tooLong: {
    en: "This content is too long for a single QR code at this error-correction level. Shorten the text or pick level L.",
    zh: "内容太长,在当前纠错级别下装不进一个二维码。请缩短文本或改用 L 级。",
    ja: "この誤り訂正レベルでは内容が長すぎます。テキストを短くするか L レベルを選んでください。",
    es: "El contenido es demasiado largo para un solo código QR con esta corrección. Acorta el texto o usa el nivel L.",
    pt: "O conteúdo é longo demais para um único QR neste nível de correção. Encurte o texto ou use o nível L.",
  },
  note: {
    en: "Everything is created in your browser — the image is never uploaded. These are static QR codes: the data is embedded in the pattern itself, so they work forever, never expire and need no account. Higher error-correction levels keep codes scannable when partially covered or printed small; keep the colors high-contrast (dark on light).",
    zh: "二维码完全在浏览器里生成,图片不会上传。这些都是静态二维码:数据直接编码在图形里,永不过期、无需账号。纠错级别越高,二维码被遮挡一部分或印得很小时仍可扫出;请保持深色码浅色底的高对比度。",
    ja: "コードはすべてブラウザ内で生成され、画像はアップロードされません。これは静的 QR コードです。データがパターン自体に埋め込まれているため、期限切れやアカウント登録はありません。誤り訂正レベルを上げると一部が隠れても読み取れ、色は暗いコード+明るい背景の高コントラストを保ってください。",
    es: "Todo se genera en tu navegador; la imagen nunca se sube. Son códigos QR estáticos: los datos están incrustados en el propio patrón, así que funcionan para siempre, no caducan y no necesitan cuenta. Con más corrección siguen leyéndose aunque se tapen parcialmente o se impriman pequeños; mantén colores de alto contraste (oscuro sobre claro).",
    pt: "Tudo é gerado no seu navegador — a imagem nunca é enviada. Estes são QR codes estáticos: os dados estão embutidos no próprio padrão, então funcionam para sempre, não expiram e não precisam de conta. Níveis maiores de correção mantêm o código legível mesmo parcialmente coberto ou impresso pequeno; mantenha alto contraste (escuro sobre claro).",
  },
};

const CONTENT_TABS: { id: ContentType; key: keyof typeof S }[] = [
  { id: "url", key: "tabUrl" },
  { id: "text", key: "tabText" },
  { id: "wifi", key: "tabWifi" },
  { id: "vcard", key: "tabVcard" },
  { id: "email", key: "tabEmail" },
  { id: "sms", key: "tabSms" },
  { id: "phone", key: "tabPhone" },
  { id: "geo", key: "tabGeo" },
];

export function QrGeneratorEngine() {
  const { locale } = useI18n();
  const [type, setType] = useState<ContentType>("url");

  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" as WifiEncryption, hidden: false });
  const [vcard, setVcard] = useState({ firstName: "", lastName: "", org: "", phone: "", email: "" });
  const [mail, setMail] = useState({ to: "", subject: "", body: "" });
  const [sms, setSms] = useState({ number: "", message: "" });
  const [phone, setPhone] = useState("");
  const [geo, setGeo] = useState({ lat: "", lon: "" });

  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [ecc, setEcc] = useState<QrEcc>("M");
  const [dark, setDark] = useState("#111111");
  const [light, setLight] = useState("#ffffff");
  const [status, setStatus] = useState<QrStatus>("empty");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStatus = useCallback((s: QrStatus) => setStatus(s), []);

  const payload = useMemo(() => {
    switch (type) {
      case "url": return url.trim();
      case "text": return text;
      case "wifi": return buildWifiString(wifi);
      case "vcard": return buildVCard(vcard);
      case "email": return buildMailto(mail);
      case "sms": return buildSmsString(sms);
      case "phone": return phone.trim() ? `tel:${phone.trim().replace(/\s+/g, "")}` : "";
      case "geo": return buildGeoString(geo);
      default: return "";
    }
  }, [type, url, text, wifi, vcard, mail, sms, phone, geo]);

  const options: QrStyleOptions = { size, margin, ecc, dark, light };
  const ready = status === "ok";

  return (
    <ToolPanel>
      <Tabs
        value={type}
        onChange={(v) => setType(v as ContentType)}
        options={CONTENT_TABS.map((t) => ({ id: t.id, label: pick(locale, S[t.key]) }))}
      />

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          {type === "url" && (
            <>
              <Field label={pick(locale, S.urlField)}>
                <input
                  className="field mono"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  aria-label={pick(locale, S.urlField)}
                  spellCheck={false}
                />
              </Field>
              <Note>{pick(locale, S.urlHint)}</Note>
            </>
          )}

          {type === "text" && (
            <Field label={pick(locale, S.textField)}>
              <textarea
                className="field mono"
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={pick(locale, S.textField)}
                aria-label={pick(locale, S.textField)}
                spellCheck={false}
              />
            </Field>
          )}

          {type === "wifi" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={pick(locale, S.ssid)}>
                <input className="field" value={wifi.ssid} onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })} placeholder="MyNetwork" aria-label={pick(locale, S.ssid)} />
              </Field>
              <Field label={pick(locale, S.wifiEnc)}>
                <Sel value={wifi.encryption} onChange={(v) => setWifi({ ...wifi, encryption: v as WifiEncryption })} aria={pick(locale, S.wifiEnc)}>
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (open)</option>
                </Sel>
              </Field>
              {wifi.encryption !== "nopass" && (
                <Field label={pick(locale, S.wifiPass)}>
                  <input className="field mono" type="password" autoComplete="off" value={wifi.password} onChange={(e) => setWifi({ ...wifi, password: e.target.value })} aria-label={pick(locale, S.wifiPass)} />
                </Field>
              )}
              <label className="flex items-center gap-2 self-end pb-2.5 text-[13.5px] text-[var(--color-sub)]">
                <input type="checkbox" className="h-4 w-4 accent-[var(--color-accent)]" checked={wifi.hidden} onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })} />
                {pick(locale, S.wifiHidden)}
              </label>
            </div>
          )}

          {type === "vcard" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={pick(locale, S.firstName)}>
                <input className="field" value={vcard.firstName} onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })} aria-label={pick(locale, S.firstName)} />
              </Field>
              <Field label={pick(locale, S.lastName)}>
                <input className="field" value={vcard.lastName} onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })} aria-label={pick(locale, S.lastName)} />
              </Field>
              <Field label={pick(locale, S.org)}>
                <input className="field" value={vcard.org} onChange={(e) => setVcard({ ...vcard, org: e.target.value })} aria-label={pick(locale, S.org)} />
              </Field>
              <Field label={pick(locale, S.phone)}>
                <input className="field mono" value={vcard.phone} onChange={(e) => setVcard({ ...vcard, phone: e.target.value })} aria-label={pick(locale, S.phone)} />
              </Field>
              <Field label={pick(locale, S.email)}>
                <input className="field mono" value={vcard.email} onChange={(e) => setVcard({ ...vcard, email: e.target.value })} aria-label={pick(locale, S.email)} />
              </Field>
            </div>
          )}

          {type === "email" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={pick(locale, S.email)}>
                  <input className="field mono" value={mail.to} onChange={(e) => setMail({ ...mail, to: e.target.value })} placeholder="hello@example.com" aria-label={pick(locale, S.email)} />
                </Field>
                <Field label={pick(locale, S.subject)}>
                  <input className="field" value={mail.subject} onChange={(e) => setMail({ ...mail, subject: e.target.value })} aria-label={pick(locale, S.subject)} />
                </Field>
              </div>
              <Field label={pick(locale, S.body)}>
                <textarea className="field" rows={3} value={mail.body} onChange={(e) => setMail({ ...mail, body: e.target.value })} aria-label={pick(locale, S.body)} />
              </Field>
            </div>
          )}

          {type === "sms" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={pick(locale, S.phone)}>
                <input className="field mono" value={sms.number} onChange={(e) => setSms({ ...sms, number: e.target.value })} placeholder="+1 555 123 4567" aria-label={pick(locale, S.phone)} />
              </Field>
              <Field label={pick(locale, S.message)}>
                <input className="field" value={sms.message} onChange={(e) => setSms({ ...sms, message: e.target.value })} aria-label={pick(locale, S.message)} />
              </Field>
            </div>
          )}

          {type === "phone" && (
            <Field label={pick(locale, S.phone)}>
              <input className="field mono" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" aria-label={pick(locale, S.phone)} />
            </Field>
          )}

          {type === "geo" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={pick(locale, S.lat)}>
                <input className="field mono" value={geo.lat} onChange={(e) => setGeo({ ...geo, lat: e.target.value })} placeholder="48.8584" aria-label={pick(locale, S.lat)} />
              </Field>
              <Field label={pick(locale, S.lon)}>
                <input className="field mono" value={geo.lon} onChange={(e) => setGeo({ ...geo, lon: e.target.value })} placeholder="2.2945" aria-label={pick(locale, S.lon)} />
              </Field>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, S.ecc)}>
              <Sel value={ecc} onChange={(v) => setEcc(v as QrEcc)} aria={pick(locale, S.ecc)}>
                <option value="L">L · 7%</option>
                <option value="M">M · 15%</option>
                <option value="Q">Q · 25%</option>
                <option value="H">H · 30%</option>
              </Sel>
            </Field>
            <Field label={pick(locale, S.colors)}>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={dark} onChange={(e) => setDark(e.target.value)} aria-label="code color" />
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={light} onChange={(e) => setLight(e.target.value)} aria-label="background color" />
              </div>
            </Field>
          </div>
          <Field label={`${pick(locale, S.size)} (${size} px)`}>
            <input type="range" min={128} max={768} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" aria-label="qr size" />
          </Field>
          <Field label={`${pick(locale, S.margin)} (${margin})`}>
            <input type="range" min={0} max={8} step={1} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full" aria-label="qr margin" />
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
            labels={{ png: pick(locale, S.downloadPng), svg: pick(locale, S.downloadSvg) }}
          />
        </div>
      </div>

      {payload && (
        <div className="mt-5">
          <PayloadBox payload={payload} label={pick(locale, S.payload)} />
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
