## 2024-05-20 - Pre-calculate trimmed strings before multiple iteration passes
**Learning:** In app.js, processing data arrays (like processos) with helper functions that iterate multiple times can cause severe bottlenecks if operations like String(val).trim() are inside the loops. When building map data, there were ~33 separate iterations over the same array, causing the same string trimming to be computed redundantly.
**Action:** Pre-calculate and cache these trimmed string values in an initial O(N) pass to reduce execution time significantly.
