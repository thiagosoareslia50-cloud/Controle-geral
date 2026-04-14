## 2024-04-14 - [Hardcoded Supabase Credentials in Frontend Client]
**Vulnerability:** Supabase credentials (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) were hardcoded in `app.js`.
**Learning:** Hardcoding credentials exposes them directly in version control and potentially to end users (though these keys are intended for the client, putting them in the source tree is bad practice for a public repo). The application gracefully falls back to local storage if these are not provided.
**Prevention:** Store configuration in a separate `config.js` loaded at runtime, ensure `.gitignore` excludes it, and provide a `config.example.js`.
