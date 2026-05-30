## 2024-05-30 - Optimize localStorage iteration
**Learning:** In JavaScript environments, using an index-based loop with `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings).
**Action:** Use `Object.keys(localStorage)` which extracts all keys in O(N) time when iterating over localStorage.
