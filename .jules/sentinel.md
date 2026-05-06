## 2024-05-06 - Hardcoded Supabase Credentials
**Vulnerability:** Supabase API keys (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) were hardcoded in `app.js`.
**Learning:** Hardcoding API keys exposes secrets in version control and across all environments, increasing the risk of unauthorized database access. In buildless environments, configuration files can be used to inject variables into the global window object.
**Prevention:** Avoid committing credentials to the repository. Store sensitive variables in `.gitignore`-tracked configuration files (like `config.js`) and provide dummy templates (like `config.example.js`). Read variables from environment APIs gracefully (e.g., `process.env` or `window.ENV`).
