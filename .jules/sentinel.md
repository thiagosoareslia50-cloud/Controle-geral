## 2024-05-17 - Upgrade insecure password hashing to PBKDF2
**Vulnerability:** Passwords are hashed using un-iterated SHA-256 with a salt, which is fast and vulnerable to offline dictionary/brute-force attacks.
**Learning:** Found in `hashSenha` function. Legacy systems often rely on basic hash algorithms without iterations.
**Prevention:** Always use modern algorithms with high iteration counts (like PBKDF2, Argon2, bcrypt) for password storage, and importantly, maintain backward compatibility when upgrading so existing users aren't locked out.
