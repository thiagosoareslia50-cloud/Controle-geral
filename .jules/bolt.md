## 2026-04-11 - Single-Pass Data Structure Aggregation
**Learning:** The legacy codebase used repetitive helpers (`dct`, `lst`, `multi`) that iterated over large datasets (`processos`) multiple times (O(31*N)) to extract related dictionaries and sets. This is a codebase-specific anti-pattern.
**Action:** When extracting multiple maps, sets, or lists from a single large dataset, use a single-pass iteration (O(N)) to populate all required structures simultaneously rather than executing repeated linear searches or array comprehensions.
