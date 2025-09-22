import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/ui/job-card";
import { Calculator, Megaphone, Headphones, Radio, TrendingUp } from "lucide-react";
import type { Job } from "@shared/schema";

const jobCategories = [
  {
    name: "Accounting",
    icon: Calculator,
    color: "blue",
    count: 5,
  },
  {
    name: "Digital Marketing", 
    icon: Megaphone,
    color: "green",
    count: 5,
  },
  {
    name: "Customer Service",
    icon: Headphones,
    color: "purple", 
    count: 10,
  },
  {
    name: "Broadcasting",
    icon: Radio,
    color: "orange",
    count: 3,
  },
  {
    name: "Sales Assistant",
    icon: TrendingUp,
    color: "pink",
    count: 2,
  },
];

const jobFilters = [
  { label: "Featured Jobs", value: "featured" },
  { label: "Full-Time", value: "Full-Time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Remote", value: "remote" },
];

export default function FeaturedJobs() {
  const [activeFilter, setActiveFilter] = useState("featured");

  const { data: featuredJobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs/featured"],
  });

  const { data: allJobs = [] } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const getFilteredJobs = (): Job[] => {
    if (activeFilter === "featured") {
      return featuredJobs.slice(0, 6);
    }
    if (activeFilter === "remote") {
      return allJobs.filter((job: Job) => 
        job.location.toLowerCase().includes("global") || 
        job.location.toLowerCase().includes("remote") ||
        job.location.toLowerCase().includes("anywhere")
      ).slice(0, 6);
    }
    return allJobs.filter((job) => job.type === activeFilter).slice(0, 6);
  };

  return (
    <section id="jobs" className="py-12 sm:py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-sm font-semibold text-primary mb-2">Employers Offering Job</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-3d">Our Featured Job Categories</h2>
        </div>

        {/* Job Categories - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {jobCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center card-hover glow-3d professional-shadow card-stack-3d pulse-glow block touch-target"
                data-testid={`category-card-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-${category.color}-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${category.color}-600`} />
                </div>
                <h3 className="text-base font-semibold text-foreground">{category.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{category.count} Jobs</p>
              </Link>
            );
          })}
        </div>

        {/* Job Filter Tabs - Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-center mb-6 sm:mb-8 px-2 sm:px-0">
            <div className="flex flex-wrap sm:flex-nowrap bg-card border border-border rounded-lg p-1 gap-1 sm:gap-0 w-full sm:w-auto">
              {jobFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors button-3d touch-target ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground pulse-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`filter-tab-${filter.value}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings - Mobile Optimized */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 sm:p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" data-testid="job-listings">
              {getFilteredJobs().map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/jobs">
            <Button variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3" data-testid="button-load-more-jobs">
              Load More Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
