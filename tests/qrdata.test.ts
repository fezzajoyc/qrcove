import { describe, expect, it } from "vitest";
import QRCode from "qrcode";
import jsQR from "jsqr";
import {
  buildWifiString, parseWifiString, escapeWifiValue, unescapeWifiValue,
  buildVCard, parseVCardString, escapeVCardValue,
  buildMailto, parseMailtoString,
  buildSmsString, parseSmsString,
  buildGeoString, parseGeoString,
  detectQrContentType, QR_BYTE_CAPACITY, QR_ECC_LEVELS,
} from "@/tools/_lib/qrdata";

/* ------------------------------------------------------------------ */
/* WiFi (WIFI: URI) — hand-computed against the ZXing standard         */
/* ------------------------------------------------------------------ */

describe("buildWifiString", () => {
  it("builds the standard WPA form WIFI:T:WPA;S:ssid;P:pass;;", () => {
    expect(buildWifiString({ ssid: "HomeNet", password: "pass123", encryption: "WPA" })).toBe(
      "WIFI:T:WPA;S:HomeNet;P:pass123;;",
    );
  });

  it("builds the WEP form with the password", () => {
    expect(buildWifiString({ ssid: "old-net", password: "abcde", encryption: "WEP" })).toBe(
      "WIFI:T:WEP;S:old-net;P:abcde;;",
    );
  });

  it("omits the P field entirely for nopass, even if a password was typed", () => {
    expect(buildWifiString({ ssid: "Cafe", encryption: "nopass" })).toBe("WIFI:T:nopass;S:Cafe;;");
    expect(buildWifiString({ ssid: "Cafe", password: "ignored", encryption: "nopass" })).toBe(
      "WIFI:T:nopass;S:Cafe;;",
    );
  });

  it("appends H:true for hidden networks", () => {
    expect(buildWifiString({ ssid: "ghost", encryption: "nopass", hidden: true })).toBe(
      "WIFI:T:nopass;S:ghost;H:true;;",
    );
    expect(buildWifiString({ ssid: "ghost", password: "p", encryption: "WPA", hidden: true })).toBe(
      "WIFI:T:WPA;S:ghost;P:p;H:true;;",
    );
  });

  it("escapes ; , : \" and \\ inside field values", () => {
    expect(escapeWifiValue('a;b,c:"d\\e')).toBe('a\\;b\\,c\\:\\"d\\\\e');
    expect(buildWifiString({ ssid: 'a;b,c:"d\\e', password: "x", encryption: "WPA" })).toBe(
      'WIFI:T:WPA;S:a\\;b\\,c\\:\\"d\\\\e;P:x;;',
    );
  });

  it("trims the ssid and returns '' for empty input instead of a broken payload", () => {
    expect(buildWifiString({ ssid: "", encryption: "WPA" })).toBe("");
    expect(buildWifiString({ ssid: "   ", password: "p", encryption: "WPA" })).toBe("");
  });

  it("treats any unknown encryption value as nopass", () => {
    expect(buildWifiString({ ssid: "n", encryption: "WPA3" as never })).toBe("WIFI:T:nopass;S:n;;");
  });
});

describe("parseWifiString", () => {
  it("parses the standard WPA payload back into fields", () => {
    expect(parseWifiString("WIFI:T:WPA;S:HomeNet;P:pass123;;")).toEqual({
      ssid: "HomeNet", password: "pass123", encryption: "WPA", hidden: false,
    });
  });

  it("parses hidden networks", () => {
    expect(parseWifiString("WIFI:T:nopass;S:ghost;H:true;;")).toEqual({
      ssid: "ghost", password: undefined, encryption: "nopass", hidden: true,
    });
  });

  it("roundtrips escaped special characters through build → parse", () => {
    const ssid = 'a;b,c:"d\\e';
    const password = "p\\;a,\"ss,:word";
    const built = buildWifiString({ ssid, password, encryption: "WPA", hidden: true });
    expect(parseWifiString(built)).toEqual({
      ssid, password, encryption: "WPA", hidden: true,
    });
  });

  it("returns null for malformed or non-WIFI input", () => {
    expect(parseWifiString("not wifi")).toBeNull();
    expect(parseWifiString("WIFI:")).toBeNull(); // no S field
    expect(parseWifiString("WIFI:T:WPA;;")).toBeNull(); // no S field
  });
});

describe("unescapeWifiValue", () => {
  it("is the exact inverse of escapeWifiValue", () => {
    for (const raw of ["plain", "a;b", "c,d", "e:f", 'g"h', "i\\j", "", "\\;", ":,", '\\\\"']) {
      expect(unescapeWifiValue(escapeWifiValue(raw))).toBe(raw);
    }
  });
});

/* ------------------------------------------------------------------ */
/* vCard 3.0                                                           */
/* ------------------------------------------------------------------ */

