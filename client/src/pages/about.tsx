import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SEOManager, { SEOConfigs } from "@/components/seo/SEOManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, CheckCircle, Building2 } from "lucide-react";
import primeLogoPath from "@assets/GROUP (500 x 300 px) (500 x 200 px)_1757610842620.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEOManager data={SEOConfigs.about} />
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              About Prime Trans Group
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              One of the fastest growing staffing firms in Ontario, pioneering innovative recruitment methodologies to connect top talent with exceptional opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Enhanced Professional Design */}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Our Story - Enhanced */}
          <section className="relative">
            <div className="bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Building2 className="h-4 w-4" />
                  Our Foundation
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Story</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      Prime Trans Group is one of the fastest growing staffing firm in Ontario. We endeavor to be industry pioneers by our remarkable and inventive methodology at enrolling top ability. We invest wholeheartedly in having the right blend among customary and imaginative approaches to obtaining competitors.
                    </p>
                  </div>
                  <div className="group">
                    <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      The labor force is changing, organizations and workers have various necessities, and we comprehend those needs. Finding quality job candidates is difficult when there are so many to choose from. With Prime Trans Group by your side, finding the right candidate is no problem.
                    </p>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                      <div className="text-2xl font-bold text-primary">2016</div>
                      <div className="text-sm text-muted-foreground">Founded</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                      <div className="text-2xl font-bold text-primary">5000+</div>
                      <div className="text-sm text-muted-foreground">Placements</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative group h-fit">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-background via-background/90 to-background/70 p-6 rounded-2xl border border-border/50 shadow-lg">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-full mb-6 mx-auto shadow-lg border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={primeLogoPath} 
                        alt="Prime Trans Group Logo" 
                        className="h-12 w-auto"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Prime Trans Group Toronto</h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      Our essential objective is to make solid associations between excellent ability & opportunity.
                    </p>
                    
                    {/* Live Status Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">Active & Growing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach - Enhanced */}
          <section className="relative">
            <div className="bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Target className="h-4 w-4" />
                  Our Methodology
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Approach</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  
                  <CardContent className="relative pt-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-4 group-hover:text-red-600 transition-colors duration-300">Problem</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      Finding quality job candidates is difficult when there are so many to choose from. With Prime Trans Group by your side, finding the right candidate is no problem.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  
                  <CardContent className="relative pt-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-4 group-hover:text-yellow-600 transition-colors duration-300">Agitate</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      Prime Trans Group has an extensive network of single professionals, graduates, and apprentices looking for temporary or full-time opportunities in one of their many offices in Ontario.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  
                  <CardContent className="relative pt-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-4 group-hover:text-green-600 transition-colors duration-300">Solve</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      Don't worry about hiring the wrong person. Contact Prime Trans Group today to find out more about how they can help you fill your open positions with qualified applicants in Ontario!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Our Mission - Enhanced */}
          <section className="relative">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-primary/20 shadow-xl">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-2">
                  <CheckCircle className="h-4 w-4" />
                  Our Vision
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We comprehend that in the present cutthroat environment, it is undeniably challenging to track down qualified applicants that have both the necessary abilities and social fit considering the necessities of an association.
                </p>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-50"></div>
                  <p className="relative text-lg font-bold text-foreground bg-gradient-to-br from-background/80 to-background/60 p-6 rounded-2xl border border-primary/20">
                    Our essential objective is to make solid associations between excellent ability & opportunity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action - Enhanced */}
          <section className="relative">
            <div className="bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Users className="h-4 w-4" />
                Get Started
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Ready to Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect Match?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Whether you're an employer looking for qualified candidates or a job seeker searching for the right opportunity, Prime Trans Group is here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  Contact Us Today
                </Button>
                <Button variant="outline" size="lg" className="border-primary/30 text-foreground hover:bg-primary/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl">
                  View Our Services
                </Button>
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}