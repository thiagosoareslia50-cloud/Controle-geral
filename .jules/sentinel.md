## 2025-02-14 - Fix Hardcoded Supabase Credentials
**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` were directly included in `app.js`.
**Learning:** Hardcoding credentials makes them susceptible to being leaked when source code is exposed. It also prevents different environments (dev/prod) from having distinct databases, and makes rotating secrets difficult without pushing new commits.
**Prevention:** Keep sensitive keys in external configurations (like `.env` or `config.js` tracked in `.gitignore`) and inject them during runtime or build.
