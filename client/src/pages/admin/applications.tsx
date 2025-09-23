import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, Search, Filter, User as UserIcon, Briefcase, Calendar, Phone, Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { JobApplication, Job, User as UserType } from "@shared/schema";

// Extended type for display purposes with joined data
type JobApplicationWithDetails = JobApplication & {
  jobTitle?: string;
  applicantName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  experience?: string;
};
import { useState } from "react";

export default function AdminApplications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<JobApplicationWithDetails | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  
  const { data: applications = [] } = useQuery<JobApplicationWithDetails[]>({ 
    queryKey: ["/api/applications"]
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      return apiRequest("PATCH", `/api/applications/${applicationId}/status`, { status });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Status Updated",
        description: `Application status updated to ${variables.status.replace('_', ' ')}.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update application status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'Under Review';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleViewDetails = (application: JobApplicationWithDetails) => {
    setSelectedApplication(application);
    setViewDetailsOpen(true);
  };

  const handleResumeDownload = (application: JobApplicationWithDetails) => {
    if (application.resume) {
      // Create a blob URL and trigger download
      const link = document.createElement('a');
      link.href = application.resume;
      link.download = `${application.applicantName || 'resume'}_resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Resume Download",
        description: `Resume for ${application.applicantName} opened in new tab.`,
      });
    } else {
      toast({
        title: "No Resume",
        description: "No resume available for this application.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    updateStatusMutation.mutate({ applicationId, status: newStatus });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = (app.applicantName || 'Unknown').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.applicantEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.jobTitle || 'Unknown Job').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderApplicationCard = (application: JobApplicationWithDetails) => (
    <Card key={application.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold mb-2 leading-tight" data-testid={`applicant-name-${application.id}`}>
              {application.applicantName || 'Unknown Applicant'}
            </CardTitle>
            <CardDescription className="text-sm mb-2" data-testid={`job-title-${application.id}`}>
              Applied for: <span className="font-medium">{application.jobTitle || 'Unknown Job'}</span>
            </CardDescription>
            <Badge className={`${getStatusColor(application.status || 'submitted')} text-xs`} data-testid={`status-${application.id}`}>
              {getStatusLabel(application.status || 'submitted')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span className="break-all" data-testid={`applicant-email-${application.id}`}>
              {application.applicantEmail || 'Not provided'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span data-testid={`applicant-phone-${application.id}`}>
              {application.applicantPhone || 'Not provided'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span className="text-xs sm:text-sm" data-testid={`applied-date-${application.id}`}>
              Applied: {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : 'Unknown date'}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm" data-testid={`experience-${application.id}`}>
              Experience: {application.experience || 'Not specified'}
            </span>
          </div>
        </div>
        
        {application.coverLetter && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Cover Letter:</p>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md line-clamp-3" data-testid={`cover-letter-${application.id}`}>
              {application.coverLetter}
            </p>
          </div>
        )}

        {/* Mobile Action Layout */}
        <div className="flex flex-col sm:hidden gap-3">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 h-12 py-2" data-testid={`button-view-${application.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {application.resume && (
              <Button size="sm" variant="outline" className="flex-1 h-12 py-2" data-testid={`button-download-${application.id}`}>
                <Download className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
          </div>
          <Select defaultValue={application.status || 'submitted'} onValueChange={(value) => console.log('Status change:', value)}>
            <SelectTrigger className="w-full h-12" data-testid={`status-select-${application.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Action Layout */}
        <div className="sm:hidden flex flex-col gap-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1" 
              onClick={() => handleViewDetails(application)}
              data-testid={`button-view-mobile-${application.id}`}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {application.resume && (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => handleResumeDownload(application)}
                data-testid={`button-download-mobile-${application.id}`}
              >
                <Download className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
          </div>
          <Select 
            defaultValue={application.status || 'submitted'} 
            onValueChange={(value) => handleStatusChange(application.id, value)}
            disabled={updateStatusMutation.isPending}
          >
            <SelectTrigger className="w-full" data-testid={`status-select-mobile-${application.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Action Layout */}
        <div className="hidden sm:flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleViewDetails(application)}
            data-testid={`button-view-${application.id}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {application.resume && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleResumeDownload(application)}
              data-testid={`button-download-${application.id}`}
            >
              <Download className="h-4 w-4 mr-1" />
              Resume
            </Button>
          )}
          <Select 
            defaultValue={application.status || 'submitted'} 
            onValueChange={(value) => handleStatusChange(application.id, value)}
            disabled={updateStatusMutation.isPending}
          >
            <SelectTrigger className="w-32" data-testid={`status-select-${application.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const submittedApplications = applications.filter(app => app.status === 'submitted');
  const underReviewApplications = applications.filter(app => app.status === 'under_review');
  const acceptedApplications = applications.filter(app => app.status === 'accepted');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header - Mobile Optimized */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="admin-applications-title">
                Job Applications
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Review and manage job applications from candidates.
              </p>
            </div>
          </div>

          {/* Stats Cards - Mobile Optimized */}
          <div className="grid gap-4 grid-cols-2 sm:gap-6 md:grid-cols-4 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Apps</CardTitle>
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold" data-testid="stat-total-applications">{applications.length}</div>
                <p className="text-xs text-muted-foreground">All applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Review</CardTitle>
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600" data-testid="stat-under-review">{underReviewApplications.length}</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Accepted</CardTitle>
                <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-green-600" data-testid="stat-accepted">{acceptedApplications.length}</div>
                <p className="text-xs text-muted-foreground">Hired</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Today</CardTitle>
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold text-blue-600" data-testid="stat-new-today">
                  {applications.filter(app => 
                    app.appliedAt && new Date(app.appliedAt).toDateString() === new Date().toDateString()
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">Recent</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 sm:h-10 text-sm sm:text-base"
                data-testid="input-search-applications"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12 sm:h-10" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Tabs - Mobile Optimized */}
          <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:flex gap-0 sm:gap-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm py-3 sm:py-2" data-testid="tab-all-applications">
                <span className="hidden sm:inline">All</span>
                <span className="sm:hidden">All</span>
                <span className="ml-1">({filteredApplications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="submitted" className="text-xs sm:text-sm py-3 sm:py-2" data-testid="tab-submitted">
                <span className="hidden sm:inline">New</span>
                <span className="sm:hidden">New</span>
                <span className="ml-1">({submittedApplications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="under_review" className="text-xs sm:text-sm py-3 sm:py-2" data-testid="tab-under-review">
                <span className="hidden sm:inline">Review</span>
                <span className="sm:hidden">Review</span>
                <span className="ml-1">({underReviewApplications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="accepted" className="text-xs sm:text-sm py-3 sm:py-2" data-testid="tab-accepted">
                <span className="hidden sm:inline">Accepted</span>
                <span className="sm:hidden">Accept</span>
                <span className="ml-1">({acceptedApplications.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {filteredApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-center mb-2">No applications found</h3>
                      <p className="text-muted-foreground text-center text-sm sm:text-base">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'Try adjusting your search or filter criteria.'
                          : 'Job applications will appear here when candidates apply.'
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="submitted" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {submittedApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-center mb-2">No new applications</h3>
                      <p className="text-muted-foreground text-center text-sm sm:text-base">New applications will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  submittedApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="under_review" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {underReviewApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-center mb-2">No applications under review</h3>
                      <p className="text-muted-foreground text-center text-sm sm:text-base">Applications being reviewed will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  underReviewApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {acceptedApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-center mb-2">No accepted applications</h3>
                      <p className="text-muted-foreground text-center text-sm sm:text-base">Accepted candidates will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  acceptedApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* View Details Dialog */}
          <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Complete application information for {selectedApplication?.applicantName}
                </DialogDescription>
              </DialogHeader>
              {selectedApplication && (
                <div className="space-y-6 py-4">
                  {/* Applicant Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Applicant Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-sm mt-1">{selectedApplication.applicantName || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm mt-1">{selectedApplication.applicantEmail || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-sm mt-1">{selectedApplication.applicantPhone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <Badge className={`mt-1 ${getStatusColor(selectedApplication.status || 'submitted')}`}>
                          {getStatusLabel(selectedApplication.status || 'submitted')}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Job Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Job Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Position</label>
                        <p className="text-sm mt-1">{selectedApplication.jobTitle || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Applied On</label>
                        <p className="text-sm mt-1">
                          {selectedApplication.appliedAt 
                            ? new Date(selectedApplication.appliedAt).toLocaleDateString()
                            : 'Not specified'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  {selectedApplication.experience && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Experience</h3>
                      <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                        {selectedApplication.experience}
                      </p>
                    </div>
                  )}

                  {/* Cover Letter */}
                  {selectedApplication.coverLetter && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
                      <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                        {selectedApplication.coverLetter}
                      </p>
                    </div>
                  )}

                  {/* Resume */}
                  {selectedApplication.resume && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Resume</h3>
                      <Button 
                        variant="outline" 
                        onClick={() => handleResumeDownload(selectedApplication)}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}