describe("buildVCard", () => {
  it("builds a complete card with every field, in order", () => {
    expect(
      buildVCard({
        firstName: "Ada", lastName: "Lovelace",
        org: "Analytical Engines", title: "Mathematician",
        phone: "+44 20 7946 0958", email: "ada@example.com", url: "https://example.com",
        city: "London", country: "UK",
      }),
    ).toBe(
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Lovelace;Ada;;;",
        "FN:Ada Lovelace",
        "ORG:Analytical Engines",
        "TITLE:Mathematician",
        "TEL;TYPE=CELL:+44 20 7946 0958",
        "EMAIL:ada@example.com",
        "URL:https://example.com",
        "ADR;TYPE=HOME:;;;London;;;UK",
        "END:VCARD",
      ].join("\n"),
    );
  });

  it("emits only the fields that were provided", () => {
    expect(buildVCard({ firstName: "Bo" })).toBe(
      "BEGIN:VCARD\nVERSION:3.0\nN:;Bo;;;\nFN:Bo\nEND:VCARD",
    );
  });

  it("falls back to the org for FN when there is no personal name", () => {
    const card = buildVCard({ org: "Acme Inc" });
    expect(card).toContain("FN:Acme Inc");
    expect(card).toContain("ORG:Acme Inc");
  });

  it("returns '' when nothing identifies the contact", () => {
    expect(buildVCard({})).toBe("");
    expect(buildVCard({ title: "CEO", phone: "1" })).toBe("");
    expect(buildVCard({ firstName: "  ", lastName: " " })).toBe("");
  });

  it("escapes newlines in the address as literal \\n (RFC 2426)", () => {
    const card = buildVCard({ firstName: "A", street: "12 Main St\nApt 4", city: "Springfield" });
    expect(card).toContain("ADR;TYPE=HOME:;;12 Main St\\nApt 4;Springfield;;;");
  });

  it("escapes commas and semicolons in values so N/ADR components stay intact", () => {
    expect(escapeVCardValue("A;B, C\\D")).toBe("A\\;B\\, C\\\\D");
    expect(buildVCard({ lastName: "van der;Berg", org: "A,B" })).toContain("N:van der\\;Berg;;;;");
    expect(buildVCard({ firstName: "A", org: "A,B" })).toContain("ORG:A\\,B");
  });

  it("handles CJK names and keeps a long ≥10⁴-char field from crashing", () => {
    expect(buildVCard({ firstName: "太郎", lastName: "山田" })).toContain("N:山田;太郎;;;");
    expect(buildVCard({ firstName: "太郎", lastName: "山田" })).toContain("FN:太郎 山田");
    const huge = "x".repeat(10_000);
    expect(buildVCard({ firstName: huge })).toContain(`FN:${huge}`);
  });
});

