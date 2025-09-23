import { useEffect } from 'react';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  robots?: string;
  author?: string;
}

interface SEOManagerProps {
  data: SEOData;
}

export default function SEOManager({ data }: SEOManagerProps) {
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      ogType = 'website',
      twitterTitle,
      twitterDescription,
      twitterImage,
      structuredData,
      robots = 'index, follow',
      author = 'Prime Trans Group'
    } = data;

    // Set document title
    if (title) {
      document.title = title;
    }

    // Helper function to set or update meta tag
    const setMetaTag = (selector: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (tag) {
        tag.content = content;
      } else {
        tag = document.createElement('meta');
        if (selector.includes('[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) tag.name = name;
        } else if (selector.includes('[property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) tag.setAttribute('property', property);
        }
        tag.content = content;
        document.head.appendChild(tag);
      }
    };

    // Helper function to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (link) {
        link.href = href;
      } else {
        link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Standard meta tags
    if (description) {
      setMetaTag('meta[name="description"]', description);
    }

    if (keywords) {
      setMetaTag('meta[name="keywords"]', keywords);
    }

    if (author) {
      setMetaTag('meta[name="author"]', author);
    }

    if (robots) {
      setMetaTag('meta[name="robots"]', robots);
    }

    // Canonical URL
    if (canonicalUrl) {
      setLinkTag('canonical', canonicalUrl);
    }

    // Open Graph tags
    if (ogTitle || title) {
      setMetaTag('meta[property="og:title"]', ogTitle || title || '');
    }

    if (ogDescription || description) {
      setMetaTag('meta[property="og:description"]', ogDescription || description || '');
    }

    if (ogImage) {
      setMetaTag('meta[property="og:image"]', ogImage);
    }

    setMetaTag('meta[property="og:type"]', ogType);
    setMetaTag('meta[property="og:url"]', canonicalUrl || window.location.href);

    // Twitter Card tags
    if (twitterTitle || title) {
      setMetaTag('meta[name="twitter:title"]', twitterTitle || title || '');
    }

    if (twitterDescription || description) {
      setMetaTag('meta[name="twitter:description"]', twitterDescription || description || '');
    }

    if (twitterImage || ogImage) {
      setMetaTag('meta[name="twitter:image"]', twitterImage || ogImage || '');
    }

    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');

    // JSON-LD Structured Data
    if (structuredData) {
      // Remove existing structured data for this page
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      existingScripts.forEach(script => script.remove());

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamic structured data when component unmounts
      const dynamicScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      dynamicScripts.forEach(script => script.remove());
    };
  }, [data]);

  return null; // This component doesn't render anything
}

// Pre-defined SEO configurations for different page types
export const SEOConfigs = {
  home: {
    title: "Prime Trans Group - Canada's Leading Business Solutions | Staffing, Warehouse & Transportation",
    description: "Prime Trans Group provides comprehensive workforce solutions across Canada. Expert staffing services, warehouse operations, and transportation logistics. Connect with Canada's most trusted business solutions provider.",
    keywords: "Prime Trans Group, staffing services Canada, warehouse solutions, transportation logistics, workforce solutions, Canadian employment, job placement, business solutions",
    canonicalUrl: '/',
    ogType: 'website' as const,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Prime Trans Group",
      "url": "/",
      "logo": "/logo.png",
      "description": "Canada's leading provider of comprehensive workforce solutions including staffing services, warehouse operations, and transportation logistics.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-249-444-0004",
        "contactType": "customer service"
      }
    }
  },

  jobs: {
    title: "Job Opportunities in Canada | Prime Trans Group Careers",
    description: "Find rewarding career opportunities with Prime Trans Group. Browse current job openings in staffing, warehouse operations, and transportation across Canada. Apply today!",
    keywords: "jobs Canada, employment opportunities, careers Prime Trans Group, staffing jobs, warehouse jobs, transportation careers, Canadian job market",
    canonicalUrl: '/jobs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPostingList",
      "name": "Job Opportunities at Prime Trans Group",
      "description": "Current job openings at Canada's leading workforce solutions provider"
    }
  },

  services: {
    title: "Comprehensive Business Solutions | Prime Trans Group Services",
    description: "Discover Prime Trans Group's full range of business solutions including professional staffing, warehouse management, and transportation logistics across Canada.",
    keywords: "business solutions Canada, professional staffing services, warehouse management, transportation logistics, workforce solutions, Canadian business services",
    canonicalUrl: '/services',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Comprehensive Business Solutions",
      "description": "Professional staffing, warehouse management, and transportation logistics services",
      "provider": {
        "@type": "Organization",
        "name": "Prime Trans Group"
      }
    }
  },

  blog: {
    title: "Industry Insights & Career Advice | Prime Trans Group Blog",
    description: "Stay informed with the latest industry insights, career advice, and workforce trends from Prime Trans Group's blog. Expert guidance for job seekers and employers.",
    keywords: "career advice, industry insights, workforce trends, job search tips, employment blog, Canadian job market, business insights",
    canonicalUrl: '/blog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Prime Trans Group Blog",
      "description": "Industry insights and career advice from Canada's workforce solutions experts"
    }
  },

  contact: {
    title: "Contact Prime Trans Group | Get in Touch with Canada's Workforce Experts",
    description: "Contact Prime Trans Group for all your workforce solution needs. Reach out to our expert team for staffing, warehouse, and transportation services across Canada.",
    keywords: "contact Prime Trans Group, workforce solutions contact, Canadian staffing services, business solutions contact, employment services",
    canonicalUrl: '/contact',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Prime Trans Group",
      "description": "Get in touch with Canada's leading workforce solutions provider"
    }
  },

  about: {
    title: "About Prime Trans Group | Canada's Trusted Workforce Solutions Provider",
    description: "Learn about Prime Trans Group's history, mission, and commitment to providing exceptional workforce solutions across Canada. Discover why we're Canada's trusted partner.",
    keywords: "about Prime Trans Group, company history, workforce solutions provider, Canadian business, staffing company history, business mission",
    canonicalUrl: '/about',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Prime Trans Group",
      "description": "Learn about Canada's leading workforce solutions provider"
    }
  }
};

// Utility functions for creating page-specific SEO data
export const createJobDetailSEO = (jobTitle: string, jobDescription: string, jobId: string): SEOData => ({
  title: `${jobTitle} | Job Opening at Prime Trans Group`,
  description: `${jobDescription.substring(0, 150)}... Apply now for this ${jobTitle} position with Prime Trans Group, Canada's leading workforce solutions provider.`,
  keywords: `${jobTitle} jobs, ${jobTitle} Canada, employment opportunities, Prime Trans Group careers`,
  canonicalUrl: `/jobs/${jobId}`,
  ogType: 'article',
  structuredData: {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": jobDescription,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Prime Trans Group"
    },
    "jobLocation": {
      "@type": "Place",
      "addressLocality": "Canada"
    }
  }
});

export const createBlogDetailSEO = (title: string, excerpt: string, slug: string, publishedAt?: string, imageUrl?: string): SEOData => ({
  title: `${title} | Prime Trans Group Blog`,
  description: excerpt,
  keywords: `${title.toLowerCase().replace(/\s+/g, ', ')}, career advice, industry insights, workforce trends`,
  canonicalUrl: `/blog/${slug}`,
  ogType: 'article',
  ogImage: imageUrl,
  twitterImage: imageUrl,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": excerpt,
    "image": imageUrl,
    "datePublished": publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Prime Trans Group"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prime Trans Group",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    }
  }
});