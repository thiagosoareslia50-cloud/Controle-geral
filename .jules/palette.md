## 2025-02-09 - Icon-Only Buttons Missing Context
**Learning:** Icon-only toggle buttons using emoji strings often lack proper `aria-label`s or titles, presenting accessibility barriers where screen readers blindly read emoji unicode values.
**Action:** When creating or maintaining icon-only buttons (especially those that dynamically switch states or icons), always include an `aria-label` that reflects the *current action or context* and a corresponding `title` for sighted users.
