import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "@/components/ui/job-card";
import { Search, ArrowRight } from "lucide-react";
import type { Job } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";
import staffingVideo from "@assets/Staffing_1758231468220.mp4";

export default function Jobs() {
  const [location] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Enhanced mobile video optimization
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for data saver mode
      const isDataSaver = (navigator as any).connection?.saveData || false;
      
      if (prefersReducedMotion || isDataSaver) {
        video.pause();
        video.removeAttribute('autoplay');
        return;
      }
      
      // Mobile-specific optimizations
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Lower quality settings for mobile
        video.setAttribute('playbackRate', '0.9');
        
        // Pause on scroll for mobile performance
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
          video.pause();
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (!document.hidden) {
              video.play().catch(() => {});
            }
          }, 100);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Clean up scroll listener
        return () => {
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(scrollTimeout);
        };
      }
      
      // Handle visibility changes to save battery
      const handleVisibilityChange = () => {
        if (document.hidden) {
          video.pause();
        } else {
          video.play().catch(() => {
            // Auto-play failed, which is fine for mobile
          });
        }
      };
      
      // Intersection Observer for better performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(video);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs", filters],
    enabled: true,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const filterValue = value === "all" ? "" : value;
    setFilters(prev => ({ ...prev, [key]: filterValue }));
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
      
      {/* Video Hero Section - Enhanced Mobile Optimized */}
      <section className="relative h-[40vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noplaybackrate"
            className="w-full h-full object-cover object-top sm:object-center"
            style={{ minHeight: '40vh' }}
            data-testid="jobs-hero-video"
            aria-hidden="true"
            role="presentation"
          >
            <source src={staffingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Enhanced Job Search Section */}
      <main className="py-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Search Section */}
          <div className="relative z-10 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Search className="h-4 w-4" />
                Advanced Search
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                Find Your Perfect <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Career Opportunity</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Search through hundreds of job opportunities across Canada with our advanced filtering system
              </p>
            </div>

            {/* Enhanced Search Form */}
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Job Title & Keywords</label>
                  <Input
                    type="text"
                    placeholder="e.g., Machine Operator, Driver"
                    value={filters.query}
                    onChange={(e) => handleFilterChange("query", e.target.value)}
                    className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 group-hover:shadow-md"
                    data-testid="input-job-search"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <Input
                    type="text"
                    placeholder="City, Province"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 group-hover:shadow-md"
                    data-testid="input-location-search"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Job Type</label>
                  <Select 
                    value={filters.type} 
                    onValueChange={(value) => handleFilterChange("type", value)}
                  >
                    <SelectTrigger className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 group-hover:shadow-md" data-testid="select-job-type">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 group-hover:shadow-md" data-testid="select-job-category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl px-8"
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Jobs
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </form>

            {/* Enhanced Status Bar */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-3 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Real-time Updates</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                  <span className="text-sm font-medium text-foreground">Verified Employers</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
                  <span className="text-sm font-medium text-foreground">Quick Apply</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Results Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/30">
              <h2 className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </span>
                ) : (
                  <>
                    <span className="text-primary">{jobs.length}</span> Jobs Found
                  </>
                )}
              </h2>
              {jobs.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Updated today
                </div>
              )}
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
