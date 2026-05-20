## 2025-02-14 - Fix Weak Password Hashing Algorithm
**Vulnerability:** Weak un-iterated SHA-256 hash used for password storage without key stretching.
**Learning:** This existed because the application opted for a simple hashing method initially for speed, but this leaves stored hashes vulnerable to dictionary and brute-force attacks if the database is exposed. Backward compatibility is essential when upgrading authentication schemas.
**Prevention:** Use standard key derivation functions like PBKDF2, Argon2, or bcrypt with appropriate iterations/work factors out of the box instead of simple digest hashing.
