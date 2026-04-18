## 2026-04-17 - O(N*31) iteration replaced by O(N) iteration in Map Data generation
**Learning:** For dataset-heavy frontends (like processing large `processos` arrays into multiple `Sets` and dictionaries), creating individual maps iteratively incurs significant overhead when mapping arrays multiple times. Hardcoded assignments with single-pass iteration is substantially faster despite visual verbosity.
**Action:** When extracting multiple mappings/filters from a singular large array, consolidate to a single linear `O(N)` loop rather than `array.map`/`array.reduce` multiple times.
