## 2025-02-15 - Hardcoded Secrets in Client-Side App
**Vulnerability:** The application had hardcoded Supabase credentials (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) directly within `app.js`.
**Learning:** In a single-page React application without a build system (like Vite or Webpack), environment variables cannot be injected at build time. Hardcoding them exposes sensitive keys directly to the client.
**Prevention:** Use an external configuration script (`config.js`) that attaches variables to a global object (`window.ENV`) in the browser. Add `config.js` to `.gitignore` to prevent committing secrets, and provide a `config.example.js` template.
