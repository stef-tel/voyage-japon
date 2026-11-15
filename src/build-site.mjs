// Génère index.html (accueil) et preparer.html (checklist) à partir de preparation.json
// Usage : node build-site.mjs   (depuis le dossier src, écrit dans le dossier parent)
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync(new URL("./preparation.json", import.meta.url), "utf8"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const SHEET = "https://docs.google.com/spreadsheets/d/1BYG-KHH-lIS8tV3o3RzYj_1i19H_ioaJizK7ekh0WL4/edit";

const css = `
:root{--ink:#1c2433;--muted:#5b6578;--bg:#fbf7f4;--card:#fff;--line:#e6dfd9;--red:#c0392b;--navy:#1e3864;--pink:#f4b6c2}
*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:var(--bg);line-height:1.5}
a{color:var(--navy)}
.top{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:var(--navy);color:#fff}
.top a{color:#fff;text-decoration:none;margin-left:16px;font-size:15px}.top a:hover{text-decoration:underline}
.top b{font-size:16px}
`;

const sky = `<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration : le mont Fuji, un torii et des cerisiers en fleurs au lever du soleil" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c6cf"/><stop offset=".55" stop-color="#fde6d6"/><stop offset="1" stop-color="#fff6ea"/></linearGradient>
<linearGradient id="mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d6f9c"/><stop offset="1" stop-color="#8f9dc2"/></linearGradient>
</defs>
<rect width="1200" height="520" fill="url(#sk)"/>
<circle cx="860" cy="170" r="70" fill="#e4572e" opacity=".9"/>
<path d="M120 420 L470 150 Q500 130 530 150 L880 420 Z" fill="url(#mt)" transform="translate(120 30)"/>
<path d="M527 180 L590 180 L640 215 L610 205 L585 225 L560 205 L535 225 L510 205 Z" fill="#fff" transform="translate(95 -6)"/>
<path d="M0 440 Q300 380 600 430 T1200 420 L1200 520 L0 520 Z" fill="#9fb7a1"/>
<path d="M0 480 Q350 430 700 470 T1200 465 L1200 520 L0 520 Z" fill="#6f9279"/>
<g transform="translate(165 300)" fill="#c0392b">
<rect x="0" y="40" width="14" height="170"/><rect x="146" y="40" width="14" height="170"/>
<path d="M-26 28 Q80 52 186 28 L196 8 Q80 34 -36 8 Z"/><rect x="8" y="64" width="144" height="12"/>
</g>
<g stroke="#5a3b2e" stroke-width="10" fill="none" stroke-linecap="round">
<path d="M1010 520 C1000 420 1030 360 1085 300"/><path d="M1040 400 C1080 380 1120 360 1150 320"/><path d="M1030 430 C990 400 960 380 930 370"/>
</g>
<g fill="#f4a6b8">
<circle cx="1085" cy="296" r="38"/><circle cx="1130" cy="318" r="30"/><circle cx="1050" cy="330" r="30"/><circle cx="940" cy="365" r="32"/><circle cx="980" cy="345" r="28"/><circle cx="1150" cy="300" r="26"/>
</g>
<g fill="#f9cfd9"><circle cx="1070" cy="285" r="18"/><circle cx="1120" cy="305" r="16"/><circle cx="955" cy="352" r="16"/></g>
<g fill="#fff" opacity=".85"><circle cx="420" cy="110" r="3"/><circle cx="560" cy="60" r="3"/><circle cx="760" cy="90" r="3"/><circle cx="300" cy="200" r="3"/><circle cx="700" cy="230" r="3"/></g>
</svg>`;

const landing = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Voyage au Japon, avril 2027</title><style>${css}
.hero{position:relative;height:56vh;min-height:340px;overflow:hidden}.hero svg{position:absolute;inset:0;width:100%;height:100%}
.hero .t{position:absolute;left:0;right:0;bottom:0;padding:28px 24px;background:linear-gradient(transparent,rgba(30,56,100,.75));color:#fff}
.hero h1{margin:0;font-size:clamp(28px,5vw,48px)}.hero p{margin:6px 0 0;font-size:18px}
.menu{max-width:980px;margin:28px auto;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.card{display:block;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:24px;text-decoration:none;color:var(--ink);box-shadow:0 2px 8px rgba(30,56,100,.06)}
.card:hover,.card:focus{border-color:var(--navy);box-shadow:0 4px 14px rgba(30,56,100,.15)}
.card h2{margin:0 0 6px;color:var(--navy)}.card p{margin:0;color:var(--muted)}
.card .go{display:inline-block;margin-top:12px;color:var(--red);font-weight:bold}
.foot{text-align:center;color:var(--muted);font-size:14px;padding:10px 20px 40px}
</style></head><body>
<div class="top"><b>Voyage au Japon</b><span><a href="carte.html">Carte interactive</a><a href="preparer.html">Préparer le voyage</a></span></div>
<header class="hero">${sky}<div class="t"><h1>Japon, avril 2027</h1><p>Tokyo, Hakone, Kyoto, Takayama : notre voyage en famille du 2 au 18 avril</p></div></header>
<nav class="menu" aria-label="Menu">
<a class="card" href="carte.html"><h2>Carte interactive</h2><p>Tous les lieux à visiter sur une carte du Japon, avec la note de chaque lieu, nos indispensables, les horaires, les réservations et une fiche en français.</p><span class="go">Ouvrir la carte</span></a>
<a class="card" href="preparer.html"><h2>Préparer le voyage</h2><p>La liste de ce qu'il faut préparer : papiers, réservations, eSIM, applis, argent, bagages. Elle vient de l'onglet « Préparer le voyage » de notre Google Sheet.</p><span class="go">Ouvrir la checklist</span></a>
</nav>
<p class="foot">Dernière mise à jour des listes : ${esc(data.updated)}. Illustration originale.</p>
</body></html>`;

const rows = data.rows;
const isRej = (r) => r[4] === "Rejeté";
const cats = [...new Set(rows.filter((r) => !isRej(r)).map((r) => r[0]))];
const prio = { Indispensable: "p1", Important: "p2", Utile: "p3" };
const section = (c) => `<section><h2>${esc(c)}</h2><ul>` + rows.map((r, i) => [r, i]).filter(([r]) => r[0] === c && !isRej(r)).map(([r, i]) =>
  `<li class="${prio[r[3]] || "p3"}"><label><input type="checkbox" data-id="${i}" ${r[4] === "Fait" ? "checked" : ""}><span class="main"><b>${esc(r[1])}</b>`
  + `<span class="meta"><span class="tag">${esc(r[3])}</span> ${esc(r[2])}</span>`
  + `<span class="det">${esc(r[5])}</span>`
  + (r[6] ? `<a href="${esc(r[6])}" target="_blank" rel="noopener">En savoir plus (site en français)</a>` : "")
  + `</span></label></li>`).join("") + `</ul></section>`;
const rejected = rows.filter(isRej);
const rejSection = rejected.length ? `<details class="rej"><summary>Rejetés (${rejected.length}) : gardés pour mémoire</summary><ul>` + rejected.map((r) =>
  `<li><span class="main"><b>${esc(r[1])}</b><span class="meta"><span class="tag">${esc(r[0])}</span> ${esc(r[3])}${r[2] ? " · " + esc(r[2]) : ""}</span>`
  + (r[5] ? `<span class="det">${esc(r[5])}</span>` : "") + `</span></li>`).join("") + `</ul></details>` : "";

const prep = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Préparer le voyage au Japon</title><style>${css}
main{max-width:860px;margin:0 auto;padding:20px}h1{color:var(--navy);margin:8px 0}
.bar{position:sticky;top:0;background:var(--bg);padding:10px 0;border-bottom:1px solid var(--line);z-index:2}
.prog{height:10px;background:#e9e2dc;border-radius:5px;overflow:hidden}.prog i{display:block;height:100%;width:0;background:var(--navy)}
.filters{margin-top:8px;display:flex;flex-wrap:wrap;gap:8px;font-size:14px}
.filters button{border:1px solid var(--line);background:#fff;border-radius:16px;padding:4px 12px;cursor:pointer;font:inherit}
.filters button[aria-pressed=true]{background:var(--navy);color:#fff;border-color:var(--navy)}
section h2{margin:26px 0 8px;color:var(--navy);border-bottom:2px solid var(--pink);padding-bottom:4px}
ul{list-style:none;margin:0;padding:0}li{background:var(--card);border:1px solid var(--line);border-left:5px solid #9aa5bd;border-radius:10px;margin:8px 0}
li.p1{border-left-color:var(--red)}li.p2{border-left-color:#e0a030}
li label{display:flex;gap:12px;padding:12px 14px;cursor:pointer}li input{width:22px;height:22px;margin-top:2px;flex:none}
.main{display:flex;flex-direction:column;gap:4px}.meta{font-size:13px;color:var(--muted)}.tag{font-weight:bold;color:var(--ink)}
.det{font-size:14px;color:#333}li.done b{text-decoration:line-through;color:var(--muted)}li.hide{display:none}
.rej{margin-top:34px;border-top:2px solid var(--line);padding-top:10px}.rej summary{cursor:pointer;color:var(--muted);font-weight:bold}.rej li{border-left-color:#bbb;padding:10px 14px;opacity:.75}.rej li b{text-decoration:line-through;color:var(--muted)}
.note{font-size:13px;color:var(--muted);margin-top:30px}
</style></head><body>
<div class="top"><b><a href="index.html" style="margin:0">Voyage au Japon</a></b><span><a href="carte.html">Carte interactive</a><a href="preparer.html">Préparer le voyage</a></span></div>
<main><h1>Préparer le voyage</h1>
<div class="bar"><div><span id="count"></span></div><div class="prog"><i id="bar"></i></div>
<div class="filters" id="f"><button data-f="all" aria-pressed="true">Tout</button><button data-f="Indispensable" aria-pressed="false">Indispensable</button><button data-f="Important" aria-pressed="false">Important</button><button data-f="Utile" aria-pressed="false">Utile</button><button data-f="todo" aria-pressed="false">Reste à faire</button></div></div>
${cats.map(section).join("")}
${rejSection}
<p class="note">Cette liste est générée depuis l'onglet « Préparer le voyage » de <a href="${SHEET}">notre Google Sheet</a> (état au ${esc(data.updated)}). Les cases cochées ici sont mémorisées dans ce navigateur uniquement ; la colonne « Statut » de la feuille (À faire, Fait, Rejeté) reste la référence commune. Les liens n'ont pas tous été testés : vérifier les infos officielles avant de réserver.</p>
</main>
<script>
const KEY="japon-prep-v1";let st={};try{st=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
const boxes=[...document.querySelectorAll("input[data-id]")];
boxes.forEach(b=>{if(b.dataset.id in st)b.checked=st[b.dataset.id];b.addEventListener("change",()=>{st[b.dataset.id]=b.checked;try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}upd()})});
let flt="all";
function upd(){let d=0;boxes.forEach(b=>{const li=b.closest("li");li.classList.toggle("done",b.checked);if(b.checked)d++;
const tag=li.querySelector(".tag").textContent;li.classList.toggle("hide",!(flt==="all"||flt===tag||(flt==="todo"&&!b.checked)))});
document.getElementById("count").textContent=d+" sur "+boxes.length+" faits";document.getElementById("bar").style.width=(100*d/boxes.length)+"%"}
document.querySelectorAll("#f button").forEach(x=>x.addEventListener("click",()=>{flt=x.dataset.f;document.querySelectorAll("#f button").forEach(y=>y.setAttribute("aria-pressed",y===x));upd()}));
upd();
</script></body></html>`;

fs.writeFileSync(new URL("../index.html", import.meta.url), landing);
fs.writeFileSync(new URL("../preparer.html", import.meta.url), prep);
console.log("ok", rows.length, "lignes");
