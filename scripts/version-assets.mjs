// Puts each of the atlas's own files (css/, js/, data/, fonts/) in its address with a hash of its content:
// "/js/app.js?v=1a2b3c4d5e". vercel.json lets browsers keep such an address for a year, because a changed
// file gets a new address. The pages themselves are still checked on every visit, so they always lead to
// the current files. An address without the hash works as before, so a missed one is never stale.
// It rewrites the files where they are, so Vercel runs it on its copy after npm run build (vercel.json
// buildCommand: node scripts/version-assets.mjs --in-place). Not for a working copy: npm run test:technical
// runs it on a temporary one.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// An address of one of those files in quotes or in url(...): "/data/mushrooms.js",
// url("/fonts/inter-latin-400-normal.woff2"). One that already has its hash is left alone.
export const ASSET_ADDRESS = /(?<=["'(])\/(?:css|js|data|fonts)\/[\w./-]+\.(?:css|js|woff2)(?=["')])/g;
// Folders without pages. Vercel serves the whole project folder (vercel.json outputDirectory).
const NO_PAGES = new Set(["node_modules", "docs", "scripts", "vendor", "fonts", "images", "assets"]);

export function contentHash(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

function pagesIn(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith(".") || NO_PAGES.has(entry.name) ? [] : pagesIn(file);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

// A file's hash is taken after the addresses inside it have theirs: the stylesheet names the fonts, the
// list of collections names their data files and js/app.js the search index and the map points.
export function versionAssets(root) {
  const hashes = new Map();
  const open = new Set();
  const withHashes = (text, from) => text.replace(ASSET_ADDRESS, (address) => `${address}?v=${hashOf(address, from)}`);
  function hashOf(address, from) {
    if (hashes.has(address)) return hashes.get(address);
    const file = path.join(root, address);
    if (!fs.existsSync(file)) throw new Error(`${from} leads to ${address}, which is not there`);
    if (open.has(address)) throw new Error(`${address} leads back to itself (through ${from})`);
    open.add(address);
    let content = fs.readFileSync(file);
    if (!address.endsWith(".woff2")) {
      const text = content.toString("utf8");
      const rewritten = withHashes(text, address);
      if (rewritten !== text) {
        fs.writeFileSync(file, rewritten);
        content = Buffer.from(rewritten, "utf8");
      }
    }
    open.delete(address);
    const hash = contentHash(content);
    hashes.set(address, hash);
    return hash;
  }
  const pages = pagesIn(root);
  for (const page of pages) {
    const text = fs.readFileSync(page, "utf8");
    const rewritten = withHashes(text, path.relative(root, page));
    if (rewritten !== text) fs.writeFileSync(page, rewritten);
  }
  return { pages: pages.length, files: hashes.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.argv.includes("--in-place")) {
    console.error("version-assets rewrites the files where they are. Vercel runs it after npm run build with --in-place; do not run it on a working copy.");
    process.exit(1);
  }
  const { pages, files } = versionAssets(process.cwd());
  console.log(`version-assets: ${files} files have a hash in their address, on ${pages} pages`);
}
