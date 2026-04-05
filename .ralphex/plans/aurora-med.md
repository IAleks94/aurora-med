# Plan: Aurora Med Website

## Overview
Build the Aurora Med B2B website — a bilingual (RU/EN) platform for ordering rare disease therapies from Europe. The site connects funds/organizations with European pharmaceutical suppliers. Built with Vite + React 18 + TypeScript + styled-components. Features dual theme (light for RU default, dark for EN default), EmailJS form submission, and i18n. Design follows provided reference mockups with a New Yorker illustration style.

## Validation Commands
- `npm run build`
- `npm run lint`
- `npx tsc --noEmit`

### Task 1: Initialize project with Vite, install dependencies, configure tooling
- [x] Run `npm create vite@latest . -- --template react-ts` in the project root (aurora-med folder already exists with src/assets)
- [x] Install dependencies: `npm install styled-components react-router-dom react-hook-form @emailjs/browser i18next react-i18next`
- [x] Install dev dependencies: `npm install -D @types/styled-components eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks`
- [x] Configure `vite.config.ts` with path alias `@` pointing to `./src`
- [x] Update `tsconfig.json` and `tsconfig.app.json` with path alias `"@/*": ["./src/*"]`
- [x] Create `.env.example` with: `VITE_EMAILJS_SERVICE_ID=`, `VITE_EMAILJS_TEMPLATE_ID=`, `VITE_EMAILJS_PUBLIC_KEY=`
- [x] Create basic `.eslintrc.cjs` config for React + TypeScript
- [x] Add `"lint": "eslint src --ext .ts,.tsx"` to package.json scripts
- [x] Create `.gitignore` with node_modules, dist, .env, .DS_Store
- [x] Verify `npm run build` passes
- [x] Mark completed

### Task 2: Set up theme system (light + dark), global styles, and font
- [x] Create `src/styles/theme.ts` with two theme objects: `lightTheme` and `darkTheme`. Light theme colors: background `#F5F0E8` to `#FAF7F2`, text `#0B1026`, card white with soft shadow. Dark theme colors: background `#0B1026` to `#0F1A3E`, text `#FFFFFF` / muted `#B8C4D8`, accent `#FFFFFF` (white for buttons/borders), decorative lines/constellations `rgba(255,255,255,0.3)`. Both themes share: font family `'Urbanist', sans-serif`, breakpoints (mobile 480px, tablet 768px, desktop 1024px, wide 1280px), spacing scale, border-radius values. Export TypeScript type `Theme` for styled-components.
- [x] Create `src/styles/styled.d.ts` — extend `DefaultTheme` from styled-components with the `Theme` type
- [x] Create `src/styles/GlobalStyles.ts` using `createGlobalStyle` from styled-components. Import Urbanist font from Google Fonts via `@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap')`. Set `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`. Body: `font-family: 'Urbanist', sans-serif; background: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.text}; transition: background 0.3s, color 0.3s;`
- [x] Create `src/context/ThemeContext.tsx` — React context providing `themeMode` (light/dark), `toggleTheme`, and `setThemeMode`. Store user preference in localStorage key `aurora-theme`. Default: light for RU language, dark for EN language. If user manually toggled — persist that choice.
- [x] Create `src/context/index.ts` barrel export
- [x] Create `src/styles/index.ts` barrel export
- [x] Update `src/main.tsx` to wrap app with `ThemeProvider` from styled-components, using theme from `ThemeContext`. Include `GlobalStyles`.
- [x] Verify `npm run build` passes
- [x] Mark completed

### Task 3: Set up i18n (Russian + English) with all website texts
- [x] Create `src/i18n/index.ts` — configure i18next with react-i18next. Default language: `ru`. Detection: from URL path prefix (`/en/...` or `/ru/...`). Fallback: `ru`.
- [x] Create `src/i18n/locales/ru.json` with all Russian texts organized by page:
  - `nav`: { home, about, order, suppliers, contacts, faq, submitRequest, partnerWithUs }
  - `hero`: { title: "Помогаем получить доступ к терапии при орфанных заболеваниях", subtitle: "Координируем сложные случаи между пациентами, фондами и международными поставщиками.", cta: "Оставить запрос", ctaSecondary: "Как это работает" }
  - `process`: { title: "Как это работает", step1: "Вы отправляете запрос", step2: "Мы уточняем детали", step3: "Мы координируем процесс", step4: "Организуем поставку" }
  - `team`: { title: "Наши специалисты", alexandra: { name: "Александра Киреева", role: "Основатель", description: "Опыт логистики сложных случаев более 10 лет. Координирует незарегистрированные поставки лекарств при орфанных заболеваниях" }, irina: { name: "Ирина Короткова", role: "Сотрудник по работе с фондами", description: "Ведёт запросы и закупки терапий, организует международные поставки" }, sofia: { name: "Sofia Fleishman", role: "Chief Procurement Officer", description: "Координирует закупки и поставки терапий для международных случаев" } }
  - `stats`: { cases: "кейсов сопровождено", countries: "стран поставки", partners: "партнёров", since: "С 2024 г. · Совмещённый опыт команды: 15+ лет" }
  - `founder`: { story: "Компания возникла из личного опыта жизни с редким заболеванием и понимания того, насколько сложным может быть путь к терапии. Мы создаём систему, в которой этот путь становится понятным и управляемым.", quote: "Когда доступ к терапии превращается в лабиринт, важно, чтобы кто-то знал путь." }
  - `about`, `order`, `suppliers`, `contacts`, `faq` page texts
  - `footer`, `theme`: { toggle }, `language`: { switch }
