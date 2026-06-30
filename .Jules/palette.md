## 2024-05-24 - Add ARIA Labels for Icon-Only Buttons
**Learning:** Found several icon-only buttons across the app (modals, sidebar toggles) lacking `aria-label`s, which is critical for screen-reader accessibility.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and `title`s injected directly into the `React.createElement` props object.
