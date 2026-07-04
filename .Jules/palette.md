## 2024-07-04 - Dynamic ARIA labels for icon toggles
**Learning:** Icon buttons that toggle states (like password visibility "👁️"/"🙈") need dynamic `aria-label`s based on their current state, not just a static label.
**Action:** When adding ARIA labels to toggle buttons, ensure the label text updates dynamically to describe the resulting action of clicking the button based on the current state.
