## 2025-05-24 - Combine Multiple O(N) Loop Passes
**Learning:** Using multiple independent `useMemo` hooks that iterate over the same large array (like `filtered.forEach` or `filtered.reduce`) creates severe O(N * M) performance bottlenecks where M is the number of metrics.
**Action:** Combine dependent aggregations into a single imperative pass inside one `useMemo` that evaluates everything concurrently in true O(N), returning a destructured metrics object to maintain clean JSX references.
