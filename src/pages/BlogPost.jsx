import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import { CONFIG, WHATSAPP_LINK, waLink } from '../lib/config';
import { BLOG_POSTS, getPostBySlug } from '../lib/blog';
import { Button } from '../components/ui';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) return undefined;

    document.title = `${post.title} — Blog ${CONFIG.brand}`;

    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevContent = meta.content;
    meta.content = post.excerpt;

    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: `${CONFIG.siteUrl}${post.image}`,
      author: { '@type': 'Organization', name: CONFIG.brand },
      publisher: { '@type': 'Organization', name: CONFIG.brand },
      mainEntityOfPage: `${CONFIG.siteUrl}/blog/${post.slug}`
    });
    document.head.appendChild(el);

    return () => {
      el.remove();
      if (created) meta.remove();
      else meta.content = prevContent;
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const contactMsg = waLink(`Bonjour, j'ai lu votre article "${post.title}" et je souhaite obtenir un devis.`);

  return (
    <article className="pt-40 lg:pt-48 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Retour au blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6 leading-tight">
          {post.title}
        </h1>

        <figure className="m-0 mb-8">
          <img
            src={post.image}
            alt={post.alt}
            width="1200" height="800" decoding="async" fetchPriority="high"
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </figure>

        <div className="prose-content text-gray-700 leading-relaxed space-y-5 text-lg">
          {post.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Besoin de ce service à {CONFIG.city} ?
          </h2>
          <p className="text-gray-600 mb-6">
            Demandez un devis gratuit, notre équipe vous répond sous 2 h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button as={Link} to="/contact" variant="primary">
              Demander un devis gratuit
            </Button>
            <Button as="a" href={contactMsg} target="_blank" rel="noreferrer" variant="whatsapp">
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" /> WhatsApp
            </Button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">À lire aussi</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug} to={`/blog/${p.slug}`}
                  className="group block rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="h-28 overflow-hidden">
                    <img
                      src={p.image} alt={p.alt} loading="lazy" decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-blue-700">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12">
          <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
            Voir tous les articles
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </article>
  );
}
