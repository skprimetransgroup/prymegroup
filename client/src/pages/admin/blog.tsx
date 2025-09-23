import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Eye, Calendar, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { BlogPost } from "@shared/schema";
import { useState } from "react";

export default function AdminBlog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<BlogPost>>({});
  
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ 
    queryKey: ["/api/admin/blog"]
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      setDeleteDialogOpen(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BlogPost> }) => {
      return apiRequest(`/api/admin/blog/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setEditDialogOpen(null);
      setEditFormData({});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const handleView = (post: BlogPost) => {
    window.open(`/blog/${post.slug}`, "_blank");
  };

  const handleEdit = (post: BlogPost) => {
    setEditFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
      slug: post.slug,
      published: post.published || false,
    });
    setEditDialogOpen(post.id);
  };

  const handleSaveEdit = () => {
    if (editDialogOpen && editFormData) {
      updateMutation.mutate({ 
        id: editDialogOpen, 
        data: editFormData 
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getStatusColor = (published: boolean | null) => {
    return published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
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
          <Badge className={getStatusColor(post.published)}>
            {post.published ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleView(post)}
            data-testid={`button-view-${post.id}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Dialog open={editDialogOpen === post.id} onOpenChange={(open) => setEditDialogOpen(open ? post.id : null)}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                data-testid={`button-edit-${post.id}`}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Blog Post</DialogTitle>
                <DialogDescription>
                  Update the blog post details below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editFormData.title || ""}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter blog post title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={editFormData.slug || ""}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="enter-blog-post-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={editFormData.excerpt || ""}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editFormData.content || ""}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Full blog post content"
                    rows={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={editFormData.imageUrl || ""}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={editFormData.published || false}
                    onCheckedChange={(checked) => setEditFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={deleteDialogOpen === post.id} onOpenChange={(open) => setDeleteDialogOpen(open ? post.id : null)}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" data-testid={`button-delete-${post.id}`}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Blog Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(post.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  const publishedPosts = blogPosts.filter(post => post.published);
  const draftPosts = blogPosts.filter(post => !post.published);

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