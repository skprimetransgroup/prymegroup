import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, BookOpen, Search, TrendingUp, Users, Target, Filter, Tag, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Professional Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/20">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Professional Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-primary/15 to-secondary/15 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-primary/20 shadow-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              Professional Career Resources
              <Target className="w-4 h-4 ml-2" />
            </div>
            
            {/* Enhanced Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight tracking-tight">
              Insights & Resources
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
              Stay ahead in Canada's competitive job market with expert insights, industry analysis, and actionable career strategies from leading workforce professionals.
            </p>
            
            {/* Professional Search */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl">
                  <div className="flex items-center p-2">
                    <div className="flex items-center px-4 py-3 flex-1">
                      <Search className="w-5 h-5 text-muted-foreground mr-3" />
                      <Input
                        type="text"
                        placeholder="Search career insights, industry trends, professional advice..."
                        className="border-0 bg-transparent text-base focus:ring-0 focus:outline-none placeholder:text-muted-foreground/70"
                        data-testid="blog-search-input"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-xl font-semibold shadow-lg" data-testid="blog-search-button">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground font-medium">Professionals Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground font-medium">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">Weekly</div>
                <div className="text-sm text-muted-foreground font-medium">Fresh Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-y border-border bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="category-all">
              <Filter className="w-4 h-4 mr-2" />
              All Articles
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10" data-testid="category-career">
              <Target className="w-4 h-4 mr-2" />
              Career Tips
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10" data-testid="category-industry">
              <TrendingUp className="w-4 h-4 mr-2" />
              Industry Trends
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10" data-testid="category-guides">
              <BookOpen className="w-4 h-4 mr-2" />
              Job Search Guides
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10" data-testid="category-interviews">
              <Users className="w-4 h-4 mr-2" />
              Interview Prep
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Blog Posts Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse border-0 shadow-lg">
                    <div className="aspect-[16/10] bg-gradient-to-br from-muted to-muted/70"></div>
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 bg-muted rounded-full w-20"></div>
                        <div className="h-6 bg-muted rounded-full w-16"></div>
                      </div>
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="space-y-2 mb-6">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                      <div className="h-5 bg-muted rounded w-32"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {posts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-background/95" data-testid={`blog-card-${post.id}`}>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={post.imageUrl || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&w=600&h=400"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        data-testid={`blog-image-${post.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Professional Author Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg font-semibold px-3 py-1">
                          <User className="w-3 h-3 mr-1" />
                          Expert
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 lg:p-8">
                      {/* Professional Metadata */}
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary font-medium px-3 py-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : 'Recent'}
                        </Badge>
                        <Badge variant="outline" className="font-medium px-3 py-1">
                          <Clock className="w-3 h-3 mr-1" />
                          5 min read
                        </Badge>
                      </div>
                      
                      {/* Enhanced Title */}
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* Professional Excerpt */}
                      <p className="text-muted-foreground mb-6 line-clamp-3 text-base leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {/* Professional CTA */}
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-all duration-300 group/link border-b border-transparent hover:border-primary pb-1"
                        data-testid={`blog-read-more-${post.id}`}
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our team of career experts is crafting valuable insights and professional guidance. Check back soon for industry-leading content.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Professional Newsletter Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl">
              <CardHeader className="text-center pb-8 pt-12 px-8 lg:px-12">
                <div className="inline-flex items-center bg-gradient-to-r from-primary/15 to-secondary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Professional Insights
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Stay Ahead in Your Career
                </h2>
                
                <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                  Join thousands of professionals who receive our weekly insights on job market trends, career advancement strategies, and industry analysis.
                </p>
              </CardHeader>
              
              <CardContent className="px-8 lg:px-12 pb-12">
                <div className="max-w-2xl mx-auto">
                  <div className="relative group mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl">
                      <div className="flex flex-col sm:flex-row items-stretch gap-4 p-4">
                        <div className="flex-1">
                          <Input
                            type="email"
                            placeholder="Enter your professional email address"
                            className="border-0 bg-transparent text-base h-12 focus:ring-0 focus:outline-none placeholder:text-muted-foreground/70"
                            data-testid="newsletter-email-input"
                          />
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 h-12 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                          data-testid="newsletter-subscribe-button"
                        >
                          Get Insights
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Professional Trust Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">25K+</div>
                      <div className="text-sm text-muted-foreground font-medium">Subscribers</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">95%</div>
                      <div className="text-sm text-muted-foreground font-medium">Open Rate</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
                      <div className="text-sm text-muted-foreground font-medium">Delivery</div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center mt-6">
                    No spam, unsubscribe anytime. Your email is secure and never shared.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}