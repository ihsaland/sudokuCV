# sudokuCV scripts

## add-article.mjs

Prepend or update an entry in `public/articles.json`, the source of truth for
the Home page article list on iansalandy.com.

### Publish a new article (typical)

```bash
node scripts/add-article.mjs \
  --title "Why Systems Fail at Scale" \
  --url   "https://www.linkedin.com/pulse/..." \
  --date  "Sep 2026"
```

### Log a Curtis draft as pending

Called by the Curtis agent (Cowork-mode routine) after it produces a draft.
Curtis has no LinkedIn URL yet, so `--draft` marks the entry `status: "draft"`
and stores `url: null`. Drafts are hidden from the Home page article list.

```bash
node scripts/add-article.mjs \
  --draft \
  --title "Diagnostic on OpenAI GPT-6 prompt caching" \
  --date "Sep 2026"
```

### Promote the latest draft to published

Once Ian actually posts the article, replace the most recent draft with a
published entry that has the real LinkedIn URL:

```bash
node scripts/add-article.mjs \
  --replace-draft \
  --title "Diagnostic on OpenAI GPT-6 prompt caching" \
  --url   "https://www.linkedin.com/pulse/..." \
  --date  "Sep 2026"
```

### After any change, rebuild and deploy

```bash
npm run build && npm run deploy
```
