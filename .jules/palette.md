## 2025-02-20 - Adding ARIA labels to icon buttons

**Learning:** When adding ARIA labels to icon-only buttons in pre-compiled React (`app.js`), we must be careful with formatting due to string replacement constraints. The application relies on tooltips (`title`) for some buttons but lacks explicit `aria-label` attributes for screen readers. Modifying deeply nested JSX-to-JS elements requires exact search/replace matches.
**Action:** Always include `aria-label` attributes on icon-only buttons (`<button>`) using `React.createElement` by inserting `"aria-label": "Description",` in the props object.
