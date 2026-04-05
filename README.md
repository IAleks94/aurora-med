# Aurora Med

B2B marketing site for Aurora Med: bilingual (Russian / English) information and request flows for rare-disease therapy coordination, built with Vite, React, TypeScript, styled-components, react-i18next, and EmailJS for contact forms.

## Requirements

- Node.js compatible with the Vite 8 toolchain (see `package.json`).

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Forms call EmailJS at runtime; without these variables, `sendEmail` throws a configuration error and `initEmailJS` skips initialization when the public key is missing.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (`src`, `.eslintrc.cjs`) |
| `npm run test` | Vitest (run once) |

Additional checks used in CI-style validation: `npx tsc --noEmit`.

## Routing and languages

- `/` redirects to `/ru` (default locale).
- Supported path prefix: `/:lang` where `lang` is `ru` or `en`.
- Pages: home (`/:lang`), `about`, `order`, `suppliers`, `contacts`, `faq`.
- Unknown paths under a valid language redirect to that language’s home; unknown top-level paths redirect to `/ru`.

## Tech stack

React, React Router, styled-components, i18next / react-i18next, react-hook-form, `@emailjs/browser`, Vitest with Testing Library and jsdom.

## ESLint

Linting is configured in `.eslintrc.cjs` with `npm run lint` targeting `src` TypeScript and TSX files. For stricter type-aware rules or flat config, refer to the [TypeScript ESLint](https://typescript-eslint.io/) and [ESLint](https://eslint.org/) docs and adapt the project’s config accordingly.
