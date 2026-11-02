/**
 * QRCove core: pure string builders/parsers for QR payloads.
 *
 * Everything here is plain string logic — no DOM, no qrcode package — so the
 * browser engines and the MCP server run the exact same tested implementation.
 *
 * Payload formats follow the de-facto QR content standards that phone
 * scanners actually implement (ZXing conventions):
 *   WiFi  → WIFI:T:WPA;S:<ssid>;P:<pass>;H:true;;
 *   vCard → BEGIN:VCARD … END:VCARD (version 3.0)
 *   Email → mailto:<addr>?subject=<…>&body=<…>
 *   SMS   → SMSTO:<number>:<message>
 *   Geo   → geo:<lat>,<lon>
 */

/* ------------------------------------------------------------------ */
/* WiFi (WIFI: URI)                                                    */
/* ------------------------------------------------------------------ */

export type WifiEncryption = "WPA" | "WEP" | "nopass";

export type WifiQrOptions = {
  ssid: string;
  /** Ignored when encryption is "nopass". */
  password?: string;
  encryption: WifiEncryption;
  /** Hidden network → appends the H:true field. */
  hidden?: boolean;
};

/**
 * Escape a value for embedding in a WIFI: URI field.
 * ZXing WiFi parser treats `;`, `,`, `"`, `:` as delimiters and `\` as the
 * escape char, so all five must be backslash-escaped (backslash first).
 */
export function escapeWifiValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/:/g, "\\:")
    .replace(/"/g, '\\"');
}

/** Inverse of escapeWifiValue. */
export function unescapeWifiValue(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "\\" && i + 1 < value.length) {
      out += value[i + 1];
      i++;
    } else {
      out += value[i];
    }
  }
  return out;
}

/**
 * Build the standard WIFI: payload.
 *  - nopass omits the P field entirely (any password is ignored)
 *  - hidden appends H:true
 *  - empty SSID → "" (nothing sensible to encode)
 * Shape: WIFI:T:WPA;S:ssid;P:pass;;  (fields each end with `;`, then `;;`)
 */
export function buildWifiString(opts: WifiQrOptions): string {
  const ssid = opts.ssid.trim();
  if (!ssid) return "";
  const enc = opts.encryption === "WPA" || opts.encryption === "WEP" ? opts.encryption : "nopass";
  let out = `WIFI:T:${enc};S:${escapeWifiValue(ssid)};`;
  if (enc !== "nopass" && opts.password) {
    out += `P:${escapeWifiValue(opts.password)};`;
  }
  if (opts.hidden) {
    out += "H:true;";
  }
  out += ";";
  return out;
}

/** Parse a WIFI: payload back into fields. Returns null when malformed. */
export function parseWifiString(text: string): {
  ssid: string;
  password?: string;
  encryption: WifiEncryption;
  hidden: boolean;
} | null {
  if (!text.startsWith("WIFI:")) return null;
  const body = text.slice(5);
  // Split on unescaped semicolons.
  const parts: string[] = [];
  let cur = "";
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === "\\" && i + 1 < body.length) {
      cur += ch + body[i + 1];
      i++;
    } else if (ch === ";") {
      parts.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur) parts.push(cur);
  let encryption: WifiEncryption = "nopass";
  let ssid = "";
  let password: string | undefined;
  let hidden = false;
  for (const part of parts) {
    const m = /^([TSPH]):([\s\S]*)$/.exec(part);
    if (!m) continue;
    const value = unescapeWifiValue(m[2]);
    if (m[1] === "T" && (value === "WPA" || value === "WEP" || value === "nopass")) encryption = value;
    else if (m[1] === "S") ssid = value;
    else if (m[1] === "P") password = value;
    else if (m[1] === "H") hidden = value === "true" || value === "TRUE" || value === "1";
  }
  if (!ssid) return null;
  return { ssid, password, encryption, hidden };
}

/* ------------------------------------------------------------------ */
/* vCard 3.0                                                           */
/* ------------------------------------------------------------------ */

export type VCardOptions = {
  firstName?: string;
  lastName?: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  /** Free-form address; newline-separated lines become ADR street field. */
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
};

/**
 * Escape a vCard text value: backslash, newline, comma and semicolon.
 * (`\n` for newline per RFC 2426 §4.)
 */
export function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n/g, "\\n")
    .replace(/\r/g, "\\n")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function unescapeVCardValue(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "\\" && i + 1 < value.length) {
      const next = value[i + 1];
      out += next === "n" || next === "N" ? "\n" : next;
      i++;
    } else {
      out += value[i];
    }
  }
  return out;
}

/**
 * Build a vCard 3.0 payload. Only non-empty fields are emitted.
 * Returns "" when there is nothing to identify the contact
 * (no first/last name and no org).
 */
