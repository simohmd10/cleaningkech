import {
  Home, Building2, LayoutDashboard, CheckCircle2,
  Droplets, Waves
} from 'lucide-react';

import kitchenImg from '../assets/photos/kitchen.jpg';
import officeImg from '../assets/photos/office.jpg';
import windowImg from '../assets/photos/window.jpg';
import sofaImg from '../assets/photos/sofa.jpg';
import bathroomImg from '../assets/photos/bathroom.jpg';

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
export const SERVICES = [
  { id: 1, icon: Home, title: 'Nettoyage Résidentiel', desc: 'Ménage complet pour maisons, appartements et villas de prestige.', img: kitchenImg },
  { id: 2, icon: Building2, title: 'Nettoyage Commercial', desc: 'Entretien de bureaux, agences, commerces et espaces professionnels.', img: officeImg },
  { id: 3, icon: LayoutDashboard, title: 'Nettoyage de Vitres', desc: 'Lavage sans traces pour vitres, baies vitrées et vérandas.', img: windowImg },
  { id: 5, icon: CheckCircle2, title: 'Canapés & Tapis', desc: 'Shampouinage et nettoyage en profondeur des textiles et cuirs.', img: sofaImg },
  { id: 6, icon: Droplets, title: 'Traitement des Sols', desc: 'Décapage, lustrage et cristallisation des marbres et carrelages.', img: bathroomImg },
  { id: 8, icon: Waves, title: 'Entretien Piscine', desc: "Nettoyage, traitement de l'eau et maintenance de bassins.", img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

export const FAQS = [
  { q: 'Quels services proposez-vous ?', a: 'Nous proposons une gamme complète : nettoyage résidentiel et commercial, fin de chantier, vitres, canapés/tapis, traitement des sols, désinfection, piscine et jardinage.' },
  { q: 'Comment demander un devis ?', a: "Vous pouvez demander un devis gratuit via notre formulaire en ligne, par WhatsApp ou en nous appelant directement. C'est rapide et sans engagement." },
  { q: 'Intervenez-vous à Marrakech et ses environs ?', a: "Oui, nous couvrons tout Marrakech (Guéliz, Médina, Targa, Palmeraie, etc.) ainsi que les environs proches (Route de l'Ourika, Tahanaout, etc.)." },
  { q: 'Comment est calculé le prix ?', a: "Nos tarifs sont sur mesure. Ils dépendent de la superficie, du type de surface, du niveau d'encrassement et des services spécifiques demandés." },
  { q: 'Puis-je réserver une intervention régulière ?', a: "Absolument. Nous proposons des contrats d'entretien régulier (quotidien, hebdomadaire, mensuel) adaptés à vos besoins." },
  { q: 'Fournissez-vous le matériel ?', a: 'Oui, nos équipes interviennent avec tout le matériel professionnel et les produits nécessaires pour garantir un résultat impeccable.' },
  { q: 'Quels produits utilisez-vous ?', a: 'Nous utilisons des produits professionnels, efficaces et respectueux des surfaces. Sur demande, nous pouvons utiliser des gammes écologiques.' },
  { q: 'Combien de temps dure une intervention ?', a: "La durée dépend de la prestation. Un devis inclura une estimation du temps nécessaire. Nous sommes réputés pour notre rapidité d'exécution." },
  { q: 'Pouvez-vous intervenir après des travaux ?', a: "Oui, notre service « Fin de chantier » est spécialement conçu pour éliminer la poussière fine, les traces de peinture et les gravats." },
  { q: 'Proposez-vous des contrats pour entreprises ?', a: 'Oui, nous avons des packs et contrats dédiés aux professionnels (bureaux, commerces, syndics) avec facturation transparente.' }
];

export const TESTIMONIALS = [
  { name: 'Karim B.', role: 'Propriétaire de Villa, Palmeraie', text: "Équipe ponctuelle et très discrète. Le nettoyage après les travaux de ma villa a été fait à la perfection. Je recommande vivement." },
  { name: 'Sarah L.', role: "Gérante d'entreprise, Guéliz", text: "Nous avons un contrat d'entretien régulier pour nos bureaux. Le résultat est toujours impeccable, et l'équipe est très professionnelle." },
  { name: 'Mohammed T.', role: 'Propriétaire de Riad, Médina', text: "Nettoyage des tapis et des sols en marbre de mon Riad avant la saison. Le rendu est spectaculaire. Merci pour votre réactivité." },
  { name: 'Fatima Z.', role: 'Cliente particulière, Targa', text: "J'ai fait appel à eux pour un grand ménage de printemps. Mes vitres n'ont jamais été aussi propres. Très bon rapport qualité/prix." },
  { name: 'Youssef A.', role: "Responsable d'agence", text: "Service client au top. Devis rapide via WhatsApp et intervention le lendemain. Du vrai travail de pro." }
];

export const SERVICE_OPTIONS = [
  'Nettoyage Résidentiel / Maison',
  'Nettoyage Commercial / Bureau',
  'Nettoyage Fin de Chantier',
  'Nettoyage Canapés & Tapis',
  'Nettoyage de Vitres',
  'Désinfection / Anti-nuisibles',
  'Traitement des Sols',
  'Entretien Piscine',
  'Jardinage',
  'Autre'
];

export const SEO_TOPICS = [
  {
    title: 'Nettoyage canapé Marrakech',
    desc: "Canapés tissu, salons marocains, matelas, fauteuils, tapis et détachage à domicile avec séchage rapide."
  },
  {
    title: 'Ménage à domicile Marrakech',
    desc: "Nettoyage maison, appartement, riad et villa : cuisine, sanitaires, sols, vitres et remise en état."
  },
  {
    title: 'Nettoyage fin de chantier',
    desc: "Après travaux, rénovation ou construction : poussière fine, gravats, traces de peinture, vitres et sols."
  },
  {
    title: 'Nettoyage bureaux et locaux',
    desc: "Bureaux, commerces, cabinets, restaurants, hôtels et contrats d'entretien régulier à Marrakech."
  }
];

export const AREAS = [
  'Guéliz', "l'Hivernage", 'Palmeraie', 'Targa', 'Agdal', 'Médina', 'Massira',
  "M'Hamid", 'Sidi Ghanem', 'Route de Casablanca', "Route de l'Ourika", 'Amelkis'
];
