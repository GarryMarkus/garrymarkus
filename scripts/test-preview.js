import { spawn } from "child_process";
import http from "http";

const PORT = 4173;

async function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("=================================================");
  console.log("STARTING PRODUCTION PREVIEW SERVER ON PORT", PORT);
  console.log("=================================================\n");

  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--host", "localhost"], {
    cwd: "/home/garrymarkus/Desktop/projects/garrymarkus",
    env: { ...process.env, PATH: `/home/garrymarkus/.local/share/zed/node/node-v24.22.1-linux-x64/bin:${process.env.PATH}` },
    stdio: "pipe",
  });

  server.stdout.on("data", (_d) => {
    // server stdout
  });

  server.stderr.on("data", (d) => {
    console.error("[preview err]", d.toString().trim());
  });

  // Wait for server to boot
  await new Promise((r) => setTimeout(r, 1500));

  const routes = [
    { path: "/", name: "Root HTML Index" },
    { path: "/projects", name: "Projects Route (SPA fallback)" },
    { path: "/experience", name: "Experience Route (SPA fallback)" },
    { path: "/blog", name: "Blog Index Route (SPA fallback)" },
    { path: "/blog/learning-dsa-the-hard-way", name: "BlogPost Route (SPA fallback)" },
    { path: "/404.html", name: "Static 404 HTML File" },
    { path: "/Prem_Singh_Resume.pdf", name: "Resume PDF Asset" },
    { path: "/cursors/default.png", name: "Cursor Asset" },
    { path: "/cursors/pointer.png", name: "Cursor Pointer Asset" },
    { path: "/cursors/text.png", name: "Cursor Text Asset" },
  ];

  let failures = 0;

  for (const r of routes) {
    try {
      const res = await fetchRoute(r.path);
      if (res.status >= 200 && res.status < 400) {
        console.log(`[PASS] ${r.name} (${r.path}) -> Status ${res.status}`);
      } else {
        console.error(`[FAIL] ${r.name} (${r.path}) -> Unexpected status ${res.status}`);
        failures++;
      }
    } catch (e) {
      console.error(`[FAIL] Exception fetching ${r.path}:`, e.message);
      failures++;
    }
  }

  server.kill();

  console.log("\n=================================================");
  if (failures === 0) {
    console.log("ALL ROUTES AND ASSETS VERIFIED WITH 200 OK!");
  } else {
    console.error(`VERIFICATION FAILED WITH ${failures} ERRORS.`);
    process.exit(1);
  }
  console.log("=================================================");
}

run().catch((e) => {
  console.error("Test runner error:", e);
  process.exit(1);
});
