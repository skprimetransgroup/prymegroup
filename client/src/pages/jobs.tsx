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
import HiringAnimation3D from "@/components/staffing/hiring-animation-3d";
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

  // Video event handlers
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadStart = () => console.log('Staffing video loading started');
      const handleCanPlay = () => console.log('Staffing video can start playing');
      const handleError = (e: Event) => console.error('Staffing video error:', e);
      
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
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
      
      {/* Video Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            data-testid="jobs-hero-video"
          >
            <source src={staffingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="hero-title">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Find Your
              </span>
              <span className="block text-white">
                Perfect Job
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              Browse through our extensive collection of job opportunities across Canada. 
              Connect with top employers and build your career with Prime Trans Group.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-browse-jobs"
              >
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl"
                data-testid="button-upload-resume"
              >
                Upload Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* 3D Hiring Animation Section */}
          <section className="relative mb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 rounded-2xl p-8 overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Your <span className="text-primary">Career Journey</span> Starts Here
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch how we connect talented professionals with amazing opportunities every day
              </p>
            </div>
            
            <div className="relative">
              <HiringAnimation3D className="mx-auto" />
              
              {/* Interactive Stats Overlay */}
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
                <div className="text-2xl font-bold text-blue-600">24hr</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
                <div className="text-2xl font-bold text-primary">1,485</div>
                <div className="text-sm text-muted-foreground">Jobs Filled</div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Apply & Connect</h3>
                <p className="text-muted-foreground text-sm">Submit your application and connect with our expert recruiters</p>
              </div>
              
              <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Interview & Match</h3>
                <p className="text-muted-foreground text-sm">Professional interviews and perfect job-candidate matching</p>
              </div>
              
              <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Success & Growth</h3>
                <p className="text-muted-foreground text-sm">Land your dream job and advance your career with ongoing support</p>
              </div>
            </div>
          </section>

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
