## 2024-05-24 - Remove hardcoded Supabase credentials
**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` fallbacks in `src/storage.js`.
**Learning:** Hardcoding API keys and URLs in source code exposes sensitive configuration to anyone with access to the codebase or the compiled output.
**Prevention:** Always use environment variables for sensitive configuration and never provide production keys as fallback values in the source code.
