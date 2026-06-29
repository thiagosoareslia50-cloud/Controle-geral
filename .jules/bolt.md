## 2024-10-24 - Single Pass Imperative Optimization
**Learning:** Processing data arrays with helper functions that iterate multiple times (e.g. 36 separate loops over the same array to extract different dictionaries and lists) causes severe O(N*M) bottlenecks.
**Action:** Replace multiple independent iteration passes with a single imperative pass that computes all lists and maps concurrently.