export function buildVCard(opts: VCardOptions): string {
  const first = (opts.firstName ?? "").trim();
  const last = (opts.lastName ?? "").trim();
  const org = (opts.org ?? "").trim();
  if (!first && !last && !org) return "";
  const fn = `${first} ${last}`.trim() || org;
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(last)};${escapeVCardValue(first)};;;`,
    `FN:${escapeVCardValue(fn)}`,
  ];
  if (org) lines.push(`ORG:${escapeVCardValue(org)}`);
  if ((opts.title ?? "").trim()) lines.push(`TITLE:${escapeVCardValue(opts.title!.trim())}`);
  if ((opts.phone ?? "").trim()) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(opts.phone!.trim())}`);
  if ((opts.email ?? "").trim()) lines.push(`EMAIL:${escapeVCardValue(opts.email!.trim())}`);
  if ((opts.url ?? "").trim()) lines.push(`URL:${escapeVCardValue(opts.url!.trim())}`);
  const street = (opts.street ?? "").trim();
  const city = (opts.city ?? "").trim();
  const zip = (opts.zip ?? "").trim();
  const country = (opts.country ?? "").trim();
  if (street || city || zip || country) {
    // ADR components are semicolon-separated: ;;street;city;;zip;country
    lines.push(
      `ADR;TYPE=HOME:;;${escapeVCardValue(street)};${escapeVCardValue(city)};;${escapeVCardValue(zip)};${escapeVCardValue(country)}`,
    );
  }
  lines.push("END:VCARD");
  return lines.join("\n");
}

/** Minimal vCard reader for the scanner's pretty display. Returns null when not a vCard. */
export function parseVCardString(text: string): {
  fullName: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: string;
} | null {
  if (!/BEGIN:VCARD/i.test(text)) return null;
  const lines = text.split(/\r\n|\r|\n/).map((l) => l.trim()).filter(Boolean);
  const get = (prefixes: string[]): string | undefined => {
    for (const line of lines) {
      const upper = line.toUpperCase();
      if (prefixes.some((p) => upper === p || upper.startsWith(p))) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).toUpperCase();
        if (key.startsWith("BEGIN") || key.startsWith("END")) continue;
        const value = line.slice(idx + 1);
        if (value.trim()) return unescapeVCardValue(value).trim();
      }
    }
    return undefined;
  };
  let fullName = get(["FN"]) ?? "";
  if (!fullName) {
    const n = get(["N"]);
    if (n) {
      const [last = "", first = ""] = unescapeVCardValue(n).split(";").map((s) => s.trim());
      fullName = `${first} ${last}`.trim();
    }
  }
  return {
    fullName,
    org: get(["ORG"]),
    title: get(["TITLE"]),
    phone: get(["TEL"]),
    email: get(["EMAIL"]),
    url: get(["URL"]),
    address: get(["ADR"]),
  };
}

/* ------------------------------------------------------------------ */
/* mailto / SMSTO / geo                                                */
/* ------------------------------------------------------------------ */

export type MailtoOptions = { to: string; subject?: string; body?: string };

/** mailto:<addr>?subject=…&body=… — empty subject/body are omitted. */
export function buildMailto(opts: MailtoOptions): string {
  const to = opts.to.trim();
  if (!to || /\s/.test(to)) return "";
  // RFC 6068: the @ separating local part from domain must stay literal.
  const addr = to.split("@").map(encodeURIComponent).join("@");
  const params: string[] = [];
  if ((opts.subject ?? "").trim()) params.push(`subject=${encodeURIComponent(opts.subject!.trim())}`);
  if ((opts.body ?? "").trim()) params.push(`body=${encodeURIComponent(opts.body!.trim())}`);
  return `mailto:${addr}${params.length ? `?${params.join("&")}` : ""}`;
}

export function parseMailtoString(text: string): { to: string; subject?: string; body?: string } | null {
  if (!text.toLowerCase().startsWith("mailto:")) return null;
  const rest = text.slice(7);
  const qIdx = rest.indexOf("?");
  const to = decodeURIComponent(qIdx === -1 ? rest : rest.slice(0, qIdx));
  if (!to) return null;
  const params = qIdx === -1 ? new URLSearchParams() : new URLSearchParams(rest.slice(qIdx + 1));
  const subject = params.get("subject") ?? undefined;
  const body = params.get("body") ?? undefined;
  return { to, subject: subject || undefined, body: body || undefined };
}

export type SmsOptions = { number: string; message?: string };

/** SMSTO:<number>:<message> — the ZXing convention phones open as a draft. */
export function buildSmsString(opts: SmsOptions): string {
  const number = opts.number.trim();
  if (!number || /\s/.test(number)) return "";
  const msg = (opts.message ?? "").trim();
  return msg ? `SMSTO:${number}:${msg}` : `SMSTO:${number}`;
}

