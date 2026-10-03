# Install Brandfetch MCP Server & CLI

One npm package includes both binaries and all **14 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Brandfetch REST API access; provider plans, key permissions and API quota apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | brandfetch-cli | Scripts and agents with a shell |
| Local MCP | brandfetch-mcp | AI clients supporting stdio |
| Desktop archive | brandfetch-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Brandfetch-hosted alternative | https://mcp.brandfetch.com/mcp | Official remote provider-hosted access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and quota with Brandfetch instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/brandfetch-mcp-cli@latest
brandfetch-cli --version
brandfetch-cli
brandfetch-cli get-brand --help
brandfetch-cli schema get-brand
brandfetch-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/brandfetch-mcp-cli@latest brandfetch-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/brandfetch-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

### Two separate provider credentials

1. Open the [Brandfetch developer portal](https://developers.brandfetch.com). Obtain a **Brand API key** for brand data, context, transaction enrichment, prefetch and viewer reads. Check the account's current plan and quota.
2. Obtain a separate **Logo API client ID** for Brand Search and browser-displayed Logo API URLs. It identifies the application and belongs in those browser URLs; it is not a Brand API Bearer key.
3. Store the Brand API key outside repositories in an absolute owner-only token-only file, or configure BRANDFETCH_API_KEY in private local settings. Configure BRANDFETCH_CLIENT_ID separately. Official MCP bf1 tokens and hosted OAuth sessions are different credentials; do not pass them as REST API keys.
4. Run brandfetch-cli doctor for local settings/presence. Deliberately run doctor --network to read the selected Brand API viewer; this verifies that request, not every feature or client. For a client-ID-only profile, test search instead of the Brand API viewer.
5. Read the exact requested brand. Choose cachedOnly=true when a cache miss should remain a 204 without crawling. Approve prefetch or a private download only when requested.

Brand API keys go only to the fixed api.brandfetch.io REST origin in Authorization: Bearer. Search uses native query c and sends no Bearer header. Named profiles never inherit global keys or client IDs. login prints setup instructions; it does not open a browser, store credentials, purchase access, refresh tokens or implement OAuth. This package does not load .env files or official MCP sessions automatically.

On macOS/Linux, use an existing owner-private directory (0700) and a regular non-symlink token-only file (0600) at an absolute path, at most 64 KiB. Token-file credentials override the profile environment key and are cached until restart. On Windows, restrict file/directory ACLs to your user; POSIX mode checks do not validate Windows ACL protection. GUI apps and remote development environments may not inherit the terminal environment.

### Plans, quota and paid reads

The AGPL wrapper is free. Brandfetch access, brand/context/transaction credits and provider terms remain separate. Check [current pricing and your dashboard](https://developers.brandfetch.com) before using the API. Indexed Brand API reads can consume quota. A read may crawl on a cache miss unless cachedOnly=true. Local colors/fonts filtering and CLI --select reduce output only, not provider calls, bytes or credits.

Brand Search and Logo API use their own client-ID contract. Current Logo API documentation describes one million monthly hotlink requests on the free tier, with soft limits and traffic ceilings; this does not make Brand API reads free. Account eligibility, quotas and limits can change. HTTP 402/429 indicate payment/quota/rate constraints; a 403 with an explicit quota/credit/limit detail maps to exit 7, while ordinary 401/403 map to authentication/permission exit 4. HEAD errors may contain no JSON detail; inspect provider settings and status rather than assuming the cause.

The default local 200 ms pacing is per profile/process across API and asset requests, not a provider-wide quota reservation. Other processes and profiles using the same key share upstream limits. No request automatically retries on a timeout, redirect, 429 or 5xx. JSON bodies are capped at 1 MiB; each API response and asset at 5 MiB. Asset requests have a maximum five-second timeout. Comparisons make two to five ordered reads; downloads make one brand read and up to five original asset GETs.

### Logo hotlinks versus private assets

[get_logo_url](https://github.com/thenavidm/brandfetch-mcp-cli/blob/main/README.md#8-every-tool-and-argument) constructs browser-display URLs locally. The provider blocks programmatic fetching of Logo API client-ID hotlinks. Do not spoof browser headers or download these URLs with scripts. For local files, download_brand_logos uses only original credentialed src URLs returned by the Brand API, preserving their path and per-request credential. API keys are never forwarded to the CDN. Redirects, arbitrary hosts, hotlink routes and missing/duplicated c parameters refuse.

Brand API src credentials are redacted from model output, including ordinary get_brand results. This preserves asset metadata but deliberately changes the legacy behavior of returning all credentialed src strings. The official MCP provides interactive cards and a bounded image resource stream when those capabilities are needed. Downloaded SVGs/images remain untrusted files; this wrapper does not execute or automatically render them.

### Rotate and revoke

Rotate or revoke the intended Brand API key in Brandfetch, update private settings/files and restart clients. Update the client ID separately if its application configuration changes. Uninstalling npm does not revoke access, undo a provider crawl or delete private downloaded assets. Keep private profiles, keys, viewer metadata and per-request URLs out of public issues, screenshots and logs.


```bash
export BRANDFETCH_TOKEN_FILE='/absolute/private/brandfetch.txt'
brandfetch-cli doctor --network
```

```powershell
$env:BRANDFETCH_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\brandfetch.txt'
brandfetch-cli doctor --network
```

### Agent-guided installation

> Help me install Brandfetch MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not change or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add brandfetch -- npx -y @thenavidm/brandfetch-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.brandfetch]
command = "npx"
args = ["-y", "@thenavidm/brandfetch-mcp-cli@latest"]
env_vars = ["BRANDFETCH_API_KEY", "BRANDFETCH_TOKEN_FILE", "BRANDFETCH_CLIENT_ID", "BRANDFETCH_ACCOUNTS", "BRANDFETCH_DEFAULT_ACCOUNT", "BRANDFETCH_READ_ONLY", "BRANDFETCH_ALLOW_DESTRUCTIVE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user brandfetch -- npx -y @thenavidm/brandfetch-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `brandfetch-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/brandfetch-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private Brand API key in the sensitive setting, or an absolute private token-file path. Configure the separate client ID for search/browser URLs. Leave the unused credential method empty. Brand API requests use Authorization: Bearer at the fixed API origin; search uses the separate client ID. Use the intended Brand API key; named profiles are configured separately in private client environments.
4. Enable read-only if you want only the 12 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "brandfetch": {
      "command": "npx",
      "args": ["-y", "@thenavidm/brandfetch-mcp-cli@latest"],
      "env": {
        "BRANDFETCH_API_KEY": "YOUR_PRIVATE_API_KEY",
        "BRANDFETCH_TOKEN_FILE": "",
        "BRANDFETCH_CLIENT_ID": "YOUR_APP_CLIENT_ID"
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/brandfetch-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "brandfetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/brandfetch-mcp-cli@latest"],
      "env": {
        "BRANDFETCH_API_KEY": "${env:BRANDFETCH_API_KEY}",
        "BRANDFETCH_TOKEN_FILE": "${env:BRANDFETCH_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "brandfetch-api-token", "description": "Brandfetch API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "brandfetch-token-file", "description": "Optional private token-file path (leave empty for API key)"}
  ],
  "servers": {
    "brandfetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/brandfetch-mcp-cli@latest"],
      "env": {
        "BRANDFETCH_API_KEY": "${input:brandfetch-api-token}",
        "BRANDFETCH_TOKEN_FILE": "${input:brandfetch-token-file}"
      }
    }
  }
}
~~~

