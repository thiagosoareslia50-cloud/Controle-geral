## 2024-10-24 - Upgrade Password Hashing to PBKDF2
**Vulnerability:** Passwords were conceptually hashed using only a single iteration of SHA-256 via Web Crypto API.
**Learning:** Single iteration hashing is extremely fast, making it vulnerable to brute-force or dictionary attacks if hashes are exposed. The Web Crypto API supports PBKDF2 but requires an explicit `importKey` step before `deriveBits` can be used.
**Prevention:** Implement PBKDF2 with 100,000 iterations for password hashing and maintain a legacy fallback mechanism to perform opportunistic hash upgrades for existing users upon their next successful login.
