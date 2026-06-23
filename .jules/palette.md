## 2024-05-28 - Add ARIA Labels to Icon-Only Buttons and Hide Decorative Emojis
**Learning:** Icon-only buttons or emojis without explicit text context provide poor accessibility as screen readers announce the Unicode names of emojis (or nothing at all). The `BtnIco` component is used pervasively for emojis, which shouldn't be read out if the button has text or a label.
**Action:** Add `aria-label` to buttons where the icon acts as the sole indicator of action (like "Filtrar por fornecedor"). Apply `aria-hidden="true"` to decorative emojis inside `BtnIco` to reduce screen reader noise.
