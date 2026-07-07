## 2024-05-24 - Avoid O(N^2) Performance Bottleneck in Data Mapping
**Learning:** In React components dealing with large datasets (e.g., `processos` and `historico`), using `.find()` inside a `.map()` block inside a `useMemo` triggers an O(N^2) operation, causing significant UI freezing when the lists grow.
**Action:** Always pre-compute a `Map` (Hash Map) in O(N) prior to the `map` operation to achieve near O(1) lookups, bringing the overall time complexity down to O(N) and preserving responsive UI rendering.
