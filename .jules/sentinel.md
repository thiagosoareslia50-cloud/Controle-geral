## 2024-05-26 - [Upgrade weak password hashing to PBKDF2]
**Vulnerability:** Weak un-iterated SHA-256 password hashing.
**Learning:** Legacy un-iterated hashes existed and new authentication schemes need to retain a backward-compatible fallback using `legacyHashSenha` while testing the new `hashSenha` first. The system relies on Web Crypto API (`crypto.subtle`) for hashing.
**Prevention:** Always use a minimum 100,000 iterations for PBKDF2 or equivalent modern password hashing schemes directly from the beginning.
