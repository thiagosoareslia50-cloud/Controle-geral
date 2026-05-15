## 2025-05-15 - [Weak Password Storage]
**Vulnerability:** Passwords were automatically hashed with a single iteration of SHA-256 (`crypto.subtle.digest`), making them highly susceptible to offline brute-force and dictionary attacks if the store is compromised.
**Learning:** Due to the local-first or purely front-end design, secure storage must be manually configured in JavaScript. Simply using `crypto.subtle.digest` isn't enough for passwords.
**Prevention:** Always use PBKDF2 with sufficient iterations (e.g., 600,000) or stronger algorithms (like Argon2) for password hashing. A transparent versioning strategy (`v: 2`) allows seamless migration for users upon next login.
