## 2024-06-17 - Weak Password Hashing (Un-iterated SHA-256)
**Vulnerability:** Passwords were being hashed using a single round of SHA-256 (`crypto.subtle.digest("SHA-256", e.encode(salt + senha))`).
**Learning:** Simple hashing, even with a salt, is insufficient for password storage because modern hardware can compute billions of SHA hashes per second, making brute-force and dictionary attacks trivial.
**Prevention:** Always use a purposely slow, compute-intensive Key Derivation Function (KDF) like PBKDF2, bcrypt, or Argon2 with an appropriate number of iterations (e.g., 100,000+ for PBKDF2 with SHA-256).
