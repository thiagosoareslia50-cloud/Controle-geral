## 2024-06-28 - Removed hardcoded API keys from storage.js
**Vulnerability:** Found hardcoded Supabase URL and Anon Key in `storage.js` which could allow unauthorized access to the database.
**Learning:** Hardcoding secrets directly in the source code file exposes them to version control and publicly via the client bundle.
**Prevention:** Always use environment variables (`window.ENV.SUPABASE_ANON_KEY`) to inject secrets at runtime, and provide empty string fallbacks for local development, ensuring no sensitive keys are ever committed to the repository.
