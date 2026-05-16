## 2024-05-16 - Replace Weak Password Hashing with PBKDF2
**Vulnerability:** The application used a simple, un-iterated SHA-256 hash `crypto.subtle.digest("SHA-256", e.encode(salt + senha))` for hashing passwords, which is vulnerable to offline dictionary and brute-force attacks.
**Learning:** For client-side cryptographic functions in this codebase using `crypto.subtle`, more robust key derivation methods like PBKDF2 must be used instead of simple one-way digests to protect stored credentials adequately.
**Prevention:** Always use computationally intensive algorithms like PBKDF2 or Argon2 (if available) for hashing passwords. With the Web Crypto API, first use `importKey` to load the password as raw key material, then derive the hash using `deriveBits` with at least 100,000 iterations.
