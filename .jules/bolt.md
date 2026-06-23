## 2025-02-28 - Replace multiple mapping loops with a single imperative pass
**Learning:** In app.js, processing data arrays (like processos) with helper functions that iterate multiple times can cause severe bottlenecks. Avoid upfront O(N) mapping passes that create full object copies.
**Action:** Replace multiple independent iteration passes (like consecutive .map().filter() or multiple separate loop helpers) with a single imperative pass that computes all lists and maps concurrently.
