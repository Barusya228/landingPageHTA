# Localization Scaffold

These files are placeholders for a future `data-i18n` rollout.

Suggested approach:

1. Add stable keys in `ru.json`, `en.json`, and `kk.json`.
2. Mark translatable nodes in HTML with `data-i18n="path.to.key"`.
3. Move repeated UI labels first: header nav, hero copy, buttons, section headings.
4. Keep URLs, asset paths, and structural HTML outside locale files unless they truly vary by language.
