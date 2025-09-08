import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Services", path: "#services" },
    { label: "About", path: "#about" },
    { label: "Blog", path: "#blog" },
    { label: "Contact", path: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 header-3d">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-logo">
            <img 
              src={primeLogoPath} 
              alt="Prime Trans Group" 
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 nav-3d">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item-3d text-foreground hover:text-primary transition-colors font-medium ${
                  isActive(item.path) ? "text-primary" : ""
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link href="/jobs">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:block"
                data-testid="button-find-job"
              >
                Find Job
              </Button>
            </Link>
            <Link href="/post-job">
              <Button size="sm" data-testid="button-post-job">
                Post Job
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border" data-testid="mobile-menu">
            <div className="py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors ${
                    isActive(item.path) ? "text-primary bg-muted" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/jobs">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  data-testid="button-mobile-find-job"
                >
                  Find Job
                </Button>
              </Link>
              <Link href="/post-job">
                <Button
                  size="sm"
                  className="w-full mt-2"
                  data-testid="button-mobile-post-job"
                >
                  Post Job
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
