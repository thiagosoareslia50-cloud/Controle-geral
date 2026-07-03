## 2024-05-18 - Hardcoded Supabase Keys

**Vulnerability:** Found hardcoded Supabase URL and anon key as fallback strings in `storage.js`.
**Learning:** The fallback values were added for local development convenience but expose the production/development database credentials directly to the client if environment variables fail to load or are viewed in source control. Even if it's an 'anon key', exposing it explicitly bypasses intended security boundaries.
**Prevention:** Use empty strings for local fallbacks and conditionally initialize clients (like `supabase.createClient`) only when valid credentials exist. Use `.env` files for local development.
