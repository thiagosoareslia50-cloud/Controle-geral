## 2024-06-26 - Accessibility for Icon-Only Buttons
**Learning:** Many icon-only buttons in the application (`"✕"`) lack `aria-label` or `title` properties in their `React.createElement` declarations, which makes them inaccessible to screen readers and difficult to understand without context.
**Action:** Always inject `aria-label` alongside `title` directly into the props object for dense icon-only buttons (like '✕' or '👁️') to improve both screen reader accessibility and mouse hover context.
