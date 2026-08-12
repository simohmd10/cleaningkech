import React, { useState, useEffect } from 'react';
import {
  Phone, MessageCircle, CheckCircle2, MapPin, Mail,
  ChevronDown, ChevronUp, Star, Shield, Zap, Sparkles, ArrowRight, Quote
} from 'lucide-react';
import { CONFIG, WHATSAPP_LINK, waLink, SECTION_ANCHOR } from '../lib/config';
import { SERVICES, FAQS, TESTIMONIALS, SEO_TOPICS, AREAS } from '../lib/data';
import { Button, QuoteForm } from '../components/ui';
import villaImg from '../assets/photos/villa.jpg';
import mattressImg from '../assets/photos/mattress.jpg';

/* ------------------------------------------------------------------
   SEO — JSON-LD (LocalBusiness + FAQPage)
------------------------------------------------------------------ */
function useStructuredData() {
  useEffect(() => {
    document.title = `${CONFIG.brand} — Équipe de nettoyage professionnelle à ${CONFIG.city}`;

    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${CONFIG.siteUrl}/#business`,
        name: CONFIG.brand,
        description: `Équipe de nettoyage professionnelle, sérieuse et dynamique à ${CONFIG.city} : résidentiel, commercial, vitres, canapés & tapis, traitement des sols, piscine.`,
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  useStructuredData();

  return (
    <>
      {/* --- HERO --- */}
      <section id="accueil" className={`relative pt-40 lg:pt-48 pb-20 lg:pb-28 overflow-hidden ${SECTION_ANCHOR}`}>
        <img
          src={villaImg}
          alt={`Équipe de nettoyage professionnelle en intervention dans une villa à ${CONFIG.city}`}
          fetchPriority="high" decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/75 to-blue-950/50" aria-hidden="true" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm mb-6 backdrop-blur-sm">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Disponible à {CONFIG.city} &amp; environs
            </p>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-4">
              Équipe de nettoyage <span className="text-blue-300">professionnelle</span> à {CONFIG.city}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-medium mb-6">
              Sérieuse, dynamique et à votre écoute
            </p>

            <p className="text-lg text-blue-50/90 mb-8 leading-relaxed max-w-xl">
              Des espaces propres, sains et impeccables grâce à une équipe sérieuse et dynamique,
              réactive et équipée pour tous vos besoins résidentiels et commerciaux.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Button as="a" href="#contact" variant="primary" className="w-full sm:w-auto text-lg py-4">
                Demander un devis gratuit
              </Button>
              <Button as="a" href="#services" variant="whiteOutline" className="w-full sm:w-auto text-lg py-4">
                Nos services
              </Button>
            </div>

            <ul className="grid grid-cols-2 gap-4 text-sm font-medium text-white">
              {['Intervention rapide', 'Équipe qualifiée', 'Matériel professionnel', 'Satisfaction 100%'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-3 mt-8 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
              <span className="bg-white/15 p-2 rounded-full text-yellow-300">
                <Star className="w-5 h-5 fill-current" aria-hidden="true" />
              </span>
              <span className="text-white">
                <span className="font-bold">{CONFIG.ratingValue}/5</span>
                <span className="text-blue-100"> · Basé sur +{CONFIG.reviewCount} avis</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre méthode de travail</h2>
            <p className="text-lg text-gray-600">Un processus simple et efficace, en 3 étapes, pour un résultat impeccable à chaque intervention.</p>
          </div>

          <ol className="flex flex-col md:flex-row justify-between items-start md:items-start relative max-w-4xl mx-auto gap-8 md:gap-0">
            <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-blue-100 z-0" aria-hidden="true" />
            {[
              { num: 1, title: 'Demandez un devis', desc: 'Choisissez votre service et demandez un devis gratuit. Réponse sous 2 h avec une estimation détaillée.' },
              { num: 2, title: 'Intervention professionnelle', desc: 'Une équipe sérieuse et dynamique intervient avec des produits adaptés et du matériel professionnel.' },
              { num: 3, title: 'Résultats impeccables', desc: 'Un résultat garanti ou une ré-intervention gratuite. Votre satisfaction est notre engagement.' }
            ].map((step) => (
              <li key={step.num} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:text-center w-full md:w-1/3 md:px-4">
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
            <p className="text-lg text-gray-400">Des résultats visibles immédiatement, sans changer de photo.</p>
          </div>

          <figure className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 max-w-3xl mx-auto m-0">
            <figcaption className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10">AVANT</figcaption>
            <figcaption className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded z-10">APRÈS</figcaption>
            <img
              src={mattressImg}
              alt="Matelas à moitié nettoyé : partie encrassée à gauche, partie propre à droite après extraction"
              width="1400" height="933" loading="lazy" decoding="async"
              className="w-full h-72 md:h-[420px] object-cover"
            />
          </figure>

          <p className="text-center mt-10">
            <Button as="a" href="#contact" variant="primary">Je veux le même résultat</Button>
          </p>
        </div>
      </section>

      {/* --- SEO LOCAL --- */}
      <section className="py-20 bg-white border-y border-gray-100" aria-label="Zone d'intervention">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Nettoyage à {CONFIG.city} : les demandes les plus fréquentes
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4 mb-8">
            <p>
              Une <strong>équipe de nettoyage à {CONFIG.city}</strong> doit adapter sa méthode au lieu,
              aux matériaux et au niveau de salissure. {CONFIG.brand} prend en charge le nettoyage de
              canapé à domicile, le ménage des maisons et villas, la remise en état après travaux ainsi
              que l'entretien des bureaux et commerces. Chaque intervention commence par l'identification
              des surfaces à traiter afin d'éviter une méthode trop humide, trop abrasive ou inadaptée.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 bg-blue-50 rounded-r-xl p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <strong>En bref :</strong> pour choisir un service de nettoyage à {CONFIG.city}, précisez
              le type de lieu, la surface, les matières, les taches et le délai disponible. Un canapé
              demande un diagnostic du textile et du séchage ; une fin de chantier exige le retrait
              progressif des poussières et résidus ; un nettoyage à domicile s'organise du haut vers le
              bas pour ne pas resalir les zones terminées.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {SEO_TOPICS.map((topic) => (
              <div key={topic.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Pour les textiles d'ameublement</h3>
              <p className="text-gray-600 leading-relaxed">
                Indiquez le revêtement, l'origine des taches, les produits déjà utilisés et les
                possibilités d'aération. L'équipe peut ainsi choisir entre faible humidité, détachage
                ciblé ou injection-extraction contrôlée.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Pour une maison ou un appartement</h3>
              <p className="text-gray-600 leading-relaxed">
                Listez les pièces prioritaires, les surfaces fragiles, la présence d'enfants ou d'animaux
                et le niveau d'encombrement. Cela permet de distinguer l'entretien courant du nettoyage
                en profondeur à domicile.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Pour un chantier ou un local professionnel</h3>
              <p className="text-gray-600 leading-relaxed">
                Précisez la surface, les travaux réalisés, les résidus présents et la date de livraison.
                Les vitres, sols, sanitaires et poussières fines sont alors traités dans un ordre cohérent.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-bold text-gray-900 mb-2">Zones d'intervention à {CONFIG.city}</h3>
            <p className="text-gray-600 leading-relaxed">
              Notre équipe intervient à {AREAS.join(', ')} et dans les environs de {CONFIG.city}. Cette
              couverture locale permet une intervention rapide pour les particuliers, villas, riads,
              bureaux, commerces et chantiers.
            </p>
          </div>

          <p>
            <a href="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
              Lire nos guides de nettoyage sur le blog
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      {/* --- TÉMOIGNAGES --- */}
      <section id="temoignages" className={`py-20 bg-blue-50 ${SECTION_ANCHOR}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600">La satisfaction de nos clients est notre meilleure publicité.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col m-0">
                <Quote className="w-8 h-8 text-blue-100 mb-2" aria-hidden="true" />
                <p className="flex items-center gap-0.5 text-yellow-400 mb-4" aria-label="Note 5 sur 5">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">{t.text}</p>
                <footer className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-gray-900">{t.name}</span>
                    <span className="block text-sm text-blue-600">{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
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
          style={{ backgroundImage: `url(${villaImg})` }}
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
    </>
  );
}
