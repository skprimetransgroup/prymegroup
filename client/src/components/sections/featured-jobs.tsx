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
    <section id="jobs" className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-primary mb-2">Employers Offering Job</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-3d">Our Featured Job Categories</h2>
        </div>

        {/* Job Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {jobCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="bg-card border border-border rounded-lg p-6 text-center card-hover glow-3d professional-shadow card-stack-3d pulse-glow block"
                data-testid={`category-card-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-12 h-12 mx-auto bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 text-${category.color}-600`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-3d">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} Jobs</p>
              </Link>
            );
          })}
        </div>

        {/* Job Filter Tabs */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="flex bg-card border border-border rounded-lg p-1">
              {jobFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors button-3d ${
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

          {/* Job Listings */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6" data-testid="job-listings">
              {getFilteredJobs().map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/jobs">
            <Button variant="outline" className="px-8 py-3" data-testid="button-load-more-jobs">
              Load More Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
