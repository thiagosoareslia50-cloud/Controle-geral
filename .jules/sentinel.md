## 2026-05-12 - Update password hashing to PBKDF2
**Vulnerability:** Weak password hashing using single-round SHA-256.
**Learning:** Legacy systems often use fast cryptographic hashes (like SHA-256) instead of purposefully slow, iterative password derivation functions (like PBKDF2, Argon2, bcrypt). This makes them vulnerable to brute-force and dictionary attacks.
**Prevention:** Always use a standard key derivation function (KDF) like PBKDF2, bcrypt, or Argon2 for password hashing.
