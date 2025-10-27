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
        
        {/* Enhanced Floating Date Badge with Brand Colors */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-white backdrop-blur-sm border-0 shadow-lg font-semibold">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(post.publishedAt)}
          </Badge>
        </div>
        
        {/* Enhanced Read Time Badge with Brand Colors */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-secondary text-white backdrop-blur-sm border-0 shadow-lg font-semibold">
            <Clock className="w-3 h-3 mr-1" />
            5 min read
          </Badge>
        </div>
      </div>
      
      <div className="p-6 relative">
        {/* Gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
        
        <div className="relative z-10">
          {/* Enhanced Author info with Brand Colors */}
          <div className="flex items-center mb-4 text-sm">
            <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
              <User className="w-3 h-3 mr-2" />
              <span>Pryme Group</span>
            </div>
          </div>
          
          <h3 
            className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight"
            data-testid={`blog-title-${post.id}`}
          >
            {post.title}
          </h3>
          
          <p 
            className="text-secondary/80 mb-6 line-clamp-3 leading-relaxed"
            data-testid={`blog-excerpt-${post.id}`}
          >
            {post.excerpt}
          </p>
          
          <Link href={`/blog/${post.slug}`}>
            <div 
              className="inline-flex items-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 group/link cursor-pointer text-base"
              data-testid={`blog-link-${post.id}`}
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 ml-2 text-primary group-hover/link:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
