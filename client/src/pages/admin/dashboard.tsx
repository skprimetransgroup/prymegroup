import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, MessageSquare, Users, TrendingUp, Eye } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";

export default function AdminDashboard() {
  const { data: stats } = useQuery<{jobs: number; employers: number; hired: number}>({ 
    queryKey: ["/api/stats"]
  });

  const quickStats = [
    {
      title: "Total Jobs",
      value: stats?.jobs || 0,
      description: "Active job listings",
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "Blog Posts",
      value: "12",
      description: "Published articles",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Testimonials",
      value: "8",
      description: "Client reviews",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      title: "Applications",
      value: "156",
      description: "This month",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    { action: "New job application", item: "Senior Developer", time: "2 minutes ago" },
    { action: "Job posted", item: "Marketing Manager", time: "1 hour ago" },
    { action: "Blog post published", item: "Interview Tips Guide", time: "3 hours ago" },
    { action: "New testimonial", item: "ABC Corporation", time: "5 hours ago" },
  ];

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
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.item}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
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
              <a 
                href="/admin/jobs/new" 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Post New Job</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </a>
              
              <a 
                href="/admin/blog/new" 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Write Blog Post</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </a>
              
              <a 
                href="/admin/testimonials/new" 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">Add Testimonial</span>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </a>

              <a 
                href="/" 
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-3 text-primary" />
                  <span className="font-medium">View Live Site</span>
                </div>
                <span className="text-sm text-muted-foreground">↗</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}