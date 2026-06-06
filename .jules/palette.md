## 2024-06-06 - Add Accessible Labels to Theme Toggle
**Learning:** The theme toggle button in `Sidebar` was an icon-only element lacking any accessibility labels or hover tooltips, making its function unclear to both screen reader users and sighted users.
**Action:** Always verify that icon-only interactive elements in custom React components have dynamic `aria-label` and `title` attributes that update based on their current state.
