export type Account={name:string;apiToken:string;tokenFile:string;clientId:string};
export type Config={accounts:Account[];defaultAccount:string;readOnly:boolean;allowDestructive:boolean;auditPath:string;timeoutMs:number;minIntervalMs:number};
function integer(v:string|undefined,fallback:number,min:number,max:number){const n=v?Number(v):fallback;if(!Number.isInteger(n)||n<min||n>max)throw Error('Invalid request timeout or pacing settings.');return n;}
export function loadConfig(env:NodeJS.ProcessEnv=process.env):Config{
 let entries:Record<string,unknown>[]=[];
 if(env.BRANDFETCH_ACCOUNTS){try{const v=JSON.parse(env.BRANDFETCH_ACCOUNTS);if(!Array.isArray(v))throw Error();entries=v;}catch{throw Error('BRANDFETCH_ACCOUNTS must be a private JSON array of named profiles.');}}
 else if(env.BRANDFETCH_API_KEY||env.BRANDFETCH_TOKEN_FILE||env.BRANDFETCH_CLIENT_ID)entries=[{name:'default',api_key:env.BRANDFETCH_API_KEY,token_file:env.BRANDFETCH_TOKEN_FILE,client_id:env.BRANDFETCH_CLIENT_ID}];
 const accounts=entries.map(x=>{if(!x||typeof x!=='object'||typeof x.name!=='string'||!x.name.trim())throw Error('Every Brandfetch profile requires a nonempty name.');for(const k of ['api_key','token_file','client_id'])if(x[k]!==undefined&&(typeof x[k]!=='string'||/[\r\n]/.test(x[k]as string)))throw Error('Private Brandfetch profile settings must be strings without line breaks.');return{name:x.name.trim(),apiToken:String(x.api_key??''),tokenFile:String(x.token_file??''),clientId:String(x.client_id??'')};});
 if(new Set(accounts.map(a=>a.name)).size!==accounts.length)throw Error('Brandfetch profile names must be unique.');
 const defaultAccount=env.BRANDFETCH_DEFAULT_ACCOUNT??accounts[0]?.name??'';if(defaultAccount&&!accounts.some(a=>a.name===defaultAccount))throw Error('Unknown BRANDFETCH_DEFAULT_ACCOUNT.');
 return{accounts,defaultAccount,readOnly:/^(1|true)$/i.test(env.BRANDFETCH_READ_ONLY??''),allowDestructive:!/^(0|false)$/i.test(env.BRANDFETCH_ALLOW_DESTRUCTIVE??''),auditPath:env.BRANDFETCH_AUDIT_LOG??'',timeoutMs:integer(env.BRANDFETCH_REQUEST_TIMEOUT_MS,30000,100,300000),minIntervalMs:integer(env.BRANDFETCH_MIN_REQUEST_INTERVAL_MS,200,0,10000)};
}
export function selectAccount(c:Config,hint?:string):Account{const a=c.accounts.find(a=>a.name===(hint??c.defaultAccount));if(!a)throw Error(c.accounts.length?'Unknown profile; run list_accounts and use its exact label.':'No credentials configured. Set BRANDFETCH_API_KEY or BRANDFETCH_TOKEN_FILE privately; run brandfetch-cli login.');return a;}
