## 2024-06-17 - Avoid localStorage.key(i) iterations
**Learning:** Iterating over `localStorage` using an index-based loop (`localStorage.key(i)`) creates an O(N^2) bottleneck due to repeated proxy lookups or JS-to-C++ boundary crossings.
**Action:** Always use `Object.keys(localStorage)` to extract all keys in O(N) time when needing to iterate over all items in LocalStorage. Include a fallback for environments where LocalStorage keys might not be enumerable.
