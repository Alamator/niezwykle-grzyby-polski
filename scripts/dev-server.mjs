import { createReadStream, readFileSync } from "node:fs";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

// The Content-Security-Policy that vercel.json sends with every response, sent here too, so a local check shows
// in the browser console what the policy blocks. Without frame-ancestors, which would leave the page blank in a
// local preview pane that shows it in a frame.
export function localContentSecurityPolicy() {
  const config = JSON.parse(readFileSync(path.join(projectRoot, "vercel.json"), "utf8"));
  const rule = config.headers?.find((entry) => entry.source === "/(.*)" && !entry.has && !entry.missing);
  const policy = rule?.headers.find((header) => header.key === "Content-Security-Policy")?.value || "";
  return policy.split(/;\s*/).filter((directive) => directive && !directive.startsWith("frame-ancestors ")).join("; ");
}

function contentType(filePath) {
  return mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function safeResolve(rootDir, requestPath) {
  const decodedPath = decodeURIComponent(requestPath).replace(/^\/+/, "");
  const target = path.resolve(rootDir, decodedPath || "index.html");
  const rootWithSeparator = `${rootDir}${path.sep}`;
  if (target !== rootDir && !target.startsWith(rootWithSeparator)) return null;
  return target;
}

async function isFile(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function resolveRequestFile(requestUrl, rootDir = projectRoot) {
  const { pathname } = new URL(requestUrl, "http://localhost");
  const candidate = safeResolve(rootDir, pathname);
  if (candidate && await isFile(candidate)) return candidate;
  // Like cleanUrls on Vercel: /atlas/grzyby is atlas/grzyby.html once npm run build has made it.
  if (candidate && await isFile(`${candidate}.html`)) return `${candidate}.html`;

  // Before a build the app itself opens these addresses: a collection, a card, the map of every place or
  // the quiz of the whole atlas, in Polish or under /en. An English address that leads nowhere opens the
  // English start page once the build has made it, as on Vercel (vercel.json).
  const route = pathname.replace(/\/+$/, "");
  const english = route === "/en" || route.startsWith("/en/");
  const appRoute = english ? route.slice(3) || "/" : route;
  if (appRoute === "/" || appRoute.startsWith("/atlas/") || ["/mapa", "/quiz"].includes(appRoute)) {
    const englishStart = path.join(rootDir, "en.html");
    return english && await isFile(englishStart) ? englishStart : path.join(rootDir, "index.html");
  }

  return null;
}

export function createStaticServer({ rootDir = projectRoot } = {}) {
  const policy = localContentSecurityPolicy();
  const security = policy ? { "Content-Security-Policy": policy } : {};
  return http.createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method || "")) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("Method not allowed");
      return;
    }

    const filePath = await resolveRequestFile(request.url || "/", rootDir);
    if (!filePath) {
      // Like Vercel: the built 404.html when there is one.
      const notFound = path.join(rootDir, "404.html");
      if (await isFile(notFound)) {
        response.writeHead(404, { "Cache-Control": "no-store", "Content-Type": mimeTypes[".html"], ...security });
        if (request.method === "HEAD") response.end();
        else createReadStream(notFound).pipe(response);
        return;
      }
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentType(filePath),
      ...security
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 5173);
  const host = process.env.HOST || "127.0.0.1";
  createStaticServer().listen(port, host, () => {
    console.log(`Atlas dev server: http://${host}:${port}`);
  });
}
