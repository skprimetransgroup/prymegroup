import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, CheckCircle, Building2 } from "lucide-react";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Our Story */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Prime Trans Group is one of the fastest growing staffing firm in Ontario. We endeavor to be industry pioneers by our remarkable and inventive methodology at enrolling top ability. We invest wholeheartedly in having the right blend among customary and imaginative approaches to obtaining competitors.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The labor force is changing, organizations and workers have various necessities, and we comprehend those needs. Finding quality job candidates is difficult when there are so many to choose from. With Prime Trans Group by your side, finding the right candidate is no problem.
                </p>
              </div>
              
              <div className="bg-primary/5 p-8 rounded-lg">
                <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 mx-auto shadow-lg border-2 border-primary/20">
                  <img 
                    src={primeLogoPath} 
                    alt="Prime Trans Group Logo" 
                    className="h-12 w-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Prime Trans Group Toronto</h3>
                <p className="text-muted-foreground text-center">
                  Our essential objective is to make solid associations between excellent ability & opportunity.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto">
                    <Target className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Problem</h3>
                  <p className="text-muted-foreground">
                    Finding quality job candidates is difficult when there are so many to choose from. With Prime Trans Group by your side, finding the right candidate is no problem.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4 mx-auto">
                    <Users className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Agitate</h3>
                  <p className="text-muted-foreground">
                    Prime Trans Group has an extensive network of single professionals, graduates, and apprentices looking for temporary or full-time opportunities in one of their many offices in Ontario.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Solve</h3>
                  <p className="text-muted-foreground">
                    Don't worry about hiring the wrong person. Contact Prime Trans Group today to find out more about how they can help you fill your open positions with qualified applicants in Ontario!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Mission */}
          <section className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We comprehend that in the present cutthroat environment, it is undeniably challenging to track down qualified applicants that have both the necessary abilities and social fit considering the necessities of an association.
              </p>
              <p className="text-lg font-semibold text-primary">
                Our essential objective is to make solid associations between excellent ability & opportunity.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're an employer looking for qualified candidates or a job seeker searching for the right opportunity, Prime Trans Group is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Contact Us Today
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Our Services
              </Button>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}