## 2024-05-18 - [Migrate to PBKDF2 Password Hashing]
**Vulnerability:** Weak SHA-256 password hashing.
**Learning:** SHA-256 without key stretching is susceptible to dictionary and brute-force attacks.
**Prevention:** Upgraded password hashing to use PBKDF2 with 600,000 iterations for stronger security.
