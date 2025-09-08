import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import BlogCard from "@/components/ui/blog-card";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <section id="blog" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background with Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            News & Resources
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Latest from our Blog
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay ahead in your career with expert insights, industry trends, and actionable advice from Canada's leading workforce solutions provider.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center text-2xl font-bold text-primary">
                <TrendingUp className="w-6 h-6 mr-2" />
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Articles Published</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Weekly</div>
              <div className="text-sm text-muted-foreground">New Content</div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse backdrop-blur-sm">
                <div className="w-full h-56 bg-gradient-to-br from-muted to-muted/50"></div>
                <div className="p-6">
                  <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-20 mb-3"></div>
                  <div className="h-6 bg-gradient-to-r from-muted to-muted/50 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-gradient-to-r from-muted to-muted/50 rounded"></div>
                    <div className="h-3 bg-gradient-to-r from-muted to-muted/50 rounded w-2/3"></div>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16" data-testid="blog-posts-grid">
              {blogPosts.slice(0, 3).map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Want to read more career insights?
                  </h3>
                  <p className="text-muted-foreground">
                    Explore our complete collection of articles and resources.
                  </p>
                </div>
                <Link href="/blog">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
