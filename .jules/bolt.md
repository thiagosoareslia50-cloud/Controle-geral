## 2024-05-24 - O(N²) Degredation with localStorage.key()
**Learning:** In this codebase, the standard `localStorage` wrapper was using an index-based enumeration `localStorage.key(i)`. This is problematic because as the number of keys in `localStorage` grows, index lookups (`.key(i)`) can lead to an O(N²) performance degradation across iterations.
**Action:** Use `Object.keys(localStorage)` which provides all enumerable keys in a single O(N) pass. When enumerating `localStorage`, favor `Object.keys()` over `.key(i)`.
