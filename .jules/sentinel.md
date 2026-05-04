## YYYY-MM-DD - [Remove hardcoded Supabase secrets]
**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js` (CRITICAL).
**Learning:** Hardcoded credentials should be avoided at all times. Here we extract credentials to a local config file `config.js` loaded in the browser context via `index.html` (since no bundler is used). We also set up `process.env` fallback for Node.js tests.
**Prevention:** Track `config.js` in `.gitignore` and supply `config.example.js` as a template.
