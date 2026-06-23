## 2026-05-26 - Accessibility: Add aria-hidden to decorative icons
**Learning:** Decorative icons implemented via custom components like `BtnIco` need to be hidden from screen readers to avoid confusing readouts.
**Action:** When creating or identifying custom icon components, ensure `aria-hidden="true"` is applied to the root element.
