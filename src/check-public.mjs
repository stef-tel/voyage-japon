// Contrôle de confidentialité des pages publiques générées (index, carte, preparer, specialites).
// ÉCHEC (code 1) : informations qui ne doivent jamais être publiées. AVERTISSEMENT : à faire valider par l'utilisateur.
import fs from "node:fs";
const FILES = ["index.html", "carte.html", "preparer.html", "specialites.html"];
const FAIL = [
  [/docs\.google\.com|drive\.google\.com|spreadsheets\/d\//i, "lien vers la Google Sheet ou Drive"],
  [/[\w.+-]+@[\w-]+\.[a-z]{2,}/i, "adresse e-mail"],
  [/\bCA ?\d{3,4}\b/, "numéro de vol"],
  [/\b12 ans\b/i, "âge de l'enfant"],
  [/\b(Emma|Stef|Tellier)\b/i, "prénom ou nom de la famille"],
  [/\b(numéro de réservation|n° de réservation|booking number|PIN code)\b/i, "référence de réservation"],
  [/\b\d{3}-\d{4}-\d{4}\b|\+33 ?\d/, "numéro de téléphone personnel"],
];
const WARN = [
  [/\bLCL\b/, "nom de la banque"],
  [/second adulte|n'a pas de carte|3 téléphones/i, "détail de la famille (cartes, téléphones)"],
  [/age=\d+/, "âge de l'enfant dans un lien Booking"],
  [/20h00|8h30/, "horaires de vol"],
];
let bad = 0;
for (const f of FILES) {
  const t = fs.readFileSync(new URL("../" + f, import.meta.url), "utf8");
  for (const [re, what] of FAIL) { const m = t.match(re); if (m) { bad++; console.log(`ÉCHEC ${f} : ${what} → « ${m[0]} »`); } }
  for (const [re, what] of WARN) { const m = t.match(re); if (m) console.log(`À VALIDER ${f} : ${what} → « ${m[0]} »`); }
}
console.log(bad ? `${bad} problème(s) de confidentialité : corriger avant tout commit.` : "Confidentialité : aucun motif interdit trouvé.");
process.exit(bad ? 1 : 0);
