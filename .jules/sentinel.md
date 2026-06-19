## 2024-05-19 - Weak Password Hashing with SHA-256
**Vulnerability:** Passwords were automatically hashed using simple SHA-256 (digest) rather than a key derivation function (KDF) like PBKDF2 or Argon2. This made the hashes susceptible to brute-force and dictionary attacks if the data storage is compromised.
**Learning:** Upgrading auth mechanisms requires backwards compatibility so users don't get locked out. We have to implement opportunistic hashing where we authenticate with the old hash, and if successful, upgrade to the new secure hash silently.
**Prevention:** Always use modern key derivation functions (like PBKDF2 with at least 100k iterations, or Argon2) for storing passwords instead of plain hashing algorithms.
