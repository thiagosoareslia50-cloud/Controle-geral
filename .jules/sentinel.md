
## 2024-05-07 - Implement PBKDF2 Password Hashing with Automated Migration
**Vulnerability:** The application used a weak and fast hashing algorithm (SHA-256) for storing passwords, making them vulnerable to offline brute-force and rainbow table attacks.
**Learning:** Upgrading hashing algorithms on an existing database requires a seamless migration strategy so as not to break existing user logins. Replacing the old hash function entirely would render old passwords invalid.
**Prevention:** Implement secure hashing algorithms (like PBKDF2, Argon2, or bcrypt) from the start. When migrating, keep the legacy hashing algorithm available. On a successful login using the legacy hash, automatically re-hash the provided plaintext password with the new secure algorithm and update the database record with a version flag (e.g., `v: 2`). This securely upgrades users over time without friction.
