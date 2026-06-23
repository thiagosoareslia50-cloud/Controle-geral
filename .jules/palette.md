## 2024-05-20 - Ensure icon-only buttons have aria-labels and icons have aria-hidden
**Learning:** Icon-only buttons (or those relying purely on visual context like an emoji) fail accessibility checks if they lack explicit `aria-label`s. Furthermore, emojis wrapped in spans without `aria-hidden="true"` can be redundantly or confusingly announced by screen readers.
**Action:** Always add explicit, descriptive `aria-label` attributes to icon-only buttons (like theme toggles or filter buttons), and ensure decorative icon components (like `BtnIco`) have `aria-hidden="true"`.
