## 2026-06-19 - ARIA Labels in Programmatic React
**Learning:** In codebases avoiding JSX and using raw `React.createElement`, icon-only buttons (like filter removals and visibility toggles) are often overlooked for accessibility because the elements are defined as dense property objects. Adding `aria-label` alongside `title` directly in the props object ensures screen readers announce the action correctly.
**Action:** Always inject `aria-label` attributes alongside `title`s when creating icon-only interactive elements using raw `React.createElement`.
