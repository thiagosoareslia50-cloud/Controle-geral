## 2025-02-12 - Upgrade password hashing to PBKDF2
**Vulnerability:** Passwords were hashed using un-iterated SHA-256 via the Web Crypto API.
**Learning:** The previous implementation used `crypto.subtle.digest("SHA-256", ...)`, which is fast and susceptible to brute-force and dictionary attacks.
**Prevention:** Upgraded the hashing algorithm to use PBKDF2 with 100,000 iterations to securely hash passwords, preventing rapid offline attacks. A backward-compatible fallback was added to transparently upgrade existing hashes upon successful login.
