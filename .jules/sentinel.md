## 2024-05-24 - Upgrade Password Hashing to PBKDF2
**Vulnerability:** Passwords were hashed using a single round of SHA-256 via the Web Crypto API, leaving them susceptible to brute-force and dictionary attacks if the hash and salt are exposed.
**Learning:** The legacy system implemented un-iterated SHA-256 for password hashing. When upgrading to PBKDF2 with 100,000 iterations to improve security, backward compatibility was preserved by retaining the legacy hash function and falling back to it during authentication if the new hash doesn't match.
**Prevention:** Always use a computationally expensive key derivation function like PBKDF2, bcrypt, or Argon2 for password hashing rather than simple cryptographic hashes, and ensure a migration path exists so existing users aren't locked out.
