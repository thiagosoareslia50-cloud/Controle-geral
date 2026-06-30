## 2024-05-18 - Replacing inefficient loops over large arrays
**Learning:** Found multiple instances where large arrays were being processed sequentially using `.map()` chained with `.filter()`, which results in two O(n) iterations. Furthermore, iteration through `localStorage.key(i)` is O(n^2) performance bottleneck compared to extracting `Object.keys()` once.
**Action:** Replace `map().filter()` with `reduce()` for single pass array processing, and use single for loops for O(N) optimizations where applicable. For `localStorage`, fetch `Object.keys()` to iterate through keys.
