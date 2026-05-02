## 2024-05-18 - [Hardcoded API Keys]
**Vulnerability:** Found hardcoded SUPABASE_URL and SUPABASE_ANON_KEY in `app.js`.
**Learning:** Hardcoding secrets inside source code tracks them into version control, making them readable by anyone who accesses the repo. This leads to leaked credentials.
**Prevention:** Use a `config.js` file attached to `window.ENV` (or `process.env` in Node) to load secrets. `config.js` should be added to `.gitignore`, and a `config.example.js` should be provided for developers.
