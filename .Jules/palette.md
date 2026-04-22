## 2024-04-22 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found that multiple icon-only buttons (like `\u2715` for closing modals or `📂`/`🏢` for filtering) were missing `aria-label`s, rendering them inaccessible to screen readers. Emojis and Unicode characters do not provide adequate context for accessibility devices.
**Action:** Always add descriptive `aria-label` and `title` attributes to all icon-only buttons created with `React.createElement("button", ...)`.
