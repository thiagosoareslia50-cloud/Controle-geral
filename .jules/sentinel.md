## 2024-04-26 - Remove Hardcoded Secrets
**Vulnerability:** Hardcoded API keys (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) in the source code (`app.js`).
**Learning:** Hardcoding secrets exposes them in the source code, making them easily accessible and risking unauthorized access if the source code is compromised or published. It was found in `app.js` directly within the repository.
**Prevention:** Use environment variables and external configuration files (e.g., `config.js` added to `.gitignore`) to manage secrets dynamically. Ensure templates (`config.example.js`) are provided to guide developers without exposing real credentials.
