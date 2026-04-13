// config.example.js - Template for local configuration
// Copy this file to config.js and replace placeholder values with your actual keys.
// config.js is ignored by git to prevent secret leakage.

const config = {
  SUPABASE_URL: "https://your-project.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key"
};

if (typeof window !== 'undefined') {
  window.ENV = config;
}

// Node.js fallback for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
