## 2024-05-24 - Remove Hardcoded API Keys
**Vulnerability:** Hardcoded Supabase URL and Anon Key fallbacks were found in `storage.js`.
**Learning:** These credentials can be extracted from client-side bundles and expose the database to unauthorized access.
**Prevention:** Always rely on environment variables (`window.ENV`) without providing sensitive fallback values in the source code.
