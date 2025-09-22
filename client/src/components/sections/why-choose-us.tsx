import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Access to the very best professionals in Canada.",
  "Focus on your own core business while we focus on your needs.",
  "Lower cost of Hiring, overall higher efficiency"
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight px-2 sm:px-0">
                Why we are one of the best workforce solution providers since 2016.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
                Just give us a few details, and let us get to work — with matching technology that instantly identifies the best available local and national talent, and staffing specialists that help you quickly close the deal.
              </p>
              <p className="text-base sm:text-lg font-semibold text-foreground px-2 sm:px-0">
                Find the best talent, in the right location, at the right cost with Prime Trans Group.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary-foreground" />
                  </div>
                  <div 
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    data-testid={`benefit-${index + 1}`}
                  >
                    {benefit}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-3" data-testid="button-post-job-cta">
                Post a Job
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Executive team meeting in boardroom"
              className="rounded-xl shadow-xl w-full h-auto"
              data-testid="img-why-choose-us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
