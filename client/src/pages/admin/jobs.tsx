import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, MapPin, Clock, Briefcase, Check, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { Job } from "@shared/schema";

export default function AdminJobs() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: jobs = [] } = useQuery<Job[]>({ 
    queryKey: ["/api/jobs"]
  });
  
  const { data: pendingJobs = [] } = useQuery<Job[]>({ 
    queryKey: ["/api/jobs/pending"]
  });

  const updateJobStatusMutation = useMutation({
    mutationFn: async ({ jobId, status }: { jobId: string; status: 'approved' | 'denied' }) => {
      const response = await fetch(`/api/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update job status');
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs/pending"] });
      toast({
        title: `Job ${variables.status}`,
        description: `The job has been ${variables.status} successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJobAction = (jobId: string, status: 'approved' | 'denied') => {
    updateJobStatusMutation.mutate({ jobId, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderJobCard = (job: Job, showActions = false) => (
    <Card key={job.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl leading-tight" data-testid={`job-title-${job.id}`}>
              {job.title}
            </CardTitle>
            <CardDescription className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
                <span className="text-sm truncate">{job.location} • {job.company}</span>
              </div>
            </CardDescription>
            {job.contactEmail && (
              <CardDescription className="mt-1 text-sm">
                Contact: <span className="break-all">{job.contactEmail}</span>
              </CardDescription>
            )}
          </div>
          <div className="flex flex-row sm:flex-col gap-2 shrink-0">
            <Badge className={`${getStatusColor(job.status || 'pending')} text-xs`} data-testid={`job-status-${job.id}`}>
              {job.status || 'pending'}
            </Badge>
            <Badge variant="outline" className="text-xs" data-testid={`job-type-${job.id}`}>
              {job.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`job-description-${job.id}`}>
            {job.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
            <span className="text-xs sm:text-sm">
              Posted {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'recently'}
            </span>
          </div>
          
          {/* Mobile Action Buttons - Stacked */}
          <div className="flex flex-col sm:hidden gap-2">
            {showActions && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleJobAction(job.id, 'approved')}
                  disabled={updateJobStatusMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 flex-1 h-12 py-2"
                  data-testid={`button-approve-${job.id}`}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleJobAction(job.id, 'denied')}
                  disabled={updateJobStatusMutation.isPending}
                  className="flex-1 h-12 py-2"
                  data-testid={`button-deny-${job.id}`}
                >
                  <X className="h-4 w-4 mr-1" />
                  Deny
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-12 py-2" data-testid={`button-view-${job.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-12 py-2" data-testid={`button-edit-${job.id}`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive w-full h-12 py-2" data-testid={`button-delete-${job.id}`}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>

          {/* Desktop Action Buttons - Inline */}
          <div className="hidden sm:flex items-center space-x-2">
            {showActions && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleJobAction(job.id, 'approved')}
                  disabled={updateJobStatusMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                  data-testid={`button-approve-${job.id}`}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleJobAction(job.id, 'denied')}
                  disabled={updateJobStatusMutation.isPending}
                  data-testid={`button-deny-${job.id}`}
                >
                  <X className="h-4 w-4 mr-1" />
                  Deny
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" data-testid={`button-view-${job.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" data-testid={`button-edit-${job.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" data-testid={`button-delete-${job.id}`}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="admin-jobs-title">
                Job Management
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Manage job listings, approvals, and applications
              </p>
            </div>
            <Button className="flex items-center w-full sm:w-auto h-12 sm:h-10 py-3 sm:py-2" data-testid="button-post-new-job">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>

          <Tabs defaultValue="pending" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-none sm:flex">
              <TabsTrigger value="pending" className="flex items-center text-sm py-3 sm:py-2" data-testid="tab-pending">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Pending Approval</span>
                <span className="sm:hidden">Pending</span>
                <span className="ml-1">({pendingJobs.length})</span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center text-sm py-3 sm:py-2" data-testid="tab-approved">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Approved Jobs</span>
                <span className="sm:hidden">Approved</span>
                <span className="ml-1">({jobs.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 sm:space-y-6">
              {pendingJobs.length > 0 ? (
                <div className="grid gap-4 sm:gap-6">
                  {pendingJobs.map((job) => renderJobCard(job, true))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                    <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No pending jobs</h3>
                    <p className="text-muted-foreground text-center text-sm sm:text-base">
                      All job submissions have been reviewed.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4 sm:space-y-6">
              {jobs.length > 0 ? (
                <div className="grid gap-4 sm:gap-6">
                  {jobs.map((job) => renderJobCard(job, false))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                    <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No approved jobs</h3>
                    <p className="text-muted-foreground text-center mb-4 text-sm sm:text-base">
                      Approved jobs will appear here and be visible on the website.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}