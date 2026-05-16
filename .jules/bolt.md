## 2024-05-16 - Replace index-based localStorage loop with Object.keys()
**Learning:** Calling `localStorage.key(i)` in a loop crosses the JS-to-native boundary multiple times, leading to $O(N^2)$ time complexity for iterating over `localStorage`. `Object.keys(localStorage)` prevents this by crossing the boundary once and returning an array of string keys.
**Action:** Always prefer `Object.keys(localStorage)` or `Object.entries(localStorage)` over index-based loops when iterating through `localStorage` to avoid hidden performance bottlenecks.
