## 2024-05-28 - Optimizing LocalStorage Iteration
**Learning:** Iterating over `localStorage` using an index-based loop `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings). `Object.keys(localStorage)` extracts all keys in O(N) time.
**Action:** Always use `Object.keys(localStorage)` to iterate over local storage keys, but include a fallback logic for environments where keys might not be enumerable (`if (keys.length === 0 && localStorage.length > 0)`).
