## 2024-06-06 - Weak Password Hashing Upgraded to PBKDF2
**Vulnerability:** Passwords were saved using a fast, single-iteration SHA-256 hash, increasing risk against brute-force attacks.
**Learning:** Legacy design prioritized simplicity but lacked modern cryptographic constraints (like hashing iterations) necessary to thwart modern dictionary attacks.
**Prevention:** Upgraded logic to use PBKDF2 with 100,000 iterations via Web Crypto API, establishing a backward compatibility and opportunistic upgrade process to transparently migrate users from legacy hashing during successful logins.
