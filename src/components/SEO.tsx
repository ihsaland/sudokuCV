import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultTitle = 'Sudoku CV - Interactive Resume Game';
const defaultDescription = 'Play Sudoku to unlock sections of my CV. A unique and interactive way to explore my professional experience, skills, and projects.';
const defaultKeywords = 'sudoku, cv, resume, interactive resume, portfolio, game, professional experience, skills, projects';
const defaultImage = 'https://iansalandy.com/og-image.png';
const defaultUrl = 'https://iansalandy.com';
const defaultType = 'website';

const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url = defaultUrl,
  type = defaultType,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: url,
    applicationCategory: 'Game',
    genre: 'Puzzle',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Person',
      name: 'Ian Salandy',
      url: 'https://github.com/ihsaland'
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ian Salandy" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Sudoku CV" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@ihsaland" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="en" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 