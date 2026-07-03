## 2024-05-24 - Optimize localStorage iteration
**Learning:** Iterating over `localStorage` using an index-based loop with `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings).
**Action:** Use `Object.keys(localStorage)` which extracts all keys in O(N) time. Always include a fallback logic (`if (keys.length === 0 && localStorage.length > 0) { ...push localStorage.key(j) }`) to support environments where LocalStorage keys might not be enumerable.
