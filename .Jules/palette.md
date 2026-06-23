## 2024-04-23 - Accessibility improvements for icon-only filter buttons
**Learning:** Found multiple icon-only buttons for filtering (modalidades, contratos, objetos) that lacked `aria-label` attributes. Screen readers would only announce the text content (which was an emoji "📂" or "🏢") providing poor context. One of the buttons didn't even have a `title` tooltip.
**Action:** Always add explicit, descriptive `aria-label` and `title` attributes to all icon-only or emoji-only buttons for both screen reader accessibility and visual tooltip support.
