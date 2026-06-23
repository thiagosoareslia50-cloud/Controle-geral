## 2026-05-21 - Password Hashing Upgrade
**Vulnerability:** Weak un-iterated SHA-256 used for password hashing.
**Learning:** When upgrading authentication schemas in buildless clients using Web Crypto API, maintain backward compatibility by keeping the legacy hash function and attempting it as a fallback to prevent user lockouts.
**Prevention:** Always use a standard KDF like PBKDF2 (min 100,000 iterations), scrypt, or Argon2 instead of raw hashing for passwords.
