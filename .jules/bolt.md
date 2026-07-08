## 2024-07-08 - Replaced O(N^2) `.find()` within `.map()` with O(N) Hash Map
**Learning:** In React components that cross-reference data from multiple large arrays (`processos` and `historico`), calling `processos.find()` inside `historico.map()` inside a `useMemo` creates an O(N^2) bottleneck. This occurs frequently when stitching denormalized dataset entities together for display lists.
**Action:** Always pre-compute a `Map` (Hash Map) object in O(N) from the array being searched (`processos`) before iterating over the other array (`historico`).
