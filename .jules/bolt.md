## 2025-01-20 - O(n) Single-Pass Optimizations
**Learning:** In heavy data-processing utility functions on the frontend like `buildMapData` and `_numsSeguros`, using functional map/filter combinations that iterate over the array multiple times adds a severe performance penalty, particularly on string processing.
**Action:** Replace multiple-pass `.map().filter()` or consecutive loops with a single imperative pass where possible.
