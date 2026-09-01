# Chores

A one-page site that tells you whose turn it is to clean the house this week.
No backend, no database — it's pure math based on today's date, so it stays
correct forever with zero maintenance.

## How it works

- Weeks run Monday–Sunday.
- `config.js` has a `START_DATE` (a Monday) and an `ORDER` list of names.
- The page figures out how many weeks have passed since `START_DATE` and
  cycles through `ORDER` to find this week's person. It repeats forever.

## Editing the rotation

Only edit [`config.js`](config.js):

```js
const START_DATE = "2026-08-31"; // must be a Monday
const ORDER = ["Federico", "Andre Monsa", "Andre Biondi"];
```

Change the names/order, save, then:

```bash
git add config.js
git commit -m "Update cleaning order"
git push
```

GitHub Pages will redeploy automatically in ~1 minute.

## Deploying (one-time setup)

1. Create an empty **public** repo on GitHub named `chores`.
2. From this folder:
   ```bash
   git remote add origin git@github.com:andreamonsa/chores.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `root`**.
4. The site will be live at `https://andreamonsa.github.io/chores/`.

## Putting it on the NFC tag

1. Get any NTAG213/215 NFC sticker (cheap, ~$0.30 each online).
2. On an iPhone, install the free **NFC Tools** app.
3. In NFC Tools: **Write → Add a record → URL/URI**, paste your Pages URL
   (e.g. `https://andreamonsa.github.io/chores/`), then tap **Write** and
   hold the phone against the tag.
4. Stick the tag in the kitchen. Any iPhone (NFC is on by default) will
   prompt to open the page when tapped near the tag — no app needed.
