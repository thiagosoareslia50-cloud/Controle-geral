## 2024-05-24 - Upgrading Password Hashing to PBKDF2
**Vulnerability:** Weak, un-iterated SHA-256 hashing for passwords
**Learning:** Client-side authentication needs to maintain backward compatibility during schema upgrades to avoid locking out existing users. Opportunistic upgrades on successful legacy auth transparently re-hash passwords.
**Prevention:** Use established algorithms with adequate work factors like PBKDF2, scrypt, or Argon2 by default for password hashing. Incorporate legacy fallback with opportunistic upgrade when changing algorithms.
