import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONFIG } from '../lib/config';
import { SERVICES, SEO_TOPICS, AREAS } from '../lib/data';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui';

export default function Services() {
  usePageMeta(
    `Nos services de nettoyage à ${CONFIG.city} — ${CONFIG.brand}`,
    `Nettoyage résidentiel, commercial, vitres, canapés & tapis, traitement des sols et piscine à ${CONFIG.city}. Devis gratuit sous 2 h par une équipe sérieuse et dynamique.`
  );

  return (
    <>
      <section className="pt-40 lg:pt-48 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6">
              Nos services de nettoyage à {CONFIG.city}
            </h1>
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
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                  <p className="text-gray-600 mb-4 flex-1">{service.desc}</p>
                  <Link to="/contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                    Demander un devis
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    <span className="sr-only"> pour {service.title}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTENU SEO --- */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" aria-label="Zone d'intervention">
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
              <div key={topic.title} className="bg-white border border-gray-100 rounded-xl p-6">
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
            <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
              Lire nos guides de nettoyage sur le blog
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à démarrer ?</h2>
          <p className="text-blue-100 mb-8">Demandez un devis gratuit pour le service de votre choix, réponse sous 2 h ouvrées.</p>
          <Button as={Link} to="/contact" variant="white">Demander un devis gratuit</Button>
        </div>
      </section>
    </>
  );
}
