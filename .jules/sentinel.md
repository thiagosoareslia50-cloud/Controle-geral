## 2024-06-02 - Upgraded Password Hashing to PBKDF2
**Vulnerability:** Weak, un-iterated SHA-256 password hashing logic for user authentication (`hashSenha` function) allows brute-forcing attacks offline.
**Learning:** Legacy authentication systems in single-page apps often rely on simple client-side digests instead of secure key derivation functions like PBKDF2 due to historical constraints or lack of awareness of Web Crypto API's capabilities.
**Prevention:** Implement PBKDF2 with at least 100,000 iterations for password hashing. When upgrading, provide backward compatibility through an opportunistic update process (`hashSenhaLegacy` fallback) that transparently re-hashes passwords upon successful legacy login to avoid locking out existing users.
