## 2024-05-05 - [Upgrade weak password hashing to PBKDF2]
**Vulnerability:** The application was using a single round of SHA-256 for password hashing, which is very fast and vulnerable to brute-force and dictionary attacks.
**Learning:** It's important to use a slow hashing algorithm like PBKDF2 with a high iteration count (e.g. 600,000) for password hashing to slow down attackers. It's also possible to automatically migrate users from a legacy weak hash to a strong hash upon successful login using a versioning flag.
**Prevention:** Always use a standard, slow password hashing algorithm like PBKDF2, bcrypt, scrypt, or Argon2 instead of fast cryptographic hashes like SHA-256 or MD5 for storing passwords.
