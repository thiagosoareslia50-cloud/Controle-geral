## 2024-05-22 - Optimize localStorage Iteration
**Learning:** Enumerating `localStorage` via an index-based loop (`localStorage.key(i)`) is significantly slower (O(N^2)) than using `Object.keys(localStorage)` (O(N)). `Object.keys(localStorage)` safely returns only user-stored enumerable keys as strings.
**Action:** Always prefer `Object.keys(localStorage)` or `Object.entries(localStorage)` over index-based iteration when scanning localStorage keys.
