// Données issues du Google Sheet « Voyage Japon 2027 - À faire » (lecture du 15/11/2026).
// Chaque lieu : [groupe, nom court, texte de la feuille, rating, indispensable, durée (h), type, réservation, lat, lng, approx]
export const GROUPS = {
  "Tokyo":            { label: "Tokyo",                 lat: 35.6850, lng: 139.7300, anchor: "start", dx: 15,  dy: -12 },
  "Fuji-Hakone-Izu":  { label: "Fuji",                  lat: 35.4300, lng: 138.8500, anchor: "end",   dx: -15, dy: -6 },
  "Hakone":           { label: "Hakone",                lat: 35.2330, lng: 139.0600, anchor: "middle",dx: 0,   dy: 26 },
  "Kyoto":            { label: "Kyoto",                 lat: 35.0116, lng: 135.7681, anchor: "start", dx: 15,  dy: -8 },
  "Nara":             { label: "Nara",                  lat: 34.6851, lng: 135.8300, anchor: "start", dx: 15,  dy: 8 },
  "Nagoya / Inuyama": { label: "Nagoya et Inuyama",     lat: 35.1815, lng: 136.9066, anchor: "middle",dx: 0,   dy: 26 },
  "Osaka":            { label: "Osaka",                 lat: 34.6937, lng: 135.5023, anchor: "middle",dx: 0,   dy: 26 },
  "Takayama / Shirakawa-go": { label: "Takayama et Shirakawa-go", lat: 36.1405, lng: 137.2615, anchor: "middle", dx: 0, dy: -18 },
  "Kanazawa":         { label: "Kanazawa",              lat: 36.5613, lng: 136.6562, anchor: "middle",dx: 0,   dy: -18 },
  "Himeji":           { label: "Himeji",                lat: 34.8151, lng: 134.6853, anchor: "end",   dx: -15, dy: 4 },
  "Hiroshima":        { label: "Hiroshima",             lat: 34.3853, lng: 132.4553, anchor: "middle",dx: 0,   dy: 26 },
  "Miyajima":         { label: "Miyajima",              lat: 34.2961, lng: 132.3198, anchor: "start", dx: 14,  dy: 14 },
  "Okayama":          { label: "Okayama",               lat: 34.6551, lng: 133.9195, anchor: "end",   dx: -15, dy: -4 },
  "Kobe":             { label: "Kobe",                  lat: 34.6901, lng: 135.1955, anchor: "end",   dx: -15, dy: 14 }
};

