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
import Blog from "@/components/sections/blog";
import SEOManager, { SEOConfigs } from "@/components/seo/SEOManager";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <SEOManager data={SEOConfigs.home} />
      <Header />
      <main className="relative z-10">
        <VideoHero />
        <Hero />
        <Statistics />
        <HowItWorks />
        <WhyChooseUs />
        <Services />
        <FeaturedJobs />
        <CTA />
        <TrustedPartners />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
