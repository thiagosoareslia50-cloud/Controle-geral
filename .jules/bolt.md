## 2025-05-18 - Optimized buildMapData processing

**Learning:** Processing data arrays (like processos) with helper functions that iterate multiple times can cause severe bottlenecks if operations like String(val).trim() are inside the loops. Using mapping arrays across all properties consumes a lot of memory.
**Action:** Use a dynamic lazy-caching approach via a WeakMap to cache trimmed values only when they are accessed, rather than pre-calculating them for all properties.
