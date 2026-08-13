import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle, MapPin,
  ChevronDown, ChevronUp, Star, ArrowRight, Quote
} from 'lucide-react';
import { CONFIG, WHATSAPP_LINK } from '../lib/config';
import { SERVICES, FAQS, TESTIMONIALS } from '../lib/data';
import { usePageMeta, useJsonLd } from '../lib/seo';
import { Button } from '../components/ui';
import villaImg from '../assets/photos/villa.jpg';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  usePageMeta(
    `${CONFIG.brand} — Équipe de nettoyage professionnelle à ${CONFIG.city}`,
    `Équipe de nettoyage professionnelle, sérieuse et dynamique à ${CONFIG.city} : résidentiel, commercial, vitres, canapés & tapis, traitement des sols, piscine. Devis gratuit sous 2 h.`
  );

  useJsonLd([
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${CONFIG.siteUrl}/#business`,
      name: CONFIG.brand,
      description: `Équipe de nettoyage professionnelle, sérieuse et dynamique à ${CONFIG.city} : résidentiel, commercial, vitres, canapés & tapis, traitement des sols, piscine.`,
      url: CONFIG.siteUrl,
      telephone: CONFIG.phoneRaw,
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
  ]);

  return (
    <>
      {/* --- HERO --- */}
      <section className="relative pt-40 lg:pt-48 pb-20 lg:pb-28 overflow-hidden">
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
              <Button as={Link} to="/contact" variant="primary" className="w-full sm:w-auto text-lg py-4">
                Demander un devis gratuit
              </Button>
              <Button as={Link} to="/services" variant="whiteOutline" className="w-full sm:w-auto text-lg py-4">
                Nos services
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="bg-blue-900 py-12" aria-label="Chiffres clés">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              ['5000+', 'Clients satisfaits'],
              ['7/24', 'Disponibilité'],
              ['18+', "Ans d'expérience"],
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

      {/* --- INTRO --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Votre équipe de nettoyage à {CONFIG.city}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {CONFIG.brand} accompagne particuliers et professionnels avec une équipe sérieuse et
            dynamique, équipée pour intervenir rapidement sur tous types de surfaces. Découvrez nos
            services, nos packs sur mesure et les raisons qui poussent nos clients à nous recommander.
          </p>
        </div>
      </section>

      {/* --- SERVICES (aperçu) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos services</h2>
            <p className="text-lg text-gray-600">Des solutions professionnelles complètes, de l'intérieur à l'extérieur.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {SERVICES.map((service) => (
              <Link key={service.id} to="/services" className="group block">
                <h3 className="text-center font-semibold text-gray-900 mb-3">{service.title}</h3>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm border border-gray-100">
                  <img
                    src={service.img}
                    alt={`${service.title} à ${CONFIG.city}`}
                    loading="lazy" decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
                  />
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center">
            <Button as={Link} to="/services" variant="outline">
              Voir tous nos services
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </p>
        </div>
      </section>

      {/* --- PACKS (aperçu) --- */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos packs sur mesure</h2>
            <p className="text-lg text-gray-600">Essentiel, Confort ou Premium : un pack adapté à chaque besoin, au tarif calculé sur mesure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { name: 'Essentiel', desc: 'Entretien courant et propreté quotidienne.' },
              { name: 'Confort', desc: 'Nettoyage approfondi pour un espace sain.' },
              { name: 'Premium', desc: "L'excellence pour villas, riads et fin de chantier." }
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Pack {p.name}</h3>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center">
            <Button as={Link} to="/packs" variant="primary">
              Voir le détail des packs
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </p>
        </div>
      </section>

      {/* --- TÉMOIGNAGES (aperçu) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600">La satisfaction de nos clients est notre meilleure publicité.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
            {TESTIMONIALS.slice(0, 2).map((t) => (
              <blockquote key={t.name} className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col m-0">
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

          <p className="text-center">
            <Button as={Link} to="/avis" variant="outline">
              Voir tous les avis
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-20 bg-gray-50" aria-label="Questions fréquentes">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600">Tout ce que vous devez savoir sur nos services.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <div key={faq.q} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
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
                      className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-gray-600 leading-relaxed"
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
            <Button as={Link} to="/contact" variant="white" className="w-full sm:w-auto text-lg py-4 px-8">
              Demander un devis gratuit
            </Button>
            <Button as="a" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" variant="whatsapp" className="w-full sm:w-auto text-lg py-4 px-8">
              <MessageCircle className="w-6 h-6 mr-2" aria-hidden="true" /> WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
