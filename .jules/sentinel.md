## 2024-05-18 - Upgrade Weak Password Hashing Opportunistically
**Vulnerability:** Weak, non-iterated SHA-256 algorithm used for hashing user passwords.
**Learning:** A simple SHA-256 digest is fast and weak against brute-force attacks. However, when upgrading the hash algorithm to PBKDF2 on a live system, we cannot invalidate existing passwords. An opportunistic upgrade strategy was implemented within the `checkLogin` function to upgrade hashes seamlessly without requiring a system-wide reset or incrementing the `USERS_SCHEMA_V` counter.
**Prevention:** Use an iterated derivation function like PBKDF2 (with at least 100,000 iterations) or bcrypt/Argon2 for passwords. Keep backward compatibility through opportunistic upgrades when security parameters change.
