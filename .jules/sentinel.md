## 2024-05-24 - Hardcoded Supabase Secrets in Frontend
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallbacks in `storage.js`, exposing the project configuration to the frontend bundle permanently.
**Learning:** Hardcoding credentials as fallbacks meant that even if environment variables (`window.ENV`) were missing or not configured correctly in the CI/CD pipeline, the app would inadvertently fall back to those exposed secrets, opening up a potential vector for unauthorized database access.
**Prevention:** Always set API keys as environment variables or retrieve them securely. Initialize clients conditionally to prevent errors when keys are not populated, e.g., checking `(supabase && URL && KEY)` before calling `createClient`.
