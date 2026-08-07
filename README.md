# CTR — Formula 4 site + hidden admin control room

Next.js 15 (App Router) · Neon Postgres + Drizzle · Better Auth · Uploadthing · Tailwind v4.

The admin portal is **not linked** anywhere public. It lives at:

- `/admin/login` — credentials sign-in (unlisted)
- `/admin/dashboard` — Articles, Drivers, Race & Machine, Media

## 1. Install

```bash
npm install
```

## 2. Environment

```bash
cp .env.example .env
```

Fill in:

| Var | Where from |
| --- | --- |
| `DATABASE_URL` | Neon dashboard → pooled connection string |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` in dev, your domain in prod |
| `UPLOADTHING_TOKEN` | uploadthing.com → API Keys |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | the first admin login (min 10 chars) |

## 3. Create the database tables

```bash
npm run db:generate   # emits SQL migration from db/schema.ts
npm run db:migrate    # applies it to Neon
# or, for quick local iteration:  npm run db:push
```

This creates the Better Auth tables (`user`, `session`, `account`, `verification`)
and the domain tables (`articles`, `drivers`, `machine_specs`, `race_events`, `media`).

## 4. Seed the admin account

Public sign-up is disabled, so the first admin is created server-side:

```bash
npm run seed:admin
```

Re-running promotes an existing user to `admin` instead of duplicating.

## 5. Run

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` and sign in.

---

## How the security works (defense in depth)

1. **`middleware.ts`** — optimistic edge check. Redirects `/admin/dashboard/*`
   to `/admin/login` when no session cookie is present. Fast, but not the
   authority (a cookie ≠ an admin).
2. **`getAdminSession()` in the dashboard layout** — real check on every page
   load: verifies the session *and* `role === "admin"`, else redirects.
3. **`requireAdmin()` in every Server Action + the Uploadthing middleware** —
   the true guard. Even a crafted request that skips the UI cannot mutate data
   or upload files without a valid admin session. **Never rely on the
   middleware alone** — it's optimistic by design (Next.js docs).

The admin `role` column is `input: false` in Better Auth, so it can never be
set from the client — only via the seed script / direct DB access.

## File uploads

`app/api/uploadthing/core.ts` defines two routes, both admin-gated:

| Route | Accepts | Max |
| --- | --- | --- |
| `imageUploader` | images (driver headshots, article covers) | 4 MB |
| `modelUploader` | `.glb` / `.gltf` 3D car assets | 32 MB |

Every completed upload is recorded in the `media` table, which powers the
Media Gallery (copy URL / delete-from-storage).

> Note on `.glb`: Uploadthing has no native "model" file type, so `modelUploader`
> uses the generic `blob` route and enforces the `.glb`/`.gltf` extension in its
> middleware.

## Project map

```
app/
  admin/login/                 # unlisted login page
  admin/dashboard/             # protected shell + 4 sections
    articles/  drivers/  stats/  media/
  api/auth/[...all]/route.ts   # Better Auth handler
  api/uploadthing/             # core.ts (router) + route.ts (handler)
actions/                       # auth-guarded Server Actions (CRUD)
components/admin/              # feature components (forms, tables, drawer)
components/ui/                 # shadcn-style primitives (dependency-light)
db/schema.ts                   # Drizzle schema (auth + domain)
lib/auth.ts, auth-guard.ts     # Better Auth server config + guards
middleware.ts                  # optimistic /admin/dashboard/* gate
scripts/seed-admin.ts          # one-time admin bootstrap
```

## Production notes

- Set `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` to `https://chennaiturboriders.in`.
- Keep `/admin/*` out of `sitemap.xml`; the pages already send `noindex`.
- Consider adding rate-limiting on `/api/auth/*` and, for extra hardening,
  IP allow-listing or a Better Auth 2FA plugin on the admin role.
```
