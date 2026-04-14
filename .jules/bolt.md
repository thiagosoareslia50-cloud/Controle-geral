## 2025-02-09 - Single-pass iteration optimization
**Learning:** `buildMapData` in `app.js` builds dozens of lookup structures by making redundant iterations (via `dct`, `multi`, `lst`) over `processos` (O(M * N) complexity).
**Action:** Always prefer a single iteration over large arrays to populate all lookup dictionaries, maps, and sets simultaneously, falling back to a `.sort()` over the keys if ordered list returns are needed. This saves redundant O(N) loops.
