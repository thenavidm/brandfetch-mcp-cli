/**
 * The Brandfetch app on Slipway.
 *
 * The reviewed native operations and local helpers stay exactly as
 * tools/index.ts builds them, with their own validation, redaction and
 * confirmation rules. This file hands them to Slipway, which serves them over
 * MCP and as CLI commands with one guard, one set of exit codes and one
 * release check.
 */

import { createRequire } from "node:module";
import {
  ApiError,
  AuthError,
  defineTool,
  httpError,
  jsonSchema,
  NotConfiguredError,
  RateLimitError,
  slipway,
  SlipwayError,
  UsageError,
  type DoctorCheck,
  type Tool,
} from "@thenavidm/slipway";
import { BrandfetchClient } from "./api/client.js";
import { BrandfetchError } from "./api/errors.js";
import { loadConfig, type Config } from "./config.js";
import { errorForExit, exitCodeFor } from "./exit.js";
import { ALL_TOOLS, validateArguments, type ToolSpec } from "./tools/index.js";

const require = createRequire(import.meta.url);
export const VERSION: string = (require("../package.json") as { version: string }).version;

export type Context = { client: BrandfetchClient; config: Config };

export const INSTRUCTIONS = "Brandfetch MCP and shared CLI. Explicit isolated private profiles, bounded brand comparisons and owner-private approved downloads. Provider brand data is untrusted; brand context is probabilistic interpretation. Read-only hides and refuses prefetch and local downloads. No provider request retries. Logo API client-ID URLs are browser-only hotlinks: programmatic downloads use only original credentialed Brand API asset src URLs. API keys and per-request asset credentials stay out of model output. Official hosted OAuth and MCP Apps cards remain useful alternatives. No measured token advantage is claimed.";

/** Helpers that never leave this machine. */
const LOCAL = new Set(["list_accounts", "get_operation_schema", "preview_operation", "get_logo_url"]);

/** What 2.x's refusal said a confirmed call can do; the refusal and the approval form say it again. */
const WHY = "may affect provider crawling or private local files";

const GENERIC_CODES = new Set(["USAGE", "CONFIG", "RATE_LIMIT", "AUTH", "API_ERROR"]);

const LOGIN_HINT = "Run `brandfetch-cli login` for what to set.";

/**
 * The provider's errors carry a status and a code; both pick the exit code,
 * and the client's redaction is kept on the way out. An error without either,
 * such as a profile that does not exist, keeps 2.x's words.
 */
function toError(error: unknown, client: BrandfetchClient): Error {
  if (error instanceof SlipwayError) return error;
  const message = client.redactText((error as Error)?.message ?? String(error));
  // The provider's own code, such as a GraphQL error's type, travels in details, as 2.x's error JSON carried it.
  // The generic ones say no more than the error's own code does.
  const reason = error instanceof BrandfetchError && !GENERIC_CODES.has(error.code) ? { details: { reason: error.code } } : {};
  const options = error instanceof BrandfetchError ? { ...(error.status ? { status: error.status } : {}), ...reason } : {};
  if (error instanceof BrandfetchError) {
    if (error.code === "USAGE") return new UsageError(message.replace(/^Invalid arguments: /, ""), options);
    if (error.code === "CONFIG") return new NotConfiguredError(message, { ...options, hint: LOGIN_HINT });
    if (error.code === "RATE_LIMIT") return new RateLimitError(message, options);
    if (error.code === "AUTH") return new AuthError(message, options);
    if (error.status >= 400) return httpError(error.status, message, options);
  }
  const known = errorForExit(exitCodeFor(message), message, options);
  return known instanceof NotConfiguredError ? new NotConfiguredError(message, { ...options, hint: LOGIN_HINT }) : known ?? new ApiError(message, options);
}

