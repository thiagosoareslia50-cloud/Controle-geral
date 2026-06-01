## 2024-06-01 - Optimize localStorage offline fallback iteration
**Learning:** Using `localStorage.key(i)` in a loop is extremely slow because it requires a proxy lookup and boundary crossing on every iteration. This can create an artificial bottleneck, specifically when processing a high volume of locally stored keys in the offline fallback function.
**Action:** Use `Object.keys(localStorage)` to efficiently fetch all keys at once before iterating, avoiding O(N^2) overheads in operations involving large sets of local cache items.
