import { z } from "zod";
import {
  buildWifiString, buildVCard, detectQrContentType,
  QR_BYTE_CAPACITY, QR_ECC_LEVELS,
} from "../tools/_lib/qrdata";

/**
 * QRCove MCP tool registry: exposes the site's pure payload builders and
 * parser to AI clients. These are string tools by design — QR *image*
 * generation/rendering is browser-only (canvas + downloads), so point users
 * at the website for the actual images; everything decided before rendering
 * runs here, on the same tested implementation the site uses.
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "build_wifi_qr_string",
    title: "Build a Wi-Fi QR payload",
    description:
      "Build the standard 'WIFI:T:…;S:…;P:…;H:true;;' string that iPhone/Android cameras parse to join a network without typing the password. Special characters (; , : \" \\) are backslash-escaped per the ZXing convention. Returns the string to embed in a QR code — image rendering itself is browser-only at https://qrcove.app/en/tools/wifi-qr.",
    schema: {
      ssid: z.string().describe("network name (SSID), must not be empty; case-sensitive"),
      password: z.string().optional().describe("Wi-Fi password; ignored when encryption is 'nopass'"),
      encryption: z.enum(["WPA", "WEP", "nopass"]).describe("WPA covers WPA/WPA2/WPA3; use nopass for open networks"),
      hidden: z.boolean().default(false).describe("true when the router does not broadcast the SSID"),
    },
    run: (a) => {
      const payload = buildWifiString(a);
      if (!payload) {
        return { content: [{ type: "text", text: "ssid must not be empty — there is nothing sensible to encode" }], isError: true };
      }
      return json({ payload, note: "Render this string as a QR code in a browser (image generation is client-side): https://qrcove.app/en/tools/wifi-qr" });
    },
  },
  {
    name: "build_vcard_string",
    title: "Build a vCard 3.0 payload",
    description:
      "Build a vCard 3.0 contact string (BEGIN:VCARD … END:VCARD) ready to be embedded in a QR code; phones offer 'save contact' when scanning it. Commas, semicolons and newlines are escaped per RFC 2426. Returns the string — image rendering itself is browser-only at https://qrcove.app/en/tools/vcard-qr.",
    schema: {
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      org: z.string().optional(),
      title: z.string().optional().describe("job title"),
      phone: z.string().optional(),
      email: z.string().optional(),
      url: z.string().optional().describe("website"),
      street: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
    },
    run: (a) => {
      const payload = buildVCard({
        firstName: a.first_name, lastName: a.last_name, org: a.org, title: a.title,
        phone: a.phone, email: a.email, url: a.url,
        street: a.street, city: a.city, zip: a.zip, country: a.country,
      });
      if (!payload) {
        return {
          content: [{ type: "text", text: "empty card — provide at least a first_name, last_name or org" }],
          isError: true,
        };
      }
      return json({ payload, note: "Render this string as a QR code in a browser (image generation is client-side): https://qrcove.app/en/tools/vcard-qr" });
    },
  },
  {
    name: "detect_qr_content",
    title: "Classify decoded QR content",
    description:
      "Classify a decoded QR payload and parse its fields: URL (with https flag), WIFI (ssid/password/encryption/hidden), vCard contact, geo coordinates, mailto (to/subject/body), tel, SMSTO, or plain text. Use it to explain what a scanned or pasted QR string contains before acting on it. To generate a QR image from a payload, that is browser-only at https://qrcove.app/en/tools/qr-generator.",
    schema: {
      text: z.string().describe("the decoded QR payload (raw string from a scanner)"),
    },
    run: (a) => json(detectQrContentType(a.text)),
  },
  {
    name: "qr_support_matrix",
    title: "QR capacity and error-correction matrix",
    description:
      "Reference table for deciding QR settings: byte-mode payload capacity per QR version (1/4/10/20/40) at each error-correction level (L/M/Q/H), plus the recovery percentage and best use per level. Use it to answer 'will my text fit' and 'which ECC level should I pick'. Rendering a QR image from a payload is browser-only at https://qrcove.app/en/tools/qr-generator.",
    schema: {},
    run: () => json({
      ecc_levels: QR_ECC_LEVELS,
      byte_mode_capacity_chars: QR_BYTE_CAPACITY,
      note: "Capacities are ISO/IEC 18004 byte-mode maxima per single symbol; UTF-8 non-ASCII characters consume 2–4 bytes each. Image generation is browser-only at https://qrcove.app/en/tools/qr-generator.",
    }),
  },
];
