## 2024-04-25 - O(N) Data Aggregation
**Learning:** Consolidating multiple O(N) loops into a single pass when extracting multiple subsets/maps from a large unstructured dataset (like Excel imports) offers immense performance gains in this environment, particularly because V8 can optimize the single loop with explicit property accesses.
**Action:** When creating derived structures (Sets, Maps, Lists) from a large array, always use a single loop rather than separate mapping/filter functions.
