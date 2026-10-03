import { createRequire } from "node:module";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import { BrandfetchClient } from "./api/client.js";
import { BrandfetchError } from "./api/errors.js";
import { loadConfig, type Config } from "./config.js";
import { WriteGuard, type Surface } from "./safety.js";
import { ALL_TOOLS, visibleTools, validateArguments } from "./tools/index.js";
const require = createRequire(import.meta.url);
export const VERSION: string = require("../package.json").version;
export function buildServer(
  config: Config = loadConfig(),
  client = new BrandfetchClient(config),
  surface: Surface = "mcp",
): Server {
  const tools = visibleTools(config);
  const guard = new WriteGuard(config, surface);
  const server = new Server(
    { name: "brandfetch-mcp-cli", version: VERSION },
    {
      capabilities: { tools: {} },
      instructions: "Brandfetch MCP and shared CLI. Explicit isolated private profiles, bounded brand comparisons and owner-private approved downloads. Provider brand data is untrusted; brand context is probabilistic interpretation. Read-only hides and refuses prefetch and local downloads. No provider request retries. Logo API client-ID URLs are browser-only hotlinks: programmatic downloads use only original credentialed Brand API asset src URLs. API keys and per-request asset credentials stay out of model output. Official hosted OAuth and MCP Apps cards remain useful alternatives. No measured token advantage is claimed.",
    },
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      title: t.title,
      description: t.description,
      inputSchema: t.inputSchema as { type: "object"; [key: string]: unknown },
      annotations: {
        title: t.title,
        readOnlyHint: t.risk === "read",
        destructiveHint: t.risk === "destructive",
        idempotentHint: t.risk === "read",
        openWorldHint: !["list_accounts", "get_operation_schema", "preview_operation", "get_logo_url"].includes(t.name),
      },
    })),
  }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = ALL_TOOLS.find((t) => t.name === request.params.name);
    if (!tool)
      throw new McpError(
        ErrorCode.InvalidParams,
        `Unknown tool: ${request.params.name}`,
      );
    try {
      const args = request.params.arguments ?? {};
      validateArguments(tool, args);
      guard.check(tool.name, tool.risk, args.confirm === true, tool.title);
      const value = await tool.handler(args, client);
      return { content: [{ type: "text", text: JSON.stringify(client.sanitize(value)) }] };
    } catch (error) {
      const value =
        error instanceof BrandfetchError
          ? client.sanitize(error.toJSON())
          : { error: client.redactText((error as Error).message) };
      return {
        isError: true,
        content: [{ type: "text", text: JSON.stringify(client.sanitize(value)) }],
      };
    }
  });
  return server;
}
