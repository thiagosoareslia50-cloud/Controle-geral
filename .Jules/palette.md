## 2024-05-24 - Accessibility for dynamic icon-only buttons
**Learning:** Icon-only toggle buttons (like the `objMode` filter) need both dynamic `aria-label` and `title` attributes to reflect their current action, as screen readers and hover states must accurately reflect what the button will do *next* (e.g. "Ver todos" when currently filtering, or "Filtrar por fornecedor" when currently showing all).
**Action:** When identifying icon-only buttons that toggle state, ensure `title` and `aria-label` are implemented dynamically based on state variables, not as static strings.
