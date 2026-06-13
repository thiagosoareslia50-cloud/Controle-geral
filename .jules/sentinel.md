## 2024-05-20 - Upgraded Client-Side Authentication Hashing to PBKDF2
**Vulnerability:** Weak un-iterated SHA-256 password hashing.
**Learning:** Legacy authentication systems sometimes use simple hashing, vulnerable to brute-force attacks.
**Prevention:** Upgrade to a strong Key Derivation Function (KDF) like PBKDF2, scrypt, or Argon2. Use opportunistic upgrades to maintain backward compatibility.
