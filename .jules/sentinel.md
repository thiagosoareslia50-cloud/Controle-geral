## 2025-05-18 - Hardcoded Supabase Credentials
**Vulnerability:** Found hardcoded SUPABASE_URL and SUPABASE_ANON_KEY with fallback values in `storage.js` that were committed to the repository.
**Learning:** Hardcoding cloud service credentials in source code exposes the backend to unauthorized access, potentially leading to data breaches or service abuse. The application was incorrectly relying on hardcoded fallbacks instead of safely handling missing environment variables during local development.
**Prevention:** Avoid committing credentials. Use environment variables (e.g. `window.ENV`) and ensure proper runtime checks (e.g., `if (SUPABASE_URL && SUPABASE_ANON_KEY)`) exist to prevent fatal initialization errors when credentials are empty during local development.
