## 2024-04-15 - Single-pass Iteration in JS V8

**Learning:** When implementing single-pass iteration loops over large datasets in Node.js/V8, a hardcoded approach with direct variable assignments and inline if statements significantly outperforms consolidated approaches that use array abstractions or dynamic property lookups in the inner loop.

**Action:** Whenever iterating large arrays where several dictionaries or sets must be built simultaneously, unroll the loop logic and avoid dynamic keys/abstraction in the hot path.
