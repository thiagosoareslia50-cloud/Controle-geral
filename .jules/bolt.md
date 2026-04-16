## 2024-05-15 - [Single-Pass Iteration for Multiple Map Extraction]
**Learning:** Extracting multiple maps, sets, or lists from a single large dataset (like `processos`) by iterating over it repeatedly with helper functions (like `dct`, `lst`, `multi` in `buildMapData`) is an O(K*N) operation and a significant performance bottleneck.
**Action:** When deriving multiple index structures or metadata lookups from a large dataset, use a single-pass iteration (O(N)) to populate all required maps and sets simultaneously. Wait to convert sets to sorted arrays until after the single pass completes.
