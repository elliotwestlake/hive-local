import * as mdi from "@mdi/js";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const src = process.argv[2];
const names = new Set(["fire", "thermometer", "flash", "home-thermometer-outline"]);
for (const f of readdirSync(src)) {
  for (const m of readFileSync(`${src}/${f}`, "utf8").matchAll(/"([a-z][a-z0-9-]+)"/g)) names.add(m[1]);
}
const camel = (n) => "mdi" + n.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const out = {};
for (const n of names) if (mdi[camel(n)]) out[n] = mdi[camel(n)];
writeFileSync(process.argv[3], JSON.stringify(out));
console.log(Object.keys(out).sort().join(" "));