export function parseSmsString(text: string): { number: string; message?: string } | null {
  const m = /^(SMSTO|MMSTO|smsto):([^:]+)(?::([\s\S]*))?$/.exec(text.trim());
  if (!m) return null;
  return { number: m[2], message: m[3]?.trim() || undefined };
}

export type GeoOptions = { lat: number | string; lon: number | string };

/** geo:<lat>,<lon> — RFC 5870. Non-finite or out-of-range coordinates → "". */
export function buildGeoString(opts: GeoOptions): string {
  const lat = typeof opts.lat === "number" ? opts.lat : Number(String(opts.lat).trim());
  const lon = typeof opts.lon === "number" ? opts.lon : Number(String(opts.lon).trim());
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "";
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return "";
  return `geo:${lat},${lon}`;
}

export function parseGeoString(text: string): { lat: number; lon: number } | null {
  const m = /^geo:-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?/i.exec(text.trim());
  if (!m) return null;
  const [latRaw, lonRaw] = m[0].slice(4).split(",");
  const lat = Number(latRaw);
  const lon = Number(lonRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
}

/* ------------------------------------------------------------------ */
/* Content-type detection (scanner)                                    */
/* ------------------------------------------------------------------ */

export type QrContent =
  | { type: "url"; url: string; secure: boolean }
  | { type: "wifi"; ssid: string; password?: string; encryption: WifiEncryption; hidden: boolean }
  | { type: "vcard"; fullName: string; org?: string; title?: string; phone?: string; email?: string; url?: string; address?: string }
  | { type: "geo"; lat: number; lon: number }
  | { type: "mailto"; to: string; subject?: string; body?: string }
  | { type: "tel"; number: string }
  | { type: "sms"; number: string; message?: string }
  | { type: "text"; text: string };

const URL_RE = /^https?:\/\/\S+$/i;

/**
 * Detect what a decoded QR payload contains. Pure and ordering-stable:
 * WIFI → vCard → geo → mailto → tel → sms → URL → plain text.
 */
export function detectQrContentType(text: string): QrContent {
  const trimmed = text.trim();
  if (!trimmed) return { type: "text", text: "" };

  if (trimmed.startsWith("WIFI:")) {
    const wifi = parseWifiString(trimmed);
    if (wifi) return { type: "wifi", ...wifi };
    return { type: "text", text };
  }

  if (/BEGIN:VCARD/i.test(trimmed)) {
    const card = parseVCardString(trimmed);
    if (card) return { type: "vcard", ...card };
    return { type: "text", text };
  }

  if (trimmed.toLowerCase().startsWith("geo:")) {
    const geo = parseGeoString(trimmed);
    if (geo) return { type: "geo", ...geo };
    return { type: "text", text };
  }

  if (trimmed.toLowerCase().startsWith("mailto:")) {
    const mail = parseMailtoString(trimmed);
    if (mail) return { type: "mailto", ...mail };
    return { type: "text", text };
  }

  if (trimmed.toLowerCase().startsWith("tel:")) {
    const number = trimmed.slice(4).trim();
    if (number) return { type: "tel", number };
    return { type: "text", text };
  }

  const sms = parseSmsString(trimmed);
  if (sms) return { type: "sms", ...sms };

  if (URL_RE.test(trimmed)) {
    return { type: "url", url: trimmed, secure: trimmed.toLowerCase().startsWith("https://") };
  }

  return { type: "text", text };
}

/* ------------------------------------------------------------------ */
/* Support matrix (MCP: qr_support_matrix)                             */
/* ------------------------------------------------------------------ */

/** Byte-mode payload capacity per QR version and ECC level (ISO/IEC 18004 table 7). */
export const QR_BYTE_CAPACITY: { version: number; L: number; M: number; Q: number; H: number }[] = [
  { version: 1, L: 17, M: 14, Q: 11, H: 7 },
  { version: 4, L: 78, M: 62, Q: 46, H: 34 },
  { version: 10, L: 271, M: 213, Q: 151, H: 119 },
  { version: 20, L: 1081, M: 853, Q: 613, H: 461 },
  { version: 40, L: 2953, M: 2331, Q: 1663, H: 1273 },
];

export const QR_ECC_LEVELS = [
  { level: "L", recoveryPct: 7, bestFor: "clean digital display, maximum payload" },
  { level: "M", recoveryPct: 15, bestFor: "default; good balance for print" },
  { level: "Q", recoveryPct: 25, bestFor: "packaging, fabric, tighter print sizes" },
  { level: "H", recoveryPct: 30, bestFor: "logos overlaid on the code, heavy wear" },
] as const;
