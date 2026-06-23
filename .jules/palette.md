## 2026-06-02 - Added ARIA attributes to icon-only buttons
**Learning:** Icon-only buttons using the custom BtnIco component lack screen-reader accessible names and tooltips. Additionally, the emojis rendered by BtnIco are read by screen readers unless hidden.
**Action:** Always add aria-hidden="true" to decorative emoji spans (like within BtnIco) and ensure all icon-only buttons receive descriptive aria-label and title attributes for accessibility and usability.
