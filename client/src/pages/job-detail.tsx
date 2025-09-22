import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Building, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Job } from "@shared/schema";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [applicationData, setApplicationData] = useState({
    userId: "temp-user-id", // In a real app, this would come from auth context
    coverLetter: "",
    resume: "",
  });

  const { data: job, isLoading } = useQuery<Job>({
    queryKey: ["/api/jobs", jobId],
    enabled: !!jobId,
  });

  const applyMutation = useMutation({
    mutationFn: async (data: typeof applicationData) => {
      const response = await apiRequest("POST", `/api/jobs/${jobId}/apply`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your job application has been submitted successfully. We'll be in touch soon!",
      });
      setApplicationData(prev => ({ ...prev, coverLetter: "", resume: "" }));
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: () => {
      toast({
        title: "Application Failed", 
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData.coverLetter.trim()) {
      toast({
        title: "Cover Letter Required",
        description: "Please provide a cover letter for your application.",
        variant: "destructive",
      });
      return;
    }
    applyMutation.mutate(applicationData);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4 sm:space-y-6">
              <div className="h-6 sm:h-8 bg-muted rounded w-1/3 sm:w-1/4"></div>
              <div className="h-8 sm:h-12 bg-muted rounded w-3/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div className="h-48 sm:h-64 bg-muted rounded"></div>
                </div>
                <div className="h-64 sm:h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-8 sm:py-12 px-4">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Job Not Found</h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/jobs">
                <Button className="w-full sm:w-auto">Browse All Jobs</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb - Mobile Optimized */}
          <div className="mb-4 sm:mb-6">
            <Link href="/jobs" className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm sm:text-base touch-target">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Back to Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Job Details - Mobile Optimized */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Job Header - Mobile Optimized */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl sm:text-2xl lg:text-3xl mb-3 leading-tight" data-testid="job-detail-title">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                          <span data-testid="job-detail-company" className="truncate">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                          <span data-testid="job-detail-location" className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                          <span data-testid="job-detail-posted">Posted {formatDate(job.postedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                      <Badge variant="secondary" className="text-xs" data-testid="job-detail-type">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs" data-testid="job-detail-category">
                        {job.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Job Description - Mobile Optimized */}
              <Card>
                <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Job Description</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="prose prose-sm sm:prose prose-gray max-w-none">
                    <p data-testid="job-detail-description" className="text-sm sm:text-base leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements - Mobile Optimized */}
              {job.requirements && (
                <Card>
                  <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p data-testid="job-detail-requirements" className="text-sm sm:text-base leading-relaxed">
                      {job.requirements}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Salary - Mobile Optimized */}
              {job.salary && (
                <Card>
                  <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                      Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-base sm:text-lg font-semibold" data-testid="job-detail-salary">
                      {job.salary}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Application Form - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Apply for this Position</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-foreground mb-2">
                        Cover Letter *
                      </label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Tell us why you're perfect for this role..."
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                        className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                        required
                        data-testid="textarea-cover-letter"
                      />
                    </div>

                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-foreground mb-2">
                        Resume/CV URL
                      </label>
                      <Input
                        id="resume"
                        type="url"
                        placeholder="https://your-resume-link.com"
                        value={applicationData.resume}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, resume: e.target.value }))}
                        className="text-sm sm:text-base h-12 sm:h-10"
                        data-testid="input-resume-url"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Provide a link to your online resume or portfolio
                      </p>
                    </div>

                    <Separator />

                    <Button 
                      type="submit" 
                      className="w-full py-3 touch-target" 
                      disabled={applyMutation.isPending}
                      data-testid="button-submit-application"
                    >
                      {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Actions - Mobile Optimized */}
              <Card>
                <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                  <Button variant="outline" className="w-full py-3 touch-target" data-testid="button-save-job">
                    Save Job
                  </Button>
                  <Button variant="outline" className="w-full py-3 touch-target" data-testid="button-share-job">
                    Share Job
                  </Button>
                  <Link href="/jobs" className="block">
                    <Button variant="ghost" className="w-full py-3 touch-target" data-testid="button-browse-similar">
                      Browse Similar Jobs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
