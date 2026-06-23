## 2024-04-13 - Added ARIA labels to icon-only toggle buttons
**Learning:** Icon-only or emoji-only toggle buttons (like "📂" / "🏢" for modMode, contMode, objMode) in React need explicit `aria-label` attributes for screen readers, as `title` is often not sufficient alone for proper accessibility.
**Action:** Ensure any future icon-only interactive elements in the `app.js` UI are provided with explicit `aria-label` descriptions.
