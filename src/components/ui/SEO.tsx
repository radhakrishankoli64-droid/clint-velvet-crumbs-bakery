import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaJson?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Velvet Crumbs • Luxury Bakery Atelier India',
  description = 'India’s premier luxury bakery atelier. Indulge in 70% Belgian dark chocolate truffle cakes, 36-hr sourdough loaves, and fresh French macarons delivered in Mumbai, Delhi NCR, and Bengaluru.',
  keywords = 'bakery, luxury cakes, dark chocolate cake, eggless cakes, sourdough bread, macarons, Mumbai bakery, online cake delivery',
  ogImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
  canonicalUrl = 'https://velvetcrumbs.in',
  schemaJson
}) => {
  useEffect(() => {
    // Dynamic document title update
    document.title = title;

    // Helper to set meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [key, val] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(key.trim(), val.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="keywords"]', 'content', keywords);
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:image"]', 'content', ogImage);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', ogImage);

    // Dynamic JSON-LD structured data insertion
    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      name: 'Velvet Crumbs Bakery Atelier',
      image: ogImage,
      description: description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Waterfield Road, Bandra West',
        addressLocality: 'Mumbai',
        addressRegion: 'MH',
        postalCode: '400050',
        addressCountry: 'IN'
      },
      telephone: '+912249008822',
      priceRange: '₹₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '23:00'
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(schemaJson || defaultSchema);
  }, [title, description, keywords, ogImage, canonicalUrl, schemaJson]);

  return null;
};
