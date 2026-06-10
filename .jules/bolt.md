## 2024-06-10 - Replace O(N^2) localStorage lookup with O(N)
**Learning:** In JavaScript environments, iterating over `localStorage` using an index-based loop with `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings).
**Action:** Instead, use `Object.keys(localStorage)` which extracts all keys in O(N) time.
