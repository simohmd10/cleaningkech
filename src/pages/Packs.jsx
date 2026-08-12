import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { CONFIG, waLink } from '../lib/config';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui';

const PACKS = [
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
];

export default function Packs() {
  usePageMeta(
    `Packs de nettoyage sur mesure à ${CONFIG.city} — ${CONFIG.brand}`,
    `Pack Essentiel, Confort ou Premium : choisissez le niveau de nettoyage adapté à votre logement ou local à ${CONFIG.city}. Tarif calculé selon la superficie.`
  );

  return (
    <section className="pt-40 lg:pt-48 pb-20 bg-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6">Nos packs de nettoyage sur mesure</h1>
          <p className="text-lg text-gray-600">
            Choisissez le niveau de service adapté à vos besoins. Le tarif est calculé
            selon la superficie et l'état des lieux.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {PACKS.map((pack) => (
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
              <h2 className={`text-2xl font-bold mb-2 ${pack.featured ? '' : 'text-gray-900'}`}>{pack.name}</h2>
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

        <p className="mt-6 text-center">
          <Link to="/contact" className="text-blue-700 font-semibold hover:text-blue-900">
            Une question sur nos packs ? Contactez-nous
          </Link>
        </p>
      </div>
    </section>
  );
}
