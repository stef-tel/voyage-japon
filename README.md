# Voyage au Japon, avril 2027

Site de préparation de notre voyage en famille (du 3 au 18 avril 2027, arrivée et départ à Tokyo).
Pages : accueil, carte interactive, « Préparer le voyage » (checklist), spécialités culinaires.

Ce README est la référence : il décrit la logique des données, les règles de construction du site et la procédure de mise à jour. Il doit suffire pour reconstruire ou réviser l'ensemble (feuille et site).

## 1. Le principe : « À faire » est la base

Toutes les données viennent de la Google Sheet « Voyage Japon 2027 - À faire », qui reste privée. Dans cette feuille, **l'onglet « À faire » est la base de tout** :

- Il contient **toutes les idées** : tout ce qui est possible pendant le voyage (lieux, activités, repas, hébergements, options).
- Ce qui est **validé** est coché **« Indispensable »**.
- Les autres onglets en découlent :
  - les indispensables constituent la **Chronologie** ;
  - la Chronologie et les nuits structurent l'**Itinéraire** ;
  - le site affiche le tout.

**On peut modifier « À faire » à tout moment, directement dans Google Sheets, sans Claude** : ajouter une idée, cocher ou décocher « Indispensable », changer une note. Ces modifications sont prises en compte à la prochaine mise à jour (section 5).

```
À faire (saisie libre, à tout moment)
   │  indispensables
   ▼
Chronologie (générée)  ──►  Itinéraire (étapes, trajets, hôtels)
   │                              │
   └──────────────┬───────────────┘
                  ▼
        Site public (généré)
```

Le site est **statique** : il montre l'état de la feuille au moment de la dernière mise à jour (date « données au … » en haut des pages). Une erreur sur le site se corrige **dans la feuille**, jamais dans les pages.

## 2. Les onglets de la feuille

| Onglet | Qui le remplit | Rôle |
|---|---|---|
| **À faire** | Nous, à la main | Catalogue de toutes les idées ; « Indispensable » = validé |
| **Chronologie** | La mise à jour, automatiquement | Déroulé jour par jour des indispensables |
| **Itinéraire** | La mise à jour, puis nous pour le choix des hôtels | Villes et nuits, trajets, hôtels |
| **Spécialités** | Nous (case « Fait ») | Ce qu'il faut goûter |
| **Préparer le voyage** | Nous (colonne « Statut ») | Checklist des démarches |
| **famille franco** | Nous | Notes de comparaison avec le voyage d'amis ; jamais publié |

### À faire : la base

Une ligne par idée. Colonnes : ville, description (« À faire »), note de 1 à 5, **Indispensable**, durée estimée, type, source, à réserver à l'avance, fait, précisions.

- **Indispensable coché** = l'idée est validée : elle entre dans la Chronologie et apparaît par défaut sur la carte.
- **Indispensable non coché** = une possibilité : elle reste disponible sur la carte avec le filtre « Tous les centres d'intérêt », pour trouver des activités complémentaires pendant le voyage.
- Une activité découverte sur place s'ajoute ici, comme toute autre idée, puis on coche « Indispensable » si on la fait.
- Le texte de la colonne « À faire » sert d'identifiant : la Chronologie le reprend à l'identique. On peut le modifier ; la mise à jour suivante répercute le changement.
- Rangement, refait à chaque mise à jour : par ville dans l'ordre du voyage, puis les indispensables d'abord, puis par note décroissante.
- « À réserver à l'avance » fait apparaître l'étiquette « À réserver » sur le site.
- Les lignes de type **« Hébergement »** sont **ignorées** : ni Chronologie, ni carte, même cochées. Les hôtels se gèrent dans l'Itinéraire.

### Chronologie : générée à partir des indispensables

Une ligne par activité : date, jour, nuit à, moment (matin, après-midi, soir, journée), activité, type, heure, remarques. Cet onglet n'a pas besoin d'être modifié à la main.

Règles de génération :
- **Chaque indispensable de « À faire » y figure exactement une fois** (type « Backbone », texte identique).
- Un indispensable **décoché** est retiré de la Chronologie.
- Un **nouvel indispensable** est placé dans un jour où l'on dort dans sa ville ou à proximité (voir « Villes sans nuit » ci-dessous). On le regroupe avec les lieux du même quartier, en respectant les jours de fermeture connus et les créneaux conseillés (tôt le matin, coucher du soleil…).
- Les placements existants (jour, heure, remarques) sont **conservés** d'une mise à jour à l'autre ; seuls les ajouts et retraits changent.
- S'y ajoutent des lignes **Trajet** (arrivée, changements de ville, départ, déduits de l'Itinéraire ; affichées dans la liste, sans point sur la carte) et **Libre** (journées ou créneaux sans programme). Il n'y a pas d'autre type : une activité ajoutée sur place passe par « À faire ».
- Les journées sont ordonnées par date, puis par heure.
- **Villes sans nuit** : si le lieu est dans une ville où l'on ne dort pas, deux cas.
  - S'il est raisonnable de ne pas y dormir (aller-retour dans la journée), il devient une **excursion** depuis l'étape où l'on dort ce jour-là. Il est **mis en exergue** : la remarque commence par « Excursion depuis … », la ligne est surlignée en orange dans la feuille, et le site affiche une étiquette orange « Excursion depuis … ».
  - Sinon, la mise à jour **crée une nouvelle étape** dans l'Itinéraire (avec nuits, mode de transport et durée du trajet) et le signale, puisque cela change la répartition des nuits.
- La mise à jour **signale** les jours trop chargés, les conflits (deux alternatives toutes deux indispensables) et les indispensables impossibles à placer, au lieu de trancher.

### Itinéraire : villes, nuits, trajets, hôtels

- **Étapes** : la liste des villes où l'on dort, dans l'ordre, avec les dates d'arrivée et de départ et le nombre de nuits. Ces dates rattachent chaque jour de la Chronologie à une étape ; le total des nuits disponibles (15) doit être entièrement placé.
- **Trajets** : pour chaque étape, comment y aller et la durée. Ils sont dessinés sur la carte entre deux villes.
- **Hôtels (colonnes Hôtel 1 à 4)**, pour chaque étape :
  - **Hôtel 1** : la proposition de Claude.
  - **Hôtels 2 et 3** : des alternatives possibles.
  - **Hôtel 4** : **notre choix final**. Une fois rempli, il s'affiche en premier sur le site avec l'étiquette « Retenu ».
  - Format d'une cellule : le nom de l'hôtel d'abord (avant la première virgule), puis le quartier ou une description, la note et le prix.
- **Options** : villes envisagées mais pas retenues. Une option devenue excursion est marquée « Excursion (0 nuit) ».
- **Villes de passage et excursions** : villes utiles au trajet sans y dormir (correspondances, arrêts, excursions à la journée), avec le moyen de transport et la durée. Cette liste est déduite des indispensables situés hors des villes d'étape.

### Spécialités

Une ligne par plat ou boisson : spécialité, catégorie, ville, précisions, priorité de 1 à 3, case **Fait**. Cocher « Fait » barre le plat sur le site et fait avancer la barre « n sur N goûtées ».

### Préparer le voyage

Une ligne par démarche : catégorie, à préparer, quand, **priorité** (Indispensable, Important, Utile), **statut**, précisions, lien.

- **À faire** : affiché dans la checklist.
- **Fait** : coché sur le site.
- **Rejeté** : déplacé dans la section « Rejetés », gardés pour mémoire.
- Les cases cochées sur le site ne sont mémorisées que dans le navigateur ; **la colonne Statut fait foi**.

## 3. Règles de construction du site

### Pages

- **Accueil** : un lien vers chaque page, avec la date de mise à jour.
- **Carte interactive** : détaillée ci-dessous.
- **Préparer le voyage** : checklist par catégorie, filtres Tout / Indispensable / Important / Utile / Reste à faire, section des rejetés repliée.
- **Spécialités** : plats par ville, barre de progression, plats goûtés barrés.

### Carte interactive : contenu

- **Par défaut : uniquement les indispensables.** Les villes d'option sans lieu affiché sont masquées.
- **Filtre « Tous les centres d'intérêt »** : affiche aussi toutes les autres idées de « À faire » (non indispensables, hors hébergements), en plus pâle, pour trouver des activités complémentaires sur place. Dans la vue Chronologie, elles apparaissent à la fin, dans une section « Autres centres d'intérêt » rangée par ville.
- **Excursions** : étiquette orange « Excursion depuis … » dans la liste et sur la fiche du lieu.
- **Itinéraire** : une pastille par ville, numérotée selon l'étape. Les trajets entre villes sont des flèches, avec une pastille pour le mode de transport (train, Shinkansen…) et la durée. En haut de la page, une barre reprend les étapes, avec les dates et les nuits, et les trajets entre elles.
- **Zoom** : en vue large, on voit les villes avec le nombre de lieux ; en zoomant, les lieux eux-mêmes avec leur note.
- **Fiche d'un lieu** : nom complet, note, durée, type, jour prévu dans la Chronologie, « À réserver », précisions, lien vers une page en français.

