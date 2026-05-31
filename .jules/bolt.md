## 2024-05-31 - Object.keys() is Faster Than localStorage.key(i)
**Learning:** Iterating over `localStorage` via an index-based loop (`localStorage.key(i)`) creates a massive performance bottleneck, making it effectively O(N^2) in some browser engines due to crossing the JS-to-native boundary and internal proxy lookups on every iteration.
**Action:** Always pre-compute and extract the keys array using `Object.keys(localStorage)` outside the loop to reduce iteration time complexity to O(N).
