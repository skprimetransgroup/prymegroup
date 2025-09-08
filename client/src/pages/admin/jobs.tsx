import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, MapPin, Clock, Briefcase } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import type { Job } from "@shared/schema";

export default function AdminJobs() {
  const { data: jobs = [] } = useQuery<Job[]>({ 
    queryKey: ["/api/jobs"]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
            <p className="text-muted-foreground mt-2">Manage all job listings and applications</p>
          </div>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor('active')}>
                      Active
                    </Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted 2 days ago • 12 applications
                  </div>
                  <div className="flex items-center space-x-2">
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
          ))}
        </div>

        {jobs && jobs.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start by posting your first job listing to attract candidates.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post Your First Job
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}