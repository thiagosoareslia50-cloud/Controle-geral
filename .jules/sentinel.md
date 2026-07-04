## 2024-07-04 - Hardcoded Supabase Credentials
**Vulnerability:** Hardcoded Supabase URL and Anon Key in `storage.js` fallback configuration.
**Learning:** Hardcoding credentials as fallbacks for development convenience exposes them in the production bundle if environment variables are misconfigured or omitted.
**Prevention:** Always rely strictly on environment variables injected at build time, and implement safe fallback logic that fails gracefully (e.g., conditionally initializing the client) when credentials are not present.
