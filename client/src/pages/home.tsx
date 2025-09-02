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
        <div className="parallax-layer parallax-slow">
          <Hero />
        </div>
        <div className="parallax-layer">
          <Statistics />
        </div>
        <div className="parallax-layer parallax-fast">
          <HowItWorks />
        </div>
        <div className="parallax-layer">
          <WhyChooseUs />
        </div>
        <div className="parallax-layer parallax-slow">
          <Services />
        </div>
        <div className="parallax-layer">
          <FeaturedJobs />
        </div>
        <div className="parallax-layer parallax-fast">
          <CTA />
        </div>
        <div className="parallax-layer">
          <Testimonials />
        </div>
        <div className="parallax-layer parallax-slow">
          <Blog />
        </div>
      </main>
      <Footer />
    </div>
  );
}
