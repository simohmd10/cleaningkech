import { useEffect } from 'react';

/**
 * Met à jour le <title> et la meta description pour la page courante,
 * et les restaure au démontage (changement de route).
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevContent = meta.content;
    if (description) meta.content = description;

    return () => {
      document.title = prevTitle;
      if (created) meta.remove();
      else meta.content = prevContent;
    };
  }, [title, description]);
}

/**
 * Injecte un ou plusieurs blocs JSON-LD dans <head> et les retire au démontage.
 */
export function useJsonLd(data) {
  useEffect(() => {
    const list = Array.isArray(data) ? data : [data];
    const nodes = list.map((obj) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.text = JSON.stringify(obj);
      document.head.appendChild(el);
      return el;
    });
    return () => nodes.forEach((n) => n.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);
}
