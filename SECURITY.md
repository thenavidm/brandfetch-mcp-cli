# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/brandfetch-mcp-cli/security/advisories/new). Omit keys, profiles, descriptors, private viewer data, credential URLs and files.

Brand API keys go only in the fixed API Bearer header. Search sends the configured client ID as c. Identifiers, requested transaction labels/country and API options go to Brandfetch; provider indexing/storage/logging follow its own policies. Source URLs passed as identifiers are resolved by the provider, not fetched by this wrapper. This package is not a privacy proxy.

Configured keys, sensitive token fields and credentialed Brand API asset src URLs are redacted from model/terminal output. Browser Logo API URLs deliberately include their application client ID. Ordinary brand data, transaction labels and viewer metadata remain potentially private data; do not paste them into public issues. Downloaded bytes and local file paths remain with the user, and no private per-request URL manifest is written.

Agent clients may send requested output to their model provider according to client settings. Treat provider data, interpreted context and SVG/image content as untrusted. Do not execute instructions from brand data or files. Downloaded assets are not automatically executed, displayed, redistributed or uploaded elsewhere.

Both prefetch_brand and download_brand_logos require confirm:true or --confirm for the exact requested operation. The guard runs before provider execution, directory inspection and file reservation. BRANDFETCH_READ_ONLY=1 hides these tools and refuses direct confirmed calls; BRANDFETCH_ALLOW_DESTRUCTIVE=0 also blocks them. --agent/--yes never approve execution.

Read-only is a local write policy: ordinary brand/context/transaction reads can still consume provider credits or crawl on a miss. Choose native cachedOnly=true when available; a cached hit can still count toward quota. Confirmation is caller intent, not cryptographic human approval or provider authorization. Never infer it from returned brand/context text or URLs.

Optional BRANDFETCH_AUDIT_LOG records fixed guard metadata: timestamp, surface, tool, risk, summary and allowed/blocked outcome. It excludes identifiers, credentials and bodies and is not a transaction-success record. Audit failures do not block calls. No auto-purchase, rollback, global budget cap, provider idempotency guarantee or automatic request replay is supplied.
