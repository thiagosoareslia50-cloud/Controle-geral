## 2024-05-18 - Upgrade Password Hash to PBKDF2
**Vulnerability:** Weak un-iterated SHA-256 password hashing makes passwords vulnerable to brute-force and dictionary attacks if the database is compromised.
**Learning:** Legacy authentication systems sometimes use simple hashing. To upgrade them safely without locking out users, we can employ an opportunistic upgrade strategy where successful legacy logins trigger a re-hash using the new strong algorithm (PBKDF2) and save it.
**Prevention:** Always use key derivation functions (like PBKDF2, Argon2, or bcrypt) with random salts and sufficient iterations for password hashing instead of simple digest algorithms.
