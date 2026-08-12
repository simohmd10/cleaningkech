import {
  Home, Building2, Armchair, ChefHat, ShowerHead,
  LayoutDashboard, Bed, Sofa
} from 'lucide-react';

import villaImg from '../assets/photos/villa.jpg';
import officeImg from '../assets/photos/office.jpg';
import chairsImg from '../assets/photos/chairs.jpg';
import kitchenImg from '../assets/photos/kitchen.jpg';
import bathroomImg from '../assets/photos/bathroom.jpg';
import windowImg from '../assets/photos/window.jpg';
import rugImg from '../assets/photos/rug.jpg';
import mattressImg from '../assets/photos/mattress.jpg';
import sofaImg from '../assets/photos/sofa.jpg';

/* ------------------------------------------------------------------
   BLOG — un article par photo/sujet
------------------------------------------------------------------ */
export const BLOG_POSTS = [
  {
    slug: 'nettoyage-villa-marrakech',
    icon: Home,
    image: villaImg,
    alt: 'Équipe CleanKeh en intervention de ménage complet dans une villa à Marrakech',
    title: 'Ménage complet de villa à Marrakech : comment travaille notre équipe',
    excerpt: "De la Palmeraie à Guéliz, découvrez comment notre équipe organise un grand ménage de villa, pièce par pièce, sans rien oublier.",
    body: [
      "Nettoyer une villa ne s'improvise pas : entre les grandes baies vitrées, les sols en marbre, les pièces de vie et les chambres, chaque espace demande une méthode adaptée. Notre équipe commence toujours par un état des lieux rapide pour identifier les priorités : surfaces fragiles, zones très fréquentées, présence d'enfants ou d'animaux.",
      "L'intervention se déroule ensuite du haut vers le bas et de l'intérieur vers l'extérieur : dépoussiérage des plafonniers et corniches, nettoyage des vitres et baies vitrées, désinfection des cuisines et sanitaires, puis lavage et lustrage des sols en dernier pour ne pas resalir ce qui vient d'être fait.",
      "Pour les villas avec piscine ou jardin, nous coordonnons souvent le ménage intérieur avec l'entretien extérieur, afin que toute la propriété soit impeccable le même jour. Chaque membre de l'équipe est équipé de matériel professionnel et de produits adaptés à chaque type de surface, du marbre poli au bois verni.",
      "Le résultat : une villa qui respire la propreté, du sol au plafond, sans que vous ayez à superviser l'intervention."
    ]
  },
  {
    slug: 'nettoyage-bureaux-marrakech',
    icon: Building2,
    image: officeImg,
    alt: 'Agent CleanKeh nettoyant un poste de travail dans un bureau à Marrakech',
    title: 'Nettoyage de bureaux à Marrakech : hygiène, image et productivité',
    excerpt: "Un bureau propre inspire confiance à vos clients et améliore le confort de vos équipes. Voici comment nous organisons l'entretien de vos locaux professionnels.",
    body: [
      "Un espace de travail propre n'est pas qu'une question d'apparence : c'est aussi un facteur de bien-être et de productivité pour vos collaborateurs, et un signal de sérieux pour vos visiteurs et clients. Bureaux, salles de réunion, open spaces, sanitaires : chaque zone a ses propres exigences.",
      "Nous intervenons généralement en dehors des heures de bureau ou tôt le matin pour ne pas perturber votre activité. Le protocole type comprend la désinfection des postes de travail et des surfaces à contact fréquent (poignées, interrupteurs, claviers si demandé), le nettoyage des sols, des vitres intérieures et des sanitaires, ainsi que le vidage des corbeilles.",
      "Pour les entreprises, nous proposons des contrats d'entretien réguliers — quotidiens, plusieurs fois par semaine ou hebdomadaires — avec une facturation transparente et un interlocuteur unique. La fréquence est ajustée selon la taille des locaux et le nombre de collaborateurs.",
      "Un bureau bien entretenu, c'est aussi moins d'arrêts maladie et une meilleure image auprès de vos clients dès leur arrivée dans vos locaux."
    ]
  },
  {
    slug: 'nettoyage-chaises-fauteuils-tissu',
    icon: Armchair,
    image: chairsImg,
    alt: 'Nettoyage professionnel de chaises en tissu par injection-extraction',
    title: 'Nettoyage de chaises et fauteuils en tissu : la méthode professionnelle',
    excerpt: "Chaises de salle à manger, fauteuils de salon : voici comment nous redonnons de l'éclat à vos assises en tissu sans les abîmer.",
    body: [
      "Les chaises et fauteuils en tissu accumulent poussière, taches et odeurs bien plus vite qu'on ne le pense, surtout autour d'une table à manger. Avant toute intervention, nous testons toujours la solidité des couleurs sur une zone discrète pour éviter tout risque de décoloration.",
      "Notre méthode d'injection-extraction consiste à pulvériser une solution nettoyante adaptée au textile, puis à l'extraire immédiatement avec les résidus de saleté grâce à un appareil professionnel. Contrairement à un simple passage d'éponge, cette technique nettoie en profondeur sans détremper le rembourrage.",
      "Le séchage est rapide grâce à une extraction puissante qui retire un maximum d'humidité dès le passage de l'outil. Comptez généralement quelques heures avant de pouvoir réutiliser les assises normalement.",
      "Un entretien régulier tous les 6 à 12 mois permet de prolonger la durée de vie de vos meubles et d'éviter que les taches ne s'incrustent durablement dans les fibres."
    ]
  },
  {
    slug: 'nettoyage-cuisine-marrakech',
    icon: ChefHat,
    image: kitchenImg,
    alt: 'Nettoyage de plan de travail de cuisine par un agent CleanKeh',
    title: 'Nettoyage de cuisine : désinfecter sans abîmer vos surfaces',
    excerpt: "Plans de travail en marbre, hottes, plaques de cuisson : notre méthode pour une cuisine impeccable et saine.",
    body: [
      "La cuisine est l'une des pièces les plus exigeantes à entretenir : graisse sur la hotte et les plaques, éclaboussures sur le plan de travail, traces de calcaire sur l'évier. Chaque surface demande un produit et une méthode différents pour rester impeccable sans être abîmée.",
      "Nous dégraissons en priorité les zones de cuisson (plaques, hotte, four) avec des produits adaptés qui n'attaquent pas l'inox ni les revêtements. Les plans de travail en marbre ou en quartz sont nettoyés avec des produits non abrasifs et non acides pour préserver leur brillance.",
      "La désinfection porte une attention particulière aux zones de contact avec les aliments : plan de travail, poignées de placards, robinetterie et évier. Les rangements ouverts sont dépoussiérés et les sols sont lavés en dernier.",
      "Une cuisine régulièrement entretenue en profondeur, c'est non seulement plus agréable au quotidien, mais aussi plus sain pour toute la famille."
    ]
  },
  {
    slug: 'nettoyage-salle-de-bain-marbre',
    icon: ShowerHead,
    image: bathroomImg,
    alt: 'Nettoyage de vasque en marbre dans une salle de bain par un agent CleanKeh',
    title: 'Nettoyage de salle de bain : marbre, robinetterie et sanitaires',
    excerpt: "Tartre, traces d'eau, joints encrassés : voici comment notre équipe redonne tout son éclat à votre salle de bain en marbre.",
    body: [
      "Entre l'humidité constante et le calcaire de l'eau, la salle de bain demande un entretien méthodique pour rester à la fois saine et esthétique. Le marbre et la robinetterie dorée, très présents dans les salles de bain haut de gamme à Marrakech, nécessitent des précautions particulières.",
      "Nous évitons systématiquement les produits acides sur le marbre, qui peuvent ternir sa surface de façon irréversible, et privilégions des nettoyants doux au pH neutre. La robinetterie et les accessoires dorés sont nettoyés avec des chiffons microfibre pour préserver leur finition.",
      "La douche à l'italienne, les parois vitrées et les joints reçoivent une attention particulière contre le calcaire et les moisissures, tandis que les sanitaires sont désinfectés en profondeur. Miroirs et surfaces vitrées terminent l'intervention sans traces.",
      "Résultat : une salle de bain qui retrouve son éclat d'origine, du sol en marbre à la robinetterie, sans risque pour les matériaux nobles."
    ]
  },
  {
    slug: 'nettoyage-vitres-sans-traces',
    icon: LayoutDashboard,
    image: windowImg,
    alt: 'Nettoyage de baie vitrée avec vue sur piscine par un agent CleanKeh',
    title: 'Nettoyage de vitres sans traces : nos techniques professionnelles',
    excerpt: "Grandes baies vitrées, vérandas, fenêtres en hauteur : découvrez comment nous obtenons des vitres impeccables, sans traces ni auréoles.",
    body: [
      "Les grandes baies vitrées et vérandas, très courantes dans les villas modernes de Marrakech, laissent apparaître la moindre trace ou auréole. Pour un résultat impeccable, nous travaillons de préférence tôt le matin ou en fin de journée, en évitant le soleil direct qui fait sécher le produit trop vite et laisse des marques.",
      "Notre technique repose sur une raclette professionnelle associée à un mouvement continu, sans repasser sur une zone déjà raclée, complétée par un chiffon microfibre pour les bords et les angles. Les cadres et rails de baies coulissantes sont également dépoussiérés, car ils concentrent souvent la saleté.",
      "Pour les fenêtres en hauteur ou difficiles d'accès, notre équipe utilise du matériel adapté pour intervenir en toute sécurité, aussi bien à l'intérieur qu'à l'extérieur.",
      "Un nettoyage de vitres régulier, tous les 1 à 2 mois pour une villa avec piscine, garantit une luminosité maximale et une vue toujours dégagée sur votre jardin ou votre terrasse."
    ]
  },
  {
    slug: 'nettoyage-tapis-en-profondeur',
    icon: Sofa,
    image: rugImg,
    alt: "Nettoyage de tapis en profondeur avec extraction de la saleté incrustée",
    title: 'Nettoyage de tapis en profondeur : avant/après',
    excerpt: "Poussière incrustée, acariens, taches anciennes : notre méthode d'injection-extraction pour un tapis comme neuf.",
    body: [
      "Un tapis peut paraître propre en surface tout en retenant une quantité importante de poussière, d'acariens et d'allergènes au cœur de ses fibres. Un simple passage d'aspirateur ne suffit pas à retirer cette saleté incrustée en profondeur.",
      "Notre méthode d'injection-extraction pulvérise une solution nettoyante au cœur du tapis puis l'aspire immédiatement avec la saleté qu'elle a délogée. La différence est souvent spectaculaire : il n'est pas rare de voir la quantité de poussière et de résidus extraits d'un tapis qui semblait pourtant propre.",
      "Cette méthode respecte les fibres et les couleurs des tapis, y compris les tapis berbères et les tapis de salon les plus délicats, tout en éliminant efficacement les acariens responsables d'allergies.",
      "Le séchage prend généralement quelques heures selon l'épaisseur du tapis et la ventilation de la pièce. Nous recommandons un nettoyage en profondeur au moins une à deux fois par an pour les tapis très fréquentés."
    ]
  },
  {
    slug: 'nettoyage-matelas-frequence',
    icon: Bed,
    image: mattressImg,
    alt: 'Nettoyage en profondeur de matelas par extraction professionnelle',
    title: 'Nettoyage de matelas : pourquoi et à quelle fréquence ?',
    excerpt: "Un matelas non nettoyé peut accumuler acariens, transpiration et taches. Voici pourquoi et à quelle fréquence le faire nettoyer.",
    body: [
      "Nous passons en moyenne un tiers de notre temps au lit, et le matelas absorbe au fil des mois transpiration, cellules de peau mortes et acariens — invisibles à l'œil nu mais responsables de nombreuses allergies et irritations respiratoires.",
      "Notre méthode d'extraction professionnelle aspire en profondeur la poussière et les résidus incrustés dans le matelas, tout en traitant les taches visibles (transpiration, boissons, accidents). Le contraste avant/après est souvent immédiat, comme le montre la différence de teinte entre la zone traitée et la zone non traitée.",
      "Contrairement à un lavage à l'eau, cette technique limite l'humidité résiduelle et permet un séchage plus rapide, réduisant le risque de moisissures à l'intérieur du matelas.",
      "Nous recommandons un nettoyage professionnel tous les 6 à 12 mois, et plus fréquemment pour les personnes allergiques, les enfants en bas âge ou après une maladie."
    ]
  },
  {
    slug: 'nettoyage-canape-guide',
    icon: Sofa,
    image: sofaImg,
    alt: 'Nettoyage de canapé en tissu avant/après par extraction',
    title: 'Nettoyage de canapé : redonner vie à votre salon',
    excerpt: "Taches, odeurs, tissu terni : voici comment notre équipe nettoie vos canapés en profondeur, avec un résultat visible immédiatement.",
    body: [
      "Le canapé est sans doute le meuble le plus utilisé du salon, et cela se voit : tissu terni, taches, odeurs qui s'installent avec le temps. Avant toute intervention, nous identifions la nature du textile (tissu, microfibre, cuir) afin d'adapter précisément la méthode et les produits utilisés.",
      "Pour les canapés en tissu, l'injection-extraction permet de nettoyer en profondeur chaque coussin et accoudoir : le produit est injecté puis aussitôt extrait avec la saleté, comme on peut le voir sur la ligne nette entre la zone traitée et la zone encore à nettoyer. Les taches tenaces reçoivent un prétraitement ciblé avant le passage général.",
      "Les canapés en cuir bénéficient d'un traitement spécifique, plus doux, suivi d'un soin nourrissant pour éviter que le cuir ne se dessèche ou craquelle avec le temps.",
      "Le résultat est visible dès la fin de l'intervention : un tissu retrouve sa couleur d'origine et le confort de votre salon est intact, sans avoir eu besoin de remplacer le canapé."
    ]
  }
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);
