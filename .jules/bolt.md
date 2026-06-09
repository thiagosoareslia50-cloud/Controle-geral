## 2024-06-09 - Optimizing buildMapData with pre-caching
**Learning:** The `buildMapData` function processes an array of items with a high cost when calling `String().trim()` repeatedly inside multiple loops (nested via inline helper functions `dct`, `lst`, `multi`). For 10,000 items, this resulted in executing over 300ms.
**Action:** Pre-calculate and cache the trimmed string values for required columns into an array in a single initial O(N) pass, reducing redundant conversions and trimming and lowering the execution time by ~80% (from ~300ms to ~60ms).
