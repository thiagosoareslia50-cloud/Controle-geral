## 2024-05-18 - Remove Hardcoded Secrets
**Vulnerability:** Supabase API URL and Anon Key were hardcoded directly in `app.js`.
**Learning:** Hardcoding credentials exposes sensitive access keys to version control systems and end users, leading to potential unauthorized access.
**Prevention:** Externalize configurations to a `config.js` file ignored by Git. Use an environment variable abstraction (like `window.ENV`) in browser-based applications and commit a `config.example.js` template to guide developers.
