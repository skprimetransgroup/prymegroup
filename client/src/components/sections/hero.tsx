import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (searchLocation) params.set("location", searchLocation);
    setLocation(`/jobs?${params.toString()}`);
  };

  const trendingKeywords = [
    "Staffing Solutions",
    "E-commerce Store", 
    "Warehouse Services",
    "Business Solutions"
  ];

  return (
    <section className="relative bg-background hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Hero Content - Mobile Optimized */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground text-3d">
                Discover Solutions for{" "}
                <span className="text-red-600 font-bold">Every</span>{" "}
                Business Need.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                From staffing and recruitment to e-commerce and warehouse services, we deliver comprehensive business solutions that drive growth across Canada.
              </p>
            </div>

            {/* Trending Keywords - Mobile Optimized */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Trending Keywords:</div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {trendingKeywords.map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSearchQuery(keyword)}
                    data-testid={`keyword-${keyword.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Search - Mobile Optimized */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-lg card-hover professional-shadow">
              <form onSubmit={handleSearch} className="flex flex-col gap-3 form-3d">
                <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                      data-testid="input-search-query"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full"
                      data-testid="input-search-location"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full sm:w-auto sm:self-center px-6 sm:px-8 py-3 button-3d glow-3d" data-testid="button-search-jobs">
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </Button>
              </form>
            </div>
          </div>

          {/* Hero Image with 3D Effect - Mobile Optimized */}
          <div className="relative order-first lg:order-last mt-8 lg:mt-0">
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-4 sm:p-6 card-hover glow-3d professional-shadow">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional team collaboration in modern office"
                className="rounded-lg shadow-2xl w-full h-auto image-3d"
                data-testid="img-hero"
              />
              
              {/* Floating Stats with 3D Effects - Mobile Optimized */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-primary text-primary-foreground px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-lg card-hover pulse-glow">
                <div className="text-xs font-semibold">740+ Jobs</div>
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-card border border-border px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-lg card-hover glow-3d">
                <div className="text-xs font-semibold text-foreground">1,485 Hires</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
