## 2024-05-14 - Icon-only buttons accessibility in React without JSX
**Learning:** When using `React.createElement` for icon-only or emoji-only buttons, it is easy to miss adding appropriate descriptive `aria-label` and `title` attributes since the content doesn't inherently convey meaning to screen readers or provide hover text for users.
**Action:** Always ensure that an explicit `aria-label` and `title` attribute are added to the properties object of the `React.createElement("button", ...)` call when the child content consists only of an icon or emoji.
