# TODO — Align the CulinAIze frontend with the actual product

## Context

CulinAIze is, per the README, *"a cooking assistant that helps you find recipes based on your dietary preferences, available ingredients, and cooking time"*, powered by a RAG pipeline (Gemini + Spoonacular) running in n8n.

The marketing site does not say that. It was built from an **online React-course template** and never fully rewritten. Large sections still talk about students, enrollment, instructors, and course access. On top of that, the landing page advertises six capabilities that have **no implementation anywhere**, the testimonial section invents a person and attributes them to Amazon, the About page invents traction metrics, and two forms have Send buttons wired to nothing.

**Goal:** every claim on the site should be something the product actually does, and every visible element should either work or not be there. Scope is frontend content only — the n8n backend is out of scope.

**What the product actually does today** (`app/chat/page.tsx` is the only functional feature): sign in with GitHub → type a message or attach/paste a photo → POST to the n8n webhook → render the reply. In-memory only, no persistence.

---

## P0 — Course-template leftovers (wrong product entirely)

### `app/about/page.tsx`
- [ ] **L8–29 `STATS`** — delete the fabricated array (`10,000+ Students Enrolled`, `50+ Expert Instructors`, `95% Success Rate`, `5 Years Experience`). Replace with facts that are true, or drop the section. Suggested cards: `RAG-powered` / retrieval-augmented answers, `Gemini + Spoonacular` / recipes grounded in real data, `Photo input` / snap your ingredients, `Free` / no account cost, GitHub sign-in.
- [ ] **L44–47** — hero subtitle *"empowering developers with the skills they need to build amazing React applications and advance their careers"* → cooking-assistant positioning.
- [ ] **L58–61** — "Our Mission" is still *"world-class React education"* → rewrite around helping people cook with what they already have.
- [ ] **L90–97** — "Our Story": *"make React learning accessible"*, *"small online course"*, *"trusted by thousands of developers worldwide"*. Rewrite honestly (a student project built on n8n + Gemini + Spoonacular). Do not invent traction numbers.
- [ ] **L103–107** — literal `[Company Story Image Placeholder]` grey box shipped to production. Use an existing asset (`/image/food.jpg` or `/image/about.jpg` via `next/image`) or delete the column and make the story full-width.
- [ ] **L128–152** — Values cards reference *"our courses, content, and student support"* and *"learning together"* → restate for cooking (e.g. Accuracy, Accessibility, Zero waste).

### `app/team/page.tsx`
- [ ] **L11, L17** — fabricated bios: *"10+ years of React development experience at top tech companies"*, *"Former Facebook engineer specializing in React performance optimization"*. Replace with true one-liners for Bryan Herdianto and Wesley Frederick Oh.
- [ ] **L12, L18** — `image: "/placeholder.svg?height=300&width=300"` points at a file that **does not exist** in `public/`, and the field is never rendered anyway. Either add real photos and render them, or delete the `image` key.
- [ ] **L36** — *"The passionate educators and developers behind your React learning journey."*
- [ ] **L49–51** — *"React enthusiasts committed to your success… help you master React development."*
- [ ] **L62–66** — literal `[Photo]` text inside a grey circle. Use real avatars (GitHub avatars work) or initials, not a placeholder label.
- [ ] **L58** — `lg:grid-cols-3` for a 2-person team leaves a gap; use `md:grid-cols-2` + `max-w-3xl`.

### `app/contact/page.tsx`
- [ ] **L22–23** — *"any questions about our React course and learning platform"*.
- [ ] **L76** — fake phone `+62 (877) 123-4567` → remove the Phone block (there is no support line).
- [ ] **L100–106** — fake address `123 Learning Street / Education City, EC 12345` → remove.
- [ ] **L88** — `support@culinaize.com` resolves nowhere (site is `culinaize.vercel.app`). Use a real address, or link the GitHub repo's Issues instead.
- [ ] **L42–55 — dead form.** No `useState`, no `onSubmit`, no handler, no API route. "Send Message" does literally nothing.
      **Decision needed** — recommended: keep the form UI and wire `onSubmit` to build a `mailto:?subject=…&body=…` link (works with zero backend). Alternative: delete the form and replace "Get in Touch" with real channels — GitHub repo, Issues, the /team page.

