## 2025-01-20 - Upgrading password hashing with Opportunistic Upgrades
**Vulnerability:** Client-side password hashes were stored using un-iterated SHA-256, which is vulnerable to brute-force and dictionary attacks.
**Learning:** Upgrading hashing algorithms on existing users requires maintaining backward compatibility. Opportunistic upgrades gracefully re-hash passwords on successful legacy logins without locking users out.
**Prevention:** Ensure new applications use strong algorithms like PBKDF2 or Argon2 out of the box, and employ opportunistic upgrades when deprecating legacy hashing schemes.
