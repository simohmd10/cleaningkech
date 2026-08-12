import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONFIG } from '../lib/config';
import { BLOG_POSTS } from '../lib/blog';

export default function BlogIndex() {
  useEffect(() => {
    document.title = `Blog nettoyage — Guides et conseils par ${CONFIG.brand}`;

    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevContent = meta.content;
    meta.content = `Guides et conseils de nettoyage par l'équipe ${CONFIG.brand} à ${CONFIG.city} : canapés, tapis, matelas, vitres, bureaux, villas et plus.`;

    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog ${CONFIG.brand}`,
      url: `${CONFIG.siteUrl}/blog`,
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${CONFIG.siteUrl}/blog/${p.slug}`
      }))
    });
    document.head.appendChild(el);

    return () => {
      el.remove();
      if (created) meta.remove();
      else meta.content = prevContent;
    };
  }, []);

  return (
    <section className="pt-40 lg:pt-48 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6">
            Le blog nettoyage de {CONFIG.brand}
          </h1>
          <p className="text-lg text-gray-600">
            Conseils, méthodes et coulisses de nos interventions à {CONFIG.city} : canapés, tapis,
            matelas, vitres, cuisines, bureaux et villas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden block">
                <img
                  src={post.image}
                  alt={post.alt}
                  width="600" height="400" loading="lazy" decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg text-blue-600">
                  <post.icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link to={`/blog/${post.slug}`} className="hover:text-blue-700">{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
