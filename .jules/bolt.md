## 2025-04-26 - Single-Pass Loop Optimization for Map Computations
**Learning:** Extracting multiple maps, sets, and multi-mappings via single-pass hardcoded iterations directly outperforms using multi-pass O(M*N) array helper abstractions for large datasets like `processos`.
**Action:** When encountering heavy dataset processing using helper functions like `dct` and `lst` over loops, consider restructuring into a single iteration where all properties are extracted simultaneously.
