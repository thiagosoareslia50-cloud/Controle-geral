## 2024-11-20 - Optimize MapData Caching Iterations
**Learning:** Using multiple independent `.map()` or `.filter()` equivalent iteration passes on large arrays (like `processos`) can cause severe bottlenecks, especially when each pass involves operations like `String(val).trim()`. In this codebase, `_buildMapDataInner` was iterating over `processos` 31 times.
**Action:** Avoid upfront O(N) mapping passes that create full object copies. Replace multiple independent iteration passes with a single imperative pass that computes all lists and maps concurrently.
