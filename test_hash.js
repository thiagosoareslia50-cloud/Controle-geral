const { webcrypto } = require('crypto');
global.crypto = webcrypto;

async function hashSenhaLegacy(salt, senha) {
  const e = new TextEncoder(),
    b = await crypto.subtle.digest("SHA-256", e.encode(salt + senha));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}

async function hashSenhaPBKDF2(salt, senha) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(senha),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const saltBuf = enc.encode(salt);
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuf,
      iterations: 600000, // OWASP recommendation for PBKDF2-HMAC-SHA256
      hash: "SHA-256"
    },
    keyMaterial,
    256 // Length in bits
  );

  return [...new Uint8Array(derivedBits)].map(x => x.toString(16).padStart(2, "0")).join("");
}

async function run() {
  const legacy = await hashSenhaLegacy("123", "password");
  const pbkdf2 = await hashSenhaPBKDF2("123", "password");
  console.log("Legacy:", legacy);
  console.log("PBKDF2:", pbkdf2);
}
run();
