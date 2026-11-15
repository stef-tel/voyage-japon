# Voyage au Japon, avril 2027

Site de préparation de notre voyage en famille (du 3 au 18 avril 2027, arrivée et départ à Tokyo).
Pages : accueil, carte interactive, « Préparer le voyage » (checklist), spécialités culinaires.

## Le principe : la Google Sheet est la source de vérité

Le site ne contient aucune donnée saisie à la main. **Tout vient de la Google Sheet « Voyage Japon 2027 - À faire »**, qui reste privée. On modifie la feuille, jamais le site. Puis la mise à jour du site relit la feuille et régénère les pages.

```
Google Sheet  ──(relue à chaque mise à jour)──►  pages du site
(on la modifie)                                   (régénérées, lecture seule)
```

- Le site est **statique** : il n'affiche que l'état de la feuille au moment de la dernière mise à jour. La date figure en haut des pages (« données au … »). Modifier la feuille ne change rien sur le site tant que la mise à jour n'a pas été lancée.
- Si une information est fausse sur le site, on la corrige **dans la feuille**, pas dans les pages.

## Les onglets et ce qu'ils deviennent sur le site

| Onglet | Rôle | Alimente |
|---|---|---|
| **À faire** | Le catalogue de toutes les idées : lieux, activités, repas, hébergements | La carte (uniquement les lieux retenus) |
| **Chronologie** | Le déroulé jour par jour du voyage | La carte (vue Chronologie) |
| **Itinéraire** | Les étapes avec nuits, les trajets entre villes, les hôtels | La barre d'étapes, les flèches de transport, l'onglet Hôtel |
| **Spécialités** | Ce qu'il faut goûter | La page Spécialités |
| **Préparer le voyage** | La checklist des démarches | La page Préparer le voyage |
| **famille franco** | Notes de comparaison avec le voyage d'amis | Rien : onglet de travail, jamais publié |

### À faire : le catalogue

Une ligne par idée. Colonnes : ville, description, note de 1 à 5, **Indispensable**, durée, type, source, à réserver à l'avance, fait, précisions.

- **Ce qui décide si un lieu apparaît sur la carte :** il est coché « Indispensable », ou il est cité dans la Chronologie. Les autres idées restent dans la feuille et ne sont pas sur la carte.
- La colonne « À faire » (texte de la ligne) sert de **clé** : la Chronologie doit reprendre exactement le même texte. Modifier ce texte dans un seul des deux onglets casse le lien entre eux.
- Rangement : par ville dans l'ordre du voyage, indispensables d'abord, puis par note décroissante.
- « À réserver à l'avance » fait apparaître l'étiquette « À réserver » dans la liste.

### Chronologie : le déroulé

Une ligne par activité, avec la date, le moment de la journée (matin, après-midi, soir, journée), l'heure, la nuit passée, un type et des remarques.

- **Backbone** : un lieu de « À faire », avec le texte identique. C'est le tronc commun du voyage.
- **Ajout** : une activité ajoutée une fois sur place, qui n'est pas forcément dans « À faire ». Elle apparaît avec l'étiquette « Ajout ». Pour qu'elle soit placée sur la carte, sa position doit être connue (la mise à jour la recherche si besoin).
- **Trajet** : un déplacement. Il est affiché dans la liste mais n'a pas de point sur la carte.
- **Libre** : une journée ou un créneau sans programme.
- **Règle de cohérence :** tout lieu « Indispensable » de « À faire » doit figurer dans la Chronologie. Sinon, la mise à jour le signale.
- Les journées sont ordonnées par date, puis par heure.

### Itinéraire : étapes, transports, hôtels

- **Tableau des étapes** : une ligne par ville avec nuits (ordre, ville, arrivée, nuits, départ, comment y aller, durée du trajet). Les dates déterminent aussi quels jours de la Chronologie appartiennent à chaque étape : c'est ce qui permet de filtrer la liste quand on clique sur une ville.
- **Trajets** : le mode et la durée de la colonne « Comment y aller » sont dessinés sur la carte entre deux villes (flèche et pastille), pour voir d'un coup d'œil les besoins en transport.
- **Hôtels (colonnes Hôtel 1 à 4)** :
  - **Hôtel 1** = la proposition de départ.
  - **Hôtel 4** = l'hôtel **retenu**. Quand il est rempli, il s'affiche en premier avec l'étiquette « Retenu ».
  - **Hôtels 2 et 3** = des alternatives.
  - Format d'une cellule : nom de l'hôtel, puis un quartier ou une description, une note et le prix. Le nom doit rester **en tête de cellule**, avant la première virgule.
  - Sur le site, cliquer sur une ville ouvre l'onglet Hôtel avec un lien Booking qui reprend les dates de l'étape et la composition de la famille.
- **Options** : les villes envisagées mais pas retenues, sans nuits.
- **Villes de passage et excursions** : chaque ville utile au trajet sans y dormir (correspondances, arrêts, excursions à la journée), avec le trajet et la durée.
- Nuits réparties et non réparties : le total des nuits disponibles doit être entièrement placé.

### Spécialités

Une ligne par plat ou boisson, avec la ville, une priorité de 1 à 3 et la case à cocher **Fait**. Cocher « Fait » barre le plat sur le site et fait avancer la barre de progression (« n sur N goûtées »).

### Préparer le voyage

Une ligne par démarche, avec la catégorie, l'échéance, la **priorité** (Indispensable, Important, Utile), le **statut** et les précisions.

- Statut **À faire** : la démarche apparaît dans la checklist.
- Statut **Fait** : elle est cochée sur le site.
- Statut **Rejeté** : elle disparaît de la liste principale et va dans la section « Rejetés », gardés pour mémoire.
- Les cases cochées directement sur le site ne sont mémorisées que dans le navigateur de la personne. **La colonne Statut de la feuille est la référence commune.**

## Comment mettre à jour

1. Modifier la Google Sheet (c'est la seule chose à faire à la main).
2. Demander la mise à jour du site. Elle relit tous les onglets, régénère les pages, signale les incohérences et publie.
3. Après la publication, la mise à jour de GitHub Pages prend en général une à deux minutes. En cas d'ancienne version affichée, vider le cache du navigateur (Ctrl+Maj+R).

### Ce que la mise à jour signale

- Un lieu indispensable qui n'est pas dans la Chronologie.
- Une ligne de la Chronologie dont le texte ne correspond à aucune ligne de « À faire ».
- Un lieu à afficher dont la position sur la carte est inconnue.
- Un hôtel dont la fiche Booking n'est pas encore connue : un lien de recherche Booking est alors proposé à la place.
- Une nuit non placée dans l'Itinéraire.

## Confidentialité

Ce site est **public**. La feuille ne l'est pas, et aucun lien vers elle ne figure sur le site.

À chaque mise à jour, un contrôle automatique empêche la publication de : lien vers la feuille ou un document privé, adresse e-mail, numéro de vol, âge de l'enfant, prénoms ou noms de la famille, références de réservation, numéros de téléphone personnels. Les numéros de vol et l'âge sont retirés automatiquement des textes de la feuille avant publication, sans modifier la feuille.

À éviter dans la feuille, parce que cela finirait sur le site : tout ce qui est personnel ou confidentiel et qui se trouve dans une colonne alimentant une page publique (précisions, remarques, notes).

## Pour les curieux

Le détail technique de la génération est dans `src/README.md`.
