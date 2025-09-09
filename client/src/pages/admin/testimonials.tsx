import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Star, Building, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import type { Testimonial } from "@shared/schema";

export default function AdminTestimonials() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: testimonials = [] } = useQuery<Testimonial[]>({ 
    queryKey: ["/api/testimonials"]
  });

  const getStatusColor = (featured: boolean) => {
    return featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderTestimonialCard = (testimonial: Testimonial) => (
    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-semibold">
                {testimonial.name}
              </CardTitle>
              {testimonial.featured && (
                <Badge className={getStatusColor(testimonial.featured)}>
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{testimonial.company}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {testimonial.rating && renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <blockquote className="text-sm text-muted-foreground mb-4 italic border-l-4 border-muted pl-4">
          "{testimonial.content}"
        </blockquote>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {testimonial.position}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" data-testid={`button-view-${testimonial.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" data-testid={`button-edit-${testimonial.id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" data-testid={`button-delete-${testimonial.id}`}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
              <p className="text-muted-foreground mt-2">Manage client testimonials and reviews.</p>
            </div>
            <Button data-testid="button-new-testimonial">
              <Plus className="h-4 w-4 mr-2" />
              New Testimonial
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-testimonials">{testimonials.length}</div>
                <p className="text-xs text-muted-foreground">All testimonials</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="stat-featured-testimonials">{featuredTestimonials.length}</div>
                <p className="text-xs text-muted-foreground">Homepage displays</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-average-rating">
                  {testimonials.length > 0 
                    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
                    : '0.0'
                  }
                </div>
                <p className="text-xs text-muted-foreground">Out of 5 stars</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Building className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600" data-testid="stat-unique-companies">
                  {new Set(testimonials.map(t => t.company)).size}
                </div>
                <p className="text-xs text-muted-foreground">Unique clients</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all-testimonials">All Testimonials ({testimonials.length})</TabsTrigger>
              <TabsTrigger value="featured" data-testid="tab-featured-testimonials">Featured ({featuredTestimonials.length})</TabsTrigger>
              <TabsTrigger value="regular" data-testid="tab-regular-testimonials">Regular ({regularTestimonials.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6">
                {testimonials.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No testimonials yet</h3>
                      <p className="text-muted-foreground text-center mb-4">Get started by adding your first client testimonial.</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Testimonial
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  testimonials.map(renderTestimonialCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid gap-6">
                {featuredTestimonials.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Star className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No featured testimonials</h3>
                      <p className="text-muted-foreground text-center">Feature testimonials to display them on your homepage.</p>
                    </CardContent>
                  </Card>
                ) : (
                  featuredTestimonials.map(renderTestimonialCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="regular" className="space-y-6">
              <div className="grid gap-6">
                {regularTestimonials.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-center mb-2">No regular testimonials</h3>
                      <p className="text-muted-foreground text-center">Non-featured testimonials will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  regularTestimonials.map(renderTestimonialCard)
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}