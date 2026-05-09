## 2024-05-24 - Single-pass iteration map building
**Learning:** Consolidating multiple property lookups into a single O(N) array traversal for building lookup dictionaries drastically reduces CPU time compared to using generic helpers that iterate O(M x N) times, where M is the number of keys.
**Action:** When extracting multiple mappings from a dataset simultaneously, default to a single loop building all dictionaries and sets concurrently.
