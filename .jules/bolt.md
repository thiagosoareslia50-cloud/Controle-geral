## 2024-05-24 - O(N) Iteration Pass Optimization in Map Building
**Learning:** The `buildMapData` function originally performed 33 individual iteration passes over the entire `processos` array to build mapping structures. This upfront O(N*33) mapping caused significant CPU bottlenecks when loading the application or when the context re-rendered with a large number of records.
**Action:** Avoid multiple independent iteration passes (like consecutive `.map().filter()` or multiple loops building sets/dicts). Instead, compute all maps concurrently in a single imperative pass.
