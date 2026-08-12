import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, MessageCircle, Menu, X, CheckCircle2,
  MapPin, Mail, ChevronDown, ChevronUp, Star, Shield,
  Zap, Droplets, Sparkles, Home, Building2, LayoutDashboard,
  Bug, TreePine, Waves, ArrowRight, Loader2
} from 'lucide-react';

/* ------------------------------------------------------------------
   CONFIG — modifier uniquement ici (une seule source de vérité)
------------------------------------------------------------------ */
const CONFIG = {
  brand: 'CleanKeh',
  phoneDisplay: '+212 600 00 00 00',
  phoneRaw: '+212600000000',        // utilisé pour tel:
  whatsappNumber: '212600000000',   // format international sans +
  email: 'contact@cleankeh.ma',
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

const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

const WHATSAPP_LINK = waLink(
  `Bonjour, je souhaite obtenir un devis pour un service de nettoyage à ${CONFIG.city}.`
);

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
const SERVICES = [
  { id: 1, icon: Home, title: 'Nettoyage Résidentiel', desc: 'Ménage complet pour maisons, appartements et villas de prestige.', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 2, icon: Building2, title: 'Nettoyage Commercial', desc: 'Entretien de bureaux, agences, commerces et espaces professionnels.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 3, icon: LayoutDashboard, title: 'Nettoyage de Vitres', desc: 'Lavage sans traces pour vitres, baies vitrées et vérandas.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 4, icon: Sparkles, title: 'Fin de Chantier', desc: 'Élimination des poussières, gravats et résidus après travaux.', img: 'https://images.unsplash.com/photo-1504307651254-35680f356f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 5, icon: CheckCircle2, title: 'Canapés & Tapis', desc: 'Shampouinage et nettoyage en profondeur des textiles et cuirs.', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 6, icon: Droplets, title: 'Traitement des Sols', desc: 'Décapage, lustrage et cristallisation des marbres et carrelages.', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 7, icon: Bug, title: 'Désinfection & 3D', desc: 'Désinfection, dératisation et désinsectisation (anti-nuisibles).', img: 'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 8, icon: Waves, title: 'Entretien Piscine', desc: "Nettoyage, traitement de l'eau et maintenance de bassins.", img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 9, icon: TreePine, title: 'Jardinage', desc: 'Tonte, taille et entretien des espaces verts et jardins de villas.', img: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

const FAQS = [
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

const TESTIMONIALS = [
  { name: 'Karim B.', role: 'Propriétaire de Villa, Palmeraie', text: "Équipe ponctuelle et très discrète. Le nettoyage après les travaux de ma villa a été fait à la perfection. Je recommande vivement." },
  { name: 'Sarah L.', role: "Gérante d'entreprise, Guéliz", text: "Nous avons un contrat d'entretien régulier pour nos bureaux. Le résultat est toujours impeccable, et l'équipe est très professionnelle." },
  { name: 'Mohammed T.', role: 'Propriétaire de Riad, Médina', text: "Nettoyage des tapis et des sols en marbre de mon Riad avant la saison. Le rendu est spectaculaire. Merci pour votre réactivité." },
  { name: 'Fatima Z.', role: 'Cliente particulière, Targa', text: "J'ai fait appel à eux pour un grand ménage de printemps. Mes vitres n'ont jamais été aussi propres. Très bon rapport qualité/prix." },
  { name: 'Youssef A.', role: "Responsable d'agence", text: "Service client au top. Devis rapide via WhatsApp et intervention le lendemain. Du vrai travail de pro." }
];

const SERVICE_OPTIONS = [
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

/* ------------------------------------------------------------------
   SEO — JSON-LD (LocalBusiness + FAQPage)
------------------------------------------------------------------ */
function useStructuredData() {
  useEffect(() => {
    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${CONFIG.siteUrl}/#business`,
        name: CONFIG.brand,
        description: `Équipe de nettoyage professionnelle, sérieuse et dynamique à ${CONFIG.city} : résidentiel, commercial, fin de chantier, vitres, canapés, désinfection.`,
        url: CONFIG.siteUrl,
        telephone: CONFIG.phoneRaw,
        email: CONFIG.email,
        priceRange: '$$',
        image: `${CONFIG.siteUrl}/og-image.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Guéliz',
          addressLocality: CONFIG.city,
          postalCode: CONFIG.postalCode,
          addressCountry: 'MA'
        },
        geo: { '@type': 'GeoCoordinates', latitude: CONFIG.lat, longitude: CONFIG.lng },
        areaServed: [
          'Marrakech', 'Guéliz', 'Médina', 'Hivernage', 'Targa', 'Palmeraie',
          'Agdal', 'Daoudiate', 'Sidi Ghanem', 'Route de l\'Ourika', 'Tahanaout'
        ].map((n) => ({ '@type': 'Place', name: n })),
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '19:00'
        }],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: CONFIG.ratingValue,
          reviewCount: CONFIG.reviewCount
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de nettoyage',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.desc }
          }))
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ];

    const nodes = data.map((obj) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.text = JSON.stringify(obj);
      document.head.appendChild(el);
      return el;
    });

    return () => nodes.forEach((n) => n.remove());
  }, []);
}

/* ------------------------------------------------------------------
   UI PRIMITIVES
------------------------------------------------------------------ */
const BASE_BTN =
  'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';

const BTN_VARIANTS = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
  whatsapp: 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl focus-visible:ring-green-600',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  white: 'bg-white text-blue-700 hover:bg-gray-50 shadow-lg'
};

/**
 * `as="a"` rend un <a> stylé en bouton — évite le <button> imbriqué dans <a> (HTML invalide).
 */
const Button = ({ as: Tag = 'button', children, variant = 'primary', className = '', ...props }) => (
  <Tag className={`${BASE_BTN} ${BTN_VARIANTS[variant]} ${className}`} {...props}>
    {children}
  </Tag>
);

const Field = ({ label, error, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-lg border outline-none bg-gray-50 transition-colors ` +
  `focus:ring-2 focus:ring-blue-600 focus:border-transparent ` +
  (hasError ? 'border-red-400 bg-red-50' : 'border-gray-300');

/* ------------------------------------------------------------------
   QUOTE FORM
------------------------------------------------------------------ */
const EMPTY_FORM = { name: '', phone: '', service: SERVICE_OPTIONS[0], area: '', details: '' };

function QuoteForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const liveRef = useRef(null);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Indiquez votre nom complet.';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 9) next.phone = 'Numéro invalide. Exemple : 0612345678.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildMessage = () =>
    [
      'Nouvelle demande de devis',
      `Nom : ${form.name.trim()}`,
      `Téléphone : ${form.phone.trim()}`,
      `Service : ${form.service}`,
      form.area.trim() && `Quartier : ${form.area.trim()}`,
      form.details.trim() && `Détails : ${form.details.trim()}`
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('sending');

    /* ------------------------------------------------------------
       Brancher ici votre backend (exemple Supabase) :

       import { supabase } from './lib/supabase';
       const { error } = await supabase.from('leads').insert({
         name: form.name, phone: form.phone, service: form.service,
         area: form.area, details: form.details, source: 'landing'
       });
       if (error) { setStatus('idle'); setErrors({ submit: "Envoi impossible. Réessayez ou contactez-nous sur WhatsApp." }); return; }
    ------------------------------------------------------------ */

    window.open(waLink(buildMessage()), '_blank', 'noopener,noreferrer');
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Votre message a été ouvert dans WhatsApp. Si la fenêtre ne s'est pas affichée,
          contactez-nous directement au {CONFIG.phoneDisplay}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button as="a" href={waLink(buildMessage())} target="_blank" rel="noreferrer" variant="whatsapp">
            <MessageCircle className="w-5 h-5 mr-2" /> Rouvrir WhatsApp
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => { setForm(EMPTY_FORM); setStatus('idle'); }}
          >
            Envoyer une autre demande
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Nom complet" required error={errors.name}>
          <input
            type="text" value={form.name} onChange={update('name')}
            autoComplete="name" placeholder="Votre nom"
            className={inputCls(errors.name)}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Téléphone" required error={errors.phone}>
          <input
            type="tel" inputMode="tel" value={form.phone} onChange={update('phone')}
            autoComplete="tel" placeholder="+212 6..."
            className={inputCls(errors.phone)}
            aria-invalid={!!errors.phone}
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Type de service">
          <select value={form.service} onChange={update('service')} className={inputCls(false)}>
            {SERVICE_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        </Field>
        <Field label="Quartier / Ville">
          <input
            type="text" value={form.area} onChange={update('area')}
            placeholder="Ex : Guéliz, Targa..." className={inputCls(false)}
          />
        </Field>
      </div>

      <Field label="Détails de votre besoin (superficie, spécificités...)">
        <textarea
          rows="4" value={form.details} onChange={update('details')}
          placeholder="Décrivez l'état des lieux, la surface approximative..."
          className={inputCls(false)}
        />
      </Field>

      {errors.submit && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{errors.submit}</p>
      )}

      <Button
        type="button" variant="primary" className="w-full text-lg py-4 mt-2"
        onClick={handleSubmit} disabled={status === 'sending'}
      >
        {status === 'sending'
          ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Envoi en cours</>
          : 'Envoyer ma demande de devis'}
      </Button>

      <p className="text-xs text-center text-gray-500" ref={liveRef}>
        Votre demande part directement sur WhatsApp. Réponse sous 2 h ouvrées.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------ */
const NAV = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#services', label: 'Services' },
  { href: '#packs', label: 'Packs' },
  { href: '#pourquoi-nous', label: 'Pourquoi nous' },
  { href: '#temoignages', label: 'Avis' },
  { href: '#contact', label: 'Contact' }
];

const SECTION_ANCHOR = 'scroll-mt-24 lg:scroll-mt-28';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useStructuredData();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu mobile avec Échap
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-100 selection:text-blue-900">

      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Aller au contenu
      </a>

      {/* --- HEADER --- */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
          <a href="#accueil" className="flex items-center gap-2 text-2xl font-bold text-blue-900">
            <Sparkles className="w-8 h-8 text-blue-600" aria-hidden="true" />
            <span>Clean<span className="text-blue-600">Keh</span></span>
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-blue-600 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${CONFIG.phoneRaw}`} className="flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-700">
              <Phone className="w-5 h-5" aria-hidden="true" />
              {CONFIG.phoneDisplay}
            </a>
            <Button as="a" href="#contact" variant="primary" className="py-2 px-5 text-sm">
              Devis gratuit
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden text-gray-800 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav aria-label="Navigation mobile" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-4 gap-2 pb-8 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {NAV.map((item) => (
              <a
                key={item.href} href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium p-3 hover:bg-blue-50 rounded"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button as="a" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" variant="whatsapp" className="w-full">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </Button>
              <Button as="a" href={`tel:${CONFIG.phoneRaw}`} variant="outline" className="w-full">
                Appeler maintenant
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* --- HERO --- */}
        <section id="accueil" className={`pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-blue-50 to-white overflow-hidden ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col lg:flex-row items-center gap-12">

            <div className="lg:w-1/2 flex flex-col items-start z-10">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-6">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Disponible à {CONFIG.city} &amp; environs
              </p>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-blue-950 leading-tight mb-6">
                Équipe de nettoyage <span className="text-blue-600">professionnelle</span> à {CONFIG.city}
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Des espaces propres, sains et impeccables grâce à une équipe sérieuse et dynamique,
                réactive et équipée pour tous vos besoins résidentiels et commerciaux.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
                <Button as="a" href="#contact" variant="primary" className="w-full sm:w-auto text-lg py-4">
                  Demander un devis gratuit
                </Button>
                <Button as="a" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" variant="whatsapp" className="w-full sm:w-auto text-lg py-4">
                  <MessageCircle className="w-6 h-6 mr-2" aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>

              <ul className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                {['Intervention rapide', 'Équipe qualifiée', 'Matériel professionnel', 'Satisfaction 100%'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-1/2 relative w-full">
              <div className="absolute inset-0 bg-blue-600 rounded-[2rem] translate-x-4 translate-y-4 opacity-10" aria-hidden="true" />
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={`Agent de nettoyage professionnel en intervention dans une villa à ${CONFIG.city}`}
                width="1000" height="500" fetchPriority="high" decoding="async"
                className="relative z-10 rounded-[2rem] shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute bottom-8 -left-8 z-20 bg-white p-4 rounded-xl shadow-xl items-center gap-4 hidden md:flex">
                <span className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Star className="w-6 h-6 fill-current" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900 text-lg">{CONFIG.ratingValue}/5</span>
                  <span className="block text-sm text-gray-500">Basé sur +{CONFIG.reviewCount} avis</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS --- */}
        <section className="bg-blue-900 py-12" aria-label="Chiffres clés">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                ['250+', 'Clients satisfaits'],
                ['500+', 'Prestations réalisées'],
                ['10+', "Ans d'expérience"],
                ['100%', 'Engagement qualité']
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{num}</div>
                  <div className="text-blue-200 font-medium text-sm md:text-base">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- POURQUOI NOUS --- */}
        <section id="pourquoi-nous" className={`py-20 bg-gray-50 ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir notre équipe de nettoyage ?
              </h2>
              <p className="text-lg text-gray-600">
                Des prestations fiables, rapides et adaptées aux besoins des particuliers
                et des professionnels à {CONFIG.city}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Équipe sérieuse et dynamique', desc: 'Des agents expérimentés, formés, discrets et motivés pour un service soigné en toute confiance.' },
                { icon: Zap, title: 'Intervention rapide', desc: 'Une prise en charge réactive selon vos plannings, urgences et contraintes horaires.' },
                { icon: Sparkles, title: 'Produits professionnels', desc: 'Des produits haut de gamme et des équipements adaptés à chaque type de surface.' },
                { icon: CheckCircle2, title: 'Service sur mesure', desc: 'Des prestations personnalisées pour maisons, bureaux, villas, riads et commerces.' }
              ].map((f) => (
                <div key={f.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                    <f.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SERVICES --- */}
        <section id="services" className={`py-20 ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nos services de nettoyage à {CONFIG.city}
              </h2>
              <p className="text-lg text-gray-600">
                Des solutions professionnelles complètes pour garder vos espaces propres et sains,
                de l'intérieur à l'extérieur.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <article key={service.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.img}
                      alt={`${service.title} à ${CONFIG.city}`}
                      width="600" height="400" loading="lazy" decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg text-blue-600">
                      <service.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{service.desc}</p>
                    <a href="#contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                      Demander un devis
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      <span className="sr-only"> pour {service.title}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- PACKS --- */}
        <section id="packs" className={`py-20 bg-blue-50 ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nos packs de nettoyage sur mesure</h2>
              <p className="text-lg text-gray-600">
                Choisissez le niveau de service adapté à vos besoins. Le tarif est calculé
                selon la superficie et l'état des lieux.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
              {[
                {
                  name: 'PACK ESSENTIEL',
                  tagline: "Pour l'entretien courant et la propreté quotidienne.",
                  items: ['Dépoussiérage des surfaces', 'Aspiration et lavage des sols', 'Nettoyage sanitaires & cuisine', 'Vidage des poubelles'],
                  freq: 'Quotidien ou hebdomadaire',
                  featured: false
                },
                {
                  name: 'PACK CONFORT',
                  tagline: 'Un nettoyage approfondi pour un espace sain.',
                  items: ['Tout le Pack Essentiel', 'Nettoyage intérieur des vitres', 'Détartrage en profondeur', 'Dépoussiérage plinthes & portes'],
                  freq: 'Mensuel ou ponctuel',
                  featured: true
                },
                {
                  name: 'PACK PREMIUM',
                  tagline: "L'excellence pour villas, riads et fin de chantier.",
                  items: ['Tout le Pack Confort', 'Shampouinage canapés/tapis', 'Traitement sols (cristallisation)', 'Nettoyage extérieur & balcons'],
                  freq: 'Sur mesure',
                  featured: false
                }
              ].map((pack) => (
                <div
                  key={pack.name}
                  className={`rounded-2xl p-8 relative flex flex-col h-full ${
                    pack.featured
                      ? 'bg-blue-600 text-white shadow-xl md:-translate-y-4'
                      : 'bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow'
                  }`}
                >
                  {pack.featured && (
                    <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl uppercase tracking-wider">
                      Populaire
                    </span>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${pack.featured ? '' : 'text-gray-900'}`}>{pack.name}</h3>
                  <p className={`mb-6 ${pack.featured ? 'text-blue-100' : 'text-gray-500'}`}>{pack.tagline}</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {pack.items.map((item) => (
                      <li key={item} className={`flex items-start gap-3 ${pack.featured ? '' : 'text-gray-700'}`}>
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${pack.featured ? 'text-blue-200' : 'text-blue-600'}`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm font-medium p-3 rounded-lg text-center mb-6 ${pack.featured ? 'text-blue-100 bg-blue-700' : 'text-gray-500 bg-gray-50'}`}>
                    Fréquence : {pack.freq}
                  </p>
                  <Button
                    as="a"
                    href={waLink(`Bonjour, je souhaite un devis pour le ${pack.name} à ${CONFIG.city}.`)}
                    target="_blank" rel="noreferrer"
                    variant={pack.featured ? 'white' : 'outline'}
                    className="w-full"
                  >
                    Demander ce devis
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center">
              <span className="text-gray-600 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                <Sparkles className="w-5 h-5 text-blue-600" aria-hidden="true" />
                Tarif 100 % personnalisé selon vos besoins réels.
              </span>
            </p>
          </div>
        </section>

        {/* --- PROCESS --- */}
        <section className="py-20" aria-label="Déroulement de la prestation">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
              <p className="text-lg text-gray-600">Un processus simple, rapide et transparent.</p>
            </div>

            <ol className="flex flex-col md:flex-row justify-between items-start md:items-start relative max-w-5xl mx-auto gap-8 md:gap-0">
              <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-blue-100 z-0" aria-hidden="true" />
              {[
                { num: 1, title: 'Contactez-nous', desc: 'Par téléphone, WhatsApp ou via le formulaire.' },
                { num: 2, title: 'Décrivez le besoin', desc: 'Type de local, surface et services souhaités.' },
                { num: 3, title: 'Recevez le devis', desc: 'Un tarif clair, sans frais cachés, en moins de 2 h.' },
                { num: 4, title: 'Planifiez', desc: "Choisissez la date et l'heure de l'intervention." },
                { num: 5, title: 'Profitez', desc: 'Retrouvez un espace impeccable et sain.' }
              ].map((step) => (
                <li key={step.num} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:text-center w-full md:w-1/5 md:px-2">
                  <span className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center border-4 border-white shadow-md shrink-0">
                    {step.num}
                  </span>
                  <span className="md:mt-4">
                    <span className="block font-bold text-gray-900 mb-1">{step.title}</span>
                    <span className="block text-sm text-gray-500">{step.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --- AVANT / APRÈS --- */}
        <section className="py-20 bg-gray-900 text-white overflow-hidden" aria-label="Résultats avant et après">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">L'efficacité en images : avant &amp; après</h2>
              <p className="text-lg text-gray-400">Des résultats visibles immédiatement.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
              <figure className="relative rounded-2xl overflow-hidden m-0">
                <figcaption className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10">AVANT</figcaption>
                <img
                  src="https://images.unsplash.com/photo-1590422749895-d22756a12b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cuisine encrassée avant l'intervention de nettoyage"
                  width="800" height="533" loading="lazy" decoding="async"
                  className="w-full h-64 md:h-80 object-cover opacity-80"
                />
              </figure>
              <figure className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 m-0">
                <figcaption className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded z-10">APRÈS</figcaption>
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Même cuisine propre et rangée après l'intervention"
                  width="800" height="533" loading="lazy" decoding="async"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </figure>
            </div>

            <p className="text-center mt-10">
              <Button as="a" href="#contact" variant="primary">Je veux le même résultat</Button>
            </p>
          </div>
        </section>

        {/* --- SEO LOCAL --- */}
        <section className="py-16 bg-white border-y border-gray-100" aria-label="Zone d'intervention">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <MapPin className="w-12 h-12 text-blue-200 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Votre partenaire nettoyage de confiance à {CONFIG.city}
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                En tant qu'<strong>équipe de nettoyage sérieuse et dynamique à Marrakech</strong>, nous
                intervenons dans tous les quartiers de la ville ocre et ses alentours.
                Particulier souhaitant un grand ménage
                dans votre villa à la <strong>Palmeraie</strong> ou sur la <strong>Route de l'Ourika</strong>,
                ou professionnel cherchant un entretien régulier de bureaux à <strong>Guéliz</strong> ou
                <strong> Sidi Ghanem</strong> : nous avons la solution.
              </p>
              <p className="text-sm">
                Nos équipes couvrent la Médina, l'Hivernage, Targa, Daoudiate, Samlalia, Agdal, Chrifia,
                Route de Casablanca et Route de Tahanaout. Experts du <em>nettoyage fin de chantier</em>,
                du <em>nettoyage de canapés</em> et de l'<em>entretien de jardins</em>.
              </p>
            </div>
          </div>
        </section>

        {/* --- TÉMOIGNAGES --- */}
        <section id="temoignages" className={`py-20 bg-blue-50 ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
              <p className="flex justify-center items-center gap-1 text-yellow-400 mb-2" aria-label={`Note moyenne ${CONFIG.ratingValue} sur 5`}>
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-6 h-6 fill-current" aria-hidden="true" />)}
              </p>
              <p className="text-lg text-gray-600">La satisfaction de nos clients est notre meilleure publicité.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <blockquote className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center min-h-[250px] flex flex-col justify-center m-0" aria-live="polite">
                <p className="text-xl md:text-2xl text-gray-700 italic mb-8 font-medium">
                  « {TESTIMONIALS[testimonialIdx].text} »
                </p>
                <footer>
                  <span className="block font-bold text-gray-900 text-lg">{TESTIMONIALS[testimonialIdx].name}</span>
                  <span className="block text-blue-600">{TESTIMONIALS[testimonialIdx].role}</span>
                </footer>
              </blockquote>

              <div className="flex justify-center gap-3 mt-8">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setTestimonialIdx(idx)}
                    aria-current={idx === testimonialIdx}
                    className={`h-3 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 ${
                      idx === testimonialIdx ? 'bg-blue-600 w-8' : 'bg-blue-200 hover:bg-blue-400 w-3'
                    }`}
                    aria-label={`Voir le témoignage de ${t.name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-20 bg-white" aria-label="Questions fréquentes">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
              <p className="text-gray-600">Tout ce que vous devez savoir sur nos services.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={faq.q} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <h3 className="m-0">
                      <button
                        type="button"
                        className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center gap-4 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                        onClick={() => setOpenFaq(open ? null : idx)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${idx}`}
                        id={`faq-btn-${idx}`}
                      >
                        {faq.q}
                        {open
                          ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                          : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />}
                      </button>
                    </h3>
                    {open && (
                      <div
                        id={`faq-panel-${idx}`} role="region" aria-labelledby={`faq-btn-${idx}`}
                        className="px-6 py-4 bg-white border-t border-gray-100 text-gray-600 leading-relaxed"
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')" }}
            aria-hidden="true"
          />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Besoin d'un espace propre et impeccable ?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Notre équipe intervient à {CONFIG.city} avec une solution sur mesure, rapide et efficace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button as="a" href="#contact" variant="white" className="w-full sm:w-auto text-lg py-4 px-8">
                Demander un devis gratuit
              </Button>
              <Button as="a" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" variant="whatsapp" className="w-full sm:w-auto text-lg py-4 px-8">
                <MessageCircle className="w-6 h-6 mr-2" aria-hidden="true" /> WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact" className={`py-20 bg-gray-50 ${SECTION_ANCHOR}`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

              <div className="lg:w-2/5 bg-blue-900 text-white p-10 lg:p-12">
                <h2 className="text-3xl font-bold mb-2">Contactez-nous</h2>
                <p className="text-blue-200 mb-10">
                  À votre écoute pour toute demande d'intervention ou de devis à {CONFIG.city}.
                </p>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-lg">Téléphone</h3>
                      <a href={`tel:${CONFIG.phoneRaw}`} className="text-blue-100 hover:text-white">{CONFIG.phoneDisplay}</a>
                      <p className="text-sm text-blue-300">{CONFIG.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-green-400 mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-lg">WhatsApp</h3>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-blue-100 hover:text-white">{CONFIG.phoneDisplay}</a>
                      <p className="text-sm text-blue-300">Réponse rapide garantie</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <a href={`mailto:${CONFIG.email}`} className="text-blue-100 hover:text-white break-all">{CONFIG.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-lg">Zone d'intervention</h3>
                      <p className="text-blue-100">{CONFIG.city} et un rayon de 30 km (Palmeraie, Ourika...)</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lg:w-3/5 p-10 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Demander un devis (gratuit)</h2>
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-24 md:pb-8 border-t-4 border-blue-600">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            <div>
              <p className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
                <Sparkles className="w-8 h-8 text-blue-500" aria-hidden="true" />
                <span>Clean<span className="text-blue-500">Keh</span></span>
              </p>
              <p className="text-gray-400">
                Équipe de nettoyage professionnelle, sérieuse et dynamique à {CONFIG.city},
                pour particuliers et professionnels. Qualité, rapidité et confiance.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-6">Navigation</h2>
              <ul className="space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-blue-400 transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-6">Services populaires</h2>
              <ul className="space-y-3">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <a href="#services" className="hover:text-blue-400 transition-colors">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-6">Contact</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                  <a href={`tel:${CONFIG.phoneRaw}`} className="hover:text-white">{CONFIG.phoneDisplay}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 shrink-0" aria-hidden="true" />
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${CONFIG.email}`} className="hover:text-white break-all">{CONFIG.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                  <span>{CONFIG.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {CONFIG.brand}. Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
              <a href="/confidentialite" className="hover:text-white">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- WHATSAPP FLOTTANT (desktop uniquement) --- */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 z-[60] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 hover:scale-105 transition-all duration-300 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600 motion-reduce:transition-none motion-reduce:hover:scale-100"
        aria-label="Nous contacter sur WhatsApp"
      >
        <MessageCircle className="w-8 h-8" aria-hidden="true" />
      </a>

      {/* --- BARRE MOBILE FIXE --- */}
      <nav
        aria-label="Actions rapides"
        className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[70] flex pb-[env(safe-area-inset-bottom)]"
      >
        <a href={`tel:${CONFIG.phoneRaw}`} className="flex-1 flex flex-col items-center justify-center py-3 text-blue-900 hover:bg-blue-50">
          <Phone className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase">Appeler</span>
        </a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center py-3 bg-green-600 text-white hover:bg-green-700">
          <MessageCircle className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase">WhatsApp</span>
        </a>
        <a href="#contact" className="flex-1 flex flex-col items-center justify-center py-3 bg-blue-600 text-white hover:bg-blue-700">
          <Sparkles className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase">Devis</span>
        </a>
      </nav>
    </div>
  );
}
