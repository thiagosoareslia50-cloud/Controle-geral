## 2024-06-20 - Upgrade Un-iterated Password Hash
**Vulnerability:** Passwords were hashed using a single round of SHA-256 (`crypto.subtle.digest`), making them vulnerable to rapid offline brute-force and dictionary attacks.
**Learning:** When upgrading client-side authentication schemas to stronger algorithms (like PBKDF2), the schema version (e.g. `USERS_SCHEMA_V`) should not be incremented if that resets the default admin password. Instead, keep the legacy function to preserve backward compatibility.
**Prevention:** Always use iterated key derivation functions (like PBKDF2, Argon2, or bcrypt) for hashing passwords to slow down brute force attacks, and use opportunistic upgrades during login to seamlessly update hashes.
