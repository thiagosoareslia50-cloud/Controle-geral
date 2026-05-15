## 2024-05-24 - Optimize localStorage enumeration
**Learning:** Index-based loops (`localStorage.key(i)`) are extremely slow for large numbers of items in `localStorage`, resulting in O(N^2) complexity. In a local benchmark with 15k items, it took ~40s, compared to ~11ms when using `Object.keys(localStorage)`.
**Action:** Use `Object.keys(localStorage)` or `Object.entries(localStorage)` instead of `for (let i = 0; i < localStorage.length; i++)` when enumerating over `localStorage` items.
