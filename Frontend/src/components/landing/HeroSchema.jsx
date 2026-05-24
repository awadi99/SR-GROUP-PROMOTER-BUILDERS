import React from 'react';

export const heroSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "SR GROUP",
  "description": "Premium Promoter and Builder based in Baramati.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Baramati",
    "addressCountry": "IN"
  }
};

export const HeroSEO = React.memo(function HeroSEO() {
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
    />
  );
});