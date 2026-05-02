## 2024-10-24 - Accessibility for Emoji-Only Buttons
**Learning:** Emoji-only or icon-only buttons created with raw text nodes or components lack semantic meaning for screen readers and often miss contextual tooltips, creating a confusing experience for assistive technologies and sighted users alike.
**Action:** Always verify that every button containing only an icon or emoji has explicit `aria-label` and `title` attributes that succinctly describe its action. If the icon toggles a state, ensure the label text dynamically reflects the action (e.g., "Ver todos" vs "Filtrar por histórico").
