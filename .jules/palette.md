## 2024-06-09 - Ensure ARIA on base icon components
**Learning:** Reusable components that strictly render decorative icons (like `BtnIco` in this codebase) should encapsulate `aria-hidden="true"` by default. Relying on parents to hide them is brittle, and failing to hide them causes screen readers to redundantly announce emoji shortcodes alongside the visible text.
**Action:** When auditing custom UI kits, identify the base icon/emoji rendering component and ensure it has `aria-hidden="true"` baked in.
