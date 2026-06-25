## 2025-02-23 - Optimize _buildMapDataInner iteration

**Learning:** When generating multiple mappings (dictionaries, sets, lists) from a large array of objects (like `processos`), iterating over the array repeatedly for each desired mapping (as done by creating separate helper functions and calling them 33 times) causes a severe performance bottleneck. The overhead of repeatedly accessing array elements and re-evaluating properties dominates execution time.

**Action:** Replace multiple independent `for` loop iterations with a single imperative pass over the data array. Compute all necessary dictionaries, lists, and sets concurrently within that single loop. This changes the time complexity from O(K * N) to O(N), where K is the number of mappings, yielding a measurable speedup.
