## 2024-05-25 - Upgrade password hashing to PBKDF2
**Vulnerability:** Weak un-iterated SHA-256 hash used for passwords.
**Learning:** Legacy systems often start with simple SHA-256 for password hashing. We need backward compatibility when migrating live systems so we don't lock out users.
**Prevention:** Use computationally expensive algorithms like PBKDF2, Argon2 or bcrypt for new password storage. Provide a fallback login step that checks the legacy algorithm and, optionally, auto-upgrades the hash.
