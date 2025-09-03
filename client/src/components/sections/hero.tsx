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
    "Office admin",
    "AZ driver", 
    "DZ drivers",
    "Fork lift operators"
  ];

  return (
    <section className="relative bg-background hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-3d">
                Find Your Next Great{" "}
                <span className="text-gradient-3d">Hire</span>{" "}
                in Half the Time.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                Connect with top talent across Canada. Our workforce solutions help both job seekers and employers find the perfect match quickly and efficiently.
              </p>
            </div>

            {/* Trending Keywords */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Trending Keywords:</div>
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSearchQuery(keyword)}
                    data-testid={`keyword-${keyword.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Search */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg card-hover professional-shadow">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 form-3d">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full input-3d"
                    data-testid="input-search-query"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full input-3d"
                    data-testid="input-search-location"
                  />
                </div>
                <Button type="submit" className="px-8 button-3d glow-3d" data-testid="button-search-jobs">
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </Button>
              </form>
            </div>
          </div>

          {/* Hero Image with 3D Effect */}
          <div className="relative">
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-6 card-hover glow-3d professional-shadow">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional team collaboration in modern office"
                className="rounded-lg shadow-2xl w-full h-auto image-3d"
                data-testid="img-hero"
              />
              
              {/* Floating Stats with 3D Effects */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-lg card-hover pulse-glow">
                <div className="text-xs font-semibold">740+ Jobs</div>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-card border border-border px-3 py-2 rounded-lg shadow-lg card-hover glow-3d">
                <div className="text-xs font-semibold text-foreground">1,485 Hires</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
