## 2024-07-06 - Remove Hardcoded Supabase Credentials
**Vulnerability:** Hardcoded `SUPABASE_URL` and `SUPABASE_ANON_KEY` credentials in `storage.js` used as a local fallback.
**Learning:** Hardcoded credentials leak sensitive database access into client-side code. Removing them requires also wrapping the client initialization in a conditional check (`(window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) ? ...`) to prevent fatal runtime errors when instantiated with empty strings.
**Prevention:** Ensure configuration defaults to empty strings in source control, injecting actual credentials exclusively via environment variables (`window.ENV`).
