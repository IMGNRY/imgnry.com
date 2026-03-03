# Caching and how to reset it

If you change files in **`static/`** (e.g. `static/js/webflow.js`) and don’t see the changes in the browser, try the following.

## 1. Parcel cache (most likely)

Parcel caches the build in **`.parcel-cache`** (and **`dist/`**). Static files are copied from `static/` into the build; that copy can stay cached.

**Reset:**

```bash
rm -rf dist .parcel-cache
npm run dev
```

(or `npm run build` for a production build)

## 2. Browser cache

Do a hard reload or clear site data for localhost. The app also adds a cache-busting query string to `webflow.js` (`?v=2` in `main.ts`). If you change `static/js/webflow.js` again and it still doesn’t update, bump the version in `main.ts` (e.g. `?v=3`) so the browser requests a new URL.

## 3. Service worker

If you ever add a service worker, it may cache scripts. Unregister it in DevTools → Application → Service Workers.
