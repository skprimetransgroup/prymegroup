import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
  isNew?: boolean;
}

export default function JobCard({ job, isNew = false }: JobCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-primary/10 text-primary";
      case "part-time":
        return "bg-green-100 text-green-600";
      case "contract":
        return "bg-blue-100 text-blue-600";
      case "remote":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow"
      data-testid={`job-card-${job.id}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
        <div className="flex-1 min-w-0">
          <Link href={`/jobs/${job.id}`} className="block nav-item-3d">
            <div className="flex items-center gap-2 mb-2">
              <h3 
                className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors text-3d leading-tight"
                data-testid={`job-title-${job.id}`}
              >
                {job.title}
              </h3>
              {isNew && (
                <Badge 
                  variant="destructive" 
                  className="bg-red-600 text-white text-xs font-bold px-2 py-1"
                  data-testid="badge-new"
                  aria-label="New job posting"
                >
                  NEW
                </Badge>
              )}
            </div>
          </Link>
          <p 
            className="text-sm text-muted-foreground mb-1 sm:mb-2"
            data-testid={`job-location-${job.id}`}
          >
            {job.location}
          </p>
          <p 
            className="text-xs text-muted-foreground"
            data-testid={`job-date-${job.id}`}
          >
            {formatDate(job.postedAt)}
          </p>
        </div>
        <span 
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTypeColor(job.type)} shrink-0 self-start`}
          data-testid={`job-type-${job.id}`}
        >
          {job.type}
        </span>
      </div>
      <Link href={`/jobs/${job.id}`}>
        <Button 
          className="w-full py-3 button-3d pulse-glow working-clock touch-target"
          data-testid={`button-apply-${job.id}`}
        >
          Apply Now
        </Button>
      </Link>
    </div>
  );
}
