import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../lib/config';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui';
import mattressImg from '../assets/photos/mattress.jpg';

const FEATURES = [
  { icon: Shield, title: 'Équipe sérieuse et dynamique', desc: 'Des agents expérimentés, formés, discrets et motivés pour un service soigné en toute confiance.' },
  { icon: Zap, title: 'Intervention rapide', desc: 'Une prise en charge réactive selon vos plannings, urgences et contraintes horaires.' },
  { icon: Sparkles, title: 'Produits professionnels', desc: 'Des produits haut de gamme et des équipements adaptés à chaque type de surface.' },
  { icon: CheckCircle2, title: 'Service sur mesure', desc: 'Des prestations personnalisées pour maisons, bureaux, villas, riads et commerces.' }
];

const STEPS = [
  { num: 1, title: 'Demandez un devis', desc: 'Choisissez votre service et demandez un devis gratuit. Réponse sous 2 h avec une estimation détaillée.' },
  { num: 2, title: 'Intervention professionnelle', desc: 'Une équipe sérieuse et dynamique intervient avec des produits adaptés et du matériel professionnel.' },
  { num: 3, title: 'Résultats impeccables', desc: 'Un résultat garanti ou une ré-intervention gratuite. Votre satisfaction est notre engagement.' }
];

export default function Pourquoi() {
  usePageMeta(
    `Pourquoi choisir notre équipe de nettoyage à ${CONFIG.city} — ${CONFIG.brand}`,
    `Découvrez notre équipe sérieuse et dynamique, notre méthode de travail en 3 étapes, et des résultats avant/après visibles immédiatement à ${CONFIG.city}.`
  );

  return (
    <>
      <section className="pt-40 lg:pt-48 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6">
              Pourquoi choisir notre équipe de nettoyage ?
            </h1>
            <p className="text-lg text-gray-600">
              Des prestations fiables, rapides et adaptées aux besoins des particuliers
              et des professionnels à {CONFIG.city}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                  <f.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h2>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
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
            {STEPS.map((step) => (
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
            <Button as={Link} to="/contact" variant="primary">Je veux le même résultat</Button>
          </p>
        </div>
      </section>
    </>
  );
}
