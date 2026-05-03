## 2024-05-24 - Remove Hardcoded Secrets
**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js` which could expose the Supabase database.
**Learning:** Hardcoded credentials within the frontend source code can be easily accessed by anyone with access to the codebase or the compiled/served source, compromising the associated resources.
**Prevention:** Always load sensitive credentials using environment variables or a configuration file that is explicitly ignored in version control (`.gitignore`). Use template files (like `config.example.js`) to instruct other developers how to set up the configuration.
