## 2025-06-14 - Replace fast hashing with PBKDF2
**Vulnerability:** Passwords are hashed with plain `SHA-256`, which is a fast hash function and susceptible to brute-force and dictionary attacks.
**Learning:** `SHA-256` is natively available via WebCrypto and is often chosen for its simplicity, but it's not a password hashing algorithm.
**Prevention:** Always use a slow, iterated hashing algorithm like PBKDF2, Argon2, or bcrypt for passwords. In browser-only environments, PBKDF2 is the best natively-supported choice via `crypto.subtle`.
