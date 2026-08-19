# TODO — CulinAIze

Everything the earlier content and auth passes covered is done and has been removed from this file.
What follows is only what is still outstanding.

**Current state:** `next build` passes (exit 0) and `tsc --noEmit` is clean under `strict`. Auth is
Clerk. All eight routes build. No fabricated claims, dead controls, or broken asset references
remain in `app/` or `components/`.

---

## 1. Blocking — the app cannot work end-to-end until this is done

- [ ] **Point n8n's JWT verification at Clerk.** The chat page sends `Authorization: Bearer <clerk-token>`
      from [app/chat/page.tsx:138](app/chat/page.tsx#L138). It used to be a Supabase token. n8n must
      now verify against Clerk's JWKS:

      https://<your-frontend-api>.clerk.accounts.dev/.well-known/jwks.json

      Until this changes, one of two things is true — and it is worth finding out which:
      - n8n **was** verifying the Supabase JWT → it now rejects every request, and chat is broken.
      - n8n **was not** verifying → chat still works, but the auth header has always been decorative
        and the webhook is open to anyone who finds the URL.

      If you would rather control the claims, create a JWT Template in Clerk and change the call to
      `getToken({ template: 'n8n' })`.

---

## 2. Clerk dashboard — verify these are actually set

`.env` already holds all four keys and the build picks them up, so the app boots. These are the
settings I could not check from here.

- [ ] **GitHub SSO is enabled** under *Configure → SSO connections*. Dev instances borrow Clerk's
      shared GitHub OAuth app; **production needs your own GitHub OAuth App** registered in Clerk.
- [ ] **The `username` field is enabled** under *Configure → User & authentication*, if you want the
      navbar to show the GitHub handle. Without it, `displayName` in
      [components/navbar.tsx:43](components/navbar.tsx#L43) falls through to full name, then email,
      then `"Account"`.
- [ ] **Live-mode keys are set in Vercel** for production — the pair Clerk issues for a production
      instance, not the test-mode pair. The local `.env` holds test-mode keys, which will not work on
      the deployed site.

---

## 3. Small fixes

- [ ] **`next.config.ts` image allowlist is wrong on both ends.** It allows `avatar.vercel.sh`, which
      nothing uses, and omits **`img.clerk.com`**, which is where the navbar avatar actually comes
      from. Harmless right now only because Material Tailwind's `<Avatar>` renders a plain `<img>` —
      it breaks the moment anyone switches that to `next/image`.
- [ ] **Export a real `og-image.jpg` at 1200×630.** [app/layout.tsx](app/layout.tsx) declares
      `/image/food.jpg` at those dimensions for the OpenGraph and Twitter cards, but the file is not
      that aspect ratio, so social previews will crop or letterbox it.
- [ ] **Re-encode the hero photos.** `public/` is 21 MB for six JPEGs — `about.jpg`, `teams.jpg`,
      `contact.jpg`, `terms.jpg`, `privacy.jpg`, `food.jpg`. They are used as `bg-[url(…)]` CSS
      backgrounds, so `next/image` never touches them and every visitor downloads them at full
      resolution. WebP at ~1920px wide should cut this by an order of magnitude.

---

## 4. Housekeeping

- [ ] **Delete `package-lock.json`.** Both it and `pnpm-lock.yaml` are committed, so which one is
      authoritative is ambiguous. `packageManager` pins `pnpm@9.12.3`, and `npm install` fails
      outright on a pre-existing peer conflict (`react@19.0.0-rc-45804af1-20241021` vs
      `next@15.3.0-canary.31`, which peers on a different RC hash). **Use `pnpm`, not `npm`.**

- [ ] **Prune the Vercel `ai-chatbot` starter skeleton.** This repo is a fork that was never cleaned
      out. All of the following is verified dead:

      | Item | State |
      |---|---|
      | `package.json` name | still `"ai-chatbot"` v3.0.23 |
      | Unused deps | `next-auth` (a second auth library, imported nowhere), `sonner`, `drizzle-orm`, `drizzle-kit`, `ai`, `axios`, `swr`, `redis`, `papaparse`, `@vercel/blob`, `@vercel/postgres`, all `prosemirror-*`, all `@codemirror/*` — none imported by `app/` or `components/` |
      | `drizzle.config.ts` | points at `./lib/db/` — **no `lib/` directory exists** |
      | `playwright.config.ts` | points at `./tests/` (**no tests**) and `/ping` (**no API routes**) |
      | `components.json` | points at `@/components/ui` — **does not exist** |
      | `.eslintrc.json` | ignores a directory that does not exist |
      | `instrumentation.ts` | reports the service as `ai-chatbot` |
      | `app/globals.css:126–164` | styles `.ProseMirror` / `.cm-editor` — there is no editor in this app |
      | `components/icons.tsx` | **59 icons exported, 2 imported** (`PaperclipIcon`, `ArrowUpIcon`, both by the chat page) |

      Worth doing as one deliberate commit rather than piecemeal — the `db:*` and `test` scripts in
      `package.json` go with it.

---

## 5. Nice to have

- [ ] Chat page has no Footer and only a bare text link home. Fine as is; the logo could match the
      navbar branding.
- [ ] Attached images are **not** persisted across a refresh — only message text is. Base64 data URIs
      would blow the ~5 MB `sessionStorage` quota after two or three photos. Real image persistence
      needs blob storage, which is a bigger change than it looks.

---

## Verification

Run before shipping. Steps 2–5 cover regressions that have already been fixed once.

0. `pnpm install && pnpm dev` — **`pnpm`, not `npm`.**
1. **Every route loads:** `/`, `/about`, `/team`, `/contact`, `/privacy`, `/terms`, `/login`, `/chat`.
2. **Auth round-trip:** `/login` completes GitHub sign-in and lands on `/chat`. This is what proves
   the `[[...rest]]` catch-all is wired correctly — a plain `page.tsx` breaks the SSO callback.
3. **Navbar** shows avatar + name signed in, Login signed out, and **neither flashes** during load.
   Sign Out returns to `/`. **Test on a mobile viewport** — mobile previously had no auth control at
   all.
4. **Token refresh:** leave `/chat` idle **> 60 seconds**, then send. It must still work. Clerk
   tokens are short-lived and minted per request; a cached token would fail exactly here.
5. **Chat end-to-end:** signed out → sign-in panel, not a fake AI message. Signed in → send text →
   markdown reply renders. Attach and paste an image → preview and reply. Force a failure (go
   offline) → a **red error bubble with Retry**, never an AI turn.
6. **Nothing fabricated crept back in:**
   ```sh
   grep -rniE "course|enroll|student|instructor|Louis Miriam|10,000\+|95%|amazon|123 Learning|culinaize\.com|support@" app/ components/
   ```
   Only expected hit: `placeholder=` on the chat composer.
7. `pnpm build` — check the **real** exit code, not a piped one. `next build … | tail` reports
   `tail`'s status and will happily hide a failed build.
8. No console errors, and no 404s in the Network tab.
