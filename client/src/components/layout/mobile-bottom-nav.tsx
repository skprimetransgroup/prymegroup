import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Search, 
  Plus, 
  MoreHorizontal, 
  X,
  MapPin,
  BookOpen,
  Phone,
  Users,
  Briefcase,
  FileText,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MobileBottomNav() {
  const [location] = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const isActive = (path: string) => location === path;

  const moreItems = [
    { label: "Services", path: "/services", icon: Briefcase },
    { label: "About", path: "/about", icon: Users },
    { label: "Blog", path: "/blog", icon: BookOpen },
    { label: "Contact", path: "/contact", icon: Phone },
    { label: "Terms", path: "/terms-conditions", icon: FileText },
    { label: "Privacy", path: "/privacy-policy", icon: Shield },
  ];

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Find a Job",
      path: "/jobs",
      icon: Search,
    },
    {
      label: "Post a Job",
      path: "/post-job",
      icon: Plus,
    },
    {
      label: "More",
      path: "#",
      icon: MoreHorizontal,
      action: () => setShowMoreMenu(!showMoreMenu),
    },
  ];

  return (
    <>
      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMoreMenu(false)}>
          <div className="absolute bottom-20 left-4 right-4">
            <Card className="border-primary/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-secondary">More Options</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowMoreMenu(false)}
                    className="text-secondary"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setShowMoreMenu(false)}
                      >
                        <div className="flex flex-col items-center p-4 rounded-xl hover:bg-primary/10 transition-colors group">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-2 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-secondary text-center">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary/20 shadow-lg md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    showMoreMenu
                      ? "bg-primary/10 text-primary"
                      : "text-secondary/60 hover:text-primary hover:bg-primary/5"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-secondary/60 hover:text-primary hover:bg-primary/5"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom padding for content when nav is visible */}
      <div className="h-16 md:hidden"></div>
    </>
  );
}