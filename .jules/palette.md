## 2025-05-18 - Accessibility for decorative emojis
**Learning:** This app extensively uses a custom component (`BtnIco`) to render purely decorative emojis within buttons (e.g., `📄 Gerar PDF`). Without `aria-hidden`, screen readers will redundantly read the emoji description, creating a poor experience.
**Action:** Always verify if text-adjacent icons/emojis provide unique context or are purely decorative, and hide decorative ones from screen readers with `aria-hidden="true"`.

## 2025-05-18 - Accessible close buttons
**Learning:** The shortcuts modal used a simple `\u2715` (multiplication x) character for the close button without an accessible name.
**Action:** When creating icon-only or symbol-only buttons, always include an explicit, descriptive `aria-label` and `title` (localized appropriately, e.g., "Fechar") for screen reader support and tooltip visibility.
