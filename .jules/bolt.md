## 2025-07-05 - O(N^2) Bottlenecks in useMemo with nested .find()
**Learning:** Using `.find()` inside a `.map()` during a `useMemo` calculation for large data arrays creates a severe O(N^2) performance bottleneck, blocking the main thread and making the UI unresponsive during re-renders.
**Action:** Always pre-compute a `Map` (Hash Map) in O(N) time prior to the `.map()` operation when calculating derived dependencies to ensure fast O(N) execution and responsive performance.
