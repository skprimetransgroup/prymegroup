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
      author = 'Pryme Group'
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
    title: "Pryme Group - Canada's Leading Business Solutions | Staffing, Warehouse & Transportation",
    description: "Pryme Group provides comprehensive workforce solutions across Canada. Expert staffing services, warehouse operations, and transportation logistics. Connect with Canada's most trusted business solutions provider.",
    keywords: "Pryme Group, staffing services Canada, warehouse solutions, transportation logistics, workforce solutions, Canadian employment, job placement, business solutions",
    canonicalUrl: 'https://primetransgroup.ca/',
    ogType: 'website' as const,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Pryme Group",
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
    title: "Job Opportunities in Canada | Pryme Group Careers",
    description: "Find rewarding career opportunities with Pryme Group. Browse current job openings in staffing, warehouse operations, and transportation across Canada. Apply today!",
    keywords: "jobs Canada, employment opportunities, careers Pryme Group, staffing jobs, warehouse jobs, transportation careers, Canadian job market",
    canonicalUrl: 'https://primetransgroup.ca/jobs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPostingList",
      "name": "Job Opportunities at Pryme Group",
      "description": "Current job openings at Canada's leading workforce solutions provider"
    }
  },

  services: {
    title: "Comprehensive Business Solutions | Pryme Group Services",
    description: "Discover Pryme Group's full range of business solutions including professional staffing, warehouse management, and transportation logistics across Canada.",
    keywords: "business solutions Canada, professional staffing services, warehouse management, transportation logistics, workforce solutions, Canadian business services",
    canonicalUrl: 'https://primetransgroup.ca/services',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Comprehensive Business Solutions",
      "description": "Professional staffing, warehouse management, and transportation logistics services",
      "provider": {
        "@type": "Organization",
        "name": "Pryme Group"
      }
    }
  },

  blog: {
    title: "Industry Insights & Career Advice | Pryme Group Blog",
    description: "Stay informed with the latest industry insights, career advice, and workforce trends from Pryme Group's blog. Expert guidance for job seekers and employers.",
    keywords: "career advice, industry insights, workforce trends, job search tips, employment blog, Canadian job market, business insights",
    canonicalUrl: 'https://primetransgroup.ca/blog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Pryme Group Blog",
      "description": "Industry insights and career advice from Canada's workforce solutions experts"
    }
  },

  contact: {
    title: "Contact Pryme Group | Get in Touch with Canada's Workforce Experts",
    description: "Contact Pryme Group for all your workforce solution needs. Reach out to our expert team for staffing, warehouse, and transportation services across Canada.",
    keywords: "contact Pryme Group, workforce solutions contact, Canadian staffing services, business solutions contact, employment services",
    canonicalUrl: 'https://primetransgroup.ca/contact',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Pryme Group",
      "description": "Get in touch with Canada's leading workforce solutions provider"
    }
  },

  about: {
    title: "About Pryme Group | Canada's Trusted Workforce Solutions Provider",
    description: "Learn about Pryme Group's history, mission, and commitment to providing exceptional workforce solutions across Canada. Discover why we're Canada's trusted partner.",
    keywords: "about Pryme Group, company history, workforce solutions provider, Canadian business, staffing company history, business mission",
    canonicalUrl: 'https://primetransgroup.ca/about',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Pryme Group",
      "description": "Learn about Canada's leading workforce solutions provider"
    }
  },

  warehouse: {
    title: "Warehouse Solutions & Operations | Pryme Group",
    description: "Professional warehouse operations and storage solutions across Canada. Expert warehouse management, inventory control, and distribution services for businesses of all sizes.",
    keywords: "warehouse solutions Canada, warehouse management, inventory control, distribution services, storage solutions, warehouse operations",
    canonicalUrl: 'https://primetransgroup.ca/warehouse',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Warehouse Solutions",
      "description": "Professional warehouse management and distribution services",
      "provider": {
        "@type": "Organization",
        "name": "Pryme Group"
      }
    }
  },

  staffing: {
    title: "Professional Staffing Services | Pryme Group Canada",
    description: "Expert staffing and recruitment services across Canada. Find top talent for temporary, permanent, and contract positions in all industries with Pryme Group.",
    keywords: "staffing services Canada, recruitment services, temporary staffing, permanent placement, contract staffing, workforce solutions",
    canonicalUrl: 'https://primetransgroup.ca/staffing',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Staffing Services",
      "description": "Professional staffing and recruitment services across Canada",
      "provider": {
        "@type": "Organization",
        "name": "Pryme Group"
      }
    }
  },

  transportation: {
    title: "Transportation & Freight Services | Pryme Group Canada",
    description: "Professional transportation and freight services across Canada. Full truckload, LTL, expedited shipping with verified carriers. Get instant quote - 24/7 support.",
    keywords: "transportation services Canada, freight services, logistics, trucking, shipping, Canadian transportation",
    canonicalUrl: 'https://primetransgroup.ca/transportation',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TransportService",
      "name": "Transportation Services",
      "description": "Professional transportation and freight services across Canada",
      "provider": {
        "@type": "Organization",
        "name": "Pryme Group"
      }
    }
  },

  postJob: {
    title: "Post a Job | Pryme Group - Hire Top Canadian Talent",
    description: "Post your job openings with Pryme Group and connect with qualified candidates across Canada. Fast, efficient hiring solutions for all industries.",
    keywords: "post job Canada, hire employees, job posting, recruitment services, Canadian talent, workforce hiring",
    canonicalUrl: 'https://primetransgroup.ca/post-job',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Post a Job",
      "description": "Post job openings and connect with qualified candidates",
      "provider": {
        "@type": "Organization",
        "name": "Pryme Group"
      }
    }
  }
};

// Utility functions for creating page-specific SEO data
export const createJobDetailSEO = (jobTitle: string, jobDescription: string, jobId: string): SEOData => ({
  title: `${jobTitle} | Job Opening at Pryme Group`,
  description: `${jobDescription.substring(0, 150)}... Apply now for this ${jobTitle} position with Pryme Group, Canada's leading workforce solutions provider.`,
  keywords: `${jobTitle} jobs, ${jobTitle} Canada, employment opportunities, Pryme Group careers`,
  canonicalUrl: `/jobs/${jobId}`,
  ogType: 'article',
  structuredData: {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": jobDescription,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Pryme Group"
    },
    "jobLocation": {
      "@type": "Place",
      "addressLocality": "Canada"
    }
  }
});

export const createBlogDetailSEO = (title: string, excerpt: string, slug: string, publishedAt?: string, imageUrl?: string): SEOData => ({
  title: `${title} | Pryme Group Blog`,
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
      "name": "Pryme Group"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pryme Group",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    }
  }
});