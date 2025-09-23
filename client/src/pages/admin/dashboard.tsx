import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, MessageSquare, Users, TrendingUp, Eye } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { Job, JobApplication } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: dashboardStats } = useQuery<{jobs: number; blogPosts: number; testimonials: number; applications: number}>({ 
    queryKey: ["/api/admin/dashboard/stats"]
  });

  const quickStats = [
    {
      title: "Total Jobs",
      value: dashboardStats?.jobs || 0,
      description: "Active job listings",
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "Blog Posts",
      value: dashboardStats?.blogPosts || 0,
      description: "Published articles",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Testimonials",
      value: dashboardStats?.testimonials || 0,
      description: "Client reviews",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      title: "Applications",
      value: dashboardStats?.applications || 0,
      description: "Total applications",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  // Fetch real recent activity
  const { data: recentJobs = [] } = useQuery<Job[]>({
    queryKey: ["/api/jobs/recent"],
  });
  
  const { data: recentApplications = [] } = useQuery<JobApplication[]>({
    queryKey: ["/api/applications/recent"],
  });

  // Generate recent activity from real data
  const recentActivity = [
    ...recentJobs.slice(0, 3).map(job => ({
      action: "Job posted",
      item: job.title,
      time: formatTimeAgo(job.postedAt || undefined),
    })),
    ...recentApplications.slice(0, 3).map(app => ({
      action: "New application",
      item: `Application for Job ID: ${app.jobId}`,
      time: formatTimeAgo(app.appliedAt || undefined),
    })),
  ].sort((a, b) => {
    // Sort by most recent first
    const timeA = a.time.includes('minute') ? 1 : a.time.includes('hour') ? 60 : 1440;
    const timeB = b.time.includes('minute') ? 1 : b.time.includes('hour') ? 60 : 1440;
    return timeA - timeB;
  }).slice(0, 4);

  function formatTimeAgo(date: Date | string | undefined): string {
    if (!date) return 'Unknown time';
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your site.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No recent activity</p>
                    <p className="text-xs mt-1">Activity will appear here as jobs are posted and applications are received</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div 
                onClick={() => setLocation("/admin/jobs")} 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                data-testid="button-post-job"
              >
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Manage Jobs</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
              
              <div 
                onClick={() => setLocation("/admin/blog")} 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                data-testid="button-write-blog"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Manage Blog Posts</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
              
              <div 
                onClick={() => setLocation("/admin/testimonials")} 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                data-testid="button-add-testimonial"
              >
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Manage Testimonials</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </div>

              <div 
                onClick={() => window.open("/", "_blank")} 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                data-testid="button-view-site"
              >
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">View Live Site</span>
                </div>
                <span className="text-sm text-muted-foreground">↗</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}