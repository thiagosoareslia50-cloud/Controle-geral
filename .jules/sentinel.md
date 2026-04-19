## 2024-05-15 - Hardcoded Supabase Credentials
**Vulnerability:** Supabase credentials (SUPABASE_URL and SUPABASE_ANON_KEY) were hardcoded directly in `app.js`.
**Learning:** Hardcoding credentials exposes sensitive access keys to anyone who can view the source code.
**Prevention:** Store credentials in an external configuration file (e.g., `config.js` loaded via script tag) that is ignored by source control (`.gitignore`), and provide a dummy template (`config.example.js`) for developers. Read from this configuration or environment variables dynamically.
