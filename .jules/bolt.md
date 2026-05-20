## 2024-05-20 - [Excel Import Loop Optimization]
**Learning:** Pre-caching repetitive operations out of nested loops, such as header string normalization and key lookups, can dramatically improve execution time when parsing large data structures like Excel sheets (84% improvement observed).
**Action:** Always inspect inner loops processing datasets for computations (like dictionary lookups or parsing functions) that rely solely on column indices, and hoist them into a pre-computed array before the row iteration begins.
