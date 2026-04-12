## 2024-05-18 - Single Pass Data Extraction Pattern
**Learning:** Extracting multiple maps, sets, or lists from a single large dataset by repeatedly using array comprehension or `map`/`reduce` is computationally expensive (O(M*N)) where M is the number of extractions.
**Action:** Replace multiple iteration helper functions with a single iteration block `for (const item of data)` and populate all required outputs simultaneously to achieve O(N) complexity.
