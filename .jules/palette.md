## 2026-06-15 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found several icon-only buttons (`×`, `✕`) in the app.js React components missing `aria-label` and `title` attributes, which makes them inaccessible to screen readers and lacking tooltips for mouse users.
**Action:** When adding or modifying icon-only buttons, always include `aria-label` and `title` attributes to ensure they are accessible. For example, add `"aria-label": "Fechar"` to close buttons.
