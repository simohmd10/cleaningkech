// Post-build step: generates a static index.html per route with correct
// <title>, meta description, and Open Graph / Twitter Card tags baked in
// directly in the HTML. This matters because link-preview crawlers
// (WhatsApp, Facebook, Twitter/X, LinkedIn, Slack...) do not execute
// JavaScript, so tags set at runtime via React (usePageMeta) are invisible
// to them — they only ever see the raw HTML Vercel serves for that URL.
// The SPA itself is untouched: each generated file still loads the same
// JS bundle, so React Router takes over for all in-app navigation.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const BRAND = 'CleanKeh';
const CITY = 'Marrakech';
// Live production domain (Vercel). Update if/when the custom domain
// (cleankeh.ma) is connected and live.
const SITE_URL = 'https://cleaningkech.vercel.app';

const og = (name) => `${SITE_URL}/og/${name}.jpg`;

const PAGES = [
  {
    path: '/',
    title: `${BRAND} — Équipe de nettoyage professionnelle à ${CITY}`,
    description: `Équipe de nettoyage professionnelle, sérieuse et dynamique à ${CITY} : résidentiel, commercial, vitres, canapés & tapis, traitement des sols, piscine. Devis gratuit sous 2 h.`,
    image: og('villa')
  },
  {
    path: '/services',
    title: `Nos services de nettoyage à ${CITY} — ${BRAND}`,
    description: `Nettoyage résidentiel, commercial, vitres, canapés & tapis, traitement des sols et piscine à ${CITY}. Devis gratuit sous 2 h par une équipe sérieuse et dynamique.`,
    image: og('kitchen')
  },
  {
    path: '/packs',
    title: `Packs de nettoyage sur mesure à ${CITY} — ${BRAND}`,
    description: `Pack Essentiel, Confort ou Premium : choisissez le niveau de nettoyage adapté à votre logement ou local à ${CITY}. Tarif calculé selon la superficie.`,
    image: og('villa')
  },
  {
    path: '/pourquoi-nous',
    title: `Pourquoi choisir notre équipe de nettoyage à ${CITY} — ${BRAND}`,
    description: `Découvrez notre équipe sérieuse et dynamique, notre méthode de travail en 3 étapes, et des résultats avant/après visibles immédiatement à ${CITY}.`,
    image: og('mattress')
  },
  {
    path: '/avis',
    title: `Avis clients — ${BRAND}, nettoyage à ${CITY}`,
    description: `Note moyenne de 4.9/5 sur +250 avis. Découvrez les témoignages de nos clients particuliers et professionnels à ${CITY}.`,
    image: og('sofa')
  },
  {
    path: '/contact',
    title: `Contact et devis gratuit — ${BRAND}, nettoyage à ${CITY}`,
    description: `Contactez notre équipe de nettoyage à ${CITY} par téléphone, WhatsApp ou via le formulaire. Devis gratuit sous 2 h ouvrées.`,
    image: og('office')
  },
  {
    path: '/blog',
    title: `Blog nettoyage — Guides et conseils par ${BRAND}`,
    description: `Guides et conseils de nettoyage par l'équipe ${BRAND} à ${CITY} : canapés, tapis, matelas, vitres, bureaux, villas et plus.`,
    image: og('villa')
  }
];

const BLOG_POSTS = [
  { slug: 'nettoyage-villa-marrakech', title: 'Ménage complet de villa à Marrakech : comment travaille notre équipe', excerpt: "De la Palmeraie à Guéliz, découvrez comment notre équipe organise un grand ménage de villa, pièce par pièce, sans rien oublier.", image: 'villa' },
  { slug: 'nettoyage-bureaux-marrakech', title: 'Nettoyage de bureaux à Marrakech : hygiène, image et productivité', excerpt: "Un bureau propre inspire confiance à vos clients et améliore le confort de vos équipes. Voici comment nous organisons l'entretien de vos locaux professionnels.", image: 'office' },
  { slug: 'nettoyage-chaises-fauteuils-tissu', title: 'Nettoyage de chaises et fauteuils en tissu : la méthode professionnelle', excerpt: "Chaises de salle à manger, fauteuils de salon : voici comment nous redonnons de l'éclat à vos assises en tissu sans les abîmer.", image: 'chairs' },
  { slug: 'nettoyage-cuisine-marrakech', title: 'Nettoyage de cuisine : désinfecter sans abîmer vos surfaces', excerpt: "Plans de travail en marbre, hottes, plaques de cuisson : notre méthode pour une cuisine impeccable et saine.", image: 'kitchen' },
  { slug: 'nettoyage-salle-de-bain-marbre', title: 'Nettoyage de salle de bain : marbre, robinetterie et sanitaires', excerpt: "Tartre, traces d'eau, joints encrassés : voici comment notre équipe redonne tout son éclat à votre salle de bain en marbre.", image: 'bathroom' },
  { slug: 'nettoyage-vitres-sans-traces', title: 'Nettoyage de vitres sans traces : nos techniques professionnelles', excerpt: "Grandes baies vitrées, vérandas, fenêtres en hauteur : découvrez comment nous obtenons des vitres impeccables, sans traces ni auréoles.", image: 'window' },
  { slug: 'nettoyage-tapis-en-profondeur', title: 'Nettoyage de tapis en profondeur : avant/après', excerpt: "Poussière incrustée, acariens, taches anciennes : notre méthode d'injection-extraction pour un tapis comme neuf.", image: 'rug' },
  { slug: 'nettoyage-matelas-frequence', title: 'Nettoyage de matelas : pourquoi et à quelle fréquence ?', excerpt: "Un matelas non nettoyé peut accumuler acariens, transpiration et taches. Voici pourquoi et à quelle fréquence le faire nettoyer.", image: 'mattress' },
  { slug: 'nettoyage-canape-guide', title: 'Nettoyage de canapé : redonner vie à votre salon', excerpt: "Taches, odeurs, tissu terni : voici comment notre équipe nettoie vos canapés en profondeur, avec un résultat visible immédiatement.", image: 'sofa' }
].map((p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} — Blog ${BRAND}`,
  description: p.excerpt,
  image: og(p.image),
  type: 'article'
}));

const ALL_ROUTES = [...PAGES, ...BLOG_POSTS];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const route of ALL_ROUTES) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const type = route.type || 'website';

  let html = template;

  // <title>
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Drop the static fallback description — this route's own tag replaces it.
  html = html.replace(/\s*<meta name="description"[^>]*\/>\n?/, '');

  // Injected block right before </head>: description + OG + Twitter tags.
  // Any static description already in the template is left as-is upstream
  // of this block; browsers/crawlers use the last matching meta tag with
  // the same name, so this block's description wins.
  const metaBlock = `
    <meta name="description" content="${description}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${BRAND}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${route.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${route.image}" />
  </head>`;
  html = html.replace('</head>', metaBlock);

  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    // Flat "<path>.html" files (not "<path>/index.html") so Vercel's
    // cleanUrls resolves them for exact paths like "/services" —
    // requesting a directory without a trailing slash does NOT
    // auto-resolve to its index.html, only "/services/" would.
    const outPath = join(DIST, `${route.path.replace(/^\//, '')}.html`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
  }
}

console.log(`Prerendered ${ALL_ROUTES.length} routes with page-specific meta tags.`);
