import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };
  
  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post?.title || ''} - ${post?.excerpt || ''}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };
  
  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    const summary = encodeURIComponent(post?.excerpt || '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
  };
  
  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article: ${post?.title || ''} - ${url}`);
    window.open(`https://api.whatsapp.com/send/?phone=12494440004&text=${text}&type=phone_number&app_absent=0`, '_blank');
  };
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const otherPosts = allPosts?.filter(p => p.slug !== slug).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-32 mb-6"></div>
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded w-48 mb-8"></div>
              <div className="aspect-video bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Breadcrumb with Brand Colors */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-secondary hover:text-primary transition-colors font-medium">Home</Link>
              <ChevronRight className="w-4 h-4 text-primary" />
              <Link href="/blog" className="text-secondary hover:text-primary transition-colors font-medium">Blog</Link>
              <ChevronRight className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold">{post.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Enhanced Article Header with Brand Colors */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Badge className="bg-primary text-white border-0 text-sm font-semibold px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Published'}
              </Badge>
              <Badge className="bg-secondary text-white border-0 text-sm font-semibold px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                5 min read
              </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            
            <p className="text-xl text-secondary/80 leading-relaxed mb-10 font-medium">
              {post.excerpt}
            </p>

            {/* Enhanced Share Buttons with Brand Colors */}
            <div className="flex items-center gap-6 pb-10 border-b-2 border-primary/20">
              <span className="text-base font-bold text-secondary">Share Article:</span>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white border-0 font-semibold" onClick={shareToFacebook} data-testid="share-facebook">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white border-0 font-semibold" onClick={shareToTwitter} data-testid="share-twitter">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white border-0 font-semibold" onClick={shareToLinkedIn} data-testid="share-linkedin">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0 font-semibold" onClick={shareToWhatsApp} data-testid="share-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold" onClick={copyLink} data-testid="share-link">
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </header>

          {/* Enhanced Featured Image with Brand Border */}
          {post.imageUrl && (
            <div className="relative mb-16">
              <div className="aspect-video overflow-hidden rounded-2xl border-4 border-gradient-to-r from-primary to-secondary p-1 bg-gradient-to-r from-primary to-secondary">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full"></div>
            </div>
          )}

          {/* Enhanced Article Body with Brand Typography */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-secondary leading-relaxed space-y-8 text-lg [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-secondary [&>h3]:mt-8 [&>h3]:mb-4 [&>strong]:text-primary [&>strong]:font-bold [&>ul]:space-y-3 [&>li]:text-secondary/90 [&>li]:leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\n/g, '<br>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>')
                  .replace(/^([^\n]+)$/gm, (match) => {
                    if (match.trim() === 'Resume Writing Do\'s' || match.trim() === 'Resume Writing Don\'ts') {
                      return `<h2 class="text-2xl font-bold text-primary mt-12 mb-6">${match}</h2>`;
                    }
                    if (match.startsWith('Keep your resume') || match.startsWith('Proofread your') || match.startsWith('Limit your') || match.startsWith('Tailor your') || match.startsWith('Highlight what') || match.startsWith('Be honest') || match.startsWith('Quantify your') || match.startsWith('Use simple') || match.startsWith('Include unpaid') || match.startsWith('Double check') || match.startsWith('Don\'t use an') || match.startsWith('Don\'t include unnecessary') || match.startsWith('Don\'t include a picture') || match.startsWith('Don\'t use too') || match.startsWith('Don\'t use personal') || match.startsWith('Don\'t simply') || match.startsWith('Don\'t make general') || match.startsWith('Don\'t include reasons') || match.startsWith('Don\'t include references') || match.startsWith('Don\'t include hobbies')) {
                      return `<h3 class="text-xl font-semibold text-secondary mt-8 mb-4">${match}</h3>`;
                    }
                    return match;
                  })
              }}
            />
          </div>

          {/* Enhanced Article Footer with Brand Colors */}
          <footer className="mt-20 pt-10 border-t-2 border-primary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-2xl">
              <div>
                <p className="text-sm text-secondary/70 mb-2 font-medium">Published by</p>
                <p className="font-bold text-2xl text-secondary mb-1">Prime Trans Group</p>
                <p className="text-base text-primary font-semibold">Canada's Leading Workforce Solutions Provider</p>
              </div>
              
              <Link href="/blog">
                <Button className="bg-primary hover:bg-primary/90 text-white border-0 font-semibold px-8 py-3 text-base">
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {/* Enhanced Related Posts with Brand Colors */}
      {otherPosts.length > 0 && (
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Related Articles
                  </span>
                </h2>
                <p className="text-lg text-secondary/80">Continue your career journey with these insights</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {otherPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.imageUrl || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {relatedPost.publishedAt ? new Date(relatedPost.publishedAt).toLocaleDateString('en-CA', { 
                            month: 'short', 
                            day: 'numeric' 
                          }) : 'Published'}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                      >
                        Read Article
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}