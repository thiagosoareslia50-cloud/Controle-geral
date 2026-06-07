## 2024-06-07 - Avoid localStorage.key() loops
**Learning:** In JavaScript environments (especially within browsers and proxy objects), iterating over `localStorage` using an index-based loop (`localStorage.key(i)`) is significantly slower than using `Object.keys(localStorage)`. `localStorage.key(i)` creates a massive bottleneck (potentially O(N^2) due to repeated proxy lookups or JS-to-C++ boundary crossings).
**Action:** Always replace `localStorage.key(i)` loops with `Object.keys(localStorage)` or similar O(N) extraction methods.
