## 2024-04-27 - Implement PBKDF2 Password Hashing and Automated Migration Strategy
**Vulnerability:** Weak Password Hashing (SHA-256)
**Learning:** The legacy system used a fast, single-iteration SHA-256 hash for passwords, which is susceptible to offline brute-force attacks. However, upgrading the hashing algorithm immediately invalidates existing passwords.
**Prevention:** Implement PBKDF2 with a high iteration count (e.g., 600,000) for new passwords. For existing users, employ a transparent migration strategy: verify passwords using the legacy hash upon their next login, and immediately re-hash and save them using the secure PBKDF2 method with a version flag (e.g., `v: 2`). This ensures robust security without disrupting the user experience.
