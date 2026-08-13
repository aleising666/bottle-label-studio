# Bottle Label Studio

An installable web app (PWA) version of the **Lab Effects — Bottle Label Studio**
tool. The whole app is a single self-contained `index.html` (exported from Claude
Design) plus a small PWA layer that makes it installable and work offline.

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | The app itself (self-contained; renders in the browser). |
| `manifest.webmanifest` | PWA manifest — name, colors, icons, install behavior. |
| `sw.js` | Service worker — caches the app shell for offline / installable use. |
| `icons/` | App icons (192, 512, maskable, Apple touch, favicons). |
| `render.yaml` | Render Blueprint — one-click deploy as a static site. |

## Run it locally

Any static file server works. For example:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

> Open it via `http://localhost` (not by double-clicking the file). Service
> workers only run over `http://localhost` or HTTPS, so the "Install" prompt
> won't appear from a `file://` path.

## Deploy on Render (chosen host)

### Option A — Blueprint (uses `render.yaml`, recommended)

1. Push this folder to a GitHub repo (see below).
2. In the Render dashboard: **New → Blueprint**.
3. Connect the GitHub repo. Render reads `render.yaml` and creates the static site.
4. Click **Apply**. Your app goes live at `https://bottle-label-studio.onrender.com`
   (the exact subdomain is shown after it deploys).

### Option B — Manual static site

1. Render dashboard: **New → Static Site**, connect the repo.
2. Settings: **Build Command** = *(leave empty)*, **Publish Directory** = `.`
3. **Create Static Site**.

Every push to the default branch auto-deploys a new version.

## Push to GitHub first

```bash
cd bottle-label-studio
git init
git add .
git commit -m "Bottle Label Studio — installable PWA"
git branch -M main
# Create an empty repo named bottle-label-studio on github.com, then:
git remote add origin https://github.com/<your-username>/bottle-label-studio.git
git push -u origin main
```

## Installing the app

Once it's live over HTTPS (Render provides HTTPS automatically):

- **Desktop Chrome/Edge:** click the install icon in the address bar, or
  menu → *Install Bottle Label Studio*.
- **iPhone/iPad (Safari):** Share → *Add to Home Screen*.
- **Android (Chrome):** menu → *Add to Home screen / Install app*.

After the first online visit it also works offline.

## Updating the app later

Replace `index.html` with a new export, bump `CACHE_VERSION` in `sw.js`
(e.g. `bls-v2`), commit, and push. Render redeploys and installed copies pick
up the new version on next launch.
