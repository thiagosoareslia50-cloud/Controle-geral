
## 2025-05-17 - O(N) vs O(N^2) in LocalStorage enumeration
**Learning:** Enumerating `localStorage` via an index-based loop (`localStorage.key(i)`) can be extremely slow (O(N^2) behavior in some implementations, but effectively very slow as elements increase) compared to `Object.keys(localStorage)` (O(N)) when a large number of items are stored. This becomes a significant bottleneck during the offline fallback fetch in the Storage layer (`ST.list`) where thousands of records may be iterated.
**Action:** Always use `Object.keys(localStorage)` for full-iteration of local storage, avoiding the manual index loop and `localStorage.key(i)`.
