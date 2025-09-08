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
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-2 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location} • {job.company}
            </CardDescription>
            {job.contactEmail && (
              <CardDescription className="mt-1">
                Contact: {job.contactEmail}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(job.status || 'pending')}>
              {job.status || 'pending'}
            </Badge>
            <Badge variant="outline">{job.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            Posted {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'recently'}
          </div>
          <div className="flex items-center space-x-2">
            {showActions && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleJobAction(job.id, 'approved')}
                  disabled={updateJobStatusMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleJobAction(job.id, 'denied')}
                  disabled={updateJobStatusMutation.isPending}
                >
                  <X className="h-4 w-4 mr-1" />
                  Deny
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
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
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
              <p className="text-muted-foreground mt-2">Manage job listings, approvals, and applications</p>
            </div>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Pending Approval ({pendingJobs.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Approved Jobs ({jobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {pendingJobs.length > 0 ? (
                <div className="grid gap-6">
                  {pendingJobs.map((job) => renderJobCard(job, true))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No pending jobs</h3>
                    <p className="text-muted-foreground text-center">
                      All job submissions have been reviewed.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-6">
              {jobs.length > 0 ? (
                <div className="grid gap-6">
                  {jobs.map((job) => renderJobCard(job, false))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No approved jobs</h3>
                    <p className="text-muted-foreground text-center mb-4">
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