## 2024-05-24 - Single Pass Data Mapping Optimization
**Learning:** Found a severe performance bottleneck in `_buildMapDataInner` where helper functions (`dct`, `lst`, `multi`) were causing 36 independent O(N) passes over the `processos` array. For large datasets, this caused significant overhead.
**Action:** When building complex maps and lists from a single large array, avoid using multiple map/filter/reduce passes. Use a single imperative `for` loop to concurrently extract all properties and populate all target data structures in an O(N) pass.
