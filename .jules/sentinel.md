## 2024-05-16 - Hardcoded Supabase API Keys
**Vulnerability:** Found hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `storage.js` fallback assignment.
**Learning:** Even fallback values for environment variables should not contain sensitive production credentials directly in source code.
**Prevention:** Use an empty string or a safe dummy value as a fallback, or enforce strict environment variable injection during the build/deployment pipeline without fallback defaults.
