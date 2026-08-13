/* ------------------------------------------------------------------
   CONFIG — modifier uniquement ici (une seule source de vérité)
------------------------------------------------------------------ */
export const CONFIG = {
  brand: 'CleanKeh',
  phoneDisplay: '+212 691 55 31 20',
  phoneRaw: '+212691553120',         // utilisé pour tel:
  whatsappNumber: '212691553120',    // format international sans +
  city: 'Marrakech',
  address: 'Guéliz, Marrakech, Maroc',
  postalCode: '40000',
  lat: 31.6295,
  lng: -7.9811,
  siteUrl: 'https://cleankeh.ma',
  hours: 'Lun-Sam : 08h00 - 19h00',
  reviewCount: 250,
  ratingValue: 4.9
};

export const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const WHATSAPP_LINK = waLink(
  `Bonjour, je souhaite obtenir un devis pour un service de nettoyage à ${CONFIG.city}.`
);

export const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/packs', label: 'Packs' },
  { href: '/pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/avis', label: 'Avis' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];
