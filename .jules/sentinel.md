## 2024-05-24 - Remove Hardcoded Secrets
**Vulnerability:** Supabase URL and Anon Key were hardcoded in `app.js`.
**Learning:** Hardcoded credentials can easily be leaked in public repositories or to unauthorized users inspecting the client bundle.
**Prevention:** Always use environment variables, a `config.js` file loaded separately (and gitignored), or build-time injection to manage secrets and sensitive configuration values.
