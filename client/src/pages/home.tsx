import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Statistics from "@/components/sections/statistics";
import HowItWorks from "@/components/sections/how-it-works";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Services from "@/components/sections/services";
import FeaturedJobs from "@/components/sections/featured-jobs";
import CTA from "@/components/sections/cta";
import Testimonials from "@/components/sections/testimonials";
import Blog from "@/components/sections/blog";
import FloatingObjects from "@/components/effects/floating-objects";
import WorkingObjects from "@/components/effects/working-objects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingObjects />
      <WorkingObjects />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Statistics />
        <HowItWorks />
        <WhyChooseUs />
        <Services />
        <FeaturedJobs />
        <CTA />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
