## 2024-06-15 - Added ARIA Labels to Icon-Only Buttons
**Learning:** In pre-compiled React, accessibility attributes like `aria-label` and `title` can be easily missed on icon-only buttons (which just render a text emoji or SVG). Screen readers will read the raw emoji out loud if there's no `aria-label`, which is confusing. We must ensure all buttons that visually rely on icons have proper screen reader context.
**Action:** Always verify that every `React.createElement("button"` element that doesn't include descriptive text content has an explicit `aria-label` prop.
