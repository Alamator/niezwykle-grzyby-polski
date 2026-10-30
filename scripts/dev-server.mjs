import { createReadStream } from "node:fs";
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
  // the quiz of the whole atlas.
  if (pathname.startsWith("/atlas/") || ["/mapa", "/quiz"].includes(pathname.replace(/\/+$/, ""))) {
    return path.join(rootDir, "index.html");
  }

  return null;
}

export function createStaticServer({ rootDir = projectRoot } = {}) {
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
        response.writeHead(404, { "Cache-Control": "no-store", "Content-Type": mimeTypes[".html"] });
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
      "Content-Type": contentType(filePath)
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
