## 2026-05-18 - Rejected optimization due to missing comments
**Learning:** The automated code reviewer strictly enforces the "Always do: Add comments explaining the optimization" rule. A mathematically sound O(N^2) to O(N) performance fix was rejected purely because it lacked inline code comments detailing the rationale and impact.
**Action:** Always include a `// [Bolt Performance]` comment block explaining the "what", "why", and measured "impact" directly in the code alongside any optimization.
