"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { detectQrContentType, type QrContent } from "../_lib/qrdata";
import type { Locale } from "@/lib/site";
import { Note, Tabs, pick } from "./qr-ui";

/**
 * QR reader. Image decoding uses jsqr (dynamic import) on local pixels.
 * Live camera uses the platform BarcodeDetector API where the browser ships
 * one, with an explicit fallback message telling people to use the image tab.
 * Nothing is uploaded: files and camera frames never leave the device.
 */

type JsQR = typeof import("jsqr").default;
type ImgState = "idle" | "decoding" | "noqr" | "badimage";
type CamState = "idle" | "starting" | "scanning" | "denied" | "nocam" | "unsupported" | "error";

const DL = { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar" };

const S = {
  imageTab: { en: "From an image", zh: "从图片识别", ja: "画像から読み取り", es: "Desde una imagen", pt: "De uma imagem" },
  camTab: { en: "Live camera", zh: "摄像头实时扫描", ja: "カメラで読み取り", es: "Cámara en vivo", pt: "Câmera ao vivo" },
  decoding: { en: "Decoding…", zh: "识别中…", ja: "読み取り中…", es: "Decodificando…", pt: "Decodificando…" },
  noqr: {
    en: "No QR code found in this image. Try a sharper, larger crop that contains the whole code.",
    zh: "图中没有找到二维码。试试更清晰、完整包含二维码的截图。",
    ja: "この画像から QR コードは見つかりませんでした。コード全体が含まれる、より鮮明で大きな切り抜きをお試しください。",
    es: "No se encontró ningún código QR en la imagen. Prueba un recorte más nítido y grande que contenga el código completo.",
    pt: "Nenhum código QR encontrado nesta imagem. Tente um recorte mais nítido e maior contendo o código completo.",
  },
  badimage: {
    en: "That file could not be read as an image.",
    zh: "该文件无法作为图片读取。",
    ja: "そのファイルは画像として読み込めませんでした。",
    es: "No se pudo leer el archivo como imagen.",
    pt: "Não foi possível ler o arquivo como imagem.",
  },
  idle: { en: "Point the camera at a QR code", zh: "将摄像头对准二维码", ja: "カメラを QR コードに向けてください", es: "Apunte la cámara a un código QR", pt: "Aponte a câmera para um código QR" },
  starting: { en: "Starting camera…", zh: "正在启动摄像头…", ja: "カメラを起動中…", es: "Iniciando cámara…", pt: "Iniciando câmera…" },
  start: { en: "Start camera", zh: "开启摄像头", ja: "カメラを起動", es: "Iniciar cámara", pt: "Iniciar câmera" },
  stop: { en: "Stop camera", zh: "关闭摄像头", ja: "カメラを停止", es: "Detener cámara", pt: "Parar câmera" },
  denied: {
    en: "Camera access was denied. Allow camera permission for this site and try again.",
    zh: "摄像头权限被拒绝。请在浏览器中允许本站使用摄像头后重试。",
    ja: "カメラへのアクセスが拒否されました。ブラウザでこのサイトのカメラ権限を許可して再試行してください。",
    es: "Se denegó el acceso a la cámara. Permita el uso de la cámara para este sitio e inténtelo de nuevo.",
    pt: "O acesso à câmera foi negado. Permita o uso da câmera para este site e tente novamente.",
  },
  nocam: { en: "No camera was found on this device.", zh: "该设备上没有找到摄像头。", ja: "このデバイスにカメラが見つかりません。", es: "No se encontró ninguna cámara en este dispositivo.", pt: "Nenhuma câmera encontrada neste dispositivo." },
  fallback: {
    en: "Live scanning needs the browser's built-in BarcodeDetector API (Chrome, Edge or Samsung Internet on Android; it is not exposed in Firefox or most desktop browsers). Your camera still works here — take a photo or screenshot of the code and open the “From an image” tab instead. Same decoding, no upload either way.",
    zh: "实时扫描依赖浏览器内置的 BarcodeDetector API(Android 上的 Chrome、Edge 或三星浏览器;Firefox 和多数桌面浏览器未开放)。你的摄像头依然可用——给二维码拍张照或截个图,改用「从图片识别」即可。识别方式相同,同样不会上传。",
    ja: "ライブ読み取りにはブラウザ内蔵の BarcodeDetector API が必要です(Android の Chrome・Edge・Samsung Internet。Firefox や多くのデスクトップブラウザでは利用できません)。カメラ自体は使えるので、コードを撮影・スクリーンショットして「画像から読み取り」タブを使ってください。読み取り方式は同じで、アップロードもされません。",
    es: "El escaneo en vivo necesita la API BarcodeDetector del navegador (Chrome, Edge o Samsung Internet en Android; Firefox y la mayoría de navegadores de escritorio no la exponen). Tu cámara sigue sirviendo: haz una foto o captura del código y usa la pestaña «Desde una imagen». La decodificación es la misma y tampoco hay subida.",
    pt: "A leitura ao vivo precisa da API BarcodeDetector do navegador (Chrome, Edge ou Samsung Internet no Android; Firefox e a maioria dos navegadores de desktop não a expõem). Sua câmera ainda funciona: tire uma foto ou captura de tela do código e use a aba «De uma imagem». A decodificação é a mesma e nada é enviado.",
  },
  error: {
    en: "The camera could not be started. Try another browser or check device settings.",
    zh: "摄像头无法启动。请换一个浏览器或检查设备设置。",
    ja: "カメラを起動できませんでした。別のブラウザをお試しいただくか、デバイス設定をご確認ください。",
    es: "No se pudo iniciar la cámara. Pruebe con otro navegador o revise la configuración del dispositivo.",
    pt: "Não foi possível iniciar a câmera. Tente outro navegador ou verifique as configurações do dispositivo.",
  },
  result: { en: "Decoded content", zh: "识别结果", ja: "読み取り結果", es: "Contenido decodificado", pt: "Conteúdo decodificado" },
  openLink: { en: "Open link", zh: "打开链接", ja: "リンクを開く", es: "Abrir enlace", pt: "Abrir link" },
  call: { en: "Call", zh: "拨打电话", ja: "電話をかける", es: "Llamar", pt: "Ligar" },
  writeEmail: { en: "Write email", zh: "写邮件", ja: "メールを作成", es: "Escribir correo", pt: "Escrever e-mail" },
  openMap: { en: "Open in maps", zh: "在地图中打开", ja: "地図で開く", es: "Abrir en mapas", pt: "Abrir em mapas" },
  saveContact: { en: "Save contact (.vcf)", zh: "保存联系人(.vcf)", ja: "連絡先に保存(.vcf)", es: "Guardar contacto (.vcf)", pt: "Salvar contato (.vcf)" },
  typeUrl: { en: "Website link", zh: "网址链接", ja: "ウェブリンク", es: "Enlace web", pt: "Link de site" },
  typeWifi: { en: "Wi-Fi network", zh: "Wi-Fi 网络", ja: "Wi-Fi ネットワーク", es: "Red Wi-Fi", pt: "Rede Wi-Fi" },
  typeVcard: { en: "Contact card", zh: "联系人名片", ja: "連絡先カード", es: "Tarjeta de contacto", pt: "Cartão de contato" },
  typeGeo: { en: "Coordinates", zh: "地理坐标", ja: "座標", es: "Coordenadas", pt: "Coordenadas" },
  typeMailto: { en: "Email draft", zh: "邮件草稿", ja: "メール下書き", es: "Borrador de correo", pt: "Rascunho de e-mail" },
  typeTel: { en: "Phone number", zh: "电话号码", ja: "電話番号", es: "Número de teléfono", pt: "Número de telefone" },
  typeSms: { en: "SMS draft", zh: "短信草稿", ja: "SMS 下書き", es: "Borrador de SMS", pt: "Rascunho de SMS" },
  typeText: { en: "Plain text", zh: "纯文本", ja: "プレーンテキスト", es: "Texto sin formato", pt: "Texto simples" },
  ssid: { en: "Network", zh: "网络", ja: "ネットワーク", es: "Red", pt: "Rede" },
  password: { en: "Password", zh: "密码", ja: "パスワード", es: "Contraseña", pt: "Senha" },
  security: { en: "Security", zh: "加密", ja: "暗号化", es: "Seguridad", pt: "Segurança" },
  hiddenNet: { en: "Hidden network", zh: "隐藏网络", ja: "ステルス", es: "Red oculta", pt: "Rede oculta" },
  openNet: { en: "Open network", zh: "开放网络", ja: "オープンネットワーク", es: "Red abierta", pt: "Rede aberta" },
  name: { en: "Name", zh: "姓名", ja: "氏名", es: "Nombre", pt: "Nome" },
  org: { en: "Organization", zh: "组织", ja: "組織", es: "Organização", pt: "Organização" },
  email: { en: "Email", zh: "邮箱", ja: "メールアドレス", es: "Correo electrónico", pt: "E-mail" },
  subject: { en: "Subject", zh: "主题", ja: "件名", es: "Asunto", pt: "Assunto" },
  body: { en: "Body", zh: "正文", ja: "本文", es: "Mensaje", pt: "Mensagem" },
  to: { en: "To", zh: "收件人", ja: "宛先", es: "Para", pt: "Para" },
  message: { en: "Message", zh: "内容", ja: "メッセージ", es: "Mensaje", pt: "Mensagem" },
  consent: {
    en: "Decoding runs entirely on this page: uploaded images are read from local pixels with the jsqr library, and camera frames are analyzed in memory only. Nothing is uploaded, logged or stored, and the camera stops as soon as a code is found or you press stop.",
    zh: "识别完全在本页完成:上传的图片用 jsqr 库读取本地像素,摄像头画面仅在内存中分析。不上传、不留日志、不存储;识别到二维码或你点击停止后,摄像头立即关闭。",
    ja: "読み取りはこのページ上で完結します。アップロード画像は jsqr ライブラリでローカルのピクセルから読み込み、カメラのフレームはメモリ内で解析のみ行われます。アップロード・記録・保存は一切なく、コードが見つかるか停止を押すとすぐにカメラは止まります。",
    es: "La decodificación ocurre íntegramente en esta página: las imágenes subidas se leen de píxeles locales con la librería jsqr y los fotogramas de la cámara solo se analizan en memoria. Nada se sube, registra o almacena, y la cámara se detiene en cuanto se encuentra un código o pulsa detener.",
    pt: "A decodificação acontece inteiramente nesta página: imagens enviadas são lidas de pixels locais com a biblioteca jsqr e os quadros da câmera são analisados apenas na memória. Nada é enviado, registrado ou armazenado, e a câmera para assim que um código é encontrado ou você aperta parar.",
  },
};

function typeLabel(locale: Locale, c: QrContent): string {
  const rec =
    c.type === "url" ? S.typeUrl : c.type === "wifi" ? S.typeWifi : c.type === "vcard" ? S.typeVcard
    : c.type === "geo" ? S.typeGeo : c.type === "mailto" ? S.typeMailto : c.type === "tel" ? S.typeTel
    : c.type === "sms" ? S.typeSms : S.typeText;
  return pick(locale, rec);
}

/** One labeled value row in the pretty result panel. */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-[14px] leading-6">
      <span className="w-24 flex-none text-[var(--color-sub)]">{label}</span>
      <span className="mono break-all">{value}</span>
    </div>
  );
}

