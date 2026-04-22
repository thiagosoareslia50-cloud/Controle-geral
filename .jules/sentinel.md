## 2026-04-22 - Remove hardcoded Supabase credentials
**Vulnerability:** Hardcoded Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY) were found in the codebase (`app.js`), allowing anyone with access to the source code to potentially access the Supabase project.
**Learning:** Hardcoded secrets are a critical security vulnerability.
**Prevention:** Use an environment variable configuration script (`config.js` with `window.ENV`) that is added to `.gitignore` and ignored from version control to securely load configuration variables at runtime. Provide a `config.example.js` file with placeholder values.
