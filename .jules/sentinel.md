## 2024-07-08 - Hardcoded Supabase Secrets

**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` were present in the source code of `storage.js` as fallback values.
**Learning:** These keys could be easily exposed to attackers. The configuration should not include hardcoded secrets in the source code as fallback values.
**Prevention:** Ensure that external keys and configurations are provided solely via environment variables, and implement robust null-checks in client instantiation to handle missing keys gracefully in development.
