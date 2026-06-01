## 2024-06-01 - Upgrading Password Hashing Scheme
**Vulnerability:** Weak un-iterated SHA-256 password hashing used for user authentication.
**Learning:** Legacy algorithms were used directly from Web Crypto digest instead of PBKDF2. A fallback mechanism is essential to prevent locking out existing users while upgrading hashes transparently.
**Prevention:** Use PBKDF2 with at least 100,000 iterations for password hashing and maintain a legacy fallback path with opportunistic upgrades when changing client-side auth schemas.
