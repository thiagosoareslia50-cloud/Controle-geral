## 2024-05-15 - Upgraded Password Hashing to PBKDF2
**Vulnerability:** The application used weak password hashing (SHA-256(salt + password)) which is susceptible to brute-force and dictionary attacks due to its speed.
**Learning:** Migrating to a secure hashing algorithm in an existing system requires a seamless transition path to prevent locking out existing users.
**Prevention:** Always use a standardized key derivation function like PBKDF2, Argon2, or bcrypt with an appropriate work factor (e.g., 600,000 iterations for PBKDF2-HMAC-SHA256). Implement a transparent migration flow during login to upgrade legacy hashes automatically upon successful authentication.
