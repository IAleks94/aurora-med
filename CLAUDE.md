# Aurora Med — notes for AI / contributors

- Path alias `@` maps to `./src` (`vite.config.ts`, `tsconfig.app.json`).
- Vitest merges Vite config; `vitest.config.ts` may define test-only `VITE_EMAILJS_*` env vars.
- Theme: `ThemeContext` persists mode under `aurora-theme` and user override flag `aurora-theme-user-override` in `localStorage` (writes are guarded for storage failures).
- i18n default language is Russian; `Layout` syncs `i18n.changeLanguage` from the `:lang` route param.
- Validation commands: `npm run build`, `npm run lint`, `npm run test`, `npx tsc --noEmit`.
