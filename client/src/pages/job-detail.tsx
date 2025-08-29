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
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded w-3/4"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-muted rounded"></div>
                </div>
                <div className="h-96 bg-muted rounded"></div>
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
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/jobs">
                <Button>Browse All Jobs</Button>
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
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/jobs" className="inline-flex items-center text-primary hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl lg:text-3xl mb-2" data-testid="job-detail-title">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span data-testid="job-detail-company">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span data-testid="job-detail-location">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span data-testid="job-detail-posted">Posted {formatDate(job.postedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary" data-testid="job-detail-type">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" data-testid="job-detail-category">
                        {job.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p data-testid="job-detail-description">{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p data-testid="job-detail-requirements">{job.requirements}</p>
                  </CardContent>
                </Card>
              )}

              {/* Salary */}
              {job.salary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold" data-testid="job-detail-salary">
                      {job.salary}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Application Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this Position</CardTitle>
                </CardHeader>
                <CardContent>
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
                        className="min-h-[120px]"
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
                        data-testid="input-resume-url"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Provide a link to your online resume or portfolio
                      </p>
                    </div>

                    <Separator />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={applyMutation.isPending}
                      data-testid="button-submit-application"
                    >
                      {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full" data-testid="button-save-job">
                    Save Job
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-share-job">
                    Share Job
                  </Button>
                  <Link href="/jobs" className="block">
                    <Button variant="ghost" className="w-full" data-testid="button-browse-similar">
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
