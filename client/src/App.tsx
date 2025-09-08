import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminJobs from "@/pages/admin/jobs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/:id" component={JobDetail} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/jobs" component={AdminJobs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
