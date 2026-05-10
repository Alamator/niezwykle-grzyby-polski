import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skippedDirectories = new Set([".git", "node_modules"]);
const skippedFiles = new Set(["AGENTS.md", "package.json", "atlas-osobliwosci-polski-github.zip"]);
const skippedExtensions = new Set([".zip", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico"]);
const forbiddenTerms = ["OM" + "TTK", "PT" + "TK"];
const forbiddenPattern = new RegExp(forbiddenTerms.join("|"), "i");
const matches = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, absolutePath).replaceAll(path.sep, "/");

    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        walk(absolutePath);
      }
      continue;
    }

    if (
      skippedFiles.has(relativePath) ||
      skippedExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    const lines = text.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (forbiddenPattern.test(line)) {
        matches.push(`${relativePath}:${index + 1}: ${line.trim()}`);
      }
    });
  }
}

walk(root);

if (matches.length > 0) {
  console.error("Forbidden organization names found:");
  matches.forEach((match) => console.error(match));
  process.exit(1);
}
