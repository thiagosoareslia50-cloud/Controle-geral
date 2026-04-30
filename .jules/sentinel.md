## 2024-04-30 - Extract hardcoded secrets
**Vulnerability:** Supabase URL and anonymous key were hardcoded in `app.js` and exposed in version control.
**Learning:** Even though "publishable" keys are meant for public clients, keeping configuration hardcoded in code limits flexibility, clutters source control with environment-specific values, and gets flagged by security scanners. Furthermore, hardcoded values prevent seamless switching between dev/prod instances.
**Prevention:** Always externalize configuration using environment variables or a separate ignored config file (`config.js`) for static/no-build projects. Include a `config.example.js` to serve as documentation.
