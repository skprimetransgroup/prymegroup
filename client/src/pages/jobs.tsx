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

      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


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
                    <SelectItem value="all">All Types</SelectItem>
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
                    <SelectItem value="all">All Categories</SelectItem>
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
