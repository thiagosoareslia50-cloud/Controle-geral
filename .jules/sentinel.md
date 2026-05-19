## 2024-05-19 - Stronger Password Hashing with PBKDF2
**Vulnerability:** Weak un-iterated SHA-256 password hashing.
**Learning:** Using simple un-iterated hashing mechanisms like SHA-256 makes hashes extremely vulnerable to dictionary or brute-force attacks if leaked.
**Prevention:** Always use a standard key derivation function such as PBKDF2 with sufficient iterations (e.g., 100,000) or argon2. Maintain backward compatibility with a fallback to legacy hashing schemes when upgrading to prevent locking out existing users.
