// Site public : retire des textes de la feuille les informations personnelles avant génération.
// Ajouter ici toute nouvelle règle ; check-public.mjs vérifie ensuite les pages générées.
export const REDACT = [
  [/Vols CA\d{3,4} \(aller\) et CA\d{3,4} \(retour\)/g, "Vols aller et retour"],
  [/\(CA\d{3,4} via Pékin\)/g, "(vol via Pékin)"],
  [/\s*\(CA\d{3,4}\)/g, ""],
  [/\bCA ?\d{3,4}\b/g, "vol"],
  [/la fille de 12 ans/gi, "l'ado"],
  [/une ado de 12 ans/gi, "une ado"],
  [/fille de 12 ans/gi, "ado"],
  [/enfant de 12 ans/gi, "enfant"],
  [/\s+de 12 ans\b/gi, ""],
];
export const redact = (s) => REDACT.reduce((t, [re, to]) => t.replace(re, to), s);
export const redactDeep = (v) => typeof v === "string" ? redact(v) : Array.isArray(v) ? v.map(redactDeep) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, redactDeep(x)])) : v;
