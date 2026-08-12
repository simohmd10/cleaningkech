import React, { useState, useRef } from 'react';
import { CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';
import { CONFIG, waLink } from '../lib/config';
import { SERVICE_OPTIONS } from '../lib/data';

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
  white: 'bg-white text-blue-700 hover:bg-gray-50 shadow-lg',
  whiteOutline: 'bg-white/10 text-white border-2 border-white/40 hover:bg-white/20 backdrop-blur-sm'
};

/**
 * `as="a"` rend un <a> stylé en bouton — évite le <button> imbriqué dans <a> (HTML invalide).
 */
export const Button = ({ as: Tag = 'button', children, variant = 'primary', className = '', ...props }) => (
  <Tag className={`${BASE_BTN} ${BTN_VARIANTS[variant]} ${className}`} {...props}>
    {children}
  </Tag>
);

export const Field = ({ label, error, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-lg border outline-none bg-gray-50 transition-colors ` +
  `focus:ring-2 focus:ring-blue-600 focus:border-transparent ` +
  (hasError ? 'border-red-400 bg-red-50' : 'border-gray-300');

/* ------------------------------------------------------------------
   QUOTE FORM
------------------------------------------------------------------ */
const EMPTY_FORM = { name: '', phone: '', service: SERVICE_OPTIONS[0], area: '', details: '' };

export function QuoteForm() {
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
