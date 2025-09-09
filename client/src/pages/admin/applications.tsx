import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, Search, Filter, User as UserIcon, Briefcase, Calendar, Phone, Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  
  const { data: applications = [] } = useQuery<JobApplicationWithDetails[]>({ 
    queryKey: ["/api/applications"]
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

  const filteredApplications = applications.filter(app => {
    const matchesSearch = (app.applicantName || 'Unknown').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.applicantEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (app.jobTitle || 'Unknown Job').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderApplicationCard = (application: JobApplicationWithDetails) => (
    <Card key={application.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              {application.applicantName || 'Unknown Applicant'}
            </CardTitle>
            <CardDescription className="text-sm mb-2">
              Applied for: {application.jobTitle || 'Unknown Job'}
            </CardDescription>
            <Badge className={getStatusColor(application.status || 'pending')}>
              {getStatusLabel(application.status || 'pending')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            {application.applicantEmail || 'Not provided'}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {application.applicantPhone || 'Not provided'}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Applied: {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : 'Unknown date'}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            Experience: {application.experience || 'Not specified'}
          </div>
        </div>
        
        {application.coverLetter && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Cover Letter:</p>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md line-clamp-3">
              {application.coverLetter}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" data-testid={`button-view-${application.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {application.resume && (
            <Button size="sm" variant="outline" data-testid={`button-download-${application.id}`}>
              <Download className="h-4 w-4 mr-1" />
              Resume
            </Button>
          )}
          <Select defaultValue={application.status || 'pending'} onValueChange={(value) => console.log('Status change:', value)}>
            <SelectTrigger className="w-32">
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
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Job Applications</h1>
              <p className="text-muted-foreground mt-2">Review and manage job applications from candidates.</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-applications">{applications.length}</div>
                <p className="text-xs text-muted-foreground">All applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                <Eye className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="stat-under-review">{underReviewApplications.length}</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                <UserIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-accepted">{acceptedApplications.length}</div>
                <p className="text-xs text-muted-foreground">Hired candidates</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Today</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600" data-testid="stat-new-today">
                  {applications.filter(app => 
                    app.appliedAt && new Date(app.appliedAt).toDateString() === new Date().toDateString()
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">Recent submissions</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-applications"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
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

          {/* Applications Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all-applications">All ({filteredApplications.length})</TabsTrigger>
              <TabsTrigger value="submitted" data-testid="tab-submitted">New ({submittedApplications.length})</TabsTrigger>
              <TabsTrigger value="under_review" data-testid="tab-under-review">Under Review ({underReviewApplications.length})</TabsTrigger>
              <TabsTrigger value="accepted" data-testid="tab-accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6">
                {filteredApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No applications found</h3>
                      <p className="text-muted-foreground text-center">
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

            <TabsContent value="submitted" className="space-y-6">
              <div className="grid gap-6">
                {submittedApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No new applications</h3>
                      <p className="text-muted-foreground text-center">New applications will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  submittedApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="under_review" className="space-y-6">
              <div className="grid gap-6">
                {underReviewApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No applications under review</h3>
                      <p className="text-muted-foreground text-center">Applications being reviewed will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  underReviewApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="accepted" className="space-y-6">
              <div className="grid gap-6">
                {acceptedApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <User className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No accepted applications</h3>
                      <p className="text-muted-foreground text-center">Accepted candidates will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  acceptedApplications.map(renderApplicationCard)
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}