// Copy the screenshots and logo from docs/ (where the screenshot harness writes them), so
// the site always shows the same images as the README. They're not committed under site/.
import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const shots = join(root, "docs", "screenshots");
const logo = join(root, "docs", "logo");

const out = join(root, "site", "src", "assets", "screenshots");
mkdirSync(out, { recursive: true });
for (const name of readdirSync(shots)) {
  if (name.endsWith(".png")) cpSync(join(shots, name), join(out, name));
}

const pub = join(root, "site", "public");
mkdirSync(join(pub, "logo"), { recursive: true });
for (const name of ["icon.svg", "logo.svg", "logo-dark.svg", "icon-512.png", "social-preview.png"]) {
  cpSync(join(logo, name), join(pub, "logo", name));
}
cpSync(join(logo, "icon.svg"), join(pub, "favicon.svg"));