### `app/terms/page.tsx`
- [ ] **L45** — *"our website located at culinaize.com"* → `culinaize.vercel.app`.
- [ ] **L75–85** — the whole *"3. Course Access and Content"* clause (enrollment, videos, course materials) describes a product that does not exist. Replace with a clause about AI-generated recipe content: outputs may be inaccurate, verify allergens and food safety yourself, not medical or nutritional advice.
- [ ] **L130** — `support@culinaize.com`, same as above.
- [ ] **L31** — `Last updated: {new Date().toLocaleDateString()}` always renders today's date, so the document always looks freshly reviewed. Hardcode a real date constant.

### `app/privacy/page.tsx`
- [ ] **L41–42, L48–49** — claims to collect *"Payment information"* and *"Course progress and completion data"*. Neither exists. Actual collection: GitHub OAuth profile (name, email, avatar) via Supabase, plus message text and uploaded images forwarded to the n8n workflow → Gemini / Spoonacular. State that instead.
- [ ] **L64–65** — *"Process your enrollment and provide course access"*, *"Send you course updates and educational content"*.
- [ ] **L132–140** — cookie/tracking clause claims analytics that aren't wired up (`@vercel/analytics` is a dependency but never imported). Either drop the claim or keep it minimal and accurate (Supabase auth session cookies only).
- [ ] **L150** — `privacy@culinaize.com` — third invented address.
- [ ] **L31** — same always-today `Last updated` bug.

---

## P1 — Claims with no implementation behind them

### `components/why-choose-us.tsx` — six of eight features do not exist

| Line | Claim | Reality |
|---|---|---|
| L67–70 | Nutritional Analysis — *"detailed nutritional information for every recipe"* | No nutrition UI or parsing |
| L81–84 | Ingredient Substitutions | Not implemented |
| L87–90 | Meal Planning — *"plan your weekly meals… based on your schedule"* | No calendar/planner code |
| L92–95 | Recipe Storage — *"save and organize… easy search"* | **No persistence at all** — chat state is in-memory and clears on refresh. README lists chat history as a *future* feature |
| L61–64 | Smart Recipe Suggestions — *"based on your… cooking skill level"* | No skill-level input exists |
| L55–58, L97–100 | AI-Powered Intelligence, 24/7 Culinary Support | Generic filler |

- [ ] **Decision needed** — recommended: rewrite the grid around what the n8n RAG agent genuinely returns — recipes from ingredients you have, dietary restriction and intolerance filtering, step-by-step cooking instructions, cooking tips on request, photo-of-ingredients input, Spoonacular-grounded results. That is six honest cards in the same layout.
      Alternative: keep the aspirational cards but add a visible `Coming soon` badge to Recipe Storage / Meal Planning / Nutritional Analysis, matching the README's *Future Features* list.
- [ ] **L5–12** — icons are semantically wrong (`KeyIcon` for substitutions, `UsersIcon` for meal planning, `CloudIcon` for recipe suggestions — all generic SaaS icons from the template). Swap for food-relevant lucide icons (`ChefHat`, `Salad`, `Utensils`, `Camera`, `Leaf`, `Timer`).

### `components/carousel-features.tsx` — fabricated testimonial
- [ ] **L40** — `new Array(2).fill("")` renders **the same testimonial twice** to fake a 2-slide carousel. There is no data array; there are no real users.
- [ ] **L51–65** — invented review text attributed to *"Louis Miriam, Home Chef @ AMAZON INC."* (the stock name from the Material Tailwind campaign template).
- [ ] **L68–74** — uses **Amazon's corporate logo** (`/image/logos/logo-amazon 3.svg`) as the testimonial image, implying an endorsement that does not exist.
- [ ] **Decision needed** — recommended: replace the whole section with a **"How It Works"** 3-step explainer (1. Sign in with GitHub → 2. Tell CulinAIze your ingredients, diet and time, or snap a photo → 3. Get a recipe with steps and tips). Keeps the visual weight of the section, removes the fabrication. Alternative: delete the section from `app/page.tsx:21` and remove the component. Alternative 2: keep the carousel, fill it with real example prompts and answers from the assistant.

