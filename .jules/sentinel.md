## 2024-05-10 - PBKDF2 Password Hashing Missing
**Vulnerability:** The application currently hashes passwords using a simple `SHA-256(salt + password)` approach.
**Learning:** `SHA-256` is a fast cryptographic digest function, making it vulnerable to brute-force and dictionary attacks when used for password hashing, even with a salt.
**Prevention:** Always use a slow, computationally expensive Key Derivation Function (KDF) like `PBKDF2`, `bcrypt`, or `Argon2` for password hashing to mitigate brute-force attacks. The current memory hints suggest using PBKDF2 with 600,000 iterations and a `v: 2` flag for automatic migration.