export function QrScannerEngine() {
  const { locale } = useI18n();
  const [tab, setTab] = useState("image");

  const [imgState, setImgState] = useState<ImgState>("idle");
  const [camState, setCamState] = useState<CamState>("idle");
  const [content, setContent] = useState<QrContent | null>(null);
  const [raw, setRaw] = useState<string | null>(null);

  const jsqrRef = useRef<JsQR | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const camRafRef = useRef(0);

  const loadJsqr = useCallback(async () => {
    if (!jsqrRef.current) jsqrRef.current = (await import("jsqr")).default;
    return jsqrRef.current;
  }, []);

  const stopCam = useCallback(() => {
    cancelAnimationFrame(camRafRef.current);
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setCamState("idle");
  }, []);

  useEffect(() => {
    if (tab !== "camera") stopCam();
  }, [tab, stopCam]);
  useEffect(() => stopCam, [stopCam]);

  const showResult = (data: string) => {
    setRaw(data);
    setContent(detectQrContentType(data));
  };

  /** Draw the uploaded image with the detected QR corners highlighted. */
  const drawPreview = (img: HTMLImageElement, corners: { x: number; y: number }[] | null) => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const maxW = 420;
    const scale = Math.min(1, maxW / img.naturalWidth);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    if (corners && corners.length === 4) {
      ctx.beginPath();
      ctx.moveTo(corners[0].x * scale, corners[0].y * scale);
      for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x * scale, corners[i].y * scale);
      ctx.closePath();
      ctx.strokeStyle = "#7c3aed";
      ctx.lineWidth = Math.max(2, 3 * scale);
      ctx.stroke();
    }
  };

  const decodeImage = async (file: File) => {
    setImgState("decoding");
    setContent(null);
    setRaw(null);
    const objectUrl = URL.createObjectURL(file);
    try {
      const [jsQR, img] = await Promise.all([
        loadJsqr(),
        new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = () => reject(new Error("decode"));
          im.src = objectUrl;
        }),
      ]);
      const cap = 1500;
      const scale = Math.min(1, cap / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) throw new Error("decode");
      octx.drawImage(img, 0, 0, w, h);
      const res = jsQR(octx.getImageData(0, 0, w, h).data, w, h);
      drawPreview(
        img,
        res
          ? [res.location.topLeftCorner, res.location.topRightCorner, res.location.bottomRightCorner, res.location.bottomLeftCorner]
          : null,
      );
      if (res) {
        showResult(res.data);
        setImgState("idle");
      } else {
        setImgState("noqr");
      }
    } catch {
      setImgState("badimage");
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const startCam = async () => {
    setContent(null);
    setRaw(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamState("error");
      return;
    }
    setCamState("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      setCamState("scanning");
      await video.play();
    } catch (e) {
      const name = e instanceof DOMException ? e.name : "";
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((tr) => tr.stop());
        streamRef.current = null;
      }
      if (name === "NotFoundError" || name === "OverconstrainedError") setCamState("nocam");
      else if (name === "NotAllowedError" || name === "SecurityError") setCamState("denied");
      else setCamState("error");
      return;
    }

    const Detector = (window as unknown as { BarcodeDetector?: new (opts: { formats: string[] }) => { detect: (src: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;
    if (!Detector) {
      stopCam();
      setCamState("unsupported");
      return;
    }
    const detector = new Detector({ formats: ["qr_code"] });

    const tick = () => {
      const video = videoRef.current;
      if (!streamRef.current || !video) return;
      if (video.readyState >= 2 && video.videoWidth > 0) {
        void detector
          .detect(video)
          .then((hits) => {
            if (hits.length > 0) {
              showResult(hits[0].rawValue);
              stopCam();
              return;
            }
            camRafRef.current = requestAnimationFrame(tick);
          })
          .catch(() => {
            camRafRef.current = requestAnimationFrame(tick);
          });
        return;
      }
      camRafRef.current = requestAnimationFrame(tick);
    };
    camRafRef.current = requestAnimationFrame(tick);
  };

  const scanning = camState === "scanning" || camState === "starting";
  const camMsg: Record<string, string> | null =
    camState === "denied" ? S.denied
    : camState === "nocam" ? S.nocam
    : camState === "unsupported" ? S.fallback
    : camState === "error" ? S.error
    : null;

  const downloadVcf = (text: string, name: string) => {
    const safe = (name || "contact").replace(/[^\w-]+/g, "-");
    downloadBlob(new Blob([text], { type: "text/vcard" }), `${safe}.vcf`);
  };

  return (
    <ToolPanel>
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "image", label: pick(locale, S.imageTab) },
          { id: "camera", label: pick(locale, S.camTab) },
        ]}
      />

      {tab === "image" ? (
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <DropZone onFiles={(files) => files[0] && void decodeImage(files[0])} accept="image/*" multiple={false} />
            {imgState === "decoding" && <p className="text-[14px] text-[var(--color-sub)]">{pick(locale, S.decoding)}</p>}
            {imgState === "noqr" && <p className="error-bg rounded-xl px-3 py-2 text-[14px] text-[var(--color-bad)]">{pick(locale, S.noqr)}</p>}
            {imgState === "badimage" && <p className="error-bg rounded-xl px-3 py-2 text-[14px] text-[var(--color-bad)]">{pick(locale, S.badimage)}</p>}
          </div>
          <div className="overflow-hidden rounded-3xl border hairline">
            <canvas ref={previewRef} className="block max-w-full" aria-label="image preview" />
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border hairline bg-[var(--color-surface)]">
            <video
              ref={videoRef}
              playsInline
              muted
              className="block aspect-[4/3] w-full object-cover transition-opacity"
              style={{ opacity: scanning ? 1 : 0 }}
              aria-label="camera preview"
            />
            {!scanning && (
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <p className="text-[14px] text-[var(--color-sub)]">{pick(locale, S.idle)}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scanning ? stopCam : startCam}
              disabled={camState === "starting"}
              className="rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              {scanning ? pick(locale, S.stop) : pick(locale, S.start)}
            </button>
            {scanning && <p className="text-[13px] text-[var(--color-sub)]">{pick(locale, S.decoding)}</p>}
          </div>
          {camMsg && (
            <p
              className={`max-w-2xl rounded-xl px-3 py-2 text-[13.5px] leading-5 ${
                camState === "unsupported"
                  ? "bg-[var(--color-surface)] text-[var(--color-sub)]"
                  : "error-bg text-[var(--color-bad)]"
              }`}
            >
              {pick(locale, camMsg)}
            </p>
          )}
        </div>
      )}

      {content !== null && raw !== null && (
        <div className="mt-6 rounded-3xl border hairline bg-[var(--color-surface)] px-5 py-4" aria-live="polite">
          <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-sub)]">
            {pick(locale, S.result)} · {typeLabel(locale, content)}
          </div>

          <div className="mt-3 space-y-1.5">
            {content.type === "url" && (
              <Row label={typeLabel(locale, content)} value={content.url} />
            )}
            {content.type === "wifi" && (
              <>
                <Row label={pick(locale, S.ssid)} value={content.ssid} />
                <Row label={pick(locale, S.security)} value={content.encryption === "nopass" ? pick(locale, S.openNet) : content.encryption} />
                {content.password && <Row label={pick(locale, S.password)} value={content.password} />}
                {content.hidden && <Row label={pick(locale, S.hiddenNet)} value="yes" />}
              </>
            )}
            {content.type === "vcard" && (
              <>
                <Row label={pick(locale, S.name)} value={content.fullName} />
                {content.org && <Row label={pick(locale, S.org)} value={content.org} />}
                {content.phone && <Row label={pick(locale, S.typeTel)} value={content.phone} />}
                {content.email && <Row label={pick(locale, S.email)} value={content.email} />}
                {content.url && <Row label={pick(locale, S.typeUrl)} value={content.url} />}
              </>
            )}
            {content.type === "geo" && (
              <Row label={pick(locale, S.typeGeo)} value={`${content.lat}, ${content.lon}`} />
            )}
            {content.type === "mailto" && (
              <>
                <Row label={pick(locale, S.to)} value={content.to} />
                {content.subject && <Row label={pick(locale, S.subject)} value={content.subject} />}
                {content.body && <Row label={pick(locale, S.body)} value={content.body} />}
              </>
            )}
            {content.type === "tel" && <Row label={pick(locale, S.typeTel)} value={content.number} />}
            {content.type === "sms" && (
              <>
                <Row label={pick(locale, S.to)} value={content.number} />
                {content.message && <Row label={pick(locale, S.message)} value={content.message} />}
              </>
            )}
            {content.type === "text" && <p className="mono break-all text-[15px] leading-6">{content.text}</p>}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <CopyButton value={raw} />
            {content.type === "url" && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                <Icon name="link" size={14} />
                {pick(locale, S.openLink)}
              </a>
            )}
            {content.type === "tel" && (
              <a
                href={`tel:${content.number}`}
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                {pick(locale, S.call)}
              </a>
            )}
            {content.type === "mailto" && (
              <a
                href={raw}
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                {pick(locale, S.writeEmail)}
              </a>
            )}
            {content.type === "geo" && (
              <a
                href={`https://www.openstreetmap.org/?mlat=${content.lat}&mlon=${content.lon}#map=16/${content.lat}/${content.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                {pick(locale, S.openMap)}
              </a>
            )}
            {content.type === "vcard" && (
              <button
                type="button"
                onClick={() => downloadVcf(raw, content.fullName)}
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                {pick(locale, S.saveContact)}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.consent)}</Note>
      </div>
    </ToolPanel>
  );
}
