## 2024-06-22 - Optimize localStorage Iteration
**Learning:** Iterating over `localStorage` using an index-based loop (`localStorage.key(i)`) creates an O(N^2) performance bottleneck due to repeated proxy lookups or JS-to-C++ boundary crossings in browser environments.
**Action:** Always use `Object.keys(localStorage)` to extract all keys in O(N) time, and include a fallback logic for environments where LocalStorage keys might not be enumerable.
