## 2024-06-02 - Optimize string manipulation inside loops
**Learning:** Found that the `buildMapData` function performed expensive `String(val).trim()` operations inside nested helper functions, causing redundant processing over thousands of items multiple times.
**Action:** Pre-calculate and cache the trimmed string values of necessary fields once at the beginning of the function and pass those values to helper inner functions. This simple optimization reduces repeated allocations and string operations, drastically improving overall processing speed when rendering data.
