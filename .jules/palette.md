## 2024-05-18 - Dynamically updating ARIA Labels
**Learning:** For toggle buttons representing modes (like 'Ver todas' vs 'Filtrar por fornecedor'), applying a dynamic `aria-label` based on the active state communicates the current function more effectively than a static label.
**Action:** When making state-toggling icons accessible, always tie the `aria-label` directly to the same state variable that drives the UI change, not just a generic description.
