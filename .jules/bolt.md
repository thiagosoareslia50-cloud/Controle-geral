## 2024-05-24 - O(N) LocalStorage iteration
**Learning:** Iterating over `localStorage` via an index-based loop with `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings).
**Action:** Use `Object.keys(localStorage)` which extracts all keys in O(N) time. Always include a fallback logic to support environments where LocalStorage keys might not be enumerable.
