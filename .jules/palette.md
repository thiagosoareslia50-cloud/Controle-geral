## 2024-05-15 - ARIA Labels on Toggle Buttons
**Learning:** Icon-only buttons used to toggle states (e.g., `objMode === "historico"`) lacked context for screen readers and tooltips, leading to poor accessibility.
**Action:** Always include dynamically updating `aria-label` and `title` attributes on state-toggling icon buttons to reflect the current state and provide clear intent to the user.
