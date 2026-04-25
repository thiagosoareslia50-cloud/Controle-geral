## 2024-06-25 - Upgrade password hashing to PBKDF2
**Vulnerability:** Weak password hashing using plain SHA-256 with simple salt concatenation.
**Learning:** Found existing plain SHA-256 implementation inside `app.js` (`hashSenha`). Such hashes are vulnerable to brute-force and dictionary attacks.
**Prevention:** Upgraded to use PBKDF2 with 600,000 iterations using `crypto.subtle`. Added a version flag (`v: 2`) to gracefully migrate existing legacy SHA-256 users on successful login. Future password storage should default to robust key derivation functions like PBKDF2, Argon2, or bcrypt.
