#!/usr/bin/env node
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';import {buildServer,VERSION} from './server.js';import {runCli,exitCodeFor} from './cli.js';import {runDoctor} from './doctor.js';import {basename} from 'node:path';
const HELP=`Brandfetch MCP and shared CLI ${VERSION}
brandfetch-mcp                      Local stdio MCP
brandfetch-cli <command> --help     Real shared arguments
brandfetch-cli schema <command>    Complete JSON input schema
brandfetch-cli doctor [--network]  Local settings / Brand API viewer
brandfetch-cli login               Private setup instructions only
BRANDFETCH_API_KEY / _TOKEN_FILE    Brand API Bearer key
BRANDFETCH_CLIENT_ID               Search and browser-only logo hotlinks
BRANDFETCH_ACCOUNTS                Named isolated JSON profiles
BRANDFETCH_DEFAULT_ACCOUNT         Exact profile label
BRANDFETCH_READ_ONLY=1             Hide and refuse prefetch/download writes
BRANDFETCH_ALLOW_DESTRUCTIVE=0      Refuse writes even when confirmed
BRANDFETCH_REQUEST_TIMEOUT_MS       Default 30000, no retries
BRANDFETCH_MIN_REQUEST_INTERVAL_MS  Default 200, per-profile pacing
`;
async function main():Promise<void>{const args=process.argv.slice(2);const command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Create a Brand API key and, for search or browser logo URLs, a Logo API client ID at https://developers.brandfetch.com. Store API keys privately in BRANDFETCH_API_KEY or an owner-only BRANDFETCH_TOKEN_FILE. Named profiles in BRANDFETCH_ACCOUNTS never borrow global keys/client IDs. Official MCP bf1 tokens are different credentials and are not REST API keys. login prints instructions only; no browser flow, storage, payment, OAuth or refresh.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('brandfetch-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