- [x] Create `src/i18n/locales/en.json` with all English translations matching the same key structure:
  - `hero.title`: "Access to rare disease therapies when local availability is limited"
  - `hero.subtitle`: "We coordinate cross-border supply of treatments in complex cases."
  - `hero.cta`: "Submit request", `hero.ctaSecondary`: "How it works"
  - `process`: { title: "How it works", step1: "Submit a request", step2: "Clarify the details", step3: "Coordinate the process", step4: "Organize delivery" }
  - `team.title`: "Operational network", `stats.since`: "Since 2024 · Combined experience: 15+ years"
  - All other keys translated to English
- [x] Import and initialize i18n in `src/main.tsx`
- [x] Verify `npm run build` passes
- [x] Mark completed

### Task 4: Set up routing with language prefixes and create App shell
- [x] Create `src/App.tsx` with React Router v6. Routes structure: `/:lang/*` where lang is `ru` or `en`. Nested routes: `/` (Home), `/about`, `/order`, `/suppliers`, `/contacts`, `/faq`. Redirect root `/` to `/ru`. Wrap everything in a `Layout` component with Header and Footer.
- [x] Create placeholder page components (just return the page name for now) in their folders: `src/pages/Home/Home.tsx`, `src/pages/About/About.tsx`, `src/pages/OrderForm/OrderForm.tsx`, `src/pages/Suppliers/Suppliers.tsx`, `src/pages/Contacts/Contacts.tsx`, `src/pages/FAQ/FAQ.tsx`
- [x] Create `index.ts` barrel exports for each page folder and `src/pages/index.ts` for all pages
- [x] Create `src/components/Layout/Layout.tsx` — renders Header, `<Outlet />`, Footer. Create `src/components/Layout/Layout.styled.ts` and `src/components/Layout/index.ts`.
- [x] On route change: detect language from URL param `:lang`, call `i18n.changeLanguage(lang)`, and set default theme (light for ru, dark for en) unless user has overridden in localStorage
- [x] Verify `npm run build` passes and all routes render
- [x] Mark completed

