## 2025-01-20 - Upgrade Password Hashing to PBKDF2
**Vulnerability:** Passwords were hashed using a single uniterated SHA-256 digest, making them vulnerable to offline dictionary and brute-force attacks.
**Learning:** Client-side authentication needs iterated key derivation (like PBKDF2 via Web Crypto API) to protect passwords. Legacy hashes can be opportunistically upgraded during login without incrementing schema versions or breaking existing users.
**Prevention:** Always use standard key derivation functions (PBKDF2/Argon2) with appropriate iteration counts instead of plain hash functions when storing or verifying passwords.
