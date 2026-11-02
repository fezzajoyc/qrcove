"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { buildWifiString, type WifiEncryption } from "../_lib/qrdata";

const DL = { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" };
import {
  Field, Note, PayloadBox, QrCanvas, QrDownloadButtons, Sel, pick,
  type QrStatus, type QrStyleOptions,
} from "./qr-ui";

/**
 * Featured #2: dedicated Wi-Fi QR builder. The WIFI: payload follows the
 * ZXing standard that iOS/Android cameras parse natively — guests join by
 * pointing their camera at the code, no password typing.
 */

const S = {
  intro: {
    en: "The most-scanned QR in real life: print it for your café counter, hotel room or home router and guests connect with one camera tap.",
    zh: "现实生活中被扫得最多的二维码:打印出来贴在咖啡馆吧台、酒店房间或家里路由器旁,客人扫一下就能连网。",
    ja: "実際に最も読まれる QR コードです。カフェのカウンターやホテルの部屋、家庭のルーターの横に貼れば、お客様がカメラをかざすだけで接続できます。",
    es: "El QR más escaneado de la vida real: imprímelo para la barra de tu cafetería, la habitación del hotel o tu router, y los invitados se conectan con un toque.",
    pt: "O QR mais escaneado do dia a dia: imprima para o balcão do café, o quarto do hotel ou perto do roteador de casa, e as visitas se conectam com um toque.",
  },
  ssid: { en: "Network name (SSID)", zh: "网络名称(SSID)", ja: "ネットワーク名(SSID)", es: "Nombre de red (SSID)", pt: "Nome da rede (SSID)" },
  pass: { en: "Wi-Fi password", zh: "Wi-Fi 密码", ja: "Wi-Fi パスワード", es: "Contraseña Wi-Fi", pt: "Senha do Wi-Fi" },
  showPass: { en: "Show password", zh: "显示密码", ja: "パスワードを表示", es: "Mostrar contraseña", pt: "Mostrar senha" },
  enc: { en: "Security", zh: "加密方式", ja: "暗号化方式", es: "Seguridad", pt: "Segurança" },
  hidden: { en: "Hidden network (SSID not broadcast)", zh: "隐藏网络(不广播 SSID)", ja: "ステルスネットワーク(SSID 非公開)", es: "Red oculta (SSID no emitido)", pt: "Rede oculta (SSID não transmitido)" },
  payload: { en: "Encoded string", zh: "编码字符串", ja: "エンコード文字列", es: "Cadena codificada", pt: "String codificada" },
  empty: {
    en: "Type the network name — the code appears here.",
    zh: "输入网络名称,二维码会出现在这里。",
    ja: "ネットワーク名を入力すると、ここにコードが表示されます。",
    es: "Escribe el nombre de la red: el código aparece aquí.",
    pt: "Digite o nome da rede — o código aparece aqui.",
  },
  tooLong: {
    en: "Network name or password too long for a QR code.",
    zh: "网络名称或密码太长,装不进一个二维码。",
    ja: "ネットワーク名またはパスワードが長すぎて QR コードに収まりません。",
    es: "El nombre de red o la contraseña son demasiado largos para un código QR.",
    pt: "O nome da rede ou a senha são longos demais para um código QR.",
  },
  print: {
    en: "Printing tip: keep it at least 3 × 3 cm, leave the white margin intact and use level M or Q error correction — glossy counters and curved mugs need more correction.",
    zh: "打印建议:至少 3 × 3 厘米,保留四周白边,纠错用 M 或 Q 级——柜台玻璃面和弯曲杯面需要更高的纠错。",
    ja: "印刷のヒント:3 × 3 cm 以上で、白い余白を残し、誤り訂正は M か Q を。光沢のあるカウンターや曲面上ではより高い訂正レベルが必要です。",
    es: "Consejo de impresión: mínimo 3 × 3 cm, conserva el margen blanco y usa corrección M o Q; superficies brillantes o curvas necesitan más corrección.",
    pt: "Dica de impressão: no mínimo 3 × 3 cm, mantenha a margem branca e use correção M ou Q — balcões brilhantes e superfícies curvas pedem mais correção.",
  },
  note: {
    en: "The string follows the WIFI: format that iPhone and Android cameras read natively — no app needed. Your password is encoded into the pattern: anyone who scans the code can join the network, so print it where you would happily share the password aloud. The code is static, works offline and never expires.",
    zh: "字符串遵循 WIFI: 标准格式,iPhone 和安卓相机原生识别,无需装 App。密码会被编码进图形:任何扫到的人都能连上网络,所以请把它贴在你愿意大声说出密码的地方。二维码是静态的,离线可用,永不过期。",
    ja: "文字列は iPhone・Android のカメラが標準で認識する WIFI: 形式に従うため、アプリは不要です。パスワードはパターンにエンコードされます。読み取れる人は誰でもネットワークに接続できるので、パスワードを声に出して共有してもよい場所に貼ってください。静的コードでオフラインで動き、期限はありません。",
    es: "La cadena sigue el formato WIFI: que las cámaras de iPhone y Android leen de forma nativa, sin app. Tu contraseña queda codificada en el patrón: cualquiera que escanee el código podrá conectarse, así que imprímelo donde compartirías la contraseña en voz alta. El código es estático, funciona sin conexión y nunca caduca.",
    pt: "A string segue o formato WIFI: que as câmeras de iPhone e Android leem nativamente, sem app. Sua senha fica codificada no padrão: quem escanear o código poderá se conectar, então imprima onde você contaria a senha em voz alta. O código é estático, funciona offline e nunca expira.",
  },
};

export function WifiQrEngine() {
  const { locale } = useI18n();
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState<WifiEncryption>("WPA");
  const [hidden, setHidden] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [size, setSize] = useState(360);
  const [status, setStatus] = useState<QrStatus>("empty");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStatus = useCallback((s: QrStatus) => setStatus(s), []);

  const payload = buildWifiString({ ssid, password, encryption, hidden });
  const options: QrStyleOptions = { size, margin: 3, ecc: "M", dark: "#111111", light: "#ffffff" };
  const ready = status === "ok";

  return (
    <ToolPanel>
      <p className="text-[15px] leading-6 text-[var(--color-sub)]">{pick(locale, S.intro)}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, S.ssid)}>
              <input className="field" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="MyNetwork" aria-label={pick(locale, S.ssid)} />
            </Field>
            <Field label={pick(locale, S.enc)}>
              <Sel value={encryption} onChange={(v) => setEncryption(v as WifiEncryption)} aria={pick(locale, S.enc)}>
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (open)</option>
              </Sel>
            </Field>
          </div>
          {encryption !== "nopass" && (
            <Field label={pick(locale, S.pass)}>
              <div className="flex items-center gap-2">
                <input
                  className="field mono"
                  type={showPass ? "text" : "password"}
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label={pick(locale, S.pass)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="flex-none rounded-full border hairline px-3 py-1.5 text-[12.5px] font-medium text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
                >
                  {pick(locale, S.showPass)}
                </button>
              </div>
            </Field>
          )}
          <label className="flex items-center gap-2 text-[13.5px] text-[var(--color-sub)]">
            <input type="checkbox" className="h-4 w-4 accent-[var(--color-accent)]" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
            {pick(locale, S.hidden)}
          </label>
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
        </div>
      </div>

      {payload && (
        <div className="mt-5">
          <PayloadBox payload={payload} label={pick(locale, S.payload)} />
        </div>
      )}

      <div className="mt-4 space-y-3">
        <Note>{pick(locale, S.print)}</Note>
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
