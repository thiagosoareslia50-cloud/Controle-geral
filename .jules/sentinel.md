## 2024-05-24 - Hardcoded Secrets in Client-side Applications
**Vulnerability:** Supabase URL and ANON KEY were hardcoded directly in `app.js`.
**Learning:** Pure frontend applications without a build step are prone to storing secrets inline. This makes them vulnerable if the code is public or shared.
**Prevention:** Externalize secrets into a `config.js` file, add `config.js` to `.gitignore`, provide a `config.example.js` template, and load the environment dynamically via `window.ENV` or `process.env`.
