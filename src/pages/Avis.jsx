import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';
import { CONFIG } from '../lib/config';
import { TESTIMONIALS } from '../lib/data';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui';

export default function Avis() {
  usePageMeta(
    `Avis clients — ${CONFIG.brand}, nettoyage à ${CONFIG.city}`,
    `Note moyenne de ${CONFIG.ratingValue}/5 sur +${CONFIG.reviewCount} avis. Découvrez les témoignages de nos clients particuliers et professionnels à ${CONFIG.city}.`
  );

  return (
    <section className="pt-40 lg:pt-48 pb-20 bg-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-4">Ce que disent nos clients</h1>
          <p className="flex justify-center items-center gap-1 text-yellow-400 mb-2" aria-label={`Note moyenne ${CONFIG.ratingValue} sur 5`}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-6 h-6 fill-current" aria-hidden="true" />)}
          </p>
          <p className="text-lg text-gray-600">
            {CONFIG.ratingValue}/5 sur +{CONFIG.reviewCount} avis — la satisfaction de nos clients est notre meilleure publicité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
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

        <p className="text-center">
          <Button as={Link} to="/contact" variant="primary">Rejoindre nos clients satisfaits</Button>
        </p>
      </div>
    </section>
  );
}
