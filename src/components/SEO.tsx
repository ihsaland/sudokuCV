import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultTitle       = 'Ian Salandy · Systems Pressure Architect';
const defaultDescription = 'I study how distributed systems behave under pressure — technically, operationally, and economically. 15+ years in distributed systems architecture, performance engineering, and infrastructure economics. Creator of PPI-F™ and the Pressure Intelligence advisory practice at KPI99.';
const defaultKeywords    = 'systems pressure architect, distributed systems, performance engineering, infrastructure economics, cost-to-serve modeling, PPI-F, pressure intelligence, capacity planning, KPI99, scalability, Spark, Kafka, Kubernetes, AWS, Ian Salandy';
const defaultImage       = 'https://iansalandy.com/og-image.png';
const defaultUrl         = 'https://iansalandy.com';
const defaultType        = 'website';

const SEO: React.FC<SEOProps> = ({
  title       = defaultTitle,
  description = defaultDescription,
  keywords    = defaultKeywords,
  image       = defaultImage,
  url         = defaultUrl,
  type        = defaultType,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Ian Salandy',
        url: defaultUrl,
        jobTitle: 'Systems Pressure Architect',
        description: 'Distributed systems architect specialising in performance engineering, infrastructure economics, and pressure analysis of data-critical systems.',
        sameAs: [
          'https://www.linkedin.com/in/isalandy/',
          'https://github.com/ihsaland',
          'https://kpi99.co',
        ],
        knowsAbout: [
          'Distributed Systems Architecture',
          'Performance Engineering',
          'Infrastructure Economics',
          'Cost-to-Serve Modeling',
          'PPI-F Framework',
          'Capacity Planning',
          'Apache Spark',
          'Apache Kafka',
          'Kubernetes',
          'AWS',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Pressure Intelligence',
        alternateName: 'Ian Salandy',
        url: defaultUrl,
        description: description,
        author: { '@type': 'Person', name: 'Ian Salandy' },
      },
    ],
  };

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description"    content={description} />
      <meta name="keywords"       content={keywords} />
      <meta name="author"         content="Ian Salandy" />
      <meta name="robots"         content="index, follow" />
      <meta name="language"       content="English" />
      <meta name="revisit-after"  content="7 days" />

      {/* Open Graph */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content="Pressure Intelligence" />
      <meta property="og:locale"      content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:creator"     content="@ihsaland" />

      {/* Viewport + theme */}
      <meta name="viewport"    content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#07070f" />

      {/* Canonical */}
      <link rel="canonical"  href={url} />
      <link rel="alternate"  href={url} hrefLang="en" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
