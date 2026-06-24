## 2026-06-24 - Upgrade weak password hashing to PBKDF2
**Vulnerability:** Passwords were automatically hashed using single-iteration SHA-256 (`crypto.subtle.digest`), making them highly susceptible to dictionary and brute-force attacks if the database is leaked.
**Learning:** Using fast cryptographic hash functions like SHA-256 is inadequate for passwords. The codebase lacked key-stretching mechanisms.
**Prevention:** Use a key derivation function with a high iteration count, such as PBKDF2 with 100,000 iterations, Argon2, or bcrypt, to exponentially increase the computation cost for an attacker. We also applied opportunistic upgrading so legacy logins are not broken but automatically migrated.
