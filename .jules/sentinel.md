## 2024-05-27 - [Sentinel: Backward Compatibility in Password Hashing Upgrades]
**Vulnerability:** Weak un-iterated SHA-256 password hashing.
**Learning:** When upgrading to a more secure hashing algorithm (like PBKDF2), modifying the verification function without a fallback causes all existing users to be locked out because their stored hashes don't match the new algorithm.
**Prevention:** Always maintain the legacy hash function and implement fallback verification logic (attempt new algorithm first, then legacy) to seamlessly support existing hashes. Additionally, implement an opportunistic upgrade where successful legacy authentication transparently re-hashes and saves the password securely.
