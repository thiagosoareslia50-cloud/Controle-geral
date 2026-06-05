## 2025-06-05 - Migrated password hashing to PBKDF2
**Vulnerability:** Passwords were computationally cheap to crack due to un-iterated SHA-256 hashing.
**Learning:** Found existing legacy `hashSenha` function using `crypto.subtle.digest("SHA-256")`. Learned how to implement a transparent, backward-compatible opportunistic upgrade during the login flow without breaking existing users.
**Prevention:** Always use modern, key derivation functions (e.g. PBKDF2, Argon2) for password hashing and ensure that backwards compatibility mechanisms are in place when changing security primitives on an existing database.
