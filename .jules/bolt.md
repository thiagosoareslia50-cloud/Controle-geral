## 2025-04-21 - O(N) Array.find to O(1) Map lookups for datasets
**Learning:** Frequent O(N) linear searches (`Array.find`) on large datasets (like `processos`) inside user events or list processing create significant performance bottlenecks. Converting them to memoized O(1) Maps is a clean, scalable fix.
**Action:** When working with large datasets, memoize a lookup `Map` early in the component lifecycle and use it instead of `.find()`. Always ensure map initialization handles missing/empty keys gracefully and preserves first-match behavior if replacing `.find()`.
