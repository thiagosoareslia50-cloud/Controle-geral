
## 2024-04-24 - Avoid abstraction penalty in repeated dataset parsing
**Learning:** In V8, extracting multiple structural maps (lists, multi-maps) via repeated loops with closure-based abstraction helpers (`dct`, `lst`, `multi`) over large datasets is an O(K*N) operation (K=31). The function call overhead and multiple linear scans are costly.
**Action:** Replace multiple abstraction-based array passes with a single hardcoded loop using direct variable assignments to build all O(N) lookup maps and sets simultaneously. Wait until the very end to convert collected sets into sorted arrays.
