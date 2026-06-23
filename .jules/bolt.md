## 2025-03-05 - O(N) instead of O(M*N) mapping passes
**Learning:** Processing data arrays with helper functions that iterate multiple times creates severe bottlenecks. In `app.js`, `_buildMapDataInner` called multiple helpers (`dct`, `lst`, `multi`), creating ~35 full passes over the processes array.
**Action:** Replace multiple independent iteration passes with a single imperative pass that computes all lists and maps concurrently (O(N) instead of O(M*N)).
