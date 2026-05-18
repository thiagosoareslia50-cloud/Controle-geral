## 2025-05-18 - First Run Vulnerability
**Vulnerability:** A hardcoded default password ("admin123") was configured in `app.js` to create the initial admin account. This bypassed the first run flow completely.
**Learning:** Default static credentials are a major risk for first-time deployments, especially when creating the initial database user via the client.
**Prevention:** Avoid hardcoded credentials. Use a first-run flow to prompt the user to establish secure credentials for the first user if the user store is uninitialized.
