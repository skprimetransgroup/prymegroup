import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import { ScrollRestoration } from "@/hooks/use-scroll-restoration";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import Services from "@/pages/services";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Contact from "@/pages/contact";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminJobs from "@/pages/admin/jobs";
import AdminBlog from "@/pages/admin/blog";
import AdminTestimonials from "@/pages/admin/testimonials";
import AdminApplications from "@/pages/admin/applications";
import AdminSettings from "@/pages/admin/settings";
import AdminLogin from "@/pages/admin/login";
import PostJob from "@/pages/post-job";
import Warehouse from "@/pages/warehouse";
import Transportation from "@/pages/transportation";
import TermsConditions from "@/pages/terms-conditions";
import PrivacyPolicy from "@/pages/privacy-policy";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollRestoration />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/jobs/:id" component={JobDetail} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/post-job" component={PostJob} />
        <Route path="/warehouse" component={Warehouse} />
        <Route path="/transportation" component={Transportation} />
        <Route path="/terms-conditions" component={TermsConditions} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/about" component={About} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/jobs" component={AdminJobs} />
        <Route path="/admin/blog" component={AdminBlog} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/applications" component={AdminApplications} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route component={NotFound} />
      </Switch>
      <MobileBottomNav />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
