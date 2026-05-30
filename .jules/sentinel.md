## $(date +%Y-%m-%d) - Upgrade password hashing algorithm
**Vulnerability:** Weak un-iterated SHA-256 hash used for passwords.
**Learning:** Legacy password fallback mechanisms are necessary to not lock users out during an upgrade.
**Prevention:** Always use established algorithms like PBKDF2 with sufficient iterations for new implementations.
