# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.13. The 14 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A person approves each write over MCP.** `prefetch_brand` and `download_brand_logos` still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `BRANDFETCH_CONFIRM=model` makes it enough everywhere. The audit log records who approved each write.
- **`BRANDFETCH_ALLOW_DESTRUCTIVE=0` still refuses both**, confirmed or not, as 2.0 did.
- **Brandfetch's status picks the exit code.** A request Brandfetch rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, a rate limit or spent quota (402 and 429) 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that downloads a brand's logo files took a median of 83,250 input tokens over the CLI instead of 103,759 (five runs each): every 2.0.1 run guessed a `download` command that does not exist, because 2.0.1's help listed none, and every 3.0.0 run asked `which`.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`brandfetch-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Less work to start.** Each input schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 171 ms of CPU before its first answer where 2.0.1 spent 212 (median of 21 runs, taking turns on one busy Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending.

### Upgrading

Over MCP, expect an approval prompt or form before a prefetch or a download; a headless agent that should do either with `confirm: true` alone needs `BRANDFETCH_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`). Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `BRANDFETCH_READ_ONLY=1`, a client that calls a hidden write gets "tool not found" instead of a refusal naming `BRANDFETCH_READ_ONLY`; the CLI still names it. The audit log's lines gain `confirmed_by`, and each allowed write is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `BRANDFETCH_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 226 tokens, for `which`, `install`, the flags, the settings and the exit codes it now lists; the command list by 16; `download-brand-logos --help` by 22 and `prefetch-brand --help` by 12; and a missing argument's error by 14, for its code and a hint. `SKILL.md` is 66 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/brandfetch-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `brandfetch-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.0 - 2026-10-03

- Refresh the private seven-tool MCP as the shared house TypeScript CLI, local stdio MCP and versioned desktop bundle.
- Cover eleven current native V2 operations through fourteen task tools, including all seven legacy names.
- Add isolated named key/file/client-ID profiles, exact current cache-only semantics, bounded ordered comparison and sanitized per-request asset output.
- Require explicit confirmation for prefetch and private downloads; enforce direct-call read-only and disabled-operation policies.
- Download only original Brand API assets into exclusive private files, with no API key forwarded, redirects, hotlink evasion or automatic replay.
- Preserve AGPL/private legacy history and document complete arguments, clients/OS, current official/community comparisons and maintenance evidence.

## 1.0.0 - private legacy source

Seven MCP-only registrations, no declared task CLI. Private history retained; no earlier owned public npm/tag release assumed.

| Component | Reviewed version / source |
| --- | --- |
| Owned wrapper / manifest | 2.0.0 |
| Brandfetch native API | V2 routes; OpenAPI info version 1.0.0 |
| OpenAPI snapshot | SHA-256 301955555b54cfdad90fcb655e70e7a8b5f6c53bf11362001b8d0b0de8d85bf0, October3 2026 |
| Official server source | pyproject 1.5.0 / 0995f0f39a43206d9082945d8b424c449dc6147d |
| Sourcescape external CLI | 0.1.2 published archive and injected handler fixtures |
| Community PyPI brandfetch | 0.4.0 metadata/README; not installed |
| Community npm MCP | brandfetch-mcp-server 1.0.0 inspected archive |
| @modelcontextprotocol/sdk | 1.32.0 |
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