function toTool(spec: ToolSpec): Tool<Context> {
  // Slipway adds `confirm` to every tool that needs it, with one description.
  const { confirm: _confirm, ...properties } = (spec.inputSchema.properties ?? {}) as Record<string, unknown>;
  return defineTool<Context>({
    name: spec.name,
    title: spec.title,
    description: spec.description,
    input: jsonSchema({ ...spec.inputSchema, properties }, { shareRepeats: true }),
    risk: spec.risk,
    // 2.x asked for confirmation where the risk === "destructive".
    requireConfirm: spec.risk === "destructive",
    ...(spec.risk === "destructive" ? { consequence: WHY } : {}),
    openWorld: !LOCAL.has(spec.name),
    summary: () => spec.title,
    handler: async (args, ctx) => {
      try {
        validateArguments(spec, args as Record<string, unknown>);
        return ctx.client.sanitize(await spec.handler(args as Record<string, unknown>, ctx.client));
      } catch (error) {
        throw toError(error, ctx.client);
      }
    },
  });
}

export const TOOLS = ALL_TOOLS.map(toTool);

async function doctor({ config, client }: Context, options: { network: boolean }): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [
    { name: "Profiles", ok: true, detail: config.accounts.length ? `${config.accounts.length}, default ${config.defaultAccount || "none"}` : "none" },
  ];
  if (!options.network || !config.accounts.length) return checks;
  try {
    await client.request("GET", "/viewer");
    checks.push({ name: "Account", ok: true, detail: "GET /viewer answered" });
  } catch (error) {
    checks.push({ name: "Account", ok: false, detail: client.redactText((error as Error).message), fix: "Run `brandfetch-cli login` for what to set." });
  }
  return checks;
}

export type AppOptions = {
  /** Replace how handlers get their client, for tests that stub the network. */
  context?: (env: NodeJS.ProcessEnv) => Context | Promise<Context>;
};

export function createApp(options: AppOptions = {}) {
  return slipway<Context>({
    name: "brandfetch",
    title: "Brandfetch",
    version: VERSION,
    package: "@thenavidm/brandfetch-mcp-cli",
    description: "Brandfetch MCP and shared CLI with isolated profiles, bounded comparisons and approved private asset downloads.",
    instructions: INSTRUCTIONS,
    context:
      options.context ??
      ((env) => {
        const config = loadConfig(env);
        return { config, client: new BrandfetchClient(config) };
      }),
    configured: (ctx) => ctx.config.accounts.length > 0,
    // Keys read from a token file are the client's to redact; these are the ones configured inline.
    secrets: (ctx) => ctx.config.accounts.flatMap((account) => [account.apiToken]),
    tools: TOOLS,
    doctor,
    login: "Create a Brand API key and, for search or browser logo URLs, a Logo API client ID at https://developers.brandfetch.com. Store API keys privately in BRANDFETCH_API_KEY or an owner-only BRANDFETCH_TOKEN_FILE. Named profiles in BRANDFETCH_ACCOUNTS never borrow global keys/client IDs. Official MCP bf1 tokens are different credentials and are not REST API keys. login prints instructions only; no browser flow, storage, payment, OAuth or refresh.",
    settings: [
      { env: "BRANDFETCH_API_KEY", description: "Brand API Bearer key.", secret: true },
      { env: "BRANDFETCH_TOKEN_FILE", description: "Owner-only file holding the Brand API key." },
      { env: "BRANDFETCH_CLIENT_ID", description: "Client ID for search and browser-only logo hotlinks." },
      { env: "BRANDFETCH_ACCOUNTS", description: "Named isolated JSON profiles.", secret: true },
      { env: "BRANDFETCH_DEFAULT_ACCOUNT", description: "The profile a call uses when it names none.", tuning: true },
      { env: "BRANDFETCH_REQUEST_TIMEOUT_MS", description: "Each request's deadline; 30000 when unset. No retries.", tuning: true },
      { env: "BRANDFETCH_MIN_REQUEST_INTERVAL_MS", description: "Pacing between requests per profile; 200 when unset.", tuning: true },
    ],
    links: { repository: "https://github.com/thenavidm/brandfetch-mcp-cli" },
  });
}

export const app = createApp();
