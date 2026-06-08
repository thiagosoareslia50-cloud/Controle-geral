## 2024-06-08 - Upgrade Password Hashing to PBKDF2
**Vulnerability:** The application used un-iterated SHA-256 for password hashing, which is fast and susceptible to brute-force and dictionary attacks.
**Learning:** Upgrading client-side hashing algorithms must maintain backward compatibility. Attempting validation against the new algorithm first and falling back to the legacy one prevents existing users from being locked out.
**Prevention:** Always use a slow, iterated hashing algorithm like PBKDF2, Argon2, or bcrypt for passwords. Implement an opportunistic upgrade strategy to transparently re-hash passwords on successful login.
