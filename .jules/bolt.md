## 2026-07-01 - Optimize localStorage iteration
**Learning:** Iterating via `localStorage.key(i)` can cause an O(N²) performance bottleneck due to JS-to-C++ boundary crossings or proxy lookups. `Object.keys(localStorage)` is significantly faster but needs a fallback.
**Action:** Use `Object.keys` for O(N) access with a fallback check when iterating over web storage.
