# QRCove

Free QR code creation and reading — 4 tools, 15 locales, all client-side (static Next.js 16). Static QR codes only: the data lives inside the pattern, so codes never expire. No watermark, no signup.

## Tools

- `qr-generator` (featured) — URL / text / Wi-Fi / vCard / email / SMS / phone / geo, colors, size, ECC L–H, margin; PNG + SVG download.
- `wifi-qr` (featured) — dedicated Wi-Fi flow, standard `WIFI:` string with ZXing escaping.
- `vcard-qr` — vCard 3.0 builder + .vcf download.
- `qr-scanner` — image decode via jsqr, content-type detection, camera mode via BarcodeDetector where available.

## Layout

- Pure logic: `tools/_lib/qrdata.ts` (builders, parsers, ISO capacity matrix) — shared by the browser engines and the MCP server.
- Engines: `tools/_engines/*` ("use client", heavy libs via dynamic import only).
- Tests: `tests/qrdata.test.ts` (incl. qrcode→jsqr roundtrips), `tests/mcp.test.ts` (InMemoryTransport), plus registry/overlays/seo suites.
- MCP: `mcp/server.ts` → `npx qrcove-mcp` (`npm run build:mcp`).

## Verify

```bash
npx tsc --noEmit && npm test && npm run build
```
