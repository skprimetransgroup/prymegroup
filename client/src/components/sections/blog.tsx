import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/ui/blog-card";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <section id="blog" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-primary mb-2">News & Blog</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Latest from our Blog</h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-3 bg-muted rounded w-20 mb-2"></div>
                  <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8" data-testid="blog-posts-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
