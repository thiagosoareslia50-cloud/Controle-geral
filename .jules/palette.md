## 2024-06-11 - Add ARIA labels and titles to icon-only buttons
**Learning:** Icon-only buttons used for filtering (e.g. by supplier) and closing dialogs lacked proper accessibility attributes, which is a key interaction improvement opportunity.
**Action:** Always verify icon-only buttons (`<button>`) have `aria-label` or `title` tags to ensure screen-reader accessibility and mouse hover context.
