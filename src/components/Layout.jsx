import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Phone, MessageCircle, Menu, X, MapPin, Mail, Sparkles, Clock
} from 'lucide-react';
import { CONFIG, WHATSAPP_LINK, NAV } from '../lib/config';
import { SERVICES } from '../lib/data';
import { Button } from './ui';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Aller au contenu
      </a>

      {/* --- BARRE D'INFOS --- */}
      <div className="fixed w-full top-0 z-50 bg-blue-900 text-blue-100 text-xs md:text-sm">
        <div className="container mx-auto px-4 max-w-7xl flex justify-center md:justify-between items-center gap-x-6 gap-y-1 py-2 flex-wrap">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {CONFIG.city}, Maroc
          </span>
          <a href={`tel:${CONFIG.phoneRaw}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            {CONFIG.phoneDisplay}
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {CONFIG.hours}
          </span>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className={`fixed w-full top-9 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
          <a href="/#accueil" className="flex items-center gap-2 text-2xl font-bold text-blue-900">
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
            <Button as="a" href="/#contact" variant="primary" className="py-2 px-5 text-sm">
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

      <main id="contenu">
        <Outlet />
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

            <div className="md:col-span-2">
              <h2 className="text-lg font-bold text-white mb-6">Nos services</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {SERVICES.map((s) => (
                  <a key={s.id} href="/#services" className="hover:text-blue-400 transition-colors">{s.title}</a>
                ))}
              </div>
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
            <div className="flex flex-wrap justify-center gap-4">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-white">{item.label}</a>
              ))}
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
        <a href="/#contact" className="flex-1 flex flex-col items-center justify-center py-3 bg-blue-600 text-white hover:bg-blue-700">
          <Sparkles className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase">Devis</span>
        </a>
      </nav>
    </div>
  );
}
