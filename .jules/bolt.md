## 2025-02-12 - [Single-pass mapping over N*30 iteration loops]
**Learning:** In a codebase that uses inline arrays of large data rows (like `processos`), executing 30 individual linear iterations to map lists/unique sets creates a noticeable CPU lag compared to a single hard-coded loop.
**Action:** When extracting multiple sets and maps from the same large array, consolidate all extractions into a single `for...of` loop and sort the aggregated data structures at the very end.
