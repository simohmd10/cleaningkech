import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { CONFIG, WHATSAPP_LINK } from '../lib/config';
import { usePageMeta } from '../lib/seo';
import { QuoteForm } from '../components/ui';

export default function Contact() {
  usePageMeta(
    `Contact et devis gratuit — ${CONFIG.brand}, nettoyage à ${CONFIG.city}`,
    `Contactez notre équipe de nettoyage à ${CONFIG.city} par téléphone, WhatsApp ou via le formulaire. Devis gratuit sous 2 h ouvrées.`
  );

  return (
    <section className="pt-16 lg:pt-20 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

          <div className="lg:w-2/5 bg-blue-900 text-white p-10 lg:p-12">
            <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
            <p className="text-blue-200 mb-10">
              À votre écoute pour toute demande d'intervention ou de devis à {CONFIG.city}.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-lg">Téléphone</h2>
                  <a href={`tel:${CONFIG.phoneRaw}`} className="text-blue-100 hover:text-white">{CONFIG.phoneDisplay}</a>
                  <p className="text-sm text-blue-300">{CONFIG.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-green-400 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-lg">WhatsApp</h2>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-blue-100 hover:text-white">{CONFIG.phoneDisplay}</a>
                  <p className="text-sm text-blue-300">Réponse rapide garantie</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-400 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-lg">Zone d'intervention</h2>
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
  );
}
