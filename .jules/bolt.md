## 2026-05-23 - LocalStorage Enumeration Bottleneck
**Learning:** In browser environments and JS engines, enumerating `localStorage` via an index-based loop (`localStorage.key(i)`) can exhibit O(N^2) performance characteristics because each `key(i)` call may require traversing the underlying storage map.
**Action:** Always prefer `Object.keys(localStorage)` or `Object.entries(localStorage)` when you need to iterate over all stored items, as they retrieve all enumerable keys in a single O(N) operation.
