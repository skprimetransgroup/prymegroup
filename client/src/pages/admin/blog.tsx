import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Calendar, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { BlogPost } from "@shared/schema";

export default function AdminBlog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ 
    queryKey: ["/api/blog"]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBlogCard = (post: BlogPost) => (
    <Card key={post.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {post.excerpt}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(post.status)}>
            {post.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {post.category}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              By {post.author}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" data-testid={`button-view-${post.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" data-testid={`button-edit-${post.id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" data-testid={`button-delete-${post.id}`}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const publishedPosts = blogPosts.filter(post => post.status === 'published');
  const draftPosts = blogPosts.filter(post => post.status === 'draft');

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
              <p className="text-muted-foreground mt-2">Manage your blog content and articles.</p>
            </div>
            <Button data-testid="button-new-post">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-posts">{blogPosts.length}</div>
                <p className="text-xs text-muted-foreground">All blog posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <Eye className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-published-posts">{publishedPosts.length}</div>
                <p className="text-xs text-muted-foreground">Live on website</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <Edit className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="stat-draft-posts">{draftPosts.length}</div>
                <p className="text-xs text-muted-foreground">Work in progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all-posts">All Posts ({blogPosts.length})</TabsTrigger>
              <TabsTrigger value="published" data-testid="tab-published-posts">Published ({publishedPosts.length})</TabsTrigger>
              <TabsTrigger value="drafts" data-testid="tab-draft-posts">Drafts ({draftPosts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6">
                {blogPosts.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No blog posts yet</h3>
                      <p className="text-muted-foreground text-center mb-4">Get started by creating your first blog post.</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Post
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  blogPosts.map(renderBlogCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              <div className="grid gap-6">
                {publishedPosts.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No published posts</h3>
                      <p className="text-muted-foreground text-center">Your published blog posts will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  publishedPosts.map(renderBlogCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              <div className="grid gap-6">
                {draftPosts.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Edit className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No draft posts</h3>
                      <p className="text-muted-foreground text-center">Your draft blog posts will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  draftPosts.map(renderBlogCard)
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}