### Carte interactive : la liste et ses filtres

- **Recherche** par nom de lieu.
- **Vues** : « Chronologie » (jour par jour, avec les trajets et les créneaux libres) ou « Par ville ».
- **Raccourcis** : « Tous les centres d'intérêt » et « À réserver ».
- **Bouton « Filtres »** (replié par défaut) : note minimale, type d'activité, affichage de l'itinéraire sur la carte, réinitialisation.
- **Clic sur une ville**, une étape de la barre ou une flèche de trajet :
  - la carte zoome sur la ville ;
  - la liste se limite aux jours de cette étape, avec le bandeau « Étape n · ville » et le bouton « Tout afficher » ;
  - deux onglets apparaissent, **Centres d'intérêt** et **Hôtel**. L'onglet Hôtel montre les hôtels de l'étape (Retenu = Hôtel 4, Proposition = Hôtel 1), avec un lien Booking pré-rempli aux dates de l'étape et un lien Google Maps.
- **Clic sur un lieu** (carte ou liste) : ouvre sa fiche détaillée et le met en évidence sur la carte.

### PC et mobile

- **PC (fenêtre de plus de 920 px)** : la liste et la carte sont côte à côte. Le panneau de la liste est redimensionnable (poignée, ou flèches du clavier) et repliable ; sa largeur est mémorisée.
- **Mobile** : deux onglets en bas de l'écran, **Carte** et **Liste**. Sur la carte, une pastille rappelle l'étape sélectionnée. La fiche d'un lieu s'ouvre sans masquer le lieu.
- Mêmes fonctions sur les deux ; seule la disposition change.
- Après une nouvelle publication, un navigateur peut afficher l'ancienne version : vider le cache (Ctrl+Maj+R).

## 4. Confidentialité

Le site est **public** ; la feuille ne l'est pas.

- **Interdit sur le site** (la publication est bloquée) : lien vers la feuille ou un document privé, adresse e-mail, numéro de vol, âge de l'enfant, prénoms ou noms de la famille, références de réservation, numéros de téléphone personnels.
- Les numéros de vol et l'âge sont **retirés automatiquement** des textes de la feuille avant publication, sans modifier la feuille.
- **Acceptés** (validé le 15 novembre 2026) : dates, hôtels, nom de la banque, horaires de vol, l'âge dans les liens Booking (pour que le prix affiché soit juste).
- À éviter dans les colonnes publiées (précisions, remarques) : tout ce qui est personnel ou confidentiel.

## 5. Procédure de mise à jour

On modifie « À faire » (et Spécialités, Préparer le voyage, Hôtel 4) quand on veut, dans Google Sheets. On lance ensuite une mise à jour, qui se fait **en deux temps, dans cet ordre** :

### Temps 1 : mise à jour de la feuille

1. **À faire** : relire et ranger (par ville dans l'ordre du voyage, indispensables d'abord, puis par note), sans changer les textes ni les villes.
2. **Chronologie** : la régénérer à partir des indispensables (section 2) : ajouter les nouveaux, retirer ceux qui ont été décochés, ignorer les hébergements, conserver les placements existants, mettre à jour les trajets, marquer les excursions.
3. **Itinéraire** : vérifier les étapes, les nuits et les trajets. Compléter les villes de passage et d'excursion nécessaires, ou créer une étape quand un indispensable l'exige (section 2). Proposer un Hôtel 1 pour toute nouvelle étape, sans jamais toucher à l'Hôtel 4.
4. **Questions** : lister ce qui doit être tranché (conflits, jours chargés, nuits non placées) au lieu de décider à notre place.

### Temps 2 : mise à jour du site

5. Relire tous les onglets et régénérer les pages.
6. Traiter les avertissements : position inconnue d'un lieu (la rechercher), fiche Booking d'un nouvel hôtel (en attendant, un lien de recherche Booking est proposé), lien en français manquant.
7. **Contrôle de confidentialité** (section 4) : la publication est bloquée en cas de problème.
8. **Vérification du rendu** sur PC et sur mobile (clic sur une ville, onglet Hôtel, filtres, onglets Carte/Liste), sans erreur.
9. **Publication** : commit et push sur GitHub, puis contrôle que GitHub contient bien la nouvelle version. GitHub Pages se met à jour en une à deux minutes. Pour un changement de présentation du site, publier d'abord un aperçu privé et attendre notre validation.
10. **Compte rendu** : ce qui a changé (dans la feuille, sur la carte, dans les spécialités, dans la checklist), les avertissements restants et les questions ouvertes.

## Pour les curieux

Le détail technique de la génération (scripts, fichiers) est dans `src/README.md`.
