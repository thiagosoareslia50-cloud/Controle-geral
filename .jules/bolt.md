## 2024-06-05 - Optimize LocalStorage Iteration and Data Processing

**Learning:** Iterating over `localStorage` in JavaScript environments using an index-based loop with `localStorage.key(i)` can be significantly slower (potentially O(N^2) due to proxy lookups or JS-to-C++ boundary crossings). Additionally, inside helper functions like `buildMapData` in `app.js`, processing data arrays (like `processos`) that iterate multiple times while invoking operations like `String(val).trim()` within the loops can cause noticeable bottlenecks.

**Action:** Replaced index-based `localStorage.key(i)` loop with `Object.keys(localStorage)` for an O(N) extraction of all keys at once. For `buildMapData`, pre-calculated and cached the trimmed string values in an initial O(N) pass outide the main looping structure to avoid redundant string encodings and operations, adding the requisite `// [Bolt Performance]` comment.