Start Brandfetch through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Brandfetch in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "brandfetch": {
      "command": "npx",
      "args": ["-y", "@thenavidm/brandfetch-mcp-cli@latest"],
      "env": {
        "BRANDFETCH_API_KEY": "YOUR_PRIVATE_API_KEY",
        "BRANDFETCH_TOKEN_FILE": "",
        "BRANDFETCH_CLIENT_ID": "YOUR_APP_CLIENT_ID"
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/brandfetch-mcp-cli.git
cd brandfetch-mcp-cli
docker build -t brandfetch-mcp-cli .
docker run --rm -i -e BRANDFETCH_API_KEY brandfetch-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/brandfetch-mcp-cli@latest`, stdio transport, and private local BRANDFETCH_API_KEY or BRANDFETCH_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Brandfetch's official server rather than this local stdio command.

## Verify

```bash
brandfetch-cli doctor
brandfetch-cli doctor --network
brandfetch-cli list-accounts --agent
brandfetch-cli get-viewer --agent
brandfetch-cli get-brand --identifier example.com --cachedOnly --agent
```

Local doctor reports settings/presence and does not authenticate. Network doctor deliberately reads the selected Brand API viewer. A client-ID-only profile can search and construct browser URLs but cannot make Brand API reads. Cached misses are reported as status 204 / cachedMiss:true / data:null. Do not queue crawls or download assets merely to test installation. Read-only discovery returns 12 tools and refuses direct confirmed writes.

## Multiple accounts

Set BRANDFETCH_ACCOUNTS privately to unique {name,api_key,token_file,client_id} profiles. token_file takes precedence within that profile. Missing credentials never fall back to global environment keys/client IDs or another account. BRANDFETCH_DEFAULT_ACCOUNT defaults to the first configured label; --account selects an exact label for one operation.

```json
[{"name":"personal","token_file":"/absolute/private/brandfetch-personal.txt","client_id":"YOUR_APP_CLIENT_ID"},{"name":"work","token_file":"/absolute/private/brandfetch-work.txt","client_id":"YOUR_WORK_CLIENT_ID"}]
```

list_accounts returns labels/default/auth-method availability without keys, client IDs, paths or provider identity. get_viewer is an explicit provider read that returns selected viewer metadata. Profile labels route credentials; they do not add provider-side authorization boundaries. Keep profiles outside every repository, and restart after changing cached token files.

## Updates and removal

```bash
npm install -g @thenavidm/brandfetch-mcp-cli@latest
brandfetch-cli --version
npm uninstall -g @thenavidm/brandfetch-mcp-cli
codex mcp remove brandfetch
```

npx @latest resolves on process startup; reconnect/restart for updates. Global npm and desktop archives require explicit updates. Install the new versioned .mcpb and confirm its reported version. Remove client entries/extensions and revoke the provider key separately when access should end. Removal does not delete private files, undo crawls or revoke application client IDs.

## Troubleshooting

| Symptom | Check / next action |
| --- | --- |
| Missing binary / npm.ps1 blocked | Node22+, global npm PATH/new terminal; npm.cmd or permitted shell |
| Exit 10 / missing profile credential | Exact profile label and its own key/client ID; no fallback |
| Client-ID-only profile fails viewer | Viewer needs Brand API key; search/logo construction use client ID |
| 401 / ordinary 403 | REST Brand API key and permission; MCP bf1 tokens are different |
| 402 / 429 / explicit quota 403 | Provider balance/quota/rate settings; no automatic replay |
| 204 cache miss | Expected cachedOnly miss, not malformed JSON or successful brand result |
| HEAD 202 | Crawl queued, not complete; later deliberate read required |
| Explicit domain rejects URL/email | Use generic identifier_type=auto for those formats |
| Brand/context 404 | Intended identifier, provider availability and optional NSFW policy |
| Logo hotlink blocked | Browser display only; private download uses Brand API src credentials |
| Private directory refused | Existing canonical absolute owner-private directory; Windows owner ACL |
| Download reserved/partial file | Inspect reported paths; no overwrite, rollback or automatic replay |
| Asset MIME/size/redirect error | Original allowed-CDN src only, supported image MIME and 5 MiB cap |
| Private src missing from get_brand | Deliberate credential redaction; use approved download helper |
| Schema/source check reports change | Review provider docs, local bounds and every input table before updating |
| Desktop installation rejected | Actual host/runtime/extension policy; artifact and GUI checks differ |

Share sanitized status, operation and package/Node/client versions. Omit keys, profiles, private identifiers, descriptors, viewer metadata, credential URLs and files.

## Development

```bash
git clone https://github.com/thenavidm/brandfetch-mcp-cli.git
cd brandfetch-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/brandfetch-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
