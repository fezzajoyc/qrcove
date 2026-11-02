"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { Locale } from "@/lib/site";
import { CopyButton, downloadBlob } from "@/components/client-ui";

/** Pick a string from an inline per-locale record (engine-local UI strings). */
export function pick(locale: Locale, rec: Record<string, string>): string {
  return rec[locale] ?? rec.en;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[13px] font-medium text-[var(--color-sub)]">{label}</span>
      {children}
    </div>
  );
}

export function Sel({
  value,
  onChange,
  children,
  aria,
}: {
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
  aria: string;
}) {
  return (
    <select className="field" value={value} onChange={(e) => onChange(e.target.value)} aria-label={aria}>
      {children}
    </select>
  );
}

export function Tabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            value === o.id
              ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]"
              : "border hairline text-[var(--color-sub)] hover:bg-[var(--color-surface)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-[var(--color-surface)] px-4 py-3 text-[13px] leading-5 text-[var(--color-sub)]">
      {children}
    </p>
  );
}

export type QrEcc = "L" | "M" | "Q" | "H";
export type QrStatus = "empty" | "error" | "ok";

export type QrStyleOptions = {
  size: number;
  margin: number;
  ecc: QrEcc;
  dark: string;
  light: string;
};

export function qrOptions(o: QrStyleOptions) {
  return {
    width: o.size,
    margin: o.margin,
    errorCorrectionLevel: o.ecc,
    color: { dark: o.dark, light: o.light },
  };
}

/**
 * Live QR preview. The `qrcode` package is imported dynamically inside the
 * effect, so it never lands in the initial bundle. Status changes are
 * reported through a ref-held callback to avoid effect loops.
 */
export function QrCanvas({
  payload,
  options,
  canvasRef,
  onStatus,
}: {
  payload: string;
  options: QrStyleOptions;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  onStatus?: (s: QrStatus) => void;
}) {
  const innerRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef ?? innerRef;
  const statusRef = useRef(onStatus);
  statusRef.current = onStatus;

  useEffect(() => {
    let alive = true;
    (async () => {
      const canvas = ref.current;
      if (!canvas) return;
      if (!payload) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        if (alive) statusRef.current?.("empty");
        return;
      }
      try {
        const QR = (await import("qrcode")).default;
        await QR.toCanvas(canvas, payload, qrOptions(options));
        if (alive) statusRef.current?.("ok");
      } catch {
        // payload too long for a QR symbol at this ECC level, or bad options
        if (alive) statusRef.current?.("error");
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, options.size, options.margin, options.ecc, options.dark, options.light]);

  return <canvas ref={ref} width={options.size} height={options.size} aria-label="QR code preview" />;
}

/** PNG straight off the live canvas; SVG regenerated from the payload. */
export async function downloadQrPng(canvas: HTMLCanvasElement | null, filename: string) {
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, filename);
  }, "image/png");
}

export async function downloadQrSvg(payload: string, options: QrStyleOptions, filename: string) {
  const QR = (await import("qrcode")).default;
  const svg = await QR.toString(payload, { type: "svg", ...qrOptions(options) });
  downloadBlob(new Blob([svg], { type: "image/svg+xml" }), filename);
}

export function QrDownloadButtons({
  canvasRef,
  payload,
  options,
  disabled,
  labels,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  payload: string;
  options: QrStyleOptions;
  disabled?: boolean;
  labels: { png: string; svg: string };
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => void downloadQrPng(canvasRef.current, "qrcove-qr.png")}
        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity disabled:opacity-40"
      >
        {labels.png} PNG
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => void downloadQrSvg(payload, options, "qrcove-qr.svg")}
        className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
      >
        {labels.svg} SVG
      </button>
    </div>
  );
}

/** The exact string encoded in the code — honesty box, copyable. */
export function PayloadBox({ payload, label }: { payload: string; label: string }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded || payload.length <= 120 ? payload : `${payload.slice(0, 120)}…`;
  return (
    <div className="rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
          {label}
        </span>
        <CopyButton value={payload} />
      </div>
      <p className="mono mt-1.5 whitespace-pre-wrap break-all text-[12.5px] leading-5 text-[var(--color-ink)]">
        {shown}
      </p>
      {payload.length > 120 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-[12px] font-medium text-[var(--color-accent-strong)]"
        >
          {expanded ? "−" : "+"}
        </button>
      )}
    </div>
  );
}
