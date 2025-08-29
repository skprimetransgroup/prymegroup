export interface SearchFilters {
  query: string;
  location: string;
  type: string;
  category: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  color: string;
}

export interface CompanyLogo {
  name: string;
  logoUrl?: string;
}
