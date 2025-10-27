import { Link, useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings,
  LogOut,
  Home
} from "lucide-react";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { adminUser, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Briefcase, label: "Jobs", path: "/admin/jobs" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Users, label: "Applications", path: "/admin/applications" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path: string) => location === path || (path !== "/admin" && location.startsWith(path));

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <img 
              src={primeLogoPath} 
              alt="Pryme Group" 
              className="h-8 w-auto"
            />
            <div className="ml-2">
              <span className="text-sm font-semibold text-muted-foreground">Admin</span>
              {adminUser && (
                <p className="text-xs text-muted-foreground">{adminUser.username}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start h-10"
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="border-t border-border p-4 space-y-2">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                <Home className="mr-3 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}