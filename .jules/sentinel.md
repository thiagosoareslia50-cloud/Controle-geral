## 2024-05-18 - Remove Hardcoded Supabase Credentials
**Vulnerability:** Hardcoded Supabase URL and Anon Key were found in `storage.js` as fallback values.
**Learning:** Hardcoding credentials, even as fallbacks for local development, exposes sensitive access keys to version control and public inspection.
**Prevention:** Always rely entirely on environment variables (e.g., `window.ENV.SUPABASE_URL`) for secrets and handle missing configurations gracefully without executing client instantiations.
