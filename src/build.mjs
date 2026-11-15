import fs from "node:fs";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import { LINKS } from "./links.mjs";
import { redactDeep } from "./public.mjs";
const { GROUPS, STAYS } = JSON.parse(fs.readFileSync(new URL("./groups.json", import.meta.url), "utf8"));
const COORDS = JSON.parse(fs.readFileSync(new URL("./coords.json", import.meta.url), "utf8"));
const readSheet = (f) => redactDeep(JSON.parse(fs.readFileSync(new URL("./sheet/" + f, import.meta.url), "utf8")).values);

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
const normT = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
const dayLabel = (iso) => { const d = new Date(iso + "T12:00:00Z"); return ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][d.getUTCDay()] + " " + d.getUTCDate() + " " + MOIS[d.getUTCMonth()]; };
const inChrono = new Map();
chronoRows.forEach((c) => { if (/^backbone$/i.test(c[5])) if (!inChrono.has(c[4])) inChrono.set(c[4], c[0]); });
const byText = new Map(afaire.map((r) => [r[1], r]));
// Toutes les idées de « À faire » vont sur la carte (les non indispensables sont masquées par défaut), sauf les lignes « Hébergement », ignorées.
const isInd = (r) => String(r[3]).toUpperCase() === "TRUE";
afaire.forEach((r) => { if (r[5] === "Hébergement" && isInd(r)) warn.push("Ligne Hébergement cochée Indispensable (ignorée, les hôtels sont dans l'Itinéraire) : " + r[1]); });
const selected = afaire.filter((r) => r[5] !== "Hébergement");
// Villes de « À faire » regroupées avec une ville déjà sur la carte
const GALIAS = { "Nagoya": "Nagoya / Inuyama" };
const places = [];
const addPlace = (text, row) => {
  const c = COORDS[text];
  if (!c) { warn.push("Position manquante (ajouter dans src/coords.json) : " + text); return null; }
  const g = GALIAS[row ? row[0] : c.g] || (row ? row[0] : c.g);
  if (!GROUPS[g]) { warn.push("Groupe inconnu « " + g + " » pour : " + text); return null; }
  const id = places.length;
  places.push({ id, g, n: c.n || text, full: text, r: row && row[2] !== "" ? +row[2] : null, ind: !!row && isInd(row), h: row && row[4] !== "" ? +row[4] : null, t: row ? row[5] : (c.t || "Visite"), res: row ? (row[7] || "") : "", lat: c.lat, lng: c.lng, ap: !!c.ap, u: LINKS[text] || null, xy: P(c.lng, c.lat), day: inChrono.has(text) ? dayLabel(inChrono.get(text)) : null, add: !row });
  return id;
};
const pidOf = {};
selected.forEach((r) => { const id = addPlace(r[1], r); if (id != null) pidOf[r[1]] = id; });
const days = [];
chronoRows.forEach((c) => {
  let d = days.find((x) => x.iso === c[0]);
  if (!d) { d = { iso: c[0], label: dayLabel(c[0]), night: c[2] || "", items: [] }; days.push(d); }
  if (c[2] && !d.night) d.night = c[2];
  const isB = /^backbone$/i.test(c[5]);
  if (!/^(backbone|trajet|libre)$/i.test(c[5] || "")) warn.push("Chronologie : type inconnu « " + c[5] + " » (Backbone, Trajet ou Libre) pour : " + c[4]);
  const pid = isB ? (pidOf[c[4]] ?? null) : null;
  if (isB && pid == null) warn.push("Chronologie : « " + c[4] + " » ne correspond à aucune ligne de « À faire » (ou sans position)");
  if (isB && pid != null && !places[pid].ind) warn.push("Chronologie : « " + c[4] + " » n'est pas coché Indispensable dans « À faire » (à retirer de la chronologie)");
  // Excursion : lieu situé hors de la ville où l'on dort ce jour-là
  let exc = null;
  if (pid != null && c[2]) {
    const nN = normT(c[2]), g = places[pid].g, gN = normT(g), lN = normT(GROUPS[g].label);
    if (!(nN.includes(gN) || gN.includes(nN) || lN.includes(nN) || nN.split(" ").some((w) => w.length > 3 && gN.includes(w)))) exc = "Excursion depuis " + c[2];
    if (exc && !places[pid].exc) places[pid].exc = exc;
  }
  d.items.push({ m: c[3] || "", time: c[6] || "", text: c[4], type: c[5] || "", note: c[7] || "", pid, exc });
});
days.sort((a, b) => a.iso.localeCompare(b.iso));
selected.forEach((r) => { if (isInd(r) && !inChrono.has(r[1])) warn.push("Indispensable absent de la chronologie : " + r[1]); });
Object.keys(LINKS).forEach((k) => { if (!byText.has(k)) warn.push("Lien orphelin (texte modifié dans la feuille ?) : " + k.slice(0, 60)); });
const usedGroups = new Set([...places.map((p) => p.g), ...STAYS.map((s) => s.group)]);
const groups = Object.entries(GROUPS).filter(([key]) => usedGroups.has(key)).map(([key, g]) => {
  const t = { ...g, ...(TUNE[key] || {}) };
  const [x, y] = P(g.lng, g.lat);
  return { key, label: g.label, anchor: t.anchor, dx: t.dx, dy: t.dy, xy: [x + (t.ox || 0), y + (t.oy || 0)], lat: g.lat, lng: g.lng };
});
// Trajets entre étapes : onglet « Itinéraire » (colonnes Ordre, Comment y aller, Durée du trajet)
const itin = fs.existsSync(new URL("./sheet/itineraire.json", import.meta.url)) ? readSheet("itineraire.json") : [];
const legOf = (n) => {
  const r = itin.find((x) => String(x[0]) === String(n));
  if (!r || !r[5]) return null;
  const t = String(r[5]);
  const shin = /shinkansen/i.test(t), other = /train|express|monorail/i.test(t) && (/via|puis|express/i.test(t));
  const mode = shin ? (other ? "Shinkansen + train" : "Shinkansen") : "Train";
  const approx = /environ/i.test(r[6] || "");
  const duree = (approx ? "≈ " : "") + String(r[6] || "").replace(/\s*environ.*$/i, "").trim();
  return { mode, duree, detail: t + (r[6] ? " (" + r[6] + ")" : "") };
};
const HOTELS = fs.existsSync(new URL("./hotels.json", import.meta.url)) ? JSON.parse(fs.readFileSync(new URL("./hotels.json", import.meta.url), "utf8")) : {};
// Hôtels : colonnes « Hôtel 1 » à « Hôtel 4 » de l'onglet Itinéraire (1 = proposition, 4 = hôtel retenu)
const hotelsOf = (n) => {
  const r = itin.find((x) => String(x[0]) === String(n)); if (!r) return [];
  const out = [];
  [8, 9, 10, 11].forEach((c, k) => {
    const t = String(r[c] || "").trim(); if (!t) return;
    const i = t.indexOf(",");
    const head = (i < 0 ? t : t.slice(0, i)).trim(), rest = i < 0 ? "" : t.slice(i + 1).trim();
    const am = head.match(/^(.*?)\s*\((.*)\)\s*$/);
    const name = am ? am[1].trim() : head, area = am ? am[2].trim() : "";
    const key = name.toLowerCase();
    const url = HOTELS[key] || null;
    if (!url) warn.push("Hôtel sans fiche Booking (ajouter dans src/hotels.json) : " + name);
    out.push({ slot: k + 1, name, area, rest, url });
  });
  return out;
};
const stays = STAYS.map((s) => ({ ...s, leg: s.n > 1 ? legOf(s.n) : null, hotels: hotelsOf(s.n) }));
stays.forEach((s) => { if (s.n > 1 && !s.leg) warn.push("Trajet manquant dans sheet/itineraire.json pour l'étape " + s.n); });
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
