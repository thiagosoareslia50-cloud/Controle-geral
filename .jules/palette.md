## 2024-06-01 - Default aria-hidden on Decorative Emojis
**Learning:** Screen readers often try to read out decorative emojis in components like `BtnIco`, confusing users.
**Action:** Always add `aria-hidden="true"` to wrapper components for emojis/icons to ensure they are ignored by screen readers, relying instead on aria-labels on their parent button elements.
