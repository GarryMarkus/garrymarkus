import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "_posts");
const outDir = path.join(process.cwd(), "content/blog");

const tagMap = {
  "buffer-overflow": ["security", "exploit-dev"],
  "k8s-security": ["kubernetes", "security"],
  "linux-hardening": ["linux", "hardening"],
  "network-firewall": ["networking", "security"],
  "malware-analysis": ["malware", "analysis"],
  "phishing-evasion": ["phishing", "red-team"],
  "incident-response": ["incident-response", "forensics"],
  "active-directory": ["active-directory", "kerberos"],
  "web-vuln-scan": ["web", "sqli"],
  "crypto-essentials": ["cryptography", "security"],
  "wireless-pentest": ["wireless", "pentest"],
  "container-sec": ["docker", "kubernetes"],
  "devsecops-pipeline": ["devsecops", "ci-cd"],
  "secure-infra-deploy": ["cloud", "infrastructure"],
  "rev-eng-101": ["reverse-engineering", "binary"],
  sample: ["nmap", "networking"],
};

function estimateReadTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  const tags = tagMap[slug] || ["security", "lab"];
  const readTime = estimateReadTime(content);
  const frontmatter = { title: data.title, date: data.date, tags, description: data.description, readTime };
  const fm =
    "---\n" +
    Object.entries(frontmatter)
      .map(([k, v]) => {
        if (Array.isArray(v)) return `${k}: ${JSON.stringify(v)}`;
        if (typeof v === "string") return `${k}: "${v.replace(/"/g, '\\"')}"`;
        return `${k}: ${v}`;
      })
      .join("\n") +
    "\n---\n\n" +
    content.trim() +
    "\n";
  const dir = path.join(outDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "README.md"), fm);
  console.log("Migrated:", slug);
}
