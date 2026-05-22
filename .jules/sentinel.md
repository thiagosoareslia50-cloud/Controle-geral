## 2024-06-05 - Insecure Password Hashing (Un-iterated SHA-256)
**Vulnerability:** The application was hashing passwords using a single iteration of SHA-256 (`crypto.subtle.digest("SHA-256", ...)`) instead of a robust Key Derivation Function (KDF).
**Learning:** This existed because the Web Crypto API's `digest` method is easier to implement than setting up `deriveBits` with PBKDF2, leading to weak hashes susceptible to dictionary/brute-force attacks.
**Prevention:** Always use a proper KDF like PBKDF2, Argon2, or bcrypt with an appropriate number of iterations (e.g., 100,000 for PBKDF2-HMAC-SHA256) when storing passwords. Maintain backward compatibility during upgrades by attempting verification against the new algorithm first, then falling back to the legacy algorithm.
