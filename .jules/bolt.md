## 2024-06-14 - Single-pass Concurrent Mapping for Data Processing
**Learning:** In this codebase, the `buildMapData` function originally made 27 separate O(N) passes over the `processos` array to construct various lookups, performing identical `String().trim()` coercions on each pass. This caused severe bottlenecks due to redundant string allocations and iterations.
**Action:** Replace multiple independent iteration passes across the same dataset with a single imperative pass that computes all required lists, sets, and maps concurrently to minimize string coercions and allocations.
