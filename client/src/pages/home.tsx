import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import VideoHero from "@/components/sections/video-hero";
import Hero from "@/components/sections/hero";
import Statistics from "@/components/sections/statistics";
import HowItWorks from "@/components/sections/how-it-works";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Services from "@/components/sections/services";
import FeaturedJobs from "@/components/sections/featured-jobs";
import CTA from "@/components/sections/cta";
import TrustedPartners from "@/components/sections/trusted-partners";
import TechCarousel from "@/components/sections/tech-carousel";
import Blog from "@/components/sections/blog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <main className="relative z-10">
        <VideoHero />
        <Hero />
        <Statistics />
        <HowItWorks />
        <WhyChooseUs />
        <Services />
        <TechCarousel />
        <FeaturedJobs />
        <CTA />
        <TrustedPartners />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
