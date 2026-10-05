<img src="https://cdn.navid.me/tools/brandfetch-icon.svg" alt="Brandfetch" width="88">

# Brandfetch MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/brandfetch-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/brandfetch-mcp-cli)
[![CI](https://github.com/thenavidm/brandfetch-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/brandfetch-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Brandfetch MCP server and CLI for Codex and AI agents. Fourteen shared tools for current brand data, context, transaction enrichment, bounded comparison and approved private assets across isolated named profiles.

One package gives you a task CLI, local stdio MCP and versioned desktop bundle. Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme). Built on [Slipway](https://github.com/thenavidm/slipway), which turns one definition of each tool into the MCP server and the CLI. Complete setup: [navid.me](https://navid.me/mcp-servers/brandfetch?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=guide).

<img src="https://cdn.navid.me/repos/brandfetch-mcp-cli-retina.gif" alt="Illustrated Brandfetch workflow using the same terminal component as navid.me" width="520">

The terminal illustrates shipped commands; it is not a recorded provider account session. Official hosted OAuth/rich cards and existing community CLIs are compared below. Live account outcomes and the desktop GUI remain unverified; section 7 has the measured token costs.

## Two ways to use it

### Command line

```bash
brandfetch-cli tools
brandfetch-cli get-brand-colors --identifier example.com --cachedOnly --agent
brandfetch-cli compare-brands --identifiers example.com --identifiers example.org --cachedOnly --agent
```

### MCP server, for your AI app

```bash
codex mcp add brandfetch --env BRANDFETCH_TOKEN_FILE=/absolute/private/brandfetch.txt -- npx -y @thenavidm/brandfetch-mcp-cli@latest
```

### Which one

| Where you work | Route |
| --- | --- |
| Codex / Cursor / agents with shell | Task CLI, local MCP or both |
| Claude Desktop | Versioned custom extension or manual stdio |
| Scripts / CI | Same task CLI and profile/approval policies |
| Remote-only clients / rich brand cards | Official hosted Brandfetch MCP |

## Features

| Capability | CLI command | MCP tool |
| --- | --- | --- |
| Current brand data | get-brand | get_brand |
| Focused colors/fonts | get-brand-colors / get-brand-fonts | get_brand_colors / get_brand_fonts |
| Ordered two-to-five comparison | compare-brands | compare_brands |
| Interpreted context / transaction | get-brand-context / enrich-transaction | get_brand_context / enrich_transaction |
| Approved crawl / private files | prefetch-brand / download-brand-logos | prefetch_brand / download_brand_logos |
| Browser logo URL | get-logo-url | get_logo_url |
| Private profiles / native schemas | list-accounts / get-operation-schema | list_accounts / get_operation_schema |
| Local native preview | preview-operation | preview_operation |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| 2 | [Quick install](#2-quick-install) | Quick install |
| 3 | [Set up Brandfetch access](#3-set-up-brandfetch-access) | Set up Brandfetch access |
| 4 | [Connect your client](#4-connect-your-client) | Connect your client |
| 5 | [Check it works](#5-check-it-works) | Check it works |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | Measured in Claude Code and Codex |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| 9 | [Brand, context and transaction workflows](#9-brand-context-and-transaction-workflows) | Brand, context and transaction workflows |
| 10 | [Bounded comparison and private downloads](#10-bounded-comparison-and-private-downloads) | Bounded comparison and private downloads |
| 11 | [Several private accounts](#11-several-private-accounts) | Several private accounts |
| 12 | [Writing safely](#12-writing-safely) | Writing safely |
| 13 | [How the two surfaces work](#13-how-the-two-surfaces-work) | How the two surfaces work |
| 14 | [Your data](#14-your-data) | Your data |
| 15 | [Environment variables](#15-environment-variables) | Environment variables |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and removal |
| 17 | [Troubleshooting](#17-troubleshooting) | Troubleshooting |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| 19 | [Versions and migration](#19-versions-and-migration) | Versions and migration |
| 20 | [FAQ](#20-faq) | FAQ |

## 1. What you can ask it

- Find a brand by name with a configured search client ID.
- Read brand data by domain, email, URL, Brand ID, ticker, ISIN or crypto symbol; choose explicit routes to avoid collisions.
- Retrieve only colors or fonts and keep private asset credentials out of model output.
- Compare two to five requested brands in the same private profile, stopping on failure.
- Read interpreted brand context with the cache-only option when appropriate.
- Enrich the specific transaction descriptor requested by the user, without creating a payment.
- Queue one approved brand crawl, or download a bounded set of original assets into a private directory.

Actual shared discovery returns **14 tools: 12 reads/helpers and two confirmed operations**, covering 11 current native Brand API V2 operations through consolidated tools. All seven legacy names remain, with explicit 2.0 changes documented below. This package adds a useful CLI/local workflow companion; official hosted OAuth and rich cards remain alternatives.

## 2. Quick install

```bash
npm install -g @thenavidm/brandfetch-mcp-cli@latest
brandfetch-cli --version
brandfetch-cli tools
brandfetch-cli schema get-brand
brandfetch-cli login
```

Node 22+ is required for manual installs. Discovery and local native previews work without credentials. Provider calls need the corresponding private Brand API key or separate client ID. The [versioned desktop bundle](https://github.com/thenavidm/brandfetch-mcp-cli/releases/download/v2.0.0/brandfetch-2.0.0.mcpb) includes production dependencies; see [INSTALL.md](INSTALL.md) for client/OS setup.

## 3. Set up Brandfetch access

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

[get_logo_url](#8-every-tool-and-argument) constructs browser-display URLs locally. The provider blocks programmatic fetching of Logo API client-ID hotlinks. Do not spoof browser headers or download these URLs with scripts. For local files, download_brand_logos uses only original credentialed src URLs returned by the Brand API, preserving their path and per-request credential. API keys are never forwarded to the CDN. Redirects, arbitrary hosts, hotlink routes and missing/duplicated c parameters refuse.

Brand API src credentials are redacted from model output, including ordinary get_brand results. This preserves asset metadata but deliberately changes the legacy behavior of returning all credentialed src strings. The official MCP provides interactive cards and a bounded image resource stream when those capabilities are needed. Downloaded SVGs/images remain untrusted files; this wrapper does not execute or automatically render them.

### Rotate and revoke

Rotate or revoke the intended Brand API key in Brandfetch, update private settings/files and restart clients. Update the client ID separately if its application configuration changes. Uninstalling npm does not revoke access, undo a provider crawl or delete private downloaded assets. Keep private profiles, keys, viewer metadata and per-request URLs out of public issues, screenshots and logs.

## 4. Connect your client

```bash
codex mcp add brandfetch --env BRANDFETCH_TOKEN_FILE=/absolute/private/brandfetch.txt -- npx -y @thenavidm/brandfetch-mcp-cli@latest
codex mcp list
```

Codex is the current primary agent. Forward BRANDFETCH_CLIENT_ID privately as well when using search or browser logo URLs. INSTALL.md includes TOML env_vars, Windows paths, Claude Desktop bundled/manual setup, optional Claude Code, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Cline and Docker. The same package exposes local stdio only; remote-only clients can use the official hosted MCP with its current OAuth/token setup. GUI installation is separate from downloaded archive protocol verification.

## 5. Check it works

```bash
brandfetch-cli doctor
brandfetch-cli doctor --network
brandfetch-cli list-accounts --agent
brandfetch-cli get-viewer --agent
brandfetch-cli get-brand --identifier example.com --cachedOnly --agent
```

Local doctor reports settings/presence and does not authenticate. Network doctor deliberately reads the selected Brand API viewer. A client-ID-only profile can search and construct browser URLs but cannot make Brand API reads. Cached misses are reported as status 204 / cachedMiss:true / data:null. Do not queue crawls or download assets merely to test installation. Read-only discovery returns 12 tools and refuses direct confirmed writes.

## 6. Output, flags and exit codes

MCP uses underscore names; CLI uses derived hyphen names from the same schemas and handlers. Both return native data unless a focused helper explicitly documents its wrapper. Per-request asset credentials and configured keys are removed before output.

| Command or flag | Contract |
| --- | --- |
| tools / no command | Real current tool list, writes marked |
| COMMAND --help / schema COMMAND | Derived options / complete JSON Schema |
| --agent | Compact JSON and no prompts; never confirms a write |
| --select a,b.c | Local output selection; does not reduce provider reads/quota |
| --account NAME | Exact private profile label |
| --confirm | Approve the exact prefetch or private-download operation |
| --cachedOnly | Native cache-only option; CLI retains provider camel case |
| --identifier-type | auto/domain/ticker/isin/crypto for brand lookups |
| --identifiers | Repeat for two to five ordered unique comparison identifiers |
| --output-dir / --max-files | Existing private directory / one to five asset cap |

```bash
brandfetch-cli get-brand --identifier example.com --agent --select name,domain,colors
brandfetch-cli compare-brands --identifiers example.com --identifiers example.org --cachedOnly --agent
```

| Exit | Meaning |
| --- | --- |
| 0 | Success, including an explicitly reported cache miss |
| 1 | Unexpected error |
| 2 | Invalid arguments or refused operation, an unknown command or a hidden write |
| 3 | Provider not found |
| 4 | Authentication/permission failure |
| 5 | Provider, transport, content or file-persistence failure |
| 7 | Rate limit or explicit quota exhaustion |
| 10 | Missing/invalid private configuration |

Partial comparisons/download failures return errors and retain completed results/file paths inside the diagnostic. No automatic rollback or retry is performed. Native cachedOnly=true affects provider resolution; colors/fonts/--select affect only local output.

## 7. MCP or CLI and token cost

| Route | What reaches the agent | What is proven |
| --- | --- | --- |
| Local MCP | Client-dependent names, schemas/instructions and requested results | Real shared discovery and fixture protocol behavior |
| Shared CLI | Available skill/help and selected output | Same handlers, profiles, validation and guards |
| Official MCP | Hosted OAuth, rich cards/resources and provider tools | Current docs/source inspected; hosted task not benchmarked |
| Focused colors/fonts/comparison | Requested fields with explicit bounds | Output filtering and request caps, not measured token savings |

Measured on 2026-10-05 against 2.0.1, the same day, with Claude Code 2.1.286 on Claude Opus 5.5 (one short prompt with and without the server connected, the difference read from the API's own usage figures) and Codex 0.159.3 on gpt-6.1-sol:

| Cost | 2.0.1 | 3.0.0 |
| --- | --- | --- |
| Claude Code, every tool loaded, every message | 5,192 | 5,186 |
| Claude Code's default, tool search, every message | 425 | 426 |
| `SKILL.md`, read once | 4,350 | 4,416 |
| Codex over the CLI, one task, median of five | 103,759 | 83,250 |
| Codex over MCP, the same task, median of five | 43,613 | 43,633 |

The task was "find the command that downloads a brand's logo files to a local folder, and the flags it requires". Over the CLI, every 2.0.1 run guessed `brandfetch-cli download --help` and failed, because its help lists no commands, and every extra step carries the whole conversation forward; every 3.0.0 run asked `which`. Over MCP, Codex printed a tool list 10 characters shorter on 3.0.0, and the two totals differ by the script the model wrote to print it. `SKILL.md` costs 66 more because it now says how approval works over MCP and lists every exit code. The tool lists differ by a few tokens: each confirm description is shorter, and each of the two writes carries a flag Claude Code reads to show its own approval prompt.

## 8. Every tool and argument

All tools/arguments below come from actual shared discovery. Confirmation is enforced before handler execution, beyond ordinary required-key validation. Unknown declared arguments refuse. Bounds are explicit local limits, not provider entitlement guarantees.

| MCP tool | CLI command | Policy |
| --- | --- | --- |
| `get_brand` | `brandfetch-cli get-brand` | Read / local helper |
| `search_brands` | `brandfetch-cli search-brands` | Read / local helper |
| `get_brand_context` | `brandfetch-cli get-brand-context` | Read / local helper |
| `enrich_transaction` | `brandfetch-cli enrich-transaction` | Read / local helper |
| `get_viewer` | `brandfetch-cli get-viewer` | Read / local helper |
| `prefetch_brand` | `brandfetch-cli prefetch-brand` | Explicit confirmation |
| `get_brand_colors` | `brandfetch-cli get-brand-colors` | Read / local helper |
| `get_brand_fonts` | `brandfetch-cli get-brand-fonts` | Read / local helper |
| `compare_brands` | `brandfetch-cli compare-brands` | Read / local helper |
| `get_logo_url` | `brandfetch-cli get-logo-url` | Read / local helper |
| `download_brand_logos` | `brandfetch-cli download-brand-logos` | Explicit confirmation |
| `list_accounts` | `brandfetch-cli list-accounts` | Read / local helper |
| `get_operation_schema` | `brandfetch-cli get-operation-schema` | Read / local helper |
| `preview_operation` | `brandfetch-cli preview-operation` | Read / local helper |

#### get_brand

`brandfetch-cli get-brand`

Current Brand API V2 data through generic or explicit routes. One request; credentialed asset src URLs are redacted from output. Provider reads may spend quota or crawl on a miss.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | Explicit provider route avoids identifier collisions. Values: `auto`, `domain`, `ticker`, `isin`, `crypto`. default: `auto`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Optional provider NSFW behavior; absence differs from false. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### search_brands

`brandfetch-cli search-brands`

Search by name with the selected profile client ID in native query c. No Brand API Bearer key sent. One request; no pagination or retries.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | Yes | string | Brand name to search. minLength: `1`. maxLength: `512`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### get_brand_context

`brandfetch-cli get-brand-context`

One Brand Context API request. Context is probabilistic interpretation, not verified company facts. Accepts domain/email/URL; cachedOnly avoids crawling a miss.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `domain` | Yes | string | Domain, URL or email address. minLength: `1`. maxLength: `2048`. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### enrich_transaction

`brandfetch-cli enrich-transaction`

Resolve the user-requested transaction label into brand data. Sends the label and country to Brandfetch and may consume credits; does not create a charge, bank connection or payment.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `transaction_label` | Yes | string | Only the specific transaction label requested by the user. minLength: `1`. maxLength: `4096`. |
| `country_code` | Yes | string | ISO 3166-1 alpha-2 country code, uppercase. pattern: `^[A-Z]{2}$`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### get_viewer

`brandfetch-cli get-viewer`

GET /v2/viewer using the selected private Brand API key. Returns provider viewer metadata; does not purchase access or expose the key.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### prefetch_brand

`brandfetch-cli prefetch-brand`

Explicitly confirmed HEAD request can enqueue a provider crawl. Generic or domain route only. Return 200 indexed / 202 crawl queued; never poll, purchase or resubmit automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | See the full input schema. Values: `auto`, `domain`. default: `auto`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### get_brand_colors

`brandfetch-cli get-brand-colors`

One native brand read with only name, domain and colors returned. Filtering is local: provider quota and crawling behavior are unchanged.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | Explicit provider route avoids identifier collisions. Values: `auto`, `domain`, `ticker`, `isin`, `crypto`. default: `auto`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Optional provider NSFW behavior; absence differs from false. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### get_brand_fonts

`brandfetch-cli get-brand-fonts`

One native brand read with only name, domain and fonts returned. Filtering is local: provider quota and crawling behavior are unchanged.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | Explicit provider route avoids identifier collisions. Values: `auto`, `domain`, `ticker`, `isin`, `crypto`. default: `auto`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Optional provider NSFW behavior; absence differs from false. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### compare_brands

`brandfetch-cli compare-brands`

Read two to five unique identifiers sequentially in one exact profile, preserving input order. Return colors/fonts/logo counts; stop at the first failure with completed results. No retries, cross-account mixing or complete-market claim.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifiers` | Yes | array | Two to five distinct identifiers in requested order. minItems: `2`. maxItems: `5`. Items: string. |
| `identifier_type` | No; body and guard rules apply | string | Explicit provider route avoids identifier collisions. Values: `auto`, `domain`, `ticker`, `isin`, `crypto`. default: `auto`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Optional provider NSFW behavior; absence differs from false. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### get_logo_url

`brandfetch-cli get-logo-url`

Local Logo API URL construction with the selected profile client ID. Direct browser display only; programmatic fetching these hotlinks is prohibited/blocked. No provider call or automatic download.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | See the full input schema. Values: `domain`, `ticker`, `isin`, `crypto`. default: `domain`. |
| `type` | No; body and guard rules apply | string | Explicit asset type; separate from identifier_type. Values: `icon`, `logo`, `symbol`. default: `logo`. |
| `icon` | No; body and guard rules apply | boolean | Legacy compatibility: true selects icon. Do not combine with type. |
| `width` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `2048`. |
| `height` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `2048`. |
| `theme` | No; body and guard rules apply | string | See the full input schema. Values: `light`, `dark`. |
| `fallback` | No; body and guard rules apply | string | See the full input schema. Values: `brandfetch`, `transparent`, `lettermark`, `404`. default: `404`. |
| `format` | No; body and guard rules apply | string | SVG allowed only for logo or symbol. Values: `png`, `jpeg`, `webp`, `svg`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |

#### download_brand_logos

`brandfetch-cli download-brand-logos`

Confirmed one brand lookup plus at most five original credentialed Brand API logo src downloads. Owner-private directory and exclusive files only; cap 5 MiB each, fixed CDN, no redirects/Bearer forwarding/hotlink evasion/retries. Stop on failure, retain and report completed/reserved files.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Domain, email, URL, Brand ID, ticker, ISIN or crypto symbol. Explicit types accept only their identifier format. minLength: `1`. maxLength: `2048`. |
| `identifier_type` | No; body and guard rules apply | string | Explicit provider route avoids identifier collisions. Values: `auto`, `domain`, `ticker`, `isin`, `crypto`. default: `auto`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Optional provider NSFW behavior; absence differs from false. |
| `cachedOnly` | No; body and guard rules apply | boolean | True avoids crawling a cache miss; 204 is reported as cachedMiss. Indexed reads still consume quota. default: `False`. |
| `account` | No; body and guard rules apply | string | Exact private profile label. Never inherits another profile or global key/client ID. |
| `output_dir` | Yes | string | Existing canonical absolute owner-private directory. minLength: `1`. maxLength: `2048`. |
| `format_preference` | No; body and guard rules apply | string | See the full input schema. Values: `svg`, `png`, `all`. default: `all`. |
| `max_files` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `5`. default: `3`. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_accounts

`brandfetch-cli list-accounts`

Local labels, default and credential method availability only. No keys, client IDs, private paths or network.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

#### get_operation_schema

`brandfetch-cli get-operation-schema`

Complete pinned Brandfetch path/query/body schema and documented response statuses for one of 11 supported native operations. Local only; agent purchases excluded.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `getBrandData`, `prefetchBrand`, `getBrandDataByDomain`, `prefetchBrandByDomain`, `getBrandDataByTicker`, `getBrandDataByIsin`, `getBrandDataByCrypto`, `searchBrands`, `getBrandContext`, `getBrandFromTransaction`, `getViewer`. |

#### preview_operation

`brandfetch-cli preview-operation`

Validate one exact native operation request locally, without loading keys/client IDs, contacting Brandfetch, reserving files or claiming provider validation or price. Search c is added from private profile at execution.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `getBrandData`, `prefetchBrand`, `getBrandDataByDomain`, `prefetchBrandByDomain`, `getBrandDataByTicker`, `getBrandDataByIsin`, `getBrandDataByCrypto`, `searchBrands`, `getBrandContext`, `getBrandFromTransaction`, `getViewer`. |
| `arguments` | Yes | object | Native path/query arguments and transaction payload. Inspect get_operation_schema first. |

### Complete native operations and request shapes

get_brand consolidates six GET routes through identifier_type; prefetch_brand consolidates two HEAD routes. get_operation_schema returns these exact native parameter/body facts. preview_operation uses native parameter names: search name; transaction payload.transactionLabel and payload.countryCode. Execution tools use their documented friendly flags. Search c is supplied from the private selected profile.

##### getBrandData

`GET /v2/brands/{identifier}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Native path parameter. minLength: `1`. maxLength: `2048`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Native query parameter. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### prefetchBrand

`HEAD /v2/brands/{identifier}`. Documented statuses: 200, 202, 400, 401, 403, 404, 429, 503.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `identifier` | Yes | string | Native path parameter. minLength: `1`. maxLength: `2048`. |

##### getBrandDataByDomain

`GET /v2/brands/domain/{domain}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `domain` | Yes | string | Native path parameter. minLength: `1`. maxLength: `2048`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Native query parameter. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### prefetchBrandByDomain

`HEAD /v2/brands/domain/{domain}`. Documented statuses: 200, 202, 400, 401, 403, 404, 429, 503.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `domain` | Yes | string | Native path parameter. minLength: `1`. maxLength: `2048`. |

##### getBrandDataByTicker

`GET /v2/brands/ticker/{ticker}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `ticker` | Yes | string | Native path parameter. minLength: `1`. maxLength: `512`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Native query parameter. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### getBrandDataByIsin

`GET /v2/brands/isin/{isin}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isin` | Yes | string | Native path parameter. minLength: `1`. maxLength: `512`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Native query parameter. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### getBrandDataByCrypto

`GET /v2/brands/crypto/{symbol}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `symbol` | Yes | string | Native path parameter. minLength: `1`. maxLength: `512`. |
| `allowNsfw` | No; body and guard rules apply | boolean | Native query parameter. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### searchBrands

`GET /v2/search/{name}`. Documented statuses: 429, 503, 200.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | Native path parameter. minLength: `1`. maxLength: `512`. |
| `c` | Yes | string | Native query parameter. minLength: `1`. maxLength: `512`. |

##### getBrandContext

`GET /v2/context/{domain}`. Documented statuses: 200, 204, 400, 401, 402, 404, 429.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `domain` | Yes | string | Native path parameter. minLength: `1`. maxLength: `2048`. |
| `cachedOnly` | No; body and guard rules apply | boolean | Native query parameter. default: `False`. |

##### getBrandFromTransaction

`POST /v2/brands/transaction`. Documented statuses: 200, 400, 401, 402, 404, 429, 503.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

Native transaction JSON body:
| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `transactionLabel` | Yes | string | See the full input schema. minLength: `1`. maxLength: `4096`. |
| `countryCode` | Yes | string | See the full input schema. pattern: `^[A-Z]{2}$`. |

##### getViewer

`GET /v2/viewer`. Documented statuses: 200, 401, 403.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

## 9. Brand, context and transaction workflows

### Resolve the requested identifier

Search returns candidate brands; select the intended domain before fetching. Generic lookup accepts domains, email addresses, URLs, Brand IDs, tickers, ISINs and crypto symbols. Provider resolution order is domain → ticker → ISIN → crypto; explicit identifier_type routes avoid ambiguity. Email/URL lookup resolves a registrable domain and does not establish that the domain is the person's employer. Explicit domain routes reject email/URL inputs locally.

```bash
brandfetch-cli search-brands --query Example --agent
brandfetch-cli get-brand --identifier example.com --identifier-type domain --cachedOnly --agent
brandfetch-cli get-brand-colors --identifier example.com --cachedOnly --agent
brandfetch-cli get-brand-fonts --identifier example.com --cachedOnly --agent
brandfetch-cli get-brand --identifier BTC --identifier-type crypto --agent
```

### Context and enrichment

Brand Context returns interpreted positioning, voice and related information. Treat it as probabilistic interpretation requiring review. Use only the transaction descriptor requested by the user; it is sent to Brandfetch. This is a brand resolution API, not a payment or bank account workflow.

```bash
brandfetch-cli get-brand-context --domain example.com --cachedOnly --agent
brandfetch-cli enrich-transaction --transaction-label "EXAMPLE CAFE" --country-code US --agent
```

### Explicit prefetch

prefetch_brand requires confirmation because HEAD can queue crawling. A 200 reports indexed and 202 reports crawlQueued; it does not guarantee a future lookup result, initiate polling or prove completion. There is no automatic payment, fallback purchase or wallet support.

```bash
brandfetch-cli prefetch-brand --identifier example.com --confirm --agent
```

## 10. Bounded comparison and private downloads

### Ordered comparison

compare_brands accepts two to five unique identifiers, prevalidates all of them before the first request, then reads sequentially in one exact selected profile. It returns name/domain/colors/fonts/logo counts and qualityScore, preserving input order. A 204 remains an explicit cache miss. A failure stops subsequent requests and reports completed results plus the failed/remaining identifiers. Earlier reads may have consumed quota. There is no persistent result cache, completeness claim or automatic continuation.

```bash
brandfetch-cli compare-brands --identifiers example.com --identifiers example.org --account work --cachedOnly --agent
```

### Approved private files

Create an owner-private directory yourself before requesting a download. output_dir must be absolute, canonical and already present. Symlink directories and public POSIX permissions refuse before the brand lookup; Windows owners must restrict ACLs. No automatic directory creation or hidden default output directory is used.

```bash
mkdir -m 700 /absolute/private/brand-assets
brandfetch-cli download-brand-logos --identifier example.com --output-dir /absolute/private/brand-assets --format-preference svg --max-files 2 --confirm --agent
```

The helper performs one brand read, selects matching logo formats in provider order and downloads at most max_files (default three, maximum five). format_preference supports svg/png/all; all allows documented SVG, PNG, JPEG, WebP and GIF asset formats. Selection is bounded, not all-assets export. Each original credentialed CDN URL is validated before the first file download. Fixed allowed HTTPS CDN only; no redirects, key forwarding, browser-header spoofing or hotlink downloads. Each response is streamed under a 5 MiB cap and image Content-Type must match the selected declared format.

Files use random exclusive names and 0600 creation; existing files are never overwritten. SHA-256, actual bytes, format and local path are returned; credential URLs are not written to a manifest or model output. A failure stops subsequent downloads and reports completed files plus any reserved path; the reserved file may be empty or incomplete. Inspect it privately rather than retrying blindly. No rollback deletes earlier completed files, and nothing executes or previews downloaded SVGs.

### Browser-only logo URLs

get_logo_url keeps identifier_type separate from asset type, fixing the legacy icon flag that discarded ticker/ISIN/crypto routing. The legacy icon flag remains but cannot be combined with type. Local integer dimensions are 1–2048; provider raster sizing clamps to 16–2048 and preserves aspect ratio. Light/dark describe asset color, not background color. This helper conservatively allows SVG for logo/symbol only; icon SVG lettermark exceptions remain an official API feature outside this local helper. Image fallbacks may return WebP regardless of a requested format.

```bash
brandfetch-cli get-logo-url --identifier BTC --identifier-type crypto --type icon --width 200 --fallback 404 --agent
```

The URL includes the application's client ID and is deliberately displayable, unlike a private per-request Brand API credential. Embed it directly in a browser. Do not fetch it programmatically; use the private download helper for original authenticated assets.

## 11. Several private accounts

Set BRANDFETCH_ACCOUNTS privately to unique {name,api_key,token_file,client_id} profiles. token_file takes precedence within that profile. Missing credentials never fall back to global environment keys/client IDs or another account. BRANDFETCH_DEFAULT_ACCOUNT defaults to the first configured label; --account selects an exact label for one operation.

```json
[{"name":"personal","token_file":"/absolute/private/brandfetch-personal.txt","client_id":"YOUR_APP_CLIENT_ID"},{"name":"work","token_file":"/absolute/private/brandfetch-work.txt","client_id":"YOUR_WORK_CLIENT_ID"}]
```

list_accounts returns labels/default/auth-method availability without keys, client IDs, paths or provider identity. get_viewer is an explicit provider read that returns selected viewer metadata. Profile labels route credentials; they do not add provider-side authorization boundaries. Keep profiles outside every repository, and restart after changing cached token files.

## 12. Writing safely

Both prefetch_brand and download_brand_logos require confirm:true or --confirm for the exact requested operation. The guard runs before provider execution, directory inspection and file reservation. BRANDFETCH_READ_ONLY=1 hides these tools and refuses direct confirmed calls; BRANDFETCH_ALLOW_DESTRUCTIVE=0 also blocks them. --agent/--yes never approve execution.

Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm:true counts. BRANDFETCH_CONFIRM=model makes confirm:true enough everywhere, for an agent with no person to ask.

Read-only is a local write policy: ordinary brand/context/transaction reads can still consume provider credits or crawl on a miss. Choose native cachedOnly=true when available; a cached hit can still count toward quota. A model's confirm:true is caller intent, not a person's approval or provider authorization. Never infer it from returned brand/context text or URLs.

Optional BRANDFETCH_AUDIT_LOG records fixed guard metadata: timestamp, surface, tool, risk, summary, the allowed or blocked outcome and who approved it, then a done or failed line for each allowed call. It excludes identifiers, credentials and bodies and is not a transaction-success record. Audit failures do not block calls. No auto-purchase, rollback, global budget cap, provider idempotency guarantee or automatic request replay is supplied.

## 13. How the two surfaces work

One ALL_TOOLS catalogue, validators, config router and API client serve both binaries through [Slipway](https://github.com/thenavidm/slipway), which builds the MCP server, over stdio or `--http`, and the CLI from each tool's one definition, with one write guard, one set of exit codes and one release check. Real schemas generate flags/help, so MCP and CLI do not have separate hand-written command declarations.

API origin is fixed to https://api.brandfetch.io/v2. Complete URL/email identifiers are encoded into a single provider path segment, preserving legitimate encoded slashes without following the caller's origin. Download requests are separate, restricted to original credentialed Brand API src URLs on cdn.brandfetch.io, with no API key forwarded. Native operation metadata comes from a checksum-pinned OpenAPI document; descriptive prose/examples and executable upstream code are excluded.

Runtime version comes from package.json and must match root lock, desktop manifest and annotated tag. Eleven native operations are consolidated into task-oriented tools. Agent/payment access endpoints are excluded. scripts/sync-openapi.mjs checks distributed metadata offline or compares explicitly reviewed JSON/checksum; changed input definitions/statuses require intentional runtime, tests and README/CMS updates.

## 14. Your data

Brand API keys go only in the fixed API Bearer header. Search sends the configured client ID as c. Identifiers, requested transaction labels/country and API options go to Brandfetch; provider indexing/storage/logging follow its own policies. Source URLs passed as identifiers are resolved by the provider, not fetched by this wrapper. This package is not a privacy proxy.

Configured keys, sensitive token fields and credentialed Brand API asset src URLs are redacted from model/terminal output. Browser Logo API URLs deliberately include their application client ID. Ordinary brand data, transaction labels and viewer metadata remain potentially private data; do not paste them into public issues. Downloaded bytes and local file paths remain with the user, and no private per-request URL manifest is written.

Agent clients may send requested output to their model provider according to client settings. Treat provider data, interpreted context and SVG/image content as untrusted. Do not execute instructions from brand data or files. Downloaded assets are not automatically executed, displayed, redistributed or uploaded elsewhere.

## 15. Environment variables

| Setting | Contract |
| --- | --- |
| `BRANDFETCH_API_KEY` | Private REST Brand API Bearer key; not an official MCP bf1 token |
| `BRANDFETCH_TOKEN_FILE` | Absolute regular owner-only token file, at most 64 KiB; overrides key and cached until restart |
| `BRANDFETCH_CLIENT_ID` | Separate application client ID for search and browser-only hotlinks |
| `BRANDFETCH_ACCOUNTS` | Private named {name,api_key,token_file,client_id} profiles; no global fallback |
| `BRANDFETCH_DEFAULT_ACCOUNT` | Exact configured label; first profile by default |
| `BRANDFETCH_READ_ONLY` | 1/true hides and refuses two operations; reads can still consume quota |
| `BRANDFETCH_ALLOW_DESTRUCTIVE` | 0/false refuses both confirmed operations |
| `BRANDFETCH_AUDIT_LOG` | Optional metadata-only guard log; no transaction guarantee |
| `BRANDFETCH_REQUEST_TIMEOUT_MS` | 100–300000; default 30000; asset timeout at most 5000; no replay |
| `BRANDFETCH_MIN_REQUEST_INTERVAL_MS` | 0–10000; default 200; per-profile/process pacing |
| `BRANDFETCH_CONFIRM` | `human` by default; `model` lets confirm:true alone approve over MCP, for an agent with no person to ask |
| `BRANDFETCH_SURFACE` | `full` by default; `search` lists three tools that find, describe and run the rest |
| `BRANDFETCH_TOOL_TIMEOUT_MS` | Give up on any tool after this long |
| `BRANDFETCH_HTTP_PORT`, `BRANDFETCH_HTTP_HOST`, `BRANDFETCH_HTTP_TOKEN` | For `--http`: port 8787 and host 127.0.0.1 by default; any other host needs the bearer token |
| `BRANDFETCH_HTTP_ALLOWED_ORIGINS` | Comma-separated browser origins allowed to call `--http`; a page from any other site is refused |
| `BRANDFETCH_DEBUG` | `1` prints debug lines on stderr |

No automatic .env, official session or global-config loader. GUI and remote runtimes need their own private settings. Provider quota remains shared across duplicate keys and processes.

## 16. Updates and removal

```bash
npm install -g @thenavidm/brandfetch-mcp-cli@latest
brandfetch-cli --version
npm uninstall -g @thenavidm/brandfetch-mcp-cli
codex mcp remove brandfetch
```

npx @latest resolves on process startup; reconnect/restart for updates. Global npm and desktop archives require explicit updates. Install the new versioned .mcpb and confirm its reported version. Remove client entries/extensions and revoke the provider key separately when access should end. Removal does not delete private files, undo crawls or revoke application client IDs.

## 17. Troubleshooting

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

## 18. API coverage and comparisons

| Offering | Reviewed surface | Strengths and limits |
| --- | --- | --- |
| [Official Brandfetch MCP](https://docs.brandfetch.com/mcp/overview) | Hosted OAuth / MCP bf1 tokens and official Python server source | Seven documented/current source tools: brand_search, get_brand, get_brand_data, get_brand_context, enrich_transaction, build_logo_urls and send_feedback. Provider maintained, interactive MCP Apps brand cards and bounded bf://asset streaming. No official runtime/tool discovery or hosted account login is claimed here. |
| [Official source](https://github.com/Brandfetch/brandfetch-mcp-server) | pyproject version 1.5.0, commit 0995f0f39a43206d9082945d8b424c449dc6147d | Python >=3.11,<3.12; HTTP deployment and per-request credential context. Its source already caps image streaming, checks allowed CDN hosts and distinguishes browser hotlinks from authenticated asset sources. These are not invented missing safeguards. |
| [Sourcescape external CLI](https://www.npmjs.com/package/@sourcescape/external) | @sourcescape/external 0.1.2; external / stc-ext | Actual published Brandfetch service source includes brand, search and svg purpose commands. Injected brand/search fixtures use global environment key/client ID and return full data. They have no named account argument, timeout signal or redirect policy in those handlers. Other generic service/router capabilities are not claimed absent. |
| [Community Python brandfetch](https://github.com/alfa-rsa/brandfetch) | PyPI brandfetch 0.4.0 metadata/README | Browser scraping and WHOIS CLI plus lookup_brand/search_brands/whois_lookup MCP tools. Different data and runtime approach; not an official REST SDK. No installation/provider benchmark is claimed. |
| [Community npm MCP](https://github.com/Eyalm321/brandfetch-mcp) | brandfetch-mcp-server 1.0.0 published source | MCP binary alternative. Inspected package declares no standalone task CLI. No live provider behavior or complete equivalence is claimed. |
| This owned integration | Shared task CLI, local stdio MCP, versioned desktop bundle | Fourteen shared tools, twelve reads/helpers and two mandatory-confirmation operations. Isolated named profiles, bounded ordered comparison, local output selection and approved exclusive private asset files. No hosted OAuth, MCP Apps card, feedback telemetry or automatic payment. |

Checked October 3, 2026. The actual Sourcescape published brand/search handlers ran with injected fetch and fixture-only credentials; no provider account was contacted. Their full fixture brand output retained a per-request credentialed asset src. Our equivalent fixture excludes that credential from output, routes named accounts without global fallback, derives CLI options from the same MCP schema and supports bounded comparison/private downloads. This demonstrates useful local workflow and output-policy differences, not overall product superiority.

The official MCP is a strong alternative when provider-managed OAuth, rich brand cards, resource streaming or feedback are the desired workflow. Its built_logo_urls supports multiple identifiers already. Our useful recurring task is scriptable brand/context/transaction retrieval and comparison across isolated accounts, followed by explicitly requested private file delivery. The shared MCP also makes those exact bounded local workflows available to stdio clients. More tool names and SEO alone do not justify this build.

The published OpenAPI search path embeds ?c={clientId}; this package routes c as a query parameter from the selected profile. The agent overview describes keyless search while the endpoint reference requires c; the package follows the endpoint's explicit client-ID contract and fails locally when it is missing. We have not tested credential-free provider search. Agent access/payment endpoints are deliberately excluded: no wallet, card, auto-purchase or credential rotation.

No live provider outcomes or desktop GUI installation are claimed; section 7 has this package's measured token costs, and no other offering was measured. Source/fixture evidence is recorded separately from public artifact and CMS release checks. Official and community versions should be rechecked for every update.

## 19. Versions and migration

| Component | Reviewed version / source |
| --- | --- |
| Owned wrapper / manifest | 3.0.1 |
| Brandfetch native API | V2 routes; OpenAPI info version 1.0.0 |
| OpenAPI snapshot | SHA-256 301955555b54cfdad90fcb655e70e7a8b5f6c53bf11362001b8d0b0de8d85bf0, October3 2026 |
| Official server source | pyproject 1.5.0 / 0995f0f39a43206d9082945d8b424c449dc6147d |
| Sourcescape external CLI | 0.1.2 published archive and injected handler fixtures |
| Community PyPI brandfetch | 0.4.0 metadata/README; not installed |
| Community npm MCP | brandfetch-mcp-server 1.0.0 inspected archive |
| @thenavidm/slipway | 0.1.17 |
| MCP TypeScript SDK, through Slipway | 2.3.0 |
| ajv | 8.20.0 |
| ajv-formats | 3.0.1 |
| typescript | 7.0.2 |
| vitest | 5.0.3 |
| vite | 8.3.2 |
| @anthropic-ai/mcpb | 2.1.2 |


Private legacy 1.0.0 declares seven MCP tools and no standalone task CLI. Private history remains separate; no earlier owned public npm/tag release is assumed. All seven names survive, but 2.0 intentionally changes unsafe/obsolete behavior:

| Legacy tool | 2.0 behavior |
| --- | --- |
| search_brands | Same query name; uses selected profile client ID in native c, no global Bearer assumption |
| get_brand | Same identifier/type names; current native data plus cachedOnly/allowNsfw, private asset src redaction |
| get_brand_colors / get_brand_fonts | Focused return with native routing/options; same provider quota as a brand read |
| get_logo_url | Separates identifier route from asset type; legacy icon accepted exclusively; browser-only display |
| download_brand_logos | Mandatory confirmation, explicit existing private output_dir, bounded exclusive files; no implicit home directory or overwrite |
| compare_brands | Same identifiers; sequential bounded profile workflow, stops/reports failure rather than silent parallel partial success |

BRANDFETCH_OUTPUT_DIR is retired; supply output_dir explicitly. CLI spelling uses hyphens while MCP names remain underscores. No automatic credential migration, payment or key rotation. Preserve and inspect old local outputs privately.

For maintenance, recheck official MCP/CLI alternatives and the native docs, review a fresh OpenAPI checksum, run source-input comparison and matched fixtures, regenerate runtime/docs/CMS input tables, align root/lock/manifest/tag, scan public source/artifacts, run platform CI and verify actual anonymous install/desktop/read-only/client/CMS rendering. Never execute downloaded vendor code as a schema updater or infer provider success from a metadata hash.

## 20. FAQ

<details>
<summary><b>What does this package provide?</b></summary>

Fourteen shared CLI/local MCP tools, twelve reads/helpers and two confirmed operations covering eleven current native V2 operations. It includes a versioned desktop bundle.

</details>

<details>
<summary><b>Does Brandfetch already have an official MCP?</b></summary>

Yes. It provides hosted OAuth/MCP tokens, brand data/context/search/enrichment, rich MCP Apps cards and bounded asset resources. The current source is compared explicitly.

</details>

<details>
<summary><b>Why maintain an owned version?</b></summary>

For a shared task CLI and bounded local workflows with isolated private profiles, selective output and approved exclusive local assets. Official hosted/card strengths remain useful.

</details>

<details>
<summary><b>Do community CLIs already exist?</b></summary>

Yes. Sourcescape external 0.1.2 has published Brandfetch commands; PyPI brandfetch 0.4.0 uses browser scraping/WHOIS. We do not claim CLI support is unique.

</details>

<details>
<summary><b>Can I use it in Codex?</b></summary>

Use the private stdio configuration or the CLI/SKILL route in INSTALL.md. Section 7 has what Codex 0.159.3 read for one task over each.

</details>

<details>
<summary><b>Does it have a desktop version?</b></summary>

The versioned .mcpb bundles production dependencies. Actual archive protocol checks and GUI installation are tracked separately.

</details>

<details>
<summary><b>Which operating systems are supported?</b></summary>

Manual Node22+ paths target macOS, Windows and Linux. CI checks all three on Node22/24. Windows private-file ACL protection must be configured by the owner.

</details>

<details>
<summary><b>Which credential do I need?</b></summary>

Brand API reads need a private REST API key. Search and browser logo construction need a separate application client ID. Official MCP bf1 tokens are not interchangeable.

</details>

<details>
<summary><b>Does login perform OAuth or purchase access?</b></summary>

No. It prints private setup instructions and does not store keys, refresh sessions, purchase access or use a wallet.

</details>

<details>
<summary><b>Can named profiles borrow a global key?</b></summary>

No. Every selected profile uses only its own key/file/client ID. Missing credentials fail locally rather than falling back.

</details>

<details>
<summary><b>Does read-only mean no provider costs?</b></summary>

No. It hides/refuses prefetch and local downloads, while ordinary brand/context/transaction reads can still use quota or crawl. cachedOnly controls supported cache misses.

</details>

<details>
<summary><b>What does a cached 204 mean?</b></summary>

The brand/context was not cached. The wrapper returns status204, cachedMiss:true and data:null without treating it as malformed JSON.

</details>

<details>
<summary><b>Does prefetch complete a crawl?</b></summary>

No. A confirmed HEAD can return202 queued or200 indexed. It never waits, polls or retries automatically.

</details>

<details>
<summary><b>Can I download a Logo API URL from the CLI?</b></summary>

No. Client-ID hotlinks are intended for direct browser display and programmatic fetching is blocked. Private downloads use original Brand API asset src URLs.

</details>

<details>
<summary><b>Where do private asset credentials go?</b></summary>

They remain inside the request client, are redacted from get_brand/model output and are used only for approved CDN requests. No credential URL manifest is saved.

</details>

<details>
<summary><b>Can a download overwrite my files?</b></summary>

No. It requires an existing owner-private directory and creates random files exclusively. Failure reports completed and reserved paths without deleting earlier results.

</details>

<details>
<summary><b>Does comparison continue after an error?</b></summary>

No. It reads two to five unique identifiers in order and stops on the first failure, reporting completed and remaining work.

</details>

<details>
<summary><b>Is interpreted context verified company information?</b></summary>

No. Brand Context is probabilistic interpretation. Review it; email/URL resolution also does not prove a person’s employer.

</details>

<details>
<summary><b>Is CLI more token-efficient than MCP?</b></summary>

It depends on the client and the task. In Claude Code the CLI costs nothing until it is used, plus about 4,400 tokens for `SKILL.md` once, where the server costs about 430 tokens a message with tool search and 5,200 with every tool loaded. In Codex, finding the logo download command and its flags took a median of 83,250 input tokens over the CLI and 43,633 over MCP. Section 7 has how each was measured.

</details>

<details>
<summary><b>How do I update or remove access?</b></summary>

Restart npx @latest, update global npm or install the new desktop bundle. Remove client entries and revoke provider credentials separately; private downloaded files remain.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/brandfetch-mcp-cli/issues). Use SECURITY.md for private reports.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. He creates useful free tools, MCP servers and CLIs that creators and founders can use in their own workflows.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

Runtime: Slipway, which brings the MCP TypeScript SDK, plus Ajv and ajv-formats. Development: TypeScript, Vitest, Vite and MCPB. Exact locked versions appear above. Packaging tools are excluded from desktop runtime.

## License

Preserves [AGPL-3.0-or-later](LICENSE) and existing private legacy history. Read [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Brandfetch service terms and trademarks remain separate.

---

© 2026 [Navid Media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme). Made with ❤️ by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=brandfetch-mcp-cli&utm_content=readme).
