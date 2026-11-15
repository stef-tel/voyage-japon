import fs from "node:fs";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import { LINKS } from "./links.mjs";
const { GROUPS, STAYS } = JSON.parse(fs.readFileSync(new URL("./groups.json", import.meta.url), "utf8"));
const COORDS = JSON.parse(fs.readFileSync(new URL("./coords.json", import.meta.url), "utf8"));
const readSheet = (f) => JSON.parse(fs.readFileSync(new URL("./sheet/" + f, import.meta.url), "utf8")).values;

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
// ---- Lecture de la feuille : « À faire » (indispensables) et « Chronologie »
const warn = [];
const afaire = readSheet("afaire.json").slice(1).filter((r) => r[0] && r[1]);
const chronoRows = readSheet("chrono.json").slice(1).filter((r) => r[0] && r[4]);
const MOIS = ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"];
const dayLabel = (iso) => { const d = new Date(iso + "T12:00:00Z"); return ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][d.getUTCDay()] + " " + d.getUTCDate() + " " + MOIS[d.getUTCMonth()]; };
const inChrono = new Map();
chronoRows.forEach((c) => { if (/^(backbone|ajout)$/i.test(c[5])) if (!inChrono.has(c[4])) inChrono.set(c[4], c[0]); });
const byText = new Map(afaire.map((r) => [r[1], r]));
const selected = afaire.filter((r) => String(r[3]).toUpperCase() === "TRUE" || inChrono.has(r[1]));
const places = [];
const addPlace = (text, row) => {
  const c = COORDS[text];
  if (!c) { warn.push("Position manquante (ajouter dans src/coords.json) : " + text); return null; }
  const g = row ? row[0] : c.g;
  if (!GROUPS[g]) { warn.push("Groupe inconnu « " + g + " » pour : " + text); return null; }
  const id = places.length;
  places.push({ id, g, n: c.n || text, full: text, r: row && row[2] !== "" ? +row[2] : null, ind: !!row && String(row[3]).toUpperCase() === "TRUE", h: row && row[4] !== "" ? +row[4] : null, t: row ? row[5] : (c.t || "Ajout"), res: row ? (row[7] || "") : "", lat: c.lat, lng: c.lng, ap: !!c.ap, u: LINKS[text] || null, xy: P(c.lng, c.lat), day: inChrono.has(text) ? dayLabel(inChrono.get(text)) : null, add: !row });
  return id;
};
const pidOf = {};
selected.forEach((r) => { const id = addPlace(r[1], r); if (id != null) pidOf[r[1]] = id; });
chronoRows.forEach((c) => { if (/^ajout$/i.test(c[5]) && !byText.has(c[4]) && pidOf[c[4]] == null && COORDS[c[4]]) { const id = addPlace(c[4], null); if (id != null) pidOf[c[4]] = id; } });
const days = [];
chronoRows.forEach((c) => {
  let d = days.find((x) => x.iso === c[0]);
  if (!d) { d = { iso: c[0], label: dayLabel(c[0]), night: c[2] || "", items: [] }; days.push(d); }
  if (c[2] && !d.night) d.night = c[2];
  const pid = pidOf[c[4]] ?? null;
  if (/^(backbone|ajout)$/i.test(c[5]) && pid == null) warn.push("Chronologie : « " + c[4] + " » ne correspond à aucune ligne de « À faire » (ou sans position)");
  d.items.push({ m: c[3] || "", time: c[6] || "", text: c[4], type: c[5] || "", note: c[7] || "", pid });
});
days.sort((a, b) => a.iso.localeCompare(b.iso));
selected.forEach((r) => { if (String(r[3]).toUpperCase() === "TRUE" && !inChrono.has(r[1])) warn.push("Indispensable absent de la chronologie : " + r[1]); });
Object.keys(LINKS).forEach((k) => { if (!byText.has(k)) warn.push("Lien orphelin (texte modifié dans la feuille ?) : " + k.slice(0, 60)); });
const usedGroups = new Set([...places.map((p) => p.g), ...STAYS.map((s) => s.group)]);
const groups = Object.entries(GROUPS).filter(([key]) => usedGroups.has(key)).map(([key, g]) => {
  const t = { ...g, ...(TUNE[key] || {}) };
  const [x, y] = P(g.lng, g.lat);
  return { key, label: g.label, anchor: t.anchor, dx: t.dx, dy: t.dy, xy: [x + (t.ox || 0), y + (t.oy || 0)], lat: g.lat, lng: g.lng };
});
const stays = STAYS;
const seaLabels = [
  { t: "Mer du Japon", xy: P(135.2, 37.0), r: -6 },
  { t: "Océan Pacifique", xy: P(139.6, 33.9), r: 0 },
  { t: "Mer intérieure de Seto", xy: P(133.6, 34.1), r: 0 },
  { t: "Honshu", xy: P(137.7, 35.75), r: 0, land: true },
  { t: "Shikoku", xy: P(133.2, 33.55), r: 0, land: true },
  { t: "Kyushu", xy: P(131.2, 33.1), r: 0, land: true }
];

const today = new Date(); const generated = today.getDate() + " " + ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"][today.getMonth()] + " " + today.getFullYear();
const data = { W, H, land, japanOnly, groups, places, stays, days, seaLabels, generated };
const tpl = fs.readFileSync("template.html", "utf8");
const html = tpl.replace("/*__DATA__*/null", JSON.stringify(data));
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/japan-map.html", html);
fs.writeFileSync(new URL("../carte.html", import.meta.url), html);
warn.forEach((w) => console.log("ATTENTION :", w));
console.log("ok", (html.length / 1024).toFixed(0) + " KB", "land", (land.length / 1024).toFixed(0) + " KB", "places", places.length);
