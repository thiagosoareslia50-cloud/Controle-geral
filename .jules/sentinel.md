## 2024-04-16 - [Hardcoded Secrets Extracted]
**Vulnerability:** Supabase URL and anonymous key were hardcoded directly in `app.js`, a public frontend script.
**Learning:** Even though anonymous keys have limited permissions, hardcoding them risks exposing application backend endpoints and resources to abuse. Keeping environment-specific configuration separate from application logic is critical for security and maintainability.
**Prevention:** Externalized configuration logic by creating a `config.js` file (ignored via `.gitignore`) that loads variables onto `window.ENV`. Added `config.example.js` as a template. `app.js` now dynamically reads from `window.ENV` or `process.env`.
