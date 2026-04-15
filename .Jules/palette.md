## 2024-04-15 - Icon-Only Buttons
**Learning:** Icon-only buttons (like those using text characters for icons, e.g. "✕") lacking `aria-label` or `title` attributes are completely inaccessible to screen readers and offer poor UX, as users rely on visual cues only. Providing explicit `aria-label` and `title` gives screen reader context and tooltips for all users.
**Action:** Always include an explicit, descriptive `aria-label` attribute and a `title` attribute for screen reader accessibility and tooltip support when creating icon-only or emoji-only buttons in the UI.
