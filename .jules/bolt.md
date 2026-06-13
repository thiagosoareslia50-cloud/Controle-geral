## 2024-06-13 - O(N^2) Bottleneck in localStorage proxy and Multiple Loop iterations
**Learning:** Using an index-based loop over `localStorage.key(i)` can create an O(N^2) bottleneck due to proxy lookups or JS-to-C++ boundary crossings on each iteration. Also, processing data arrays with helper functions that iterate the same list multiple times causes severe performance issues.
**Action:** Use `Object.keys(localStorage)` which extracts keys in O(N) time. Combine multiple independent iteration passes into a single pass.
