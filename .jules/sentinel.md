## 2024-04-13 - [Hardcoded Secrets Removal]
**Vulnerability:** Supabase URL and anonymous key were hardcoded directly in `app.js`. This poses a security risk if the repository is made public or accessed by unauthorized individuals.
**Learning:** Hardcoding secrets is a common mistake when prototyping. It's crucial to externalize configuration to prevent accidental leakage.
**Prevention:** Always use environment variables or a separate, git-ignored configuration file (like `config.js` with a `config.example.js` template) to manage sensitive information. Ensure these files are properly ignored in version control (`.gitignore`).
