## 2024-06-06 - Optimize localStorage iteration
**Learning:** Iterating over `localStorage` using an index-based loop with `localStorage.key(i)` can introduce an O(N^2) bottleneck due to repeated proxy lookups or JS-to-C++ boundary crossings.
**Action:** Use `Object.keys(localStorage)` to extract all keys in O(N) time when full iteration is necessary.
