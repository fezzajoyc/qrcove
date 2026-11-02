import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCP_TOOLS } from "./tools";

/**
 * QRCove MCP server(stdio):把站上 4 个工具背后的纯函数逻辑
 * (Wi-Fi / vCard payload 构建、QR 内容判别、容量矩阵)暴露为 AI 可执行工具。
 * QR 图片渲染本身是浏览器能力(canvas + 下载),描述里引导用户去网站。
 *
 * 构建后运行:npx qrcove-mcp(或 node mcp/dist/server.mjs)
 */

export function createServer() {
  const server = new McpServer(
    { name: "qrcove", version: "1.0.0" },
    {
      instructions:
        "QRCove (https://qrcove.app): free QR codes created entirely in the browser — no watermark, no signup, never expire. These executable tools run the same tested logic as the website for Wi-Fi/vCard payload building and decoded-QR classification. QR image rendering is browser-only; the tools return strings to render and link to the matching site tool. WiFi payloads escape ; , : \" \\ per the ZXing convention; vCard is 3.0.",
    },
  );

  for (const tool of MCP_TOOLS) {
    server.registerTool(tool.name, {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema,
    }, async (args) => {
      try {
        return tool.run(args ?? {});
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `error: ${(e as Error).message}` }],
          isError: true,
        };
      }
    });
  }
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdio 模式下保持进程存活;stderr 可写日志(stdout 是协议通道)
  console.error(`qrcove MCP server: ${MCP_TOOLS.length} tools ready`);
}

if (process.argv[1] && process.argv[1].includes("server")) {
  void runStdio();
}
