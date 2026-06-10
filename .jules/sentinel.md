## 2024-10-24 - Passwords Hashing Algorithm Enhancement
**Vulnerability:** Passwords were obfuscated using a single iteration of SHA-256 without any key derivation function.
**Learning:** Using an un-iterated, non-specialized hash function for password hashing makes it significantly faster and easier for attackers to execute brute-force and dictionary attacks compared to an algorithm deliberately designed for hashing passwords like PBKDF2 or Argon2.
**Prevention:** Upgraded the application to use PBKDF2 with 100,000 iterations to make brute forcing computationally expensive. Added an opportunistic upgrade that allows seamless login for older accounts while transparently upgrading their hashes to the new format upon next successful login.
