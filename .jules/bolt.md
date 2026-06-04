## 2024-06-04 - Optimize localStorage iteration
**Learning:** Iterating over localStorage using index-based loop (`localStorage.key(i)`) is significantly slower due to repeated JS-to-C++ boundary crossings or proxy lookups.
**Action:** Always use `Object.keys(localStorage)` when full iteration is needed to extract keys in O(N) time upfront.
