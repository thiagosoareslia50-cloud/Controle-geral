## 2024-05-21 - Optimize localStorage Iteration in Offline Fallback
**Learning:** Iterating through `localStorage` using `localStorage.key(i)` inside a `for` loop has potentially O(N^2) complexity because `localStorage.key(i)` may cause an internal re-iteration or interface lookup.
**Action:** Use `Object.keys(localStorage)` for an O(N) operation to fetch all enumerable keys, which is faster and safer as it avoids null checks since keys are always strings.
