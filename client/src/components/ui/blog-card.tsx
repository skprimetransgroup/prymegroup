import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <article 
      className="bg-card border border-border rounded-lg overflow-hidden card-hover"
      data-testid={`blog-card-${post.id}`}
    >
      <img
        src={post.imageUrl || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&w=400&h=240"}
        alt={post.title}
        className="w-full h-48 object-cover"
        data-testid={`blog-image-${post.id}`}
      />
      <div className="p-6">
        <div 
          className="text-xs text-muted-foreground mb-2"
          data-testid={`blog-date-${post.id}`}
        >
          {formatDate(post.publishedAt)}
        </div>
        <h3 
          className="text-lg font-semibold text-foreground mb-3"
          data-testid={`blog-title-${post.id}`}
        >
          {post.title}
        </h3>
        <p 
          className="text-muted-foreground mb-4"
          data-testid={`blog-excerpt-${post.id}`}
        >
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <span 
            className="text-primary font-medium hover:text-accent transition-colors cursor-pointer"
            data-testid={`blog-link-${post.id}`}
          >
            Learn More
          </span>
        </Link>
      </div>
    </article>
  );
}
