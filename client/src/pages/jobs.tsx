import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "@/components/ui/job-card";
import { Search } from "lucide-react";
import type { Job } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";

export default function Jobs() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    location: "",
    type: "",
    category: "",
  });

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1]);
    setFilters({
      query: urlParams.get('query') || "",
      location: urlParams.get('location') || "",
      type: urlParams.get('type') || "",
      category: urlParams.get('category') || "",
    });
  }, [location]);

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs", filters],
    enabled: true,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter will be applied automatically via React Query
  };

  const jobTypes = ["Full-Time", "Part-time", "Contract", "Remote"];
  const jobCategories = [
    "Transportation", "Manufacturing", "Warehouse", "Administrative", 
    "Customer Service", "Food Service", "Design", "Accounting", 
    "Digital Marketing", "Broadcasting", "Sales"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Job
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our extensive collection of job opportunities across Canada.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={filters.query}
                  onChange={(e) => handleFilterChange("query", e.target.value)}
                  data-testid="input-job-search"
                />
                <Input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  data-testid="input-location-search"
                />
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger data-testid="select-job-type">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger data-testid="select-job-category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {jobCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full md:w-auto" data-testid="button-search">
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </form>
          </div>

          {/* Results */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">
                {isLoading ? "Loading..." : `${jobs.length} Jobs Found`}
              </h2>
            </div>
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No jobs found matching your criteria.
              </p>
              <Button 
                onClick={() => setFilters({ query: "", location: "", type: "", category: "" })}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="jobs-grid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
