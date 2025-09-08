import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <article 
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm"
      data-testid={`blog-card-${post.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&w=400&h=240"}
          alt={post.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          data-testid={`blog-image-${post.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating Date Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-lg">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(post.publishedAt)}
          </Badge>
        </div>
        
        {/* Read Time Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-primary/90 text-white backdrop-blur-sm border-0 shadow-lg">
            <Clock className="w-3 h-3 mr-1" />
            5 min read
          </Badge>
        </div>
      </div>
      
      <div className="p-6 relative">
        {/* Gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
        
        <div className="relative z-10">
          {/* Author info */}
          <div className="flex items-center mb-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>Prime Trans Group</span>
            </div>
          </div>
          
          <h3 
            className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight"
            data-testid={`blog-title-${post.id}`}
          >
            {post.title}
          </h3>
          
          <p 
            className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed"
            data-testid={`blog-excerpt-${post.id}`}
          >
            {post.excerpt}
          </p>
          
          <Link href={`/blog/${post.slug}`}>
            <div 
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-all duration-300 group/link cursor-pointer"
              data-testid={`blog-link-${post.id}`}
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
