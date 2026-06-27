## 2024-05-24 - Remove Hardcoded Supabase Secrets
**Vulnerability:** Hardcoded Supabase URL and Anon Key were present in `storage.js` fallbacks.
**Learning:** Hardcoded credentials in source code can be extracted and abused, leading to unauthorized access.
**Prevention:** Always rely on environment variables (e.g., `window.ENV`) for sensitive configuration. When providing fallbacks for local development, use empty strings and conditionally initialize clients to avoid exposing real keys.
