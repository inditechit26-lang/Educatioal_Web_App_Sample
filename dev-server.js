const fs = require("fs");
const http = require("http");
const path = require("path");

const rootDir = __dirname;
const staticDirs = new Set([
  "about_us_elitecoaching_institute",
  "academic_prestige",
  "admin_dashboard_elitecoaching_institute",
  "auth_elitecoaching_institute",
  "contact_elitecoaching_institute",
  "course_management_studio_eduverse",
  "faculty_results_elitecoaching_institute",
  "home_elitecoaching_institute",
  "our_courses_elitecoaching_institute",
  "student_panel_elitecoaching_institute",
]);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const nextHost = process.env.NEXT_HOST || "127.0.0.1";
const nextPort = Number(process.env.NEXT_PORT || 3000);
const port = Number(process.env.PORT || 8080);

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveStatic(req, res, url) {
  if (url.pathname === "/") {
    send(res, 302, "", { location: "/student_panel_elitecoaching_institute/student%20panel.html" });
    return true;
  }

  const pathname = decodeURIComponent(url.pathname);
  const segments = pathname.split("/").filter(Boolean);
  const topDir = segments[0];

  if (!staticDirs.has(topDir)) return false;

  const filePath = path.resolve(rootDir, ...segments);
  if (!filePath.startsWith(path.join(rootDir, topDir))) {
    send(res, 403, "Forbidden", { "content-type": "text/plain; charset=utf-8" });
    return true;
  }

  let finalPath = filePath;
  if (fs.existsSync(finalPath) && fs.statSync(finalPath).isDirectory()) {
    finalPath = resolveHtmlEntry(finalPath);
  } else if (!fs.existsSync(finalPath) && path.basename(finalPath).toLowerCase() === "code.html") {
    finalPath = resolveHtmlEntry(path.dirname(finalPath));
  }

  fs.readFile(finalPath, (error, data) => {
    if (error) {
      send(res, 404, "Not found", { "content-type": "text/plain; charset=utf-8" });
      return;
    }

    const ext = path.extname(finalPath).toLowerCase();
    send(res, 200, data, {
      "content-type": mimeTypes[ext] || "application/octet-stream",
      "cache-control": "no-store",
    });
  });

  return true;
}

function resolveHtmlEntry(dirPath) {
  const codePath = path.join(dirPath, "code.html");
  if (fs.existsSync(codePath)) return codePath;

  const htmlFile = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
    .map((entry) => entry.name)
    .sort()[0];

  return htmlFile ? path.join(dirPath, htmlFile) : codePath;
}

function proxyToNext(req, res) {
  const options = {
    hostname: nextHost,
    port: nextPort,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `${nextHost}:${nextPort}` },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", () => {
    send(
      res,
      502,
      `Next.js is not running on http://${nextHost}:${nextPort}. Start it with: npm run dev -- --hostname ${nextHost} --port ${nextPort}`,
      { "content-type": "text/plain; charset=utf-8" }
    );
  });

  req.pipe(proxyReq);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host || `localhost:${port}`}`);
    if (serveStatic(req, res, url)) return;
    proxyToNext(req, res);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Website home: http://127.0.0.1:${port}/home_elitecoaching_institute/code.html`);
    console.log(`Elite Coaching studio: http://127.0.0.1:${port}/course_management_studio_eduverse/studio.html`);
    console.log(`Student workspace: http://127.0.0.1:${port}/`);
  });
