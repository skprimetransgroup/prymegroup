import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BriefcaseIcon, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Jobs', href: '/admin/jobs', icon: BriefcaseIcon },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location === '/admin';
    }
    return location?.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <img src={primeLogoPath} alt="Prime Trans Group" className="h-8 w-auto" />
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="mt-4 space-y-1 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-card border-r border-border">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <img src={primeLogoPath} alt="Prime Trans Group" className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold">Admin Panel</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border">
              <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-card border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome to Prime Trans Group Admin
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}