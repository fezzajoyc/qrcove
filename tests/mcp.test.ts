import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("qrcove MCP server", () => {
  it("exposes exactly the four executable payload tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(
      ["build_vcard_string", "build_wifi_qr_string", "detect_qr_content", "qr_support_matrix"].sort(),
    );
    // image generation is browser-only — the descriptions must say so
    for (const tool of tools) {
      expect(tool.description, tool.name).toMatch(/browser-only|browser/);
    }
    await client.close();
  });

  it("builds the standard Wi-Fi payload with escaping and hidden flag", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "build_wifi_qr_string",
      arguments: { ssid: "HomeNet", password: "pass123", encryption: "WPA", hidden: false },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.payload).toBe("WIFI:T:WPA;S:HomeNet;P:pass123;;");

    const esc = await client.callTool({
      name: "build_wifi_qr_string",
      arguments: { ssid: 'a;b,c:"d\\e', password: "p;:,'", encryption: "WPA" },
    });
    const parsedEsc = JSON.parse((esc.content as any)[0].text);
    // hand-computed escaping per the ZXing convention (\ ; , : " and \\ — note the comma in the password)
    expect(parsedEsc.payload).toBe('WIFI:T:WPA;S:a\\;b\\,c\\:\\"d\\\\e;P:p\\;\\:\\,\';;');

    const hidden = await client.callTool({
      name: "build_wifi_qr_string",
      arguments: { ssid: "ghost", encryption: "nopass", hidden: true },
    });
    expect(JSON.parse((hidden.content as any)[0].text).payload).toBe("WIFI:T:nopass;S:ghost;H:true;;");
    await client.close();
  });

  it("rejects an empty ssid at the logic layer (isError), matching the site tool", async () => {
    const client = await connect();
    const bad = await client.callTool({
      name: "build_wifi_qr_string",
      arguments: { ssid: "", encryption: "nopass" },
    });
    expect((bad as any).isError).toBe(true);
    expect((bad.content as any)[0].text).toContain("ssid must not be empty");
    // schema layer: missing required ssid → zod violation surfaces as isError too
    const schemaBad = await client.callTool({ name: "build_wifi_qr_string", arguments: {} });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    await client.close();
  });

  it("builds a vCard 3.0 string identical to the tested pure builder", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "build_vcard_string",
      arguments: { first_name: "Ada", last_name: "Lovelace", org: "Analytical Engines", phone: "+44 20 7946 0958" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.payload).toBe(
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Lovelace;Ada;;;",
        "FN:Ada Lovelace",
        "ORG:Analytical Engines",
        "TEL;TYPE=CELL:+44 20 7946 0958",
        "END:VCARD",
      ].join("\n"),
    );
    await client.close();
  });

  it("errors on an empty vCard instead of returning an unusable payload", async () => {
    const client = await connect();
    const bad = await client.callTool({ name: "build_vcard_string", arguments: {} });
    expect((bad as any).isError).toBe(true);
    expect((bad.content as any)[0].text).toContain("empty card");
    await client.close();
  });

  it("classifies decoded QR content across every supported type", async () => {
    const client = await connect();
    const url = await client.callTool({ name: "detect_qr_content", arguments: { text: "https://qrcove.app/en/tools/qr-scanner" } });
    expect(JSON.parse((url.content as any)[0].text)).toEqual({
      type: "url", url: "https://qrcove.app/en/tools/qr-scanner", secure: true,
    });
    const wifi = await client.callTool({ name: "detect_qr_content", arguments: { text: "WIFI:T:WPA;S:HomeNet;P:pass123;;" } });
    const parsedWifi = JSON.parse((wifi.content as any)[0].text);
    expect(parsedWifi.type).toBe("wifi");
    expect(parsedWifi.ssid).toBe("HomeNet");
    expect(parsedWifi.password).toBe("pass123");
    const vcard = await client.callTool({ name: "detect_qr_content", arguments: { text: "BEGIN:VCARD\nVERSION:3.0\nN:Doe;Jane;;;\nFN:Jane Doe\nEND:VCARD" } });
    const parsedCard = JSON.parse((vcard.content as any)[0].text);
    expect(parsedCard.type).toBe("vcard");
    expect(parsedCard.fullName).toBe("Jane Doe");
    const geo = await client.callTool({ name: "detect_qr_content", arguments: { text: "geo:48.8584,2.2945" } });
    expect(JSON.parse((geo.content as any)[0].text)).toEqual({ type: "geo", lat: 48.8584, lon: 2.2945 });
    const mail = await client.callTool({ name: "detect_qr_content", arguments: { text: "mailto:a@b.c?subject=Hi&body=Line%20one" } });
    expect(JSON.parse((mail.content as any)[0].text)).toEqual({
      type: "mailto", to: "a@b.c", subject: "Hi", body: "Line one",
    });
    const plain = await client.callTool({ name: "detect_qr_content", arguments: { text: "just some text" } });
    expect(JSON.parse((plain.content as any)[0].text)).toEqual({ type: "text", text: "just some text" });
    await client.close();
  });

  it("returns the ISO capacity matrix at the anchor points", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "qr_support_matrix", arguments: {} });
    const parsed = JSON.parse((r.content as any)[0].text);
    const v1 = parsed.byte_mode_capacity_chars.find((x: any) => x.version === 1);
    const v40 = parsed.byte_mode_capacity_chars.find((x: any) => x.version === 40);
    expect(v1).toEqual({ version: 1, L: 17, M: 14, Q: 11, H: 7 });
    expect(v40).toEqual({ version: 40, L: 2953, M: 2331, Q: 1663, H: 1273 });
    expect(parsed.ecc_levels.map((e: any) => e.level)).toEqual(["L", "M", "Q", "H"]);
    await client.close();
  });
});
