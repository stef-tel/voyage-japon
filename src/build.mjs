import fs from "node:fs";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import { GROUPS, PLACES, STAYS } from "./data.mjs";
import { LINKS } from "./links.mjs";

const topo = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-10m.json", "utf8"));
const countries = feature(topo, topo.objects.countries);

const W = 1000, H = 520;
const proj = geoMercator().center([136.1, 35.25]).scale(5617).translate([W / 2, H / 2]);
proj.clipExtent([[-40, -40], [W + 40, H + 40]]);
const path = geoPath(proj).digits(1);

const land = path({ type: "FeatureCollection", features: countries.features.filter(f => ["392", "410", "408", "156", "643"].includes(String(f.id))) });
const japanOnly = path({ type: "FeatureCollection", features: countries.features.filter(f => String(f.id) === "392") });

const P = (lng, lat) => proj([lng, lat]).map(v => Math.round(v * 10) / 10);

// Réglages d'affichage des pastilles de villes : décalage en pixels carte (pour éviter les chevauchements), position et ancrage de l'étiquette.
const TUNE = {
  "Tokyo":            { anchor: "start",  dx: 22,  dy: 6 },
  "Fuji-Hakone-Izu":  { anchor: "end",    dx: -18, dy: 6, ox: -4, oy: -4 },
  "Hakone":           { anchor: "middle", dx: 0,   dy: 30 },
  "Kyoto":            { anchor: "start",  dx: 22,  dy: 6, oy: -6 },
  "Nara":             { anchor: "start",  dx: 18,  dy: 6, ox: 8, oy: 8 },
  "Nagoya / Inuyama": { anchor: "middle", dx: 0,   dy: 28 },
  "Osaka":            { anchor: "middle", dx: 0,   dy: 28, ox: -3, oy: 10 },
  "Takayama / Shirakawa-go": { anchor: "middle", dx: 0, dy: -28 },
  "Kanazawa":         { anchor: "middle", dx: 0,   dy: -20 },
  "Himeji":           { anchor: "end",    dx: -17, dy: 6 },
  "Hiroshima":        { anchor: "middle", dx: 0,   dy: -22, ox: 7, oy: -7 },
  "Miyajima":         { anchor: "middle", dx: 0,   dy: 28, ox: -9, oy: 10 },
  "Okayama":          { anchor: "end",    dx: -17, dy: 6 },
  "Kobe":             { anchor: "end",    dx: -17, dy: 10, ox: -7, oy: 2 }
};
const groups = Object.entries(GROUPS).map(([key, g]) => {
  const t = { ...g, ...(TUNE[key] || {}) };
  const [x, y] = P(g.lng, g.lat);
  return { key, label: g.label, anchor: t.anchor, dx: t.dx, dy: t.dy, xy: [x + (t.ox || 0), y + (t.oy || 0)], lat: g.lat, lng: g.lng };
});
const places = PLACES.map((p, i) => ({
  id: i, g: p[0], n: p[1], full: p[2], r: p[3], ind: p[4], h: p[5], t: p[6], res: p[7], lat: p[8], lng: p[9], ap: !!p[10], u: LINKS[p[2]] || null, xy: P(p[9], p[8])
}));
const unused = Object.keys(LINKS).filter(k => !PLACES.some(p => p[2] === k));
if (unused.length) throw new Error("liens sans lieu: " + unused.join(" | "));
const stays = STAYS;
const seaLabels = [
  { t: "Mer du Japon", xy: P(135.2, 37.0), r: -6 },
  { t: "Océan Pacifique", xy: P(139.6, 33.9), r: 0 },
  { t: "Mer intérieure de Seto", xy: P(133.6, 34.1), r: 0 },
  { t: "Honshu", xy: P(137.7, 35.75), r: 0, land: true },
  { t: "Shikoku", xy: P(133.2, 33.55), r: 0, land: true },
  { t: "Kyushu", xy: P(131.2, 33.1), r: 0, land: true }
];

const data = { W, H, land, japanOnly, groups, places, stays, seaLabels, generated: "15 novembre 2026 (liens mis à jour)" };
const tpl = fs.readFileSync("template.html", "utf8");
const html = tpl.replace("/*__DATA__*/null", JSON.stringify(data));
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/japan-map.html", html);
console.log("ok", (html.length / 1024).toFixed(0) + " KB", "land", (land.length / 1024).toFixed(0) + " KB", "places", places.length);