### Task 5: Build Header component with navigation, language and theme toggles
- [ ] Create `src/components/Header/Header.tsx` and `src/components/Header/Header.styled.ts`
- [ ] Header layout: logo "AURORA+" on the left (text-based, the "+" is styled as a decorative cross/star), navigation links in the center, language switch (RU/EN) and theme toggle (sun/moon icon) on the right
- [ ] Logo styling: `Urbanist` font, uppercase, letter-spacing 3-4px. "AURORA" in regular weight, "+" as a decorative element (can be a small SVG star or styled span)
- [ ] Navigation links: Home, About, For Suppliers, Contacts, FAQ — use `react-router-dom` `NavLink` with active state styling. Text: `Urbanist Medium`, uppercase, letter-spacing 1-2px, font-size 14px
- [ ] Language toggle: simple "RU / EN" text buttons. Active language is bold/highlighted. On click: navigate to the same page but with the other language prefix, change i18n language, and set default theme for that language (unless user overrode theme manually)
- [ ] Theme toggle: sun icon (for light mode) / moon icon (for dark mode). Simple SVG icons inline. On click: toggle theme and mark as "user-overridden" in localStorage
- [ ] Mobile: hamburger menu icon that opens a slide-out or dropdown menu with all links + toggles
- [ ] Styled according to theme: in dark mode — transparent/dark background, white text; in light mode — transparent/light background, dark text. Subtle border-bottom or background blur
- [ ] Create `src/components/Header/index.ts`
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 6: Build Footer component
- [ ] Create `src/components/Footer/Footer.tsx` and `src/components/Footer/Footer.styled.ts`
- [ ] Footer contains: logo "AURORA+", copyright text, navigation links (same as header), contact email
- [ ] Simple, minimal design. Dark theme: dark background with light text. Light theme: light background with dark text.
- [ ] Create `src/components/Footer/index.ts`
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 7: Build reusable UI components (Button, Input, Card, SectionTitle, Accordion, StatCounter)
- [ ] Create `src/components/Button/Button.tsx` + `Button.styled.ts` + `index.ts`. Props: variant ('primary' | 'secondary' | 'outline'), size ('sm' | 'md' | 'lg'), fullWidth, children, onClick, type. Primary: filled with theme accent color, border. Secondary/outline: transparent with border. Hover states with smooth transitions. Style from references: rounded corners (~8px), uppercase text, letter-spacing.
- [ ] Create `src/components/Input/Input.tsx` + `Input.styled.ts` + `index.ts`. Props: label, error, type, placeholder, register (for react-hook-form). Also a Textarea variant. Styled: clean borders, focus state, error state with red border and message.
- [ ] Create `src/components/Card/Card.tsx` + `Card.styled.ts` + `index.ts`. A versatile container with optional padding, border, hover effect. Used for team members, process steps, etc.
- [ ] Create `src/components/SectionTitle/SectionTitle.tsx` + `SectionTitle.styled.ts` + `index.ts`. Centered title with decorative "+" symbols on both sides, matching the reference design ("+ How it works +"). Props: children. Styled: `Urbanist SemiBold`, uppercase, letter-spacing, decorative elements.
- [ ] Create `src/components/Accordion/Accordion.tsx` + `Accordion.styled.ts` + `index.ts`. Props: items (array of { question, answer }). Expand/collapse with smooth animation. Plus/minus or chevron icon for toggle state.
- [ ] Create `src/components/StatCounter/StatCounter.tsx` + `StatCounter.styled.ts` + `index.ts`. Props: value (string like "48" or "30+"), label. Large bold number on top, small label below. Separated by vertical dividers when used in a row.
- [ ] Create `src/components/index.ts` barrel export for all components
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 8: Build Home page — Hero section with starry background
- [ ] Create `src/pages/Home/Home.tsx` and `src/pages/Home/Home.styled.ts`
- [ ] **Hero section**: Full viewport height section. Background: deep dark navy (#0B1026) with a subtle starry pattern — use CSS radial gradients for scattered dots (stars) and thin SVG lines representing constellations. Reference: see `src/assets/images/references/mockup-light-dark-v1.png` for the exact look. In LIGHT theme: use a lighter warm beige (#F5F0E8) background instead of the starry sky, but keep subtle decorative elements.
- [ ] Hero content: centered text. Title: large `Urbanist Bold` (48-56px desktop, 32-40px mobile). Subtitle below in lighter weight (18-20px). Two CTA buttons side by side: "Оставить запрос" (primary, filled) and "Как это работает" (secondary, outline). All text from i18n translations.
- [ ] "Оставить запрос" button links to `/[lang]/order`. "Как это работает" scrolls to the process section.
- [ ] Verify section renders correctly in both themes
- [ ] Mark completed

### Task 9: Build Home page — "How it works" process section with illustrations
- [ ] Add process section to `src/pages/Home/Home.tsx` and `Home.styled.ts`
- [ ] Section title using `SectionTitle` component: "Как это работает" / "How it works" with decorative "+" on sides
- [ ] 4 steps in a horizontal row (desktop) or vertical stack (mobile). Each step: illustration image on top, label text below.
- [ ] The process illustration image is at `src/assets/images/process/steps-all.png` — this is a single image with all 4 steps. Either use this full image OR create 4 separate styled step components with placeholder illustrations and labels from i18n: step1 "Вы отправляете запрос", step2 "Мы уточняем детали", step3 "Мы координируем процесс", step4 "Организуем поставку". Prefer individual step components for flexibility.
- [ ] Step illustrations: use circular or rounded containers, monochrome illustrations in New Yorker ink-drawing style. Since individual step images aren't available, create styled placeholder containers with step numbers (1-4) that can later be replaced with actual illustrations.
- [ ] Arrow or line connectors between steps on desktop
- [ ] Verify renders correctly
- [ ] Mark completed

### Task 10: Build Home page — Team section with portraits
- [ ] Add team section to `src/pages/Home/Home.tsx` and `Home.styled.ts`
- [ ] Section title: "Наши специалисты" / "Operational network"
- [ ] 3 team member cards in a row (desktop) or stacked (mobile). Each card contains: portrait image (circular or rounded), name, role, short description. All text from i18n.
- [ ] Portrait images: `src/assets/images/team/alexandra-kireeva.png`, `src/assets/images/team/irina-korotkova.png`, `src/assets/images/team/sofia-fleishman.png`. These are black-and-white ink-style illustrations (New Yorker style) — display them as-is, with a subtle circular crop or rounded frame.
- [ ] Alexandra Kireeva — Founder / Основатель
- [ ] Irina Korotkova — Funds Manager / Сотрудник по работе с фондами
- [ ] Sofia Fleishman — Chief Procurement Officer
- [ ] Verify renders correctly with images
- [ ] Mark completed

### Task 11: Build Home page — Statistics section and Founder quote
- [ ] Add stats section to `src/pages/Home/Home.tsx` and `Home.styled.ts`
- [ ] 3 statistics in a horizontal row using `StatCounter` component: "48" (кейсов сопровождено / cases coordinated), "12" (стран поставки / countries supplied), "30+" (партнёров / partners). Separated by thin vertical lines.
- [ ] Below stats: "С 2024 г. · Совмещённый опыт команды: 15+ лет" / "Since 2024 · Combined experience: 15+ years"
- [ ] **Founder quote block**: Large decorative opening quote mark ("), italic text of the founder's quote from i18n, attributed to Alexandra Kireeva. Style: centered, slightly larger font, italic Urbanist.
- [ ] Verify renders correctly
- [ ] Mark completed

### Task 12: Build About page
- [ ] Create full content for `src/pages/About/About.tsx` and `About.styled.ts`
- [ ] Hero section with page title "О компании" / "About us"
- [ ] Company story section: expanded text about the company's mission — born from personal experience with rare disease, building a system where the path to treatment becomes clear and manageable
- [ ] Team section: reuse team member data, but with more detailed descriptions
- [ ] Values/approach section: key principles of how Aurora Med works
- [ ] All text from i18n translations
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 13: Build Order Form page with validation and EmailJS
- [ ] Create `src/services/emailjs.ts` — helper function `sendEmail(templateParams: Record<string, string>)` that calls `emailjs.send()` with env vars. Handle success/error. Export also an `initEmailJS()` function called once in main.tsx.
- [ ] Create `src/services/index.ts` barrel export
- [ ] Create full `src/pages/OrderForm/OrderForm.tsx` and `OrderForm.styled.ts`
- [ ] Form fields using react-hook-form: organization name (required), contact person name (required), email (required, email validation), phone (required), order description (textarea, required), list of medications (textarea, optional)
- [ ] Submit button sends data via EmailJS `sendEmail()`. Show loading spinner during send, success message on completion, error message on failure.
- [ ] Style form: clean, professional. Input labels above fields. Generous spacing. Error messages in red below fields.
- [ ] Verify form validation works and `npm run build` passes
- [ ] Mark completed

### Task 14: Build Suppliers page with contact form
- [ ] Create full `src/pages/Suppliers/Suppliers.tsx` and `Suppliers.styled.ts`
- [ ] Info section: description of partnership conditions, how European suppliers can work with Aurora Med
- [ ] Contact form (no registration): company name, country, contact person, email, message (textarea). All required. Submit via EmailJS.
- [ ] Use same form styling as OrderForm page
- [ ] All text from i18n translations
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 15: Build Contacts page
- [ ] Create full `src/pages/Contacts/Contacts.tsx` and `Contacts.styled.ts`
- [ ] Contact information display: email, phone, address (use placeholder data for now)
- [ ] Simple contact/feedback form: name, email, message. Submit via EmailJS.
- [ ] All text from i18n translations
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 16: Build FAQ page with accordion
- [ ] Create full `src/pages/FAQ/FAQ.tsx` and `FAQ.styled.ts`
- [ ] Use `Accordion` component for Q&A items
- [ ] Create FAQ data in i18n files: at least 6-8 questions split into categories — "Для фондов" / "For funds", "Для поставщиков" / "For suppliers", "Общие" / "General"
- [ ] Example questions: "Какие лекарства можно заказать?", "Сколько времени занимает поставка?", "Нужна ли лицензия для заказа?", "Как стать поставщиком?", etc.
- [ ] Category headers above their accordion groups
- [ ] All text from i18n translations
- [ ] Verify `npm run build` passes
- [ ] Mark completed

### Task 17: Responsive design, animations, and final polish
- [ ] Review ALL pages and components for mobile responsiveness (320px - 480px - 768px - 1024px - 1280px)
- [ ] Header: mobile hamburger menu working correctly, language/theme toggles accessible
- [ ] Home hero: text scales down properly, buttons stack on mobile
- [ ] Process steps: switch from horizontal to vertical on mobile
- [ ] Team cards: stack vertically on mobile
- [ ] Stats: stack or wrap on small screens
- [ ] Forms: full-width inputs on mobile
- [ ] Add subtle CSS transitions: page sections fade in on scroll (use IntersectionObserver), button hover effects, smooth theme transition (0.3s on background/color)
- [ ] Ensure both themes look polished — test every page in both light and dark mode
- [ ] Verify `npm run build` and `npm run lint` pass
- [ ] Mark completed
