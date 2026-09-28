#!/usr/bin/env node
/**
 * Prepend or update an entry in public/articles.json.
 *
 * Usage:
 *   node scripts/add-article.mjs --title "Some title" --date "Sep 2026" \
 *     [--url "https://linkedin.com/pulse/..."] [--draft] [--replace-draft]
 *
 * Flags:
 *   --title           (required) Article title
 *   --date            (required) Display date, e.g. "Sep 2026"
 *   --url             LinkedIn (or other) URL. Required unless --draft.
 *   --draft           Mark status=draft. URL becomes optional and defaults to null.
 *   --replace-draft   Replace the most recent draft entry instead of prepending.
 *
 * Behavior:
 *   - Loads public/articles.json (creates it if missing).
 *   - Prepends the new entry unless --replace-draft is set and a draft exists.
 *   - Prints the resulting file contents so Curtis (via device_bash) can confirm.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = resolve(__dirname, "..", "public", "articles.json");

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--draft") { out.draft = true; continue; }
    if (arg === "--replace-draft") { out.replaceDraft = true; continue; }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for --${key}`);
      }
      out[key] = value;
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv);
if (!args.title) { console.error("Missing --title"); process.exit(2); }
if (!args.date)  { console.error("Missing --date");  process.exit(2); }
if (!args.draft && !args.url) { console.error("Missing --url (required unless --draft)"); process.exit(2); }

const entry = {
  title: args.title,
  url: args.url ?? null,
  date: args.date,
  status: args.draft ? "draft" : "published",
};

let list = [];
if (existsSync(jsonPath)) {
  try {
    list = JSON.parse(readFileSync(jsonPath, "utf-8"));
    if (!Array.isArray(list)) throw new Error("root is not an array");
  } catch (e) {
    console.error(`Could not parse ${jsonPath}: ${e.message}`);
    process.exit(1);
  }
}

if (args.replaceDraft) {
  const idx = list.findIndex((a) => a.status === "draft");
  if (idx !== -1) {
    list[idx] = entry;
    console.error(`Replaced draft at position ${idx}: ${list[idx].title}`);
  } else {
    list.unshift(entry);
    console.error("No existing draft to replace; prepended.");
  }
} else {
  list.unshift(entry);
  console.error(`Prepended ${entry.status}: ${entry.title}`);
}

writeFileSync(jsonPath, JSON.stringify(list, null, 2) + "\n", "utf-8");
console.log(JSON.stringify(list, null, 2));