### `components/about-product.tsx`
- [ ] **L42** — hero image is `/image/online-course.png` — the asset filename itself is a template leftover, used as the AI-cooking-assistant illustration. Replace with a food/cooking image (`/image/food.jpg` exists) and rename the asset.
- [ ] **L16, L22, L28** — `InboxIcon` for "Recipe Generation", `AcademicCapIcon` for "Smart Cooking Tips" — wrong semantics, swap for food icons.
- [ ] **L23** — "Smart Cooking Tips" is not a distinct feature from the chat; consider replacing with "Dietary & Intolerance Aware" or "Cook From What You Have", which the workflow actually supports.

### `components/footer.tsx`
- [ ] **L51–75 — dead newsletter.** No state, no handler, no endpoint. "Send" does nothing. L55–57 is e-commerce boilerplate — *"subscriber exclusive deals… fresh sales"* — and CulinAIze has no deals, sales, or pricing of any kind. **Recommend deleting the whole Subscribe column** and letting the link columns span the width.
- [ ] **L13–21** — "Team" and "About Us" are filed under the **Legal** column. Move them to Pages; keep only Terms and Privacy under Legal.
- [ ] **L38–44** — dead `href="#"` fallback (`typeof link === "string" ? "#" : link.href`) left from when `items` were plain strings. All items are objects now; simplify.
- [ ] **L63** — `{/* @ts-ignore */}` suppressing a real type error on `<Input>`; goes away with the Subscribe block.

### `components/navbar.tsx`
- [ ] **L145** — `{/* You can also add the conditional login/logout logic for mobile here */}` — **mobile users get no Login button and no Sign Out at all.** Implement it in the mobile `Collapse`, reusing the desktop session logic.
- [ ] **L99, L138** — leftover template instruction comments (*"Social Icons can remain here if you wish"*, *"Mobile Nav Items can remain here"*) plus an empty div. Remove.
- [ ] **L24–25** — dead `href={href || "#"}` + `target={href ? "_self" : "_blank"}` template fallback.
- [ ] **L106–108** — reads `user_metadata.avatar_url` / `user_name` with no fallback; renders a blank avatar and blank name for any non-GitHub provider. Add fallbacks (`full_name`, `email`, initials).
- [ ] Navbar has no link to `/team` — that page is reachable only from the footer's Legal column.

---

## P2 — Chat page (the one real feature)

`app/chat/page.tsx`
- [ ] **L114** — an auth failure is disguised as a chat reply: *"Oui Oui! Who are you? Introduction please by signing in via the homepage!"*. This is a fake AI message. Replace with a real gate — redirect to `/login`, or render a proper signed-out state with a Sign in button, and disable the composer instead of accepting input that will never be sent.
- [ ] **L140** — `text: data.output?.text || data.message || "I've received your request."` — if the webhook returns an unexpected shape the user sees a **canned line presented as the AI's answer**. Surface a real error state instead of a fabricated reply.
- [ ] **L151** — same issue in the catch branch (*"Pardonnez-moi, the kitchen seems to be closed"*) — it renders as an AI turn rather than an error. Style it distinctly (error bubble + Retry).
- [ ] **L167–169** — dead code: `useState<Session | null>(null)` means `session` is never `undefined`, so this loading spinner **can never render**. The page flashes the empty signed-out state on load. Change the initial state to `undefined` (typed `Session | null | undefined`) so the spinner works.
- [ ] The empty chat has **no empty state** — a first-time user sees a blank black screen. Add a short greeting plus 3–4 clickable example prompts that fill the composer ("What can I make with eggs, rice and gochujang?", "30-minute vegetarian dinner, no nuts", "Substitute for buttermilk?").
- [ ] Chat is **not persisted** — refreshing loses everything, which directly contradicts the landing page's "Recipe Storage" claim. Either fix the claim (P1) or add `sessionStorage` persistence.
- [ ] Replies are rendered as plain text (`whitespace-pre-wrap`, L198) — recipes with steps and lists will look like a wall of text. `react-markdown` + `remark-gfm` are **already in `package.json`**; wire them up.
- [ ] **L196, L220** — raw `<img>` for previews; `next/image` is used elsewhere. Minor, but note that `next.config.ts` allowlists `avatar.vercel.sh` while the app actually loads GitHub avatars (`avatars.githubusercontent.com`), which is **not** allowlisted.
- [ ] Chat page has no Footer and only a bare text link back home (L173–179) — fine, but the logo should be consistent with the navbar branding.

