## 2024-05-24 - Hardcoded Supabase Secrets
**Vulnerability:** Hardcoded SUPABASE_URL and SUPABASE_ANON_KEY found as fallbacks in storage.js.
**Learning:** Fallbacks were added for local development but inadvertently exposed production or sensitive credentials in the source code.
**Prevention:** Use environment variables (e.g. window.ENV) exclusively, leaving fallbacks empty and guarding client initialization against empty strings.
