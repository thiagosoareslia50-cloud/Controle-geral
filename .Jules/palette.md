## 2024-05-24 - Accessibility for Raw React Icon Buttons
**Learning:** When working with raw `React.createElement` (without JSX) in this codebase, dense icon-only buttons (like '✕' or '👁️') frequently lack accessible names.
**Action:** Always inject `aria-label` and `title` attributes directly into the props object of the `React.createElement` call for these buttons to ensure screen reader accessibility and provide hover tooltips.