---

## P3 — Shell, metadata and leftover assets

- [ ] `app/layout.tsx:45–51` — FontAwesome CDN `<link>` rendered **inside `<body>`**, blocking on a third-party CDN. **No `fa-` class is used anywhere** in the codebase (Heroicons + lucide only). Delete it.
- [ ] `app/layout.tsx:44` — `<Toaster>` from sonner is mounted but `toast()` is never called. Either use it (chat errors, copy-recipe confirmation) or remove it.
- [ ] `app/layout.tsx:9` — `description: 'Chatbot for culinary enthusiasts'` is thin for SEO and sharing. Expand it, and add `openGraph` metadata so the Vercel link previews properly.
- [ ] Every page except `/` mounts its **own** `<ThemeProvider>` (`app/about`, `contact`, `team`, `privacy`, `terms`, and `page.tsx`). Hoist a single provider into a client wrapper in `layout.tsx`.
- [ ] `public/` orphans — never referenced by any code, all template leftovers: `image/blogs/` (9 files, **there is no blog**), `image/books/` (14 files, **no store**), `logos/logo-{coinbase,google,netflix,pinterest,spotify}.svg` (a "trusted by" logo wall — if these are ever wired up they become **false endorsement claims**), `image/avatar1-3.jpg` (stock testimonial faces), `image/Image7.svg`, `image8.svg`, `logo-amazon*.svg`. Delete.
- [ ] `public/placeholder.svg` is **missing** but referenced by `app/team/page.tsx:12,18`.

---

## Out of scope for this pass (noted, not doing)

- n8n workflow and backend behaviour — per instruction.
- Hardcoded Supabase credentials duplicated in `app/chat/page.tsx:8-9`, `app/login/page.tsx:6-7`, `components/navbar.tsx:8-9`, with **three separate `createClient()` calls at module scope**.
  ⚠️ Worth noting anyway: the key in `app/chat/page.tsx:9` is **malformed** — a real JWT header and payload whose *signature segment has been replaced* by the `sb_publishable_…` string. It does not match the bare publishable key used in the other two files. This may be breaking auth on `/chat` right now, and is a separate ~10-minute fix (shared `lib/supabase.ts` + `NEXT_PUBLIC_*` env vars).
- Pruning the Vercel `ai-chatbot` starter skeleton: `package.json` is still named `"ai-chatbot"` v3.0.23; ~50 unused deps (drizzle, next-auth, prosemirror, codemirror, ai SDK, axios, swr…); broken `drizzle.config.ts` → `./lib/db/` (**no `lib/`**); broken `playwright.config.ts` → `./tests/` (**no tests**) and `/ping` (**no API routes**); `components.json` → `@/components/ui` (**missing**); `.eslintrc.json` ignoring a non-existent dir; `instrumentation.ts` reporting as `ai-chatbot`; `globals.css:106-164` styling `.ProseMirror` / `.cm-editor` (no editor exists); `components/icons.tsx` — **59 icons exported, 2 used**.

---

## Verification

1. `pnpm install && pnpm dev` — open every route: `/`, `/about`, `/team`, `/contact`, `/privacy`, `/terms`, `/login`, `/chat`.
2. **Grep must return nothing** for template vocabulary:
   ```sh
   grep -rniE "course|enroll|student|instructor|React (learning|development)|Louis Miriam|placeholder|lorem" app/ components/
   ```
3. **No fabricated numbers or entities** remain: no "10,000+", no "95%", no Amazon logo, no `123 Learning Street`, no `+62 (877) 123-4567`, no `culinaize.com`.
4. **Every visible control does something.** Click every button and link on every page — no dead Send buttons, no `href="#"`. Test the navbar Login/Sign Out **on a mobile viewport**.
5. **Landing-page claim audit:** for each card left on `/`, name the code path or n8n behaviour that backs it. Anything you cannot point at must be cut or badged "Coming soon".
6. `/chat` end-to-end: signed out → proper gate (not a fake AI message); sign in with GitHub → send text → reply renders; attach and paste an image → preview and reply; force a failure (offline or bad webhook) → the error is visibly an error, not an AI turn.
7. `pnpm build` — no type errors, no missing-asset warnings (watch for the removed `public/` files).
8. No console errors on load, and no 404s in the Network tab for images.
