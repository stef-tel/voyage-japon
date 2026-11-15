# Mise à jour du site depuis la Google Sheet « Voyage Japon 2027 - À faire »

Les pages du site sont générées à partir de copies JSON des onglets de la feuille.

| Onglet de la feuille | Fichier local | Produit |
|---|---|---|
| À faire (A1:J90) | `sheet/afaire.json` | lieux indispensables sur `carte.html` |
| Chronologie (A1:H80) | `sheet/chrono.json` | chronologie jour par jour de `carte.html` |
| Spécialités (A1:F80) | `sheet/food.json` | `specialites.html` (colonne « Fait » = case cochée) |
| Itinéraire (A1:L40) | `sheet/itineraire.json` | trajets entre villes (mode, durée) et onglet « Hôtel » (colonnes Hôtel 1 à 4 : 1 = proposition, 4 = retenu) de `carte.html` |
| Préparer le voyage (A1:G60) | `preparation.json` | `index.html`, `preparer.html` |

Format des fichiers `sheet/*.json` : `{"values": [[...ligne d'en-tête...], [...], ...]}` (résultat brut de `get_values`).
`preparation.json` : `{"updated": "jj mois aaaa", "rows": [[A,B,C,D,E,F,G], ...]}` (lignes non vides de l'onglet, sans l'en-tête).

## Confidentialité (site public)
- `public.mjs` : règles de retrait automatique (numéros de vol, âge de l'enfant) appliquées aux textes de la feuille avant génération. Ajouter ici toute nouvelle règle.
- `check-public.mjs` : contrôle des pages générées (échec si lien vers la feuille, e-mail, numéro de vol, âge, prénom ; avertissements « à valider » pour banque, horaires de vol, détails de la famille). À lancer avant chaque commit.
- Aucun lien vers la Google Sheet ne doit figurer sur le site.

## Générer
```
cd src
npm install          # première fois seulement
node build-site.mjs  # index.html, preparer.html, specialites.html
node build.mjs       # carte.html (affiche les lignes « ATTENTION » à traiter)
node check-public.mjs # contrôle de confidentialité (doit finir sans ÉCHEC)
```

## Règles de la carte
- Un lieu est affiché s'il est « Indispensable » (colonne D de « À faire ») ou cité dans la chronologie (type Backbone ou Ajout, texte identique à la colonne B de « À faire »).
- Chaque lieu affiché a besoin d'une position dans `coords.json` (clé = texte exact de la colonne B : `g` groupe, `n` nom court, `lat`, `lng`, `ap` si approximative). Une activité ajoutée sur place qui n'est pas dans « À faire » se déclare aussi dans `coords.json` (avec `t` pour le type).
- Les fiches Booking des hôtels sont dans `hotels.json` (clé = nom de l'hôtel en minuscules). Les villes et les étapes (nuits) sont dans `groups.json`. Les fiches en français sont dans `links.mjs`.
