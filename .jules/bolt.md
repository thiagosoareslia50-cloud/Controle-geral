## 2024-05-29 - Optimize localStorage iteration
**Learning:** Using `localStorage.key(i)` in a loop can be O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings in certain environments (as noted in memory).
**Action:** Replace `for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); ... }` with `const keys = Object.keys(localStorage); for (let i = 0; i < keys.length; i++) { const k = keys[i]; ... }` to achieve O(N) iteration time.