export const PLACES = [
  // Tokyo
  ["Tokyo","Senso-ji","Senso-ji (Asakusa), arriver tôt pour éviter la foule sur Nakamise-dori",5,true,2,"Visite","Non",35.7148,139.7967],
  ["Tokyo","Meiji-Jingu","Meiji-Jingu",4,true,1.5,"Visite","Non",35.6764,139.6993],
  ["Tokyo","Sengaku-ji","Sengaku-ji",2,false,1,"Visite","Non",35.6385,139.7340],
  ["Tokyo","Okunitama Jinja","Okunitama Jinja",1,false,1,"Visite","Non",35.6683,139.4778],
  ["Tokyo","Maneki-Neko","Maneki-Neko",1,false,1,"Visite","Non",35.6486,139.6469,1],
  ["Tokyo","Shibuya Crossing","Shibuya Crossing",4,false,0.5,"Visite","Non",35.6595,139.7005],
  ["Tokyo","Shinjuku Gyoen","Shinjuku (jardin Shinjuku Gyoen, fermé le lundi)",3,true,2,"Visite","Non",35.6852,139.7100],
  ["Tokyo","Harajuku","Harajuku",4,false,2.5,"Visite","Non",35.6702,139.7027],
  ["Tokyo","Akihabara","Akihabara (manga, jeux vidéo, électronique)",5,true,3,"Visite","Non",35.6984,139.7731],
  ["Tokyo","teamLab","teamLab (Planets ou Borderless)",5,true,2.5,"Activité","Oui",35.6491,139.7897],
  ["Tokyo","Sushi à Toyosu","Repas de sushi au marché de Toyosu",4,false,1.5,"Expérience","Non",35.6455,139.7845],
  ["Tokyo","Dernier shopping","Dernier shopping et site raté au premier passage (fin de séjour)",3,false,3,"Visite","Non",35.6717,139.7650,1],
  ["Tokyo","Sumo : entraînement du matin","Sumo : assister à l'entraînement du matin dans une écurie de Ryogoku (visite guidée en anglais)",4,true,2.5,"Expérience","Oui",35.6930,139.7960,1],
  ["Tokyo","Sumo : tournée Ariake Basho","Sumo : tournée de printemps « Ariake Basho » à l'Ariake Arena, jeudi 15 avril 2027 (portes 9h, fin 14h30)",4,false,5.5,"Spectacle","Oui",35.6360,139.7910],
  ["Tokyo","Sumo : tournée de Fujisawa","Sumo : autre tournée possible à Fujisawa (Kanagawa), samedi 17 avril 2027",2,false,6,"Spectacle","Oui",35.3390,139.4900],
  ["Tokyo","Ryogoku : musée du sumo","Ryogoku : musée du sumo et quartier (chanko-nabe, le ragoût des lutteurs)",3,false,2,"Visite","Non",35.6990,139.7936],
  ["Tokyo","Boutique PSG de Shinjuku","Boutique PSG de Shinjuku (boutique principale de Tokyo)",4,true,1,"Shopping","Non",35.6905,139.7010,1],
  ["Tokyo","Boutique PSG de Harajuku","Boutique PSG de Harajuku (Laforet Harajuku, 1er étage)",3,false,1,"Shopping","Non",35.6703,139.7060],
  ["Tokyo","Musée Ghibli","Musée Ghibli de Mitaka",5,false,3,"Activité","Oui, très tôt",35.6962,139.5704],
  ["Tokyo","Shibuya Sky","Shibuya Sky (vue panoramique, de préférence au coucher du soleil)",4,true,1.5,"Visite","Oui",35.6585,139.7022],
  ["Tokyo","Tokyo Skytree","Tokyo Skytree (plateforme d'observation, de préférence au coucher du soleil)",3,false,2,"Visite","Oui",35.7101,139.8107],
  ["Tokyo","Cerisiers : Ueno, Chidorigafuchi, Meguro","Cerisiers en fleurs : parc d'Ueno, Chidorigafuchi, rivière Meguro",4,false,3,"Nature","Non",35.7148,139.7745],
  ["Tokyo","Kamakura ou Nikko","Excursion d'une journée à Kamakura (Grand Bouddha) ou à Nikko (environ 2 h de train)",3,false,6,"Visite","Non",35.3167,139.5359],
  // Fuji
  ["Fuji-Hakone-Izu","Parc national Fuji-Hakone-Izu","Parc National de Fuji-Hakone-Izu",3,false,4,"Nature","Non",35.3000,138.9500,1],
  ["Fuji-Hakone-Izu","Vue sur le Fuji (Kawaguchiko)","Vue sur le Mont Fuji depuis Hakone ou Kawaguchiko",4,false,1.5,"Nature","Non",35.5100,138.7600],
  ["Fuji-Hakone-Izu","Gravir le Mont Fuji","Gravir le Mont Fuji (à vérifier : saison d'ouverture des sentiers, généralement l'été)",1,false,12,"Nature","À vérifier",35.3606,138.7274],
  // Hakone
  ["Hakone","Croisière sur le lac Ashi","Croisière sur le lac Ashi",3,false,1.5,"Activité","Non",35.2000,139.0270],
  ["Hakone","Nuit en ryokan avec onsen","Nuit en ryokan avec onsen (séjour spécial du voyage)",5,false,null,"Hébergement","Oui",35.2265,139.0909,1],
  ["Hakone","Alternative : nature, onsen, ramen","Alternative au ryokan : journée « nature et gourmandise » près du Fuji (petite randonnée, onsen en plein air, restaurant de fruits de mer) et Musée du ramen de Shin-Yokohama",4,true,9,"Activité","À vérifier",35.2450,139.0450,1],
  // Kyoto
  ["Kyoto","Fushimi Inari","Fushimi Inari (arriver avant 7h)",5,true,2.5,"Visite","Non",34.9671,135.7727],
  ["Kyoto","Kinkaku-ji","Kinkaku-ji (Pavillon d'Or)",4,false,1,"Visite","Non",35.0394,135.7292],
  ["Kyoto","Ginkaku-ji","Ginkaku-ji (Pavillon d'Argent)",3,false,1,"Visite","Non",35.0270,135.7982],
  ["Kyoto","Gion","Gion (idéal en fin de journée)",4,true,2,"Visite","Non",35.0037,135.7756],
  ["Kyoto","Kiyomizu-dera","Kiyomizu-dera",4,false,1.5,"Visite","Non",34.9949,135.7850],
  ["Kyoto","Forêt de bambous d'Arashiyama","Forêt de bambous d'Arashiyama",4,true,2.5,"Visite","Non",35.0170,135.6713],
  ["Kyoto","Nintendo Museum","Nintendo Museum (Uji, près de Kyoto)",5,true,3.5,"Activité","Oui, très tôt",34.8896,135.8031],
  ["Kyoto","Cerisiers : chemin de la Philosophie","Cerisiers en fleurs : chemin de la Philosophie",3,false,1.5,"Nature","Non",35.0230,135.7950],
  // Nara
  ["Nara","Parc de Nara et Todai-ji","Parc de Nara (cerfs) et Todai-ji, excursion depuis Kyoto",5,true,4,"Visite","Non",34.6890,135.8398],
  ["Nara","Kasuga Taisha","Sanctuaire Kasuga Taisha et ses lanternes",3,false,1,"Visite","Non",34.6813,135.8485],
  ["Nara","Naramachi","Quartier de Naramachi (vieilles maisons de marchands, boutiques)",2,false,1.5,"Visite","Non",34.6760,135.8300],
  ["Nara","Nourrir les cerfs","Nourrir les cerfs avec les biscuits vendus dans le parc",3,false,0.5,"Expérience","Non",34.6851,135.8430],
  // Nagoya / Inuyama
  ["Nagoya / Inuyama","Nagoya","Visiter Nagoya",2,false,4,"Visite","Non",35.1852,136.8996],
  ["Nagoya / Inuyama","Château d'Inuyama","Château d'Inuyama",2,false,2,"Visite","Non",35.3883,136.9393],
  ["Nagoya / Inuyama","Boutique PSG de Nagoya","Boutique PSG de Nagoya (Parco, aile ouest, 1er étage)",2,false,1,"Shopping","Non",35.1665,136.9086,1],
  // Osaka
  ["Osaka","Dotonbori","Visiter Osaka : Dotonbori (street food), château d'Osaka (option à trancher, Osaka jugée moins intéressante)",3,false,5,"Visite","Non",34.6687,135.5013],
  ["Osaka","Château d'Osaka","Château d'Osaka (Osaka-jô), donjon, musée et parc",3,false,2.5,"Visite","Non",34.6873,135.5262],
  ["Osaka","Universal Studios Japan","Universal Studios Japan (option, une journée entière)",4,false,10,"Activité","Oui",34.6654,135.4323],
  // Takayama
  ["Takayama / Shirakawa-go","Takayama et Shirakawa-go","Takayama (vieille ville, marchés) et village historique de Shirakawa-go (option à la place d'Osaka)",4,true,7,"Visite","Non",36.1405,137.2615],
  ["Takayama / Shirakawa-go","Nuit en ryokan à Takayama","Nuit en ryokan à Takayama (Asunaro, Tanabe ou Honjin Hiranoya Kachoan)",null,false,null,"Hébergement","Oui",36.1385,137.2540,1],
  // Kanazawa
  ["Kanazawa","Kenroku-en","Jardin Kenroku-en",4,false,1.5,"Visite","Non",36.5622,136.6628],
  ["Kanazawa","Higashi Chaya","Quartier des geishas Higashi Chaya",3,false,1.5,"Visite","Non",36.5724,136.6666],
  ["Kanazawa","Marché Omicho","Marché Omicho (produits de la mer, street food)",3,false,1.5,"Expérience","Non",36.5712,136.6577],
  // Himeji
  ["Himeji","Château de Himeji","Château de Himeji",4,false,2,"Visite","À vérifier",34.8394,134.6939],
  ["Himeji","Jardin Koko-en","Jardin Koko-en (à côté du château)",2,false,1,"Visite","Non",34.8390,134.6895],
  ["Himeji","Temple Engyo-ji","Temple Engyo-ji",2,false,2,"Visite","Non",34.8689,134.6595],
  ["Himeji","Himeji comme étape","Himeji comme arrêt entre Osaka ou Kyoto et Hiroshima",null,false,null,"Étape","Non",34.8271,134.6906,1],
  // Hiroshima
  ["Hiroshima","Parc du Mémorial de la Paix","Parc du Mémorial de la Paix et Dôme de Genbaku",4,false,1.5,"Visite","Non",34.3955,132.4536],
  ["Hiroshima","Musée du Mémorial de la Paix","Musée du Mémorial de la Paix",4,false,1.5,"Visite","Non",34.3912,132.4527],
  ["Hiroshima","Jardin Shukkei-en","Jardin Shukkei-en",2,false,1,"Visite","Non",34.4003,132.4670],
  ["Hiroshima","Okonomiyaki","Okonomiyaki à la façon de Hiroshima, huîtres, anago (congre)",3,false,1.5,"Expérience","Non",34.3935,132.4590,1],
  // Miyajima
  ["Miyajima","Grand torii d'Itsukushima","Grand torii et sanctuaire d'Itsukushima",5,false,1.5,"Visite","Non",34.2958,132.3194],
  ["Miyajima","Cerfs en liberté","Cerfs en liberté sur l'île",3,false,1,"Visite","Non",34.2985,132.3180],
  ["Miyajima","Pagode Goju-no-to","Pagode Goju-no-to et sanctuaire Toyokuni",2,false,0.5,"Visite","Non",34.2985,132.3212],
  ["Miyajima","Momiji manju","Momiji manju (gâteaux en forme de feuille d'érable)",2,false,0.5,"Expérience","Non",34.2955,132.3205],
  ["Miyajima","Nuit en ryokan sur l'île","Nuit sur l'île en ryokan familial (par exemple Miyajima Kinsuikan)",null,false,null,"Hébergement","Oui",34.2967,132.3215,1],
  // Okayama
  ["Okayama","Jardin Korakuen","Jardin Korakuen",3,false,1.5,"Visite","Non",34.6665,133.9362],
  ["Okayama","Château d'Okayama","Château d'Okayama, le château noir",2,false,1,"Visite","Non",34.6652,133.9417],
  ["Okayama","Bikan à Kurashiki","Quartier historique Bikan à Kurashiki",3,false,3,"Visite","Non",34.5963,133.7720],
  // Kobe
  ["Kobe","Bœuf de Kobe","Bœuf de Kobe (repas teppanyaki)",5,true,1.5,"Expérience","Oui, conseillé",34.6900,135.1910,1],
  ["Kobe","Quartier de Kitano","Quartier de Kitano (maisons occidentales)",2,false,2,"Visite","Non",34.6976,135.1927],
  ["Kobe","Port de Kobe","Port de Kobe (Harborland, Meriken Park)",2,false,2,"Visite","Non",34.6786,135.1856],
  ["Kobe","Téléphérique Nunobiki","Téléphérique Nunobiki, jardin d'herbes et vue de nuit sur Kobe (mont Rokko)",4,true,3,"Activité","Non",34.7050,135.1965],
  ["Kobe","Arima Onsen","Arima Onsen (station thermale proche de Kobe)",3,false,3,"Expérience","À vérifier",34.7977,135.2478]
];

// Étapes de l'onglet « Itinéraire » (dates 2027)
export const STAYS = [
  { n: 1, group: "Tokyo",  from: "3 avr",  to: "6 avr",  nights: 3 },
  { n: 2, group: "Hakone", from: "6 avr",  to: "8 avr",  nights: 2 },
  { n: 3, group: "Kyoto",  from: "8 avr",  to: "12 avr", nights: 4 },
  { n: 4, group: "Takayama / Shirakawa-go", from: "12 avr", to: "14 avr", nights: 2 },
  { n: 5, group: "Tokyo",  from: "14 avr", to: "16 avr", nights: 2 }
];
