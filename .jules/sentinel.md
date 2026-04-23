## 2024-05-16 - [Hardcoded Secrets Removal]
**Vulnerability:** Supabase URL and API keys were hardcoded directly in `app.js`.
**Learning:** These variables can be exposed to version control or in built files, presenting a security risk.
**Prevention:** Always use environment variables, and implement `config.js` with placeholders in `config.example.js` for secrets handling in the application.