describe("parseVCardString", () => {
  it("reads back the Ada card fields", () => {
    const built = buildVCard({
      firstName: "Ada", lastName: "Lovelace", org: "Analytical Engines",
      phone: "+44 20 7946 0958", email: "ada@example.com", url: "https://example.com",
      city: "London",
    });
    expect(parseVCardString(built)).toEqual({
      fullName: "Ada Lovelace", org: "Analytical Engines", title: undefined,
      phone: "+44 20 7946 0958", email: "ada@example.com", url: "https://example.com",
      address: ";;;London;;;",
    });
  });

  it("falls back to N components when FN is missing", () => {
    const card = "BEGIN:VCARD\nVERSION:3.0\nN:Doe;Jane;;;\nEND:VCARD";
    expect(parseVCardString(card)?.fullName).toBe("Jane Doe");
  });

  it("returns null for non-vCard text", () => {
    expect(parseVCardString("hello")).toBeNull();
    expect(parseVCardString("BEGIN:VCALENDAR")).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* mailto / SMSTO / geo                                                */
/* ------------------------------------------------------------------ */

describe("buildMailto", () => {
  it("encodes subject and body with percent-encoding in that order", () => {
    expect(buildMailto({ to: "hi@example.com", subject: "Hello there", body: "Line one" })).toBe(
      "mailto:hi@example.com?subject=Hello%20there&body=Line%20one",
    );
  });

  it("omits empty subject/body params", () => {
    expect(buildMailto({ to: "hi@example.com" })).toBe("mailto:hi@example.com");
    expect(buildMailto({ to: "hi@example.com", subject: "  ", body: "" })).toBe("mailto:hi@example.com");
  });

  it("percent-encodes Unicode subjects (UTF-8)", () => {
    expect(buildMailto({ to: "a@b.c", subject: "你好" })).toBe("mailto:a@b.c?subject=%E4%BD%A0%E5%A5%BD");
  });

  it("returns '' for empty or whitespace-containing addresses", () => {
    expect(buildMailto({ to: "" })).toBe("");
    expect(buildMailto({ to: "hi example.com" })).toBe("");
  });

  it("roundtrips through parseMailtoString", () => {
    const built = buildMailto({ to: "hi@example.com", subject: "S;ub?ject", body: "b&d=c" });
    expect(parseMailtoString(built)).toEqual({
      to: "hi@example.com", subject: "S;ub?ject", body: "b&d=c",
    });
  });
});

describe("buildSmsString", () => {
  it("builds SMSTO:number:message", () => {
    expect(buildSmsString({ number: "+15551234567", message: "Hi there" })).toBe("SMSTO:+15551234567:Hi there");
  });

  it("builds SMSTO:number without a trailing colon when there is no message", () => {
    expect(buildSmsString({ number: "+15551234567" })).toBe("SMSTO:+15551234567");
  });

  it("returns '' for empty numbers or numbers containing spaces", () => {
    expect(buildSmsString({ number: "", message: "x" })).toBe("");
    expect(buildSmsString({ number: "1555 123" })).toBe("");
  });

  it("parses back with and without a message", () => {
    expect(parseSmsString("SMSTO:+15551234567:Hi there")).toEqual({ number: "+15551234567", message: "Hi there" });
    expect(parseSmsString("SMSTO:+15551234567")).toEqual({ number: "+15551234567", message: undefined });
    expect(parseSmsString("tel:+1")).toBeNull();
  });
});

describe("buildGeoString", () => {
  it("formats geo:lat,lon from numbers or numeric strings", () => {
    expect(buildGeoString({ lat: 48.8584, lon: 2.2945 })).toBe("geo:48.8584,2.2945");
    expect(buildGeoString({ lat: "48.8584", lon: "2.2945" })).toBe("geo:48.8584,2.2945");
    expect(buildGeoString({ lat: -33.8568, lon: 151.2153 })).toBe("geo:-33.8568,151.2153");
  });

  it("accepts the closed bounds -90/90 and -180/180", () => {
    expect(buildGeoString({ lat: -90, lon: 180 })).toBe("geo:-90,180");
    expect(buildGeoString({ lat: 90, lon: -180 })).toBe("geo:90,-180");
  });

  it("rejects out-of-range and non-numeric coordinates with ''", () => {
    expect(buildGeoString({ lat: 90.000001, lon: 0 })).toBe("");
    expect(buildGeoString({ lat: 0, lon: -180.5 })).toBe("");
    expect(buildGeoString({ lat: "abc", lon: 0 })).toBe("");
    expect(buildGeoString({ lat: Number.NaN, lon: 0 })).toBe("");
  });

  it("parses geo: payloads, ignoring extra params", () => {
    expect(parseGeoString("geo:48.8584,2.2945")).toEqual({ lat: 48.8584, lon: 2.2945 });
    expect(parseGeoString("geo:-33.8568,151.2153?q=crs")).toEqual({ lat: -33.8568, lon: 151.2153 });
    expect(parseGeoString("geo:notnum,1")).toBeNull();
    expect(parseGeoString("hello")).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* detectQrContentType                                                 */
/* ------------------------------------------------------------------ */

describe("detectQrContentType", () => {
  it("detects https and http URLs and flags insecure ones", () => {
    expect(detectQrContentType("https://example.com/path?x=1")).toEqual({
      type: "url", url: "https://example.com/path?x=1", secure: true,
    });
    expect(detectQrContentType("http://example.com")).toEqual({
      type: "url", url: "http://example.com", secure: false,
    });
  });

  it("detects WiFi payloads with parsed fields", () => {
    const c = detectQrContentType("WIFI:T:WPA;S:HomeNet;P:pass123;;");
    expect(c).toEqual({
      type: "wifi", ssid: "HomeNet", password: "pass123", encryption: "WPA", hidden: false,
    });
  });

  it("detects vCards and reads the contact name", () => {
    const c = detectQrContentType(buildVCard({ firstName: "Ada", lastName: "Lovelace" }));
    expect(c.type).toBe("vcard");
    if (c.type === "vcard") expect(c.fullName).toBe("Ada Lovelace");
  });

  it("detects geo, mailto, tel and sms payloads", () => {
    expect(detectQrContentType("geo:48.8584,2.2945")).toEqual({ type: "geo", lat: 48.8584, lon: 2.2945 });
    expect(detectQrContentType("mailto:a@b.c?subject=Hi")).toEqual({
      type: "mailto", to: "a@b.c", subject: "Hi", body: undefined,
    });
    expect(detectQrContentType("tel:+15551234567")).toEqual({ type: "tel", number: "+15551234567" });
    expect(detectQrContentType("SMSTO:+15551234567:Hello")).toEqual({
      type: "sms", number: "+15551234567", message: "Hello",
    });
  });

  it("falls back to plain text for everything else, including empty and malformed prefixes", () => {
    expect(detectQrContentType("hello world")).toEqual({ type: "text", text: "hello world" });
    expect(detectQrContentType("WIFI:garbage")).toEqual({ type: "text", text: "WIFI:garbage" });
    expect(detectQrContentType("geo:xx,yy")).toEqual({ type: "text", text: "geo:xx,yy" });
    expect(detectQrContentType("")).toEqual({ type: "text", text: "" });
    // CJK and emoji survive as text
    expect(detectQrContentType("こんにちは 🌏")).toEqual({ type: "text", text: "こんにちは 🌏" });
    // scheme-less domains are NOT treated as URLs (no open-link on untrusted text)
    expect(detectQrContentType("example.com").type).toBe("text");
  });
});

/* ------------------------------------------------------------------ */
/* Support matrix constants                                            */
/* ------------------------------------------------------------------ */

describe("QR support matrix constants", () => {
  it("matches the ISO/IEC 18004 byte-mode capacity table at the anchor points", () => {
    const v1 = QR_BYTE_CAPACITY.find((r) => r.version === 1)!;
    const v40 = QR_BYTE_CAPACITY.find((r) => r.version === 40)!;
    expect(v1).toEqual({ version: 1, L: 17, M: 14, Q: 11, H: 7 });
    expect(v40).toEqual({ version: 40, L: 2953, M: 2331, Q: 1663, H: 1273 });
  });

  it("capacity shrinks as error correction rises, and lists the four ECC levels", () => {
    for (const row of QR_BYTE_CAPACITY) {
      expect(row.L).toBeGreaterThan(row.M);
      expect(row.M).toBeGreaterThan(row.Q);
      expect(row.Q).toBeGreaterThan(row.H);
    }
    expect(QR_ECC_LEVELS.map((e) => e.level)).toEqual(["L", "M", "Q", "H"]);
    expect(QR_ECC_LEVELS.map((e) => e.recoveryPct)).toEqual([7, 15, 25, 30]);
  });
});

/* ------------------------------------------------------------------ */
/* End-to-end: qrcode encode → jsqr decode → detect (independent check)*/
/* ------------------------------------------------------------------ */

const SCALE = 4;
const QUIET = 4;

function decodeRgba(text: string): string {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const dim = (n + QUIET * 2) * SCALE;
  const data = new Uint8ClampedArray(dim * dim * 4).fill(255);
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!qr.modules.get(row, col)) continue;
      for (let dy = 0; dy < SCALE; dy++) {
        for (let dx = 0; dx < SCALE; dx++) {
          const idx = (((row + QUIET) * SCALE + dy) * dim + (col + QUIET) * SCALE + dx) * 4;
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          data[idx + 3] = 255;
        }
      }
    }
  }
  const found = jsQR(data, dim, dim);
  expect(found, `jsQR failed to decode: ${JSON.stringify(text.slice(0, 40))}`).not.toBeNull();
  return found!.data;
}

describe("built payloads survive a real encode → camera-like decode roundtrip", () => {
  it("a WiFi payload with special characters roundtrips and re-detects as wifi", () => {
    const opts = { ssid: 'Cafe;"\\', password: "p@;s,w:ord", encryption: "WPA" as const, hidden: true };
    const built = buildWifiString(opts);
    const decoded = decodeRgba(built);
    expect(decoded).toBe(built);
    expect(parseWifiString(decoded)).toEqual({ ...opts, hidden: true });
    expect(detectQrContentType(decoded).type).toBe("wifi");
  });

  it("a vCard with CJK and escaped commas roundtrips and re-detects as vcard", () => {
    const built = buildVCard({
      firstName: "太郎", lastName: "山田", org: "Acme, Inc",
      phone: "+81 3-1234-5678", email: "taro@example.jp",
    });
    const decoded = decodeRgba(built);
    expect(decoded).toBe(built);
    expect(parseVCardString(decoded)?.fullName).toBe("太郎 山田");
    expect(detectQrContentType(decoded).type).toBe("vcard");
  });

  it("a Unicode mailto roundtrips and re-detects as mailto", () => {
    const built = buildMailto({ to: "hi@example.com", subject: "こんにちは", body: "Merci — ça marche ✓" });
    const decoded = decodeRgba(built);
    expect(decoded).toBe(built);
    expect(detectQrContentType(decoded)).toEqual({
      type: "mailto", to: "hi@example.com", subject: "こんにちは", body: "Merci — ça marche ✓",
    });
  });

  it("a URL and a plain-text payload roundtrip byte-identical", () => {
    expect(decodeRgba("https://qrcove.app/en/tools/qr-scanner")).toBe(
      "https://qrcove.app/en/tools/qr-scanner",
    );
    expect(decodeRgba("Bonjour — café 東京 🍺")).toBe("Bonjour — café 東京 🍺");
  });
});
