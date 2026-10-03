# Brandfetch comparisons

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

No matched successful Codex task/token measurements, live provider outcomes or desktop GUI installation are claimed. Source/fixture evidence is recorded separately from public artifact and CMS release checks. Official and community versions should be rechecked for every update.


| Route | What reaches the agent | What is proven |
| --- | --- | --- |
| Local MCP | Client-dependent names, schemas/instructions and requested results | Real shared discovery and fixture protocol behavior |
| Shared CLI | Available skill/help and selected output | Same handlers, profiles, validation and guards |
| Official MCP | Hosted OAuth, rich cards/resources and provider tools | Current docs/source inspected; hosted task not benchmarked |
| Focused colors/fonts/comparison | Requested fields with explicit bounds | Output filtering and request caps, not measured token savings |

No fresh matched Codex measurements are published. Measure actual API usage, identical successful tasks/resources/permissions, client/model/package versions and date. Schema characters divided by four, another repo's numbers or counts do not establish efficiency. MCP schema loading depends on the client. Neither surface requires Claude Code; its measurements are deferred at Navid's instruction